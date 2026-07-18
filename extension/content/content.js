(() => {

    console.log("🧠 Emma Booting...");

    if (!window.EmmaCore) {
        console.error("❌ EmmaCore not found");
        return;
    }

    if (!window.EmmaAdapters) {
        console.error("❌ EmmaAdapters not found");
        return;
    }

    const runtime = window.EmmaCore.Runtime;

    const chatgpt = new window.EmmaAdapters.ChatGPTAdapter();

    runtime.registerAdapter(chatgpt);

    runtime.start();

})();