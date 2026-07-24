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
        content:
`You are an expert intelligence analyst.

Analyze the uploaded checkpoint(s).

Produce a professional report with:

1. Executive Summary
2. Key Decisions
3. Progress
4. Risks
5. Recommendations`
    },

    {
        role: "user",
        content: JSON.stringify(message.checkpoints, null, 2)
    }

];

const result = await adapter.generate(messages);

const report =
    result.choices?.[0]?.message?.content ||
    "No report generated.";

sendResponse({
    ok: true,
    report
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