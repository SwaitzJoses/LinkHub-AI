(() => {

    class ChatGPTAdapter {

        constructor() {

            this.name = "ChatGPT";

            this.provider = "chatgpt";

            this.eventBus = window.EmmaCore.EventBus;

            this.currentConversation = null;

            this.processedMessages = new Set();

            this.observer = null;

            this.scanScheduled = false;

        }

        initialize() {

            if (!location.hostname.includes("chatgpt")) {
                return;
            }

            this.currentConversation = this.getConversationId();

            console.log("🤖 ChatGPT Adapter Started");

            this.scan(false);

            this.observer = new MutationObserver(() => {

                const latestConversation = this.getConversationId();

                if (latestConversation !== this.currentConversation) {

                    this.currentConversation = latestConversation;

                    this.processedMessages.clear();

                    this.scan(false);

                    return;

                }

                this.scheduleScan();

            });

            this.observer.observe(document.body, {
                childList: true,
                subtree: true,
                characterData: true
            });

        }

        getConversationId() {

            const match = location.pathname.match(/\/c\/([^/]+)/);

            return match ? match[1] : null;

        }

        scheduleScan() {

            if (this.scanScheduled) return;

            this.scanScheduled = true;

            requestAnimationFrame(() => {

                this.scanScheduled = false;

                this.scan(true);

            });

        }

        scan(emit = true) {

            const messages = document.querySelectorAll("[data-message-author-role]");

            messages.forEach(message => {

                const messageId = message.getAttribute("data-message-id");

                if (!messageId) return;

                if (this.processedMessages.has(messageId)) return;

                const text = message.innerText.trim();

                if (!text) return;

                const role = message.getAttribute("data-message-author-role");

                if (!emit) {

                    this.processedMessages.add(messageId);

                    return;

                }

                this.processedMessages.add(messageId);

                const event = new window.EmmaCore.EmmaEvent({

                    provider: this.provider,

                    type: role === "user"
                        ? "message.user"
                        : "message.assistant",

                    conversationId: this.currentConversation,

                    messageId,

                    role,

                    text

                });

                this.eventBus.publish(event);

            });

        }

    }

    window.EmmaAdapters = window.EmmaAdapters || {};

    window.EmmaAdapters.ChatGPTAdapter = ChatGPTAdapter;

})();