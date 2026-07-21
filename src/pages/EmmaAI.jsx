import "../styles/EmmaAI.css";
import { useState } from "react";
import EmmaRuntime from "../emma-core/EmmaRuntime";

export default function EmmaAI() {

  const emma = EmmaRuntime.getEmma();

  const [input, setInput] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [thinking, setThinking] = useState(false);
  const [evaporating, setEvaporating] = useState(false);

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

  return (
    <main className="emma-page">
      <div className="emma-container">
        <h1>Emma</h1>

        <p className="subtitle">
          What would you like to work on today?
        </p>

        <div className={`conversation ${evaporating ? "evaporating" : ""}`}>
          {question && (
            <div className="question">
              {question}
            </div>
          )}

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
      </div>
    </main>
  );
}