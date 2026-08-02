console.log("🧠 Emma Background Ready");

let isCapturing = false;
let isAnalyzing = false;



import AISettings from "../src/emma-core/settings/AISettings.js";
import LLMAdapter from "../src/emma-core/connectors/LLMAdapter.js";
import OpenAIConnector from "../src/emma-core/connectors/OpenAIConnector.js";
import ClaudeConnector from "../src/emma-core/connectors/ClaudeConnector.js";
import GeminiConnector from "../src/emma-core/connectors/GeminiConnector.js";
import { httpsCallable } from "firebase/functions";
import { functions } from "./firebase/firebase.js";

// import { supabase } from "../src/auth/supabase.js";
import { decreaseCapture } from "./firebase/user.js";
import { decreaseAnalysis } from "./firebase/user.js";


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    try {

        console.log("📩 Background Received:", message);

        if (!message) {
isAnalyzing = false;
            sendResponse({
                ok: false,
                error: "Empty message."
            });

            return true;

        }
// =====================================
// GOOGLE LOGIN
// =====================================

if (message.action === "GOOGLE_LOGIN") {

    (async () => {

        try {

            const manifest = chrome.runtime.getManifest();

            const authUrl = new URL("https://accounts.google.com/o/oauth2/auth");

            authUrl.searchParams.set("client_id", manifest.oauth2.client_id);
            authUrl.searchParams.set("response_type", "id_token");
            authUrl.searchParams.set("redirect_uri", chrome.identity.getRedirectURL());
            authUrl.searchParams.set("scope", manifest.oauth2.scopes.join(" "));
            authUrl.searchParams.set("prompt", "select_account");

            console.log("Redirect URI:", chrome.identity.getRedirectURL());
console.log("Auth URL:", authUrl.toString());

            const redirectedTo = await chrome.identity.launchWebAuthFlow({
                
                
                url: authUrl.toString(),
                interactive: true
            });

            console.log("Redirect:", redirectedTo);

            const url = new URL(redirectedTo);

            // IMPORTANT: remove the leading '#'
            const params = new URLSearchParams(url.hash.substring(1));

            const idToken = params.get("id_token");

            console.log("ID Token:", idToken);

            if (!idToken) {
                throw new Error("No Google ID token returned.");
            }

            const { data, error } = await supabase.auth.signInWithIdToken({
                provider: "google",
                token: idToken
            });

            if (error) throw error;

            console.log("Supabase Session:", data);

            sendResponse({
                ok: true,
                user: data.user
            });

        } catch (err) {

            console.error(err);
isAnalyzing = false;
            sendResponse({
                ok: false,
                error: err.message
            });

        }

    })();

    return true;
}
        // =====================================
        // CREATE CHECKPOINT
        // =====================================

        if (message.action === "CREATE_CHECKPOINT") {

            isCapturing = true;
console.log("🟠 Capture Started");
            console.log("📍 CREATE_CHECKPOINT received");

            console.log("📍 Checkpoint Requested");

           chrome.tabs.query(
    {
        active: true,
        lastFocusedWindow: true
    },
                (tabs) => {

                    const tab = tabs[0];

                    if (!tab || !tab.id) {
isAnalyzing = false;
                        sendResponse({
                            ok: false,
                            error: "No active ChatGPT tab."
                        });

                        return;

                    }
console.log("TAB ID:", tab.id);
console.log("TAB URL:", tab.url);
console.log("TAB:", tab);
                    chrome.tabs.sendMessage(
                        tab.id,
                        {
                            action: "CREATE_CHECKPOINT",
                            title: message.title,
                            notes: message.notes
                        },
                        async (response) => {
if (chrome.runtime.lastError) {

    isCapturing = false;

    console.error(chrome.runtime.lastError);
isAnalyzing = false;
    sendResponse({
        ok: false,
        error: chrome.runtime.lastError.message
    });

    return;

}

                            isCapturing = false;

console.log("🟢 Capture Finished");


                            isCapturing = false;

console.log("🟢 Capture Finished");


if (response?.ok) {

    try {

        await decreaseCapture();

        console.log("✅ Capture quota decreased");

    } catch (err) {

        console.error(err);

    }

}

console.log(response);

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
isAnalyzing = false;
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

        isAnalyzing = true;
console.count("🟠 Analyze Started");

    (async () => {

//       const settings = await AISettings.load();

// if (!settings.apiKey) {
//     isAnalyzing = false;
//     sendResponse({
//         ok: false,
//         error: "Please configure your AI API key first."
//     });
//     return;
// }


        const settings = await AISettings.load();

if (!settings.apiKey) {

    // TODO
    // Call Firebase Cloud Function here.

} else {

    // Existing BYOAI path
}



let connector;

switch (settings.provider) {

    case "claude":

    console.log("===== SETTINGS =====");
console.log(settings);
console.log("Provider:", settings.provider);
console.log("Model:", settings.model);
console.log("====================");
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

const analyze = httpsCallable(functions, "analyze");

const response = await analyze({
    messages
});

const result = response.data;
console.log("FULL OPENAI RESPONSE:");
console.log(result);

const content =
    result.choices?.[0]?.message?.content;



let parsed;

try {

    parsed = JSON.parse(content);

} catch (err) {

    console.error("Invalid AI response:", content);
isAnalyzing = false;
    sendResponse({
        ok: false,
        error: "The AI returned an invalid response. Please try again."
    });

    return;
}

isAnalyzing = false;
console.log("🟢 Analyze Finished");
try {

    const allowed = await decreaseAnalysis();

    console.log("✅ Analysis quota decreased:", allowed);

} catch (err) {

    console.error("Failed to decrease analysis:", err);

}
// ================================
// Download Intelligence
// ================================

const intelligenceData =
    JSON.stringify(
        parsed.evolvedIntelligence,
        null,
        2
    );

const intelligenceUrl =
    "data:application/json;charset=utf-8," +
    encodeURIComponent(intelligenceData);

await chrome.downloads.download({

    url: intelligenceUrl,

    filename: "Analyzed_Intelligence.json",

    saveAs: true

});

// ================================
// Download Report
// ================================

const reportUrl =
    "data:text/markdown;charset=utf-8," +
    encodeURIComponent(parsed.report);

await chrome.downloads.download({

    url: reportUrl,

    filename: "Analyzed_Intelligence_Report.md",

    saveAs: true

});

sendResponse({
    ok: true
});
        // (everything from AISettings.load()
        // down to sendResponse({ ok: true, report }))

    })().catch(err => {

        console.error(err);
isAnalyzing = false;
        sendResponse({
            ok: false,
            error: err.message
        });

    });

    return true;

}


// =====================================
// GET STATUS
// =====================================

if (message.action === "GET_STATUS") {

    sendResponse({
        ok: true,
        isCapturing,
        isAnalyzing
    });

    return true;

}



        // =====================================
        // UNKNOWN MESSAGE
        // =====================================
isAnalyzing = false;
        sendResponse({
            ok: false,
            error: "Unknown message."
        });

    }

    catch (err) {

        console.error("❌ Background Error:", err);
isAnalyzing = false;
        sendResponse({
            ok: false,
            error: err.message
        });

    }

    return true;

});