
import {
    signInWithGoogle,
    observeUser,
    logout
} from "../firebase/auth.js";
import { createUser } from "../firebase/firestore.js";
import AISettings from "../../src/emma-core/settings/AISettings.js";
import { updateStatusCard } from "./status.js";
import {
    getCurrentUserData,
    decreaseEvolve
} from "../firebase/user.js";


const captureBtn = document.getElementById("captureBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const status = document.getElementById("status");
const homeView = document.getElementById("homeView");
const settingsView = document.getElementById("settingsView");

const authView = document.getElementById("authView");
const googleLoginBtn = document.getElementById("googleLoginBtn");

const settingsBtn = document.getElementById("settingsBtn");
const backBtn = document.getElementById("backBtn");

const providerSelect = document.getElementById("providerSelect");
const modelSelect = document.getElementById("modelSelect");
const apiKeyInput = document.getElementById("apiKeyInput");

const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const settingsStatus = document.getElementById("settingsStatus");
const upgradeBtn =
    document.getElementById("upgradeBtn");




function showAuth() {

    authView.style.display = "block";
    homeView.style.display = "none";
    settingsView.style.display = "none";

}

function showHome() {

    authView.style.display = "none";
    homeView.style.display = "block";
    settingsView.style.display = "none";

}

// observeUser(async (user) => {

//     console.log("observeUser:", user);

//     if (user) {

//         status.textContent = "Creating user...";
//         await createUser(user);

//         status.textContent = "Loading profile...";
//         const updatedUser = await getCurrentUserData();

//         status.textContent = "Getting extension status...";
//         const bgStatus = await chrome.runtime.sendMessage({
//             action: "GET_STATUS"
//         });

//         status.textContent = "Updating UI...";
//         updateStatusCard(updatedUser, bgStatus);

//         showHome();

//         status.textContent = "Ready";

//     }

// });

observeUser(async (user) => {

    console.log("observeUser:", user);

    if (user) {

        await createUser(user);

  

const updatedUser = await getCurrentUserData();

const bgStatus = await chrome.runtime.sendMessage({
    action: "GET_STATUS"
});

updateStatusCard(updatedUser, bgStatus);

showHome();
    }

});

const bgStatus = await chrome.runtime.sendMessage({
    action: "GET_STATUS"
});

console.log("Background Status:", bgStatus);

if (bgStatus.isCapturing) {

   

    startLoading(captureBtn, "CAPTURING...");

    status.textContent = "Capturing conversation...";

}

if (bgStatus.isAnalyzing) {

    analyzeBtn.disabled = true;

    startLoading(analyzeBtn, "ANALYZING...");

    status.textContent = "Analyzing intelligence...";

}

upgradeBtn.addEventListener("click",()=>{

    chrome.tabs.create({

        url:"https://pixellence.xyz/#pricing"

    });

});


googleLoginBtn.addEventListener("click", async () => {

    try {

        await signInWithGoogle();

    } catch (err) {

        console.error(err);

    }

});
// ----------------------------------------------------
// Status Helper
// ----------------------------------------------------


// ----------------------------------------------------
// Validate API Key
// ----------------------------------------------------

async function validateApiKey(provider, apiKey) {

    try {

        let response;

        switch (provider) {

            case "openai":

                response = await fetch("https://api.openai.com/v1/models", {

                    headers: {
                        Authorization: `Bearer ${apiKey}`
                    }

                });

                break;

case "claude":

    console.log("🚀 NEW CLAUDE CODE RUNNING");

    response = await fetch("https://api.anthropic.com/v1/models", {
        method: "GET",
        headers: {
            "x-api-key": apiKey.trim(),
            "anthropic-version": "2023-06-01",
            "anthropic-dangerous-direct-browser-access": "true",
            "Content-Type": "application/json"
        }
    });

    break;

               

            case "gemini":

                response = await fetch(

                    `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`

                );

                break;

            default:

                return false;

        }

console.log("Status:", response.status);

const text = await response.text();

console.log("Response:", text);

if (!response.ok) {

    return false;

}

return true;

    }

    catch (err) {

        console.error(err);

        return false;

    }

}
const MODELS = {

    openai: [

        {
            value: "gpt-5.5",
            label: "GPT-5.5"
        },

        {
            value: "gpt-5.5-mini",
            label: "GPT-5.5 Mini"
        },

        {
            value: "gpt-4.1",
            label: "GPT-4.1"
        }

    ],

   claude: [

{
    value: "claude-sonnet-5",
    label: "Claude Sonnet 5"
},

{
    value: "claude-opus-5",
    label: "Claude Opus 5"
}

],

    gemini: [

        {
            value: "gemini-2.5-pro",
            label: "Gemini 2.5 Pro"
        },

        {
            value: "gemini-2.5-flash",
            label: "Gemini 2.5 Flash"
        }

    ]

};

// Initialize the model dropdown with OpenAI models
populateModels("openai");


function populateModels(provider, selected = null) {

    modelSelect.innerHTML = "";

    const models = MODELS[provider] || [];

    for (const model of models) {

        const option = document.createElement("option");

        option.value = model.value;
        option.textContent = model.label;

        if (selected === model.value) {

            option.selected = true;

        }

        modelSelect.appendChild(option);

    }

}


providerSelect.addEventListener("change", () => {

    populateModels(providerSelect.value);

});
// ----------------------------------------------------
// Detect Current AI Provider
// ----------------------------------------------------

chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

    const url = tabs[0]?.url || "";
    const provider = document.getElementById("provider");

    if (!provider) return;

   if (url.includes("chatgpt.com")) {
    provider.textContent = "● Connected to ChatGPT";
} else if (url.includes("claude.ai")) {
    provider.textContent = "● Connected to Claude";
} else if (url.includes("gemini.google.com")) {
    provider.textContent = "● Connected to Gemini";
} else {
    provider.textContent = "● Unsupported Site";
}

});

// ----------------------------------------------------
// Loading Helpers
// ----------------------------------------------------

function startLoading(button, text) {

    status.textContent = "";

    captureBtn.disabled = true;
    analyzeBtn.disabled = true;

    button.innerHTML = `
        <span class="spinner"></span>
        <span style="margin-left:8px;">${text}</span>
    `;
}

function stopLoading(button, text) {

    captureBtn.disabled = false;
    analyzeBtn.disabled = false;

    button.innerHTML = text;

}


settingsBtn.addEventListener("click", async () => {

    homeView.style.display = "none";
    settingsView.style.display = "flex";

    const settings = await AISettings.load();



    providerSelect.value = settings.provider || "openai";

populateModels(

    providerSelect.value,

    settings.model

);
    apiKeyInput.value = settings.apiKey || "";

    settingsStatus.textContent = "";

});

backBtn.addEventListener("click", () => {

    settingsView.style.display = "none";
    homeView.style.display = "block";

});
settingsStatus.textContent = "";
saveSettingsBtn.addEventListener("click", async () => {

    const provider = providerSelect.value;

    const model = modelSelect.value;

    const apiKey = apiKeyInput.value.trim();

    if (!apiKey) {

        settingsStatus.textContent =
            "❌ API Key required.";

        return;

    }

    settingsStatus.textContent =
        "Validating API Key...";

    saveSettingsBtn.disabled = true;

    // 👇 THIS IS THE CORRECT PLACE
    const valid =
        await validateApiKey(provider, apiKey);

    saveSettingsBtn.disabled = false;

    saveSettingsBtn.textContent = "Save Settings";

    if (!valid) {

        settingsStatus.textContent =
            "❌ Invalid or unauthorized API Key.";

        return;

    }

    await AISettings.save({

        provider,
        model,
        apiKey

    });

    settingsStatus.textContent =
    "✅ Settings Saved";

setTimeout(() => {

    settingsStatus.textContent = "";

    settingsView.style.display = "none";

    homeView.style.display = "block";

},700);

});

// ----------------------------------------------------
// Capture
// ----------------------------------------------------

captureBtn.addEventListener("click", async () => {

      console.log("Capture clicked");

    // const configured = await AISettings.isConfigured();

    // if (!configured) {

    //     status.textContent =
    //         "⚠️ Please configure AI Settings to Capture.";

    //     return;

    // }

    startLoading(captureBtn, "CAPTURING...");
    status.textContent = "Capturing conversation...";

    try {

        const response = await chrome.runtime.sendMessage({
            action: "CREATE_CHECKPOINT"
        });

        if (!response || !response.ok) {
            throw new Error(response?.error || "Capture failed.");
        }

        const allowed = await decreaseEvolve();

if (!allowed) {

    status.textContent =
    "🚀 Upgrade to PIXELLENCE AI Pro";

captureBtn.textContent =
    "UPGRADE";

analyzeBtn.textContent =
    "UPGRADE";

captureBtn.onclick = () => {

    chrome.tabs.create({

        url:"https://evoloz.com/pricing"

    });

};

analyzeBtn.onclick = captureBtn.onclick;

return;

    return;

}

const userData = await getCurrentUserData();

updateStatusCard(userData);

        stopLoading(captureBtn, "CAPTURED");

        captureBtn.classList.add("success");

        status.textContent = "✅ Capture complete.";

        console.log(response.checkpoint);

        setTimeout(() => {
            captureBtn.classList.remove("success");
        }, 1000);

    } catch (err) {

        stopLoading(captureBtn, "CAPTURE");

        console.error(err);

        status.textContent = "❌ " + err.message;

    }

});

// ----------------------------------------------------
// Analyze
// ----------------------------------------------------



analyzeBtn.addEventListener("click", async () => {

    console.log("Analyze clicked");

  const configured = await AISettings.isConfigured();

if (!configured) {

    status.textContent =
        "⚠️ Please configure AI Settings to Analyze.";

    return;

}

    try {

        // Native file picker
        const input = document.createElement("input");

        input.type = "file";
        input.multiple = true;

        // later change to ".evoloz" if desired
        input.accept = ".json,.evoloz";

        input.onchange = async () => {

            try {

                startLoading(analyzeBtn, "ANALYZING...");
status.textContent = "Select intelligence files...";

                const files = [...input.files];

if (files.length === 0) {

    stopLoading(analyzeBtn, "ANALYZE");

    status.textContent = "Ready";

    return;

}

                status.textContent =
                    `Reading ${files.length} file(s)...`;

                // Read every file
                const checkpoints = [];

                for (const file of files) {

                    const text = await file.text();

                    checkpoints.push(JSON.parse(text));

                }

                status.textContent = "Sending to analyzer...";

                const response = await chrome.runtime.sendMessage({

                    action: "ANALYZE_CHECKPOINTS",

                    checkpoints

                });

                if (!response.ok) {

                    throw new Error(response.error);

                }

                // Create downloadable report
               // ================================
// Download Evolved Intelligence
// ================================



                stopLoading(analyzeBtn, "ANALYZE");

                analyzeBtn.classList.add("success");

                status.textContent = "✅ Analysis complete.";

                setTimeout(() => {

                    analyzeBtn.classList.remove("success");

                },1000);

            }

            catch(err){

                stopLoading(analyzeBtn,"ANALYZE");

                console.error(err);

                status.textContent="❌ "+err.message;

            }

        };

        input.click();

    }

    catch(err){

        stopLoading(analyzeBtn,"ANALYZE");

        console.error(err);

        status.textContent="❌ "+err.message;

    }

});

