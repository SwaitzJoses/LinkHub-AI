console.log("TOP OF CONTENT.JS", performance.now());
console.time("EmmaRuntime Import");
import EmmaRuntime from "../core/EmmaRuntime.js";
console.timeEnd("EmmaRuntime Import");
import ChatGPTAdapter from "../adapters/chatgpt/ChatGPTAdapter.js";
import ClaudeAdapter from "../adapters/claude/ClaudeAdapter.js";
import GeminiAdapter from "../adapters/gemini/GeminiAdapter.js";


(async () => {

    console.log("🧠 Emma Started");

   

  

    

    const runtime = new EmmaRuntime();

let adapter;

const host = window.location.hostname;

if (host.includes("chatgpt.com")) {

    adapter = new ChatGPTAdapter();

}
else if (host.includes("claude.ai")) {

    adapter = new ClaudeAdapter();

}
else if (host.includes("gemini.google.com")) {

    adapter = new GeminiAdapter();

}
else {

    console.warn("Unsupported provider:", host);
    return;

}

runtime.registerAdapter(adapter);

console.time("Runtime Start");

await runtime.start();

console.timeEnd("Runtime Start");

// Make available globally

// Make available globally

window.runtime = runtime;
window.adapter = adapter;

console.log(`✅ ${adapter.constructor.name} Loaded`);
console.log("Conversation:", adapter.getConversationId());

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
    await window.runtime.checkpoint(window.adapter.name);

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