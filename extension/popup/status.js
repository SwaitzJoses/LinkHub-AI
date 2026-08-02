export function updateStatusCard(userData, bgStatus = {}) {

    const card = document.querySelector(".status-card");
    const planText = document.getElementById("planText");
    const evolveText = document.getElementById("evolveText");

    if (!card || !planText || !evolveText) return;

    const captureBtn = document.getElementById("captureBtn");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const upgradeBtn = document.getElementById("upgradeBtn");

    if (!userData) {

        planText.textContent = "...";
        evolveText.textContent = "Loading...";
        return;

    }

    const captures = userData.capturesRemaining ?? 0;
    const analyses = userData.analysesRemaining ?? 0;

    const isPro = userData.plan === "pro";

    const maxCaptures = isPro ? 150 : 10;
    const maxAnalyses = isPro ? 100 : 5;

    // Keep loading states
    captureBtn.disabled =
        !!bgStatus.isCapturing || captures <= 0;

    analyzeBtn.disabled =
        !!bgStatus.isAnalyzing || analyses <= 0;

    // Button text NEVER changes
    captureBtn.textContent = "CAPTURE";
    analyzeBtn.textContent = "ANALYZE";

    // Upgrade button
    upgradeBtn.style.display =
        (!isPro && (captures <= 0 || analyses <= 0))
            ? "block"
            : "none";

    // Card style
    if (isPro) {

        card.className = "status-card pro";

    } else if (captures <= 2 || analyses <= 1) {

        card.className = "status-card warning";

    } else {

        card.className = "status-card free";

    }

    planText.textContent = isPro ? "PRO" : "FREE";

    evolveText.innerHTML =
        `Captures: ${captures} / ${maxCaptures}<br>
         Analyses: ${analyses} / ${maxAnalyses}`;

}