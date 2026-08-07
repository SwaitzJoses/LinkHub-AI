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

    window.postMessage({
        type: "EVOLOZ_FETCH_CHAT"
    }, "*");

    const conversation = await new Promise((resolve, reject) => {

        const timeout = setTimeout(() => {
            window.removeEventListener("message", handler);
            reject(new Error("Timed out waiting for ChatGPT conversation."));
        }, 30000);

        function handler(event) {

            if (event.source !== window) return;
            if (event.data?.type !== "EVOLOZ_CHAT_RESULT") return;

            clearTimeout(timeout);
            window.removeEventListener("message", handler);

            if (!event.data.ok) {
                reject(new Error(event.data.error));
                return;
            }

            resolve(event.data.conversation);

        }

        window.addEventListener("message", handler);

    });

    // -----------------------------
    // Convert ChatGPT mapping -> messages[]
    // -----------------------------

    const messages = [];

    for (const node of Object.values(conversation.mapping)) {

        const message = node.message;

        if (!message) continue;

        const role = message.author?.role;

        if (!role) continue;

        const content =
            message.content?.parts?.join("\n").trim();

        if (!content) continue;

        messages.push({

            id: message.id,

            role,

            content

        });

    }

    console.log("Captured messages:", messages.length);

  return {

    provider: "ChatGPT",

    conversationId: conversation.conversation_id,

    capturedAt: new Date().toISOString(),

    messageCount: messages.length,

    title: document.title,

    messages

};

}

}