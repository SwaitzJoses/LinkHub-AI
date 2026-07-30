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

    // ----------------------------
    // PRO
    // ----------------------------

    if (userData.plan === "pro") {

        card.className = "status-card pro";

        planText.textContent = "PRO";

        evolveText.textContent = "UNLIMITED CAPTURES";

        return;

    }

    // ----------------------------
    // FREE
    // ----------------------------

    const remaining = userData.evolvesRemaining;

    const captureBtn = document.getElementById("captureBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const upgradeBtn = document.getElementById("upgradeBtn");

if (bgStatus.isCapturing) {

    captureBtn.disabled = true;

} else {

    captureBtn.disabled = false;

}

if (bgStatus.isAnalyzing) {

    analyzeBtn.disabled = true;

} else {

    analyzeBtn.disabled = false;

}

upgradeBtn.style.display = "none";

 if (remaining <= 0) {

    const captureBtn = document.getElementById("captureBtn");
    const analyzeBtn = document.getElementById("analyzeBtn");
    const upgradeBtn = document.getElementById("upgradeBtn");

    card.className = "status-card upgrade";

   planText.textContent = "UPGRADE PRO";

evolveText.innerHTML =
    "You've used all your free Captures.<br><br>Unlock unlimited Captures.";

    captureBtn.disabled = true;
    analyzeBtn.disabled = true;

    upgradeBtn.style.display = "block";

    return;

}

    if (remaining <= 2) {

        card.className = "status-card warning";

    }

    else {

        card.className = "status-card free";

    }

    planText.textContent = "FREE";

    evolveText.textContent =
        `${remaining} / 10 Captures Remaining`;

}