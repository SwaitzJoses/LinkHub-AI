(() => {

    window.EmmaObservers = window.EmmaObservers || {};

    class ConversationObserver {

        constructor(adapter) {
            this.adapter = adapter;
            this.currentConversation = null;
            this.processedMessages = new Set();
            this.scanScheduled = false;
            this.observer = null;
        }

        start() {

            if (!this.adapter || !this.adapter.isActive()) {
                return;
            }

            this.currentConversation = this.adapter.getConversationId();

            console.log("👀 Conversation Observer Started");
            console.log("Conversation:", this.currentConversation);

            // Learn existing messages without emitting them
            this.scan(false);

            this.observer = new MutationObserver(() => {

                const latestConversation = this.adapter.getConversationId();

                if (latestConversation !== this.currentConversation) {

                    this.currentConversation = latestConversation;
                    this.processedMessages.clear();

                    console.log("📍 Conversation Changed");
                    console.log("Conversation:", this.currentConversation);

                    // Learn the new conversation history
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

        scheduleScan() {

            if (this.scanScheduled) {
                return;
            }

            this.scanScheduled = true;

            requestAnimationFrame(() => {

                this.scanScheduled = false;
                this.scan(true);

            });

        }

        scan(emitMessages = true) {

            const messages = document.querySelectorAll("[data-message-author-role]");

            messages.forEach(message => {

                const messageId = message.getAttribute("data-message-id");

                if (!messageId) {
                    return;
                }

                // Already handled
                if (this.processedMessages.has(messageId)) {
                    return;
                }

                const role = message.getAttribute("data-message-author-role");

                const text = message.innerText.trim();

                // Assistant is still streaming
                if (!text) {
                    return;
                }

                const turn = message.closest("[data-turn-id-container]");

                const turnId = turn
                    ? turn.getAttribute("data-turn-id-container")
                    : null;

                // Ignore temporary request nodes
                if (turnId && turnId.startsWith("request-")) {
                    return;
                }

                // Startup / conversation change:
                // remember history but don't emit.
                if (!emitMessages) {
                    this.processedMessages.add(messageId);
                    return;
                }

                // New completed message
                this.processedMessages.add(messageId);

                this.emitMessage({
                    type: "message",
                    conversationId: this.currentConversation,
                    turnId,
                    messageId,
                    role,
                    text,
                    timestamp: Date.now()
                });

            });

        }

     emitMessage(event) {

    console.log("📨 Emma Event");
    console.log(event);

    chrome.runtime.sendMessage({
        type: "EMMA_EVENT",
        payload: event
    });

}

        stop() {

            if (this.observer) {
                this.observer.disconnect();
                this.observer = null;
            }

        }

    }

    window.EmmaObservers.ConversationObserver = ConversationObserver;

})();