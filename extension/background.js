console.log("🧠 Emma Background Ready");



import AISettings from "../src/emma-core/settings/AISettings.js";
import LLMAdapter from "../src/emma-core/connectors/LLMAdapter.js";
import OpenAIConnector from "../src/emma-core/connectors/OpenAIConnector.js";
import ClaudeConnector from "../src/emma-core/connectors/ClaudeConnector.js";
import GeminiConnector from "../src/emma-core/connectors/GeminiConnector.js";

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    try {

        console.log("📩 Background Received:", message);

        if (!message) {

            sendResponse({
                ok: false,
                error: "Empty message."
            });

            return true;

        }

        // =====================================
        // CREATE CHECKPOINT
        // =====================================

        if (message.action === "CREATE_CHECKPOINT") {

            console.log("📍 Checkpoint Requested");

            chrome.tabs.query(
                {
                    active: true,
                    currentWindow: true
                },
                (tabs) => {

                    const tab = tabs[0];

                    if (!tab || !tab.id) {

                        sendResponse({
                            ok: false,
                            error: "No active ChatGPT tab."
                        });

                        return;

                    }

                    chrome.tabs.sendMessage(
                        tab.id,
                        {
                            action: "CREATE_CHECKPOINT",
                            title: message.title,
                            notes: message.notes
                        },
                        (response) => {

                            if (chrome.runtime.lastError) {

                                console.error(chrome.runtime.lastError);

                                sendResponse({
                                    ok: false,
                                    error: chrome.runtime.lastError.message
                                });

                                return;

                            }

                            sendResponse(response);

                        }
                    );

                }
            );

            return true;

        }

        // =====================================
        // NORMAL EMMA EVENTS
        // =====================================

        if (message.type === "EMMA_EVENT") {

            console.log("🧠 Emma Event");
            console.log(message.payload);

            sendResponse({
                ok: true
            });

            return true;

        }

        // =====================================
        // DOWNLOAD FILE
        // =====================================

        if (message.action === "DOWNLOAD_FILE") {

            console.log("💾 Download Request");

            chrome.downloads.download({

                url: message.url,

                filename: message.filename,

                saveAs: true

            }, (downloadId) => {

                if (chrome.runtime.lastError) {

                    sendResponse({
                        ok: false,
                        error: chrome.runtime.lastError.message
                    });

                    return;

                }

                sendResponse({
                    ok: true,
                    downloadId
                });

            });

            return true;

        }

        // =====================================
        // ANALYZE CHECKPOINTS
        // =====================================

      if (message.action === "ANALYZE_CHECKPOINTS") {

    (async () => {

      const settings = await AISettings.load();

if (!settings.apiKey) {
    sendResponse({
        ok: false,
        error: "Please configure your AI API key first."
    });
    return;
}

let connector;

switch (settings.provider) {

    case "claude":
        connector = new ClaudeConnector(
            settings.apiKey,
            settings.model
        );
        break;

    case "gemini":
        connector = new GeminiConnector(
            settings.apiKey,
            settings.model
        );
        break;

    default:
        connector = new OpenAIConnector(
            settings.apiKey,
            settings.model
        );
}

const adapter = new LLMAdapter();
adapter.setProvider(connector);

const messages = [

    {
        role: "system",
    content: `You are the Evoloz Intelligence Engine.

You are given one or more intelligence checkpoints.

Your job is to merge them into a single, richer intelligence state.

Rules:

- Merge duplicate knowledge.
- Preserve important decisions.
- Identify recurring patterns.
- Resolve contradictions where possible.
- Infer useful next steps.
- Produce an executive report.

Return ONLY valid JSON.

Example:

{
  "evolvedIntelligence": {
    "version": "2.0",
    "summary": "...",
    "projects": [],
    "knowledge": [],
    "decisions": [],
    "patterns": [],
    "lessons": [],
    "recommendations": [],
    "nextSteps": [],
    "confidence": {}
  },
  "report": "# Executive Summary\n..."
}

Do not include markdown fences.
Do not explain anything outside the JSON.`
    },

    {
        role: "user",
        content: JSON.stringify(message.checkpoints, null, 2)
    }

];

const result = await adapter.generate(messages);

const content =
    result.choices?.[0]?.message?.content;



let parsed;

try {

    parsed = JSON.parse(content);

} catch (err) {

    console.error("Invalid AI response:", content);

    sendResponse({
        ok: false,
        error: "The AI returned an invalid response. Please try again."
    });

    return;
}

sendResponse({

    ok: true,

    evolvedIntelligence: parsed.evolvedIntelligence,

    report: parsed.report

});
        // (everything from AISettings.load()
        // down to sendResponse({ ok: true, report }))

    })().catch(err => {

        console.error(err);

        sendResponse({
            ok: false,
            error: err.message
        });

    });

    return true;

}
        // =====================================
        // UNKNOWN MESSAGE
        // =====================================

        sendResponse({
            ok: false,
            error: "Unknown message."
        });

    }

    catch (err) {

        console.error("❌ Background Error:", err);

        sendResponse({
            ok: false,
            error: err.message
        });

    }

    return true;

});