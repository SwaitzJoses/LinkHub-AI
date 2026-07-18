console.log("🧠 Emma Background Ready");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    try {

        console.log("📩 Raw Message:", message);

        if (!message || message.type !== "EMMA_EVENT") {
            sendResponse({ ok: false });
            return;
        }

        console.log("🧠 Background Received");
        console.log(message.payload);

        sendResponse({ ok: true });

    } catch (err) {

        console.error("❌ Background Error:", err);

        sendResponse({
            ok: false,
            error: err.message
        });

    }

    return true;

});