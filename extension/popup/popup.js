console.log("🧠 Emma Popup Ready");

const checkpointBtn = document.getElementById("checkpointBtn");
const status = document.getElementById("status");

checkpointBtn.addEventListener("click", async () => {

    checkpointBtn.disabled = true;
    status.textContent = "Creating checkpoint...";

    try {

        const response = await chrome.runtime.sendMessage({
            action: "CREATE_CHECKPOINT"
        });

        if (!response?.ok) {
            throw new Error(response?.error || "Checkpoint failed.");
        }

        status.textContent = "✅ Checkpoint Complete";

        console.log(response.checkpoint);

    } catch (err) {

        console.error(err);
        status.textContent = "❌ " + err.message;

    } finally {

        checkpointBtn.disabled = false;

    }

});