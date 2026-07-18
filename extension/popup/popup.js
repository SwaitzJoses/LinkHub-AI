(() => {

    console.log("🧠 Emma Booting...");

    if (!window.EmmaCore) {
        console.error("❌ EmmaCore not found");
        return;
    }

    if (!window.EmmaAdapters) {
        console.error("❌ EmmaAdapters not found");
        return;
    }

    const runtime = window.EmmaCore.Runtime;

    const chatgpt = new window.EmmaAdapters.ChatGPTAdapter();

    runtime.registerAdapter(chatgpt);

    runtime.start();

    // =====================================
    // CHECKPOINT REQUESTS
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

        try {

            console.log("📍 Creating Emma Checkpoint...");

            const messages = Array.from(
                document.querySelectorAll("[data-message-author-role]")
            );

            const conversation = messages.map((message) => ({

                id:
                    message.getAttribute("data-message-id"),

                role:
                    message.getAttribute("data-message-author-role"),

                text:
                    message.innerText.trim()

            }));

            console.log("📚 Conversation:", conversation);

            // =====================================
            // TODO:
            // Pass conversation into Emma
            // =====================================

            // Example (replace once your API exists):
            //
            // window.EmmaCore.Runtime.createCheckpoint({
            //     conversation
            // });

            sendResponse({

                ok: true,

                conversation

            });

        }

        catch (err) {

            console.error(err);

            sendResponse({

                ok: false,

                error: err.message

            });

        }

        return true;

    });

})();