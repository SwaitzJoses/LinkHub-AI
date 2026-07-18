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
            this.isBooting = true;

        }

        initialize() {

            if (!location.hostname.includes("chatgpt")) {
                return;
            }

            this.currentConversation = this.getConversationId();

            console.log("🤖 ChatGPT Adapter Started");

            this.scan();
            this.isBooting = false;

            this.observer = new MutationObserver(() => {

                const latestConversation = this.getConversationId();

                if (latestConversation !== this.currentConversation) {

                    this.currentConversation = latestConversation;

                    this.processedMessages.clear();

                    this.isBooting = true;

                    this.scan();

                    this.isBooting = false;

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

            const match = location.pathname.match(/\/\/c\/([^/]+)/);

            return match ? match[1] : null;

        }

        scheduleScan() {

            if (this.scanScheduled) return;

            this.scanScheduled = true;

            requestAnimationFrame(() => {

                this.scanScheduled = false;

                this.scan();

            });

        }

        extractMessageText(message) {

            const containers = message.querySelectorAll(
                ".markdown, [data-message-content], .whitespace-pre-wrap"
            );

            if (containers.length === 0) {
                return message.innerText.trim();
            }

            return Array.from(containers)
                .map(el => el.innerText.trim())
                .filter(Boolean)
                .join("\n\n");

        }

        isAssistantStreaming(message) {

            return (
                document.querySelector("[data-testid='stop-button']") ||
                message.querySelector(".result-streaming") ||
                message.querySelector("[data-is-streaming='true']")
            );

        }

        scan() {

            const messages = document.querySelectorAll("[data-message-author-role]");

            messages.forEach(message => {

                const messageId = message.getAttribute("data-message-id");

                if (!messageId) return;

                if (this.processedMessages.has(messageId)) return;

                const role = message.getAttribute("data-message-author-role");

                if (role === "assistant" && this.isAssistantStreaming(message)) {
                    return;
                }

                const text = this.extractMessageText(message);

                if (!text) return;

                console.log("-----");
                console.log("ROLE:", role);
                console.log("TEXT:", text);
                console.log("ELEMENT:", message);

                if (this.isBooting) {

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