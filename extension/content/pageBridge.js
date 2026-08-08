// console.log("✅ Page Bridge Loaded");
window.addEventListener("message", async (event) => {
    // console.log("📨 Bridge received:", event.data);
  if (event.source !== window) return;

  if (event.data?.type !== "EVOLOZ_FETCH_CHAT") return;

  try {
    const session = await fetch("/api/auth/session").then(r => r.json());

    const conversationId = location.pathname.split("/").pop();

    const conversation = await fetch(
      `/backend-api/conversation/${conversationId}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`
        }
      }
    ).then(r => r.json());

    window.postMessage({
      type: "EVOLOZ_CHAT_RESULT",
      ok: true,
      conversation
    });

  } catch (e) {

    window.postMessage({
      type: "EVOLOZ_CHAT_RESULT",
      ok: false,
      error: e.message
    });

  }
});