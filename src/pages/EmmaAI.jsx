import "../styles/EmmaAI.css";
import { useState } from "react";
import EmmaRuntime from "../emma-core/EmmaRuntime";
import { EmmaDB } from "../emma-core/EmmaDatabase";
import CheckpointDialog from "../components/CheckpointDialog";

export default function EmmaAI() {
  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [evaporating, setEvaporating] = useState(false);

  // Checkpoint Dialog
  const [showCheckpoint, setShowCheckpoint] = useState(false);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  async function handleSend() {
    if (!input.trim() || thinking) return;

    const currentQuestion = input.trim();

    if (question || answer) {
      setEvaporating(true);

      await sleep(500);

      setQuestion("");
      setAnswer("");

      setEvaporating(false);
    }

    setInput("");
    setQuestion(currentQuestion);
    setThinking(true);

    try {
      const emma = await EmmaRuntime.wake();

      const result = await emma.think(currentQuestion);

      if (typeof result === "string") {
        setAnswer(result);
      } else if (result?.reply) {
        setAnswer(result.reply);
      } else if (result?.response) {
        setAnswer(result.response);
      } else {
        setAnswer("Emma returned no response.");
      }
    } catch (error) {
      console.error(error);
      setAnswer("Something went wrong.");
    } finally {
      setThinking(false);
    }
  }

  async function saveCheckpoint() {
    try {
      const checkpoint = {
        id: crypto.randomUUID(),
        createdAt: new Date().toISOString(),

        repositoryId: EmmaRuntime.getRepository()?.id ?? null,
        branchId: EmmaRuntime.getBranch() ?? "main",
        sessionId: EmmaRuntime.getSession()?.id ?? null,

        title,
        notes,

        conversation: {
          conversationId: crypto.randomUUID(),
          question,
          answer,
        },

        experience: {
          provider: "emma",
        },

        analysis: answer,
      };

      await EmmaDB.saveCheckpoint(checkpoint);

      alert("✅ Checkpoint Saved");

      setShowCheckpoint(false);
      setTitle("");
      setNotes("");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save checkpoint.");
    }
  }

  function closeCheckpoint() {
    setShowCheckpoint(false);
    setTitle("");
    setNotes("");
  }

  return (
    <main className="emma-page">
      <div className="emma-container">
        <h1>Emma</h1>

        <p className="subtitle">
          What would you like to work on today?
        </p>

        <div className={`conversation ${evaporating ? "evaporating" : ""}`}>
          {question && <div className="question">{question}</div>}

          {thinking && (
            <div className="thinking">
              Emma is thinking...
            </div>
          )}

          {!thinking && answer && (
            <div className="answer">
              {answer}
            </div>
          )}
        </div>

        <input
          type="text"
          placeholder="Ask Emma anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
        />

        <br />
        <br />

        <button
          onClick={() => setShowCheckpoint(true)}
          disabled={!question || !answer}
        >
          Checkpoint
        </button>

        <CheckpointDialog
          open={showCheckpoint}
          title={title}
          notes={notes}
          setTitle={setTitle}
          setNotes={setNotes}
          onSave={saveCheckpoint}
          onCancel={closeCheckpoint}
        />
      </div>
    </main>
  );
}