export function updateStatusCard(userData, bgStatus = {}) {

    const card = document.querySelector(".status-card");
    const planText = document.getElementById("planText");
    const evolveText = document.getElementById("evolveText");

    if (!card || !planText || !evolveText) return;

    const captureBtn = document.getElementById("captureBtn");
    // const analyzeBtn = document.getElementById("analyzeBtn"); // ANALYZE preserved
    const upgradeBtn = document.getElementById("upgradeBtn");

    if (!userData) {

        planText.textContent = "...";
        evolveText.textContent = "Loading...";
        return;

    }

    const captures = userData.capturesRemaining ?? 0;
    // const analyses = userData.analysesRemaining ?? 0; // ANALYZE preserved

    const isPro = userData.plan === "pro";

    const maxCaptures = isPro ? 150 : 10;
    // // const maxAnalyses = isPro ? 100 : 5; // ANALYZE preserved

    // Keep loading states
    captureBtn.disabled =
        !!bgStatus.isCapturing || captures <= 0;

    // analyzeBtn.disabled =
    //     !!bgStatus.isAnalyzing || analyses <= 0; // ANALYZE preserved

    // Button text NEVER changes
    captureBtn.textContent = "CAPTURE";
    // analyzeBtn.textContent = "ANALYZE"; // ANALYZE preserved

    // Upgrade button
    upgradeBtn.style.display =
        (!isPro && captures <= 0)
            ? "block"
            : "none";

    // Card style
    if (isPro) {

        card.className = "status-card pro";

    } else if (captures <= 2) {

        card.className = "status-card warning";

    } else {

        card.className = "status-card free";

    }

    planText.textContent = isPro ? "PRO" : "FREE";

    evolveText.innerHTML =
        `Captures: ${captures} / ${maxCaptures}<br>
         `;

}