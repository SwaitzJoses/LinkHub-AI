export default class GeminiAdapter {

    constructor(emma) {

        this.emma = emma;
        this.name = "Gemini";

    }

    // =====================================
    // Initialize
    // =====================================

    async initialize() {

        console.log("🤖 Gemini Adapter Ready");

    }

    // =====================================
    // Ready
    // =====================================

    isReady() {

        return (
            !!document.querySelector("user-query") ||
            !!document.querySelector("message-content")
        );

    }

    // =====================================
    // Conversation ID
    // =====================================

    getConversationId() {

        const parts = window.location.pathname.split("/");

        return parts[parts.length - 1] || "unknown";

    }

    // =====================================
    // Capture Conversation
    // =====================================

    async captureConversation() {

        if (!this.isReady()) {

            throw new Error("Gemini conversation not ready.");

        }

        const messages = [];

        // Walk the DOM in visual order
        const nodes = document.querySelectorAll(
            "user-query, message-content"
        );

        nodes.forEach((node, index) => {

            let role = "";
            let content = "";

            if (node.matches("user-query")) {

                role = "user";

                content = node.innerText
                    .replace(/^You said\s*/i, "")
                    .trim();

            }

            else if (node.matches("message-content")) {

                role = "assistant";

                content = node.innerText.trim();

            }

            if (!content) return;

            messages.push({

                id: `${role}-${index}`,

                role,

                content

            });

        });

        console.log("================================");
        console.log("🤖 Gemini Capture");
        console.log("Conversation:", this.getConversationId());
        console.log("Messages:", messages.length);
        console.log("================================");

        return {

            provider: "Gemini",

            conversationId: this.getConversationId(),

            capturedAt: new Date().toISOString(),

            messageCount: messages.length,

            messages

        };

    }

}