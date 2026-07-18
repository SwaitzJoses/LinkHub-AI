function detectPlatform() {

    const host = window.location.hostname;

    if (host.includes("chatgpt.com") || host.includes("openai.com"))
        return "chatgpt";

    if (host.includes("claude.ai"))
        return "claude";

    if (host.includes("gemini.google.com"))
        return "gemini";

    if (host.includes("grok.com"))
        return "grok";

    if (host.includes("deepseek.com"))
        return "deepseek";

    return "unknown";
}

const platform = detectPlatform();

console.log("🧠 Emma Extension Loaded");
console.log("🤖 Platform:", platform);
console.log("🌐 URL:", window.location.href);