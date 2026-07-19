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

            console.log("✅ Checkpoint Complete");

            console.log(checkpoint);

            sendResponse({

                ok: true,
                checkpoint

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