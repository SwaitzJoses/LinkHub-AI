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
console.log("DOM elements found:", elements.length);
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

const domId = element.getAttribute("data-message-id");

console.log(
    "DOM ID:",
    domId,
    "Role:",
    role,
    "Text:",
    content.slice(0, 40)
);

const stableId =
    btoa(
        unescape(
            encodeURIComponent(
                `${role}:${content}`
            )
        )
    );

messages.push({
    id: domId || stableId,
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