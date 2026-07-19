export default class ChatGPTAdapter {

    constructor(emma) {

        this.emma = emma;
        this.name = "ChatGPT";

    }

    // =====================================
    // Initialize
    // =====================================

    async initialize() {

        console.log("🤖 ChatGPT Adapter Ready");

    }

    // =====================================
    // Is ChatGPT Loaded?
    // =====================================

    isReady() {

        return !!document.querySelector(
            "[data-message-author-role]"
        );

    }

    // =====================================
    // Conversation ID
    // =====================================

    getConversationId() {

        const parts =
            window.location.pathname.split("/");

        return parts[parts.length - 1];

    }

    // =====================================
    // Capture Conversation
    // =====================================

    async captureConversation() {

        if (!this.isReady()) {

            throw new Error(
                "ChatGPT conversation not ready."
            );

        }

        const elements = document.querySelectorAll(
            "[data-message-author-role]"
        );

        const messages = [];

        elements.forEach((element, index) => {

            const role =
                element.getAttribute(
                    "data-message-author-role"
                ) || "assistant";

            const content =
                element.innerText?.trim() || "";

            if (!content) return;

            messages.push({

                id:
                    element.getAttribute(
                        "data-message-id"
                    ) || `message-${index}`,

                role,

                content

            });

        });

        return {

            provider: "ChatGPT",

            conversationId:
                this.getConversationId(),

            capturedAt:
                new Date().toISOString(),

            messageCount:
                messages.length,

            messages

        };

    }

}