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

const elements = document.querySelectorAll("[role='article']");
const messages = [];

elements.forEach((element) => {

    const content = element.innerText?.trim();

    if (!content) return;

    let role = "assistant";

    if (element.querySelector("[data-user-message-bubble]")) {

        role = "user";

    }
    else if (element.querySelector("[data-is-streaming]")) {

        role = "assistant";

    }

    const stableId = btoa(
        unescape(
            encodeURIComponent(`${role}:${content}`)
        )
    );

    console.log(
        "Claude:",
        role,
        content.slice(0, 60)
    );

    messages.push({
        id: stableId,
        role,
        content
    });

});

        console.log("================================");
        console.log("Captured:", messages.length);
        console.log("First:", messages[0]?.id);
        console.log("Last :", messages[messages.length - 1]?.id);
        console.log("================================");

        return {

            provider: "Claude",

            conversationId: this.getConversationId(),

            capturedAt: new Date().toISOString(),

            messageCount: messages.length,

            messages

        };

    }

}