console.log("TOP OF CONTENT.JS", performance.now());
console.time("EmmaRuntime Import");
const bridge = document.createElement("script");

bridge.src = chrome.runtime.getURL(
    "extension/content/pageBridge.js"
);

bridge.onload = () => bridge.remove();

(document.head || document.documentElement)
    .appendChild(bridge);
import EmmaRuntime from "../core/EmmaRuntime.js";
console.timeEnd("EmmaRuntime Import");
import ChatGPTAdapter from "../adapters/chatgpt/ChatGPTAdapter.js";
import ClaudeAdapter from "../adapters/claude/ClaudeAdapter.js";
import GeminiAdapter from "../adapters/gemini/GeminiAdapter.js";


window.addEventListener("message", (event) => {

    if (event.source !== window) return;

    if (event.data?.type !== "EVOLOZ_CHAT_RESULT") return;

    console.log("✅ Full Chat Received");

   
console.log(event.data.conversation);

});

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
console.log("CHECKPOINT");
console.dir(checkpoint);

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



function buildManifest(checkpoint) {

    return {

        format: "evoloz-1.0",

        version: "1.0",

        provider: checkpoint.provider,

        title: checkpoint.title || "",

        conversationId: checkpoint.conversationId,

        capturedAt: checkpoint.capturedAt,

        messageCount: checkpoint.messageCount

    };

}


function splitConversation(messages, maxMessages = 100) {

    const sections = [];

    for (let i = 0; i < messages.length; i += maxMessages) {

        sections.push({
            file: `section-${String(sections.length + 1).padStart(3, "0")}.json`,
            startMessage: i + 1,
            endMessage: Math.min(i + maxMessages, messages.length),
            messages: messages.slice(i, i + maxMessages)
        });

    }

    return sections;

}




async function exportCheckpoint(checkpoint) {

//     const manifest = buildManifest(checkpoint);

// const sections = splitConversation(
//     checkpoint.messages,
//     100
// );

// console.log("Manifest:", manifest);
// console.log("Sections:", sections);
// console.log("Checkpoint:", checkpoint);
// console.log("Messages:", checkpoint.messages);
// console.log("Sections:", sections);

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