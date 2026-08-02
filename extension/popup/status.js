export function updateStatusCard(userData, bgStatus = {}) {

    const card = document.querySelector(".status-card");
    const planText = document.getElementById("planText");
    const evolveText = document.getElementById("evolveText");

    if (!card || !planText || !evolveText) return;

    if (!userData) {

        planText.textContent = "...";
        evolveText.textContent = "Loading...";
        return;

    }

    const captureBtn = document.getElementById("captureBtn");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const upgradeBtn = document.getElementById("upgradeBtn");

    captureBtn.disabled = !!bgStatus.isCapturing;
    analyzeBtn.disabled = !!bgStatus.isAnalyzing;

    upgradeBtn.style.display = "none";

    // ============================
    // PRO
    // ============================

    if (userData.plan === "pro") {

        card.className = "status-card pro";

        planText.textContent = "PRO";

        evolveText.innerHTML =
            `Captures: ${userData.capturesRemaining} / 150<br>
             Analyses: ${userData.analysesRemaining} / 100`;

        return;

    }

    // ============================
    // FREE
    // ============================

    const captures = userData.capturesRemaining ?? 0;
    const analyses = userData.analysesRemaining ?? 0;

    if (captures <= 2 || analyses <= 1) {

        card.className = "status-card warning";

    } else {

        card.className = "status-card free";

    }

    if (captures <= 0 || analyses <= 0) {

        card.className = "status-card upgrade";

        planText.textContent = "UPGRADE PRO";

        evolveText.innerHTML =
            `Captures: ${captures} / 10<br>
             Analyses: ${analyses} / 5`;

        captureBtn.disabled = captures <= 0;
        analyzeBtn.disabled = analyses <= 0;

        upgradeBtn.style.display = "block";

        return;

    }

    planText.textContent = "FREE";

    evolveText.innerHTML =
        `Captures: ${captures} / 10<br>
         Analyses: ${analyses} / 5`;

}