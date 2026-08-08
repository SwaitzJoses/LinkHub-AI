(function () {

    if (window.__EVZ_GEMINI_HOOKED__) return;
    window.__EVZ_GEMINI_HOOKED__ = true;

    window.__EVZ_MESSAGES = [];

    const originalFetch = window.fetch;

    window.fetch = async (...args) => {

        const response = await originalFetch(...args);

        try {

            const url = args[0]?.toString() || "";
            const options = args[1];

            if (url.includes("StreamGenerate")) {

                // console.log("🟢 Gemini Stream Detected");

                // console.log("========== REQUEST BODY ==========");
                // console.log(options?.body);

                const clone = response.clone();

                clone.text().then(text => {

                    // console.log("========== RESPONSE ==========");
                    // console.log(text);

                    window.postMessage({
                        source: "gemini-page",
                        type: "gemini-stream",
                        request: options?.body,
                        response: text
                    }, "*");

                });

            }

        } catch (e) {
            console.error("Gemini Bridge Error:", e);
        }

        return response;
    };

    // console.log("✅ Gemini Page Bridge Loaded");

})();