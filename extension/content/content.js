import EmmaRuntime from "../core/EmmaRuntime.js";
import ChatGPTAdapter from "../adapters/chatgpt/ChatGPTAdapter.js";
import Emma from "../../src/emma-core/Emma.js";

(async () => {

    console.log("🧠 Emma Started");

    console.time("Emma Constructor");

    const emma = new Emma();

    console.timeEnd("Emma Constructor");

    const runtime = new EmmaRuntime(emma);

    const chatGPT = new ChatGPTAdapter();

    runtime.registerAdapter(chatGPT);

    console.time("Runtime Start");

    await runtime.start();

    console.timeEnd("Runtime Start");

    // Make available globally
    window.emma = emma;
    window.runtime = runtime;

    console.log("✅ ChatGPT Adapter Loaded");
    console.log("Conversation:", chatGPT.getConversationId());

})();


// =====================================
// Listen for Checkpoint Requests
// =====================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (!message) {

        sendResponse({
            ok: false,
            error: "Empty message."
        });

        return true;

    }

    if (message.action !== "CREATE_CHECKPOINT") {
        return;
    }

    (async () => {

        try {

            if (!window.runtime) {

                throw new Error("Emma Runtime not ready.");

            }

            console.log("📦 Starting Checkpoint...");

const checkpoint =
    await window.runtime.checkpoint("ChatGPT");

checkpoint.title = message.title ?? "";
checkpoint.notes = message.notes ?? "";

await exportCheckpoint(checkpoint);

console.log("✅ Checkpoint Complete");

sendResponse({
    ok: true
});




        }

        catch (err) {

            console.error("❌ Checkpoint Error:", err);

            sendResponse({

                ok: false,
                error: err.message

            });

        }

    })();

    return true;

});

async function exportCheckpoint(checkpoint) {

    const json = JSON.stringify(checkpoint, null, 2);

    const blob = new Blob(
        [json],
        {
            type: "application/json"
        }
    );

    const url = URL.createObjectURL(blob);

    return new Promise((resolve) => {

        chrome.runtime.sendMessage({

            action: "DOWNLOAD_FILE",

            url,

            filename: "intelligence.json"

        }, (response) => {

            URL.revokeObjectURL(url);

            console.log("💾 Download Response:", response);

            resolve(response);

        });

    });

}