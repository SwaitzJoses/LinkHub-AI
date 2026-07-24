console.log("🧠 Evoloz Popup Ready");
import AISettings from "../../src/emma-core/settings/AISettings.js";
const captureBtn = document.getElementById("captureBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const status = document.getElementById("status");
const homeView = document.getElementById("homeView");
const settingsView = document.getElementById("settingsView");

const settingsBtn = document.getElementById("settingsBtn");
const backBtn = document.getElementById("backBtn");

const providerSelect = document.getElementById("providerSelect");
const modelSelect = document.getElementById("modelSelect");
const apiKeyInput = document.getElementById("apiKeyInput");

const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const settingsStatus = document.getElementById("settingsStatus");


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
            value: "claude-sonnet-4",
            label: "Claude Sonnet 4"
        },

        {
            value: "claude-opus-4",
            label: "Claude Opus 4"
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
        provider.textContent = "🟢 ChatGPT";
    } else if (url.includes("claude.ai")) {
        provider.textContent = "🟢 Claude";
    } else if (url.includes("gemini.google.com")) {
        provider.textContent = "🟢 Gemini";
    } else {
        provider.textContent = "⚪ Unsupported";
    }

});

// ----------------------------------------------------
// Loading Helpers
// ----------------------------------------------------

function startLoading(button, text) {

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

saveSettingsBtn.addEventListener("click", async () => {

    await AISettings.save({

        provider: providerSelect.value,
        model: modelSelect.value,
        apiKey: apiKeyInput.value.trim()

    });

   settingsStatus.textContent = "✅ Settings Saved";

setTimeout(() => {

    settingsStatus.textContent = "";

    settingsView.style.display = "none";
    homeView.style.display = "block";

}, 700);
});

// ----------------------------------------------------
// Capture
// ----------------------------------------------------

captureBtn.addEventListener("click", async () => {

    startLoading(captureBtn, "CAPTURING...");
    status.textContent = "Capturing conversation...";

    try {

        const response = await chrome.runtime.sendMessage({
            action: "CREATE_CHECKPOINT"
        });

        if (!response || !response.ok) {
            throw new Error(response?.error || "Capture failed.");
        }

        stopLoading(captureBtn, "CAPTURE");

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

const intelligenceBlob = new Blob(

    [
        JSON.stringify(
            response.evolvedIntelligence,
            null,
            2
        )
    ],

    {
        type: "application/json"
    }

);

const intelligenceUrl =
    URL.createObjectURL(intelligenceBlob);

await chrome.runtime.sendMessage({

    action: "DOWNLOAD_FILE",

    url: intelligenceUrl,

    filename: "Evolved_Intelligence.json"

});

URL.revokeObjectURL(intelligenceUrl);

// ================================
// Download Report
// ================================

const reportBlob = new Blob(

    [response.report],

    {
        type: "text/markdown"
    }

);

const reportUrl =
    URL.createObjectURL(reportBlob);

await chrome.runtime.sendMessage({

    action: "DOWNLOAD_FILE",

    url: reportUrl,

    filename: "Intelligence_Report.md"

});

URL.revokeObjectURL(reportUrl);

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

