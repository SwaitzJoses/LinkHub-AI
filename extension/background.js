console.log("🧠 Emma Background Ready");

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