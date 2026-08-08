export default class ClaudeAdapter {

    constructor(emma) {

        this.emma = emma;
        this.name = "Claude";

    }

    // =====================================
    // Initialize
    // =====================================

    async initialize() {

        console.log("🤖 Claude Adapter Ready");

    }

    // =====================================
    // Is Claude Loaded?
    // =====================================
isReady() {

    return !!document.querySelector("[role='article']");

}
    // =====================================
    // Conversation ID
    // =====================================

    getConversationId() {

        const parts = window.location.pathname.split("/");

        return parts[parts.length - 1];

    }

    // =====================================
    // Capture Conversation
    // =====================================

async captureConversation() {

    if (!this.isReady()) {
        throw new Error("Claude conversation not ready.");
    }

    const conversationId = this.getConversationId();

    const organizationId = "476ac40d-dd93-45be-a5b3-141159806e6e";

    const response = await fetch(
        `/api/organizations/${organizationId}/chat_conversations/${conversationId}?tree=True&rendering_mode=messages&render_all_tools=true&consistency=strong`
    );

    if (!response.ok) {
        throw new Error(`Claude API failed: ${response.status}`);
    }

    const conversation = await response.json();

    console.log("Claude API:", conversation);

    const messages = [];

    for (const message of conversation.chat_messages || []) {

        let content = "";

        if (Array.isArray(message.content)) {
            content = message.content
                .filter(part => part.text)
                .map(part => part.text)
                .join("\n");
        }
        else if (typeof message.content === "string") {
            content = message.content;
        }

        if (!content.trim()) continue;

        messages.push({
            id: message.uuid,
            role: message.sender === "human" ? "user" : "assistant",
            content
        });
    }

    console.log("================================");
    console.log("Captured:", messages.length);
    console.log("================================");

    return {
        provider: "Claude",
        conversationId,
        capturedAt: new Date().toISOString(),
        messageCount: messages.length,
        messages
    };
}
}