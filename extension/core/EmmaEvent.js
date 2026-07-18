class EmmaEvent {

    constructor({

        provider,
        type,
        conversationId = null,
        messageId = null,
        role = null,
        text = "",
        metadata = {}

    }) {

        this.id = crypto.randomUUID();

        this.provider = provider;

        this.type = type;

        this.conversationId = conversationId;

        this.messageId = messageId;

        this.role = role;

        this.text = text;

        this.metadata = metadata;

        this.timestamp = Date.now();

    }

}

window.EmmaCore = window.EmmaCore || {};

window.EmmaCore.EmmaEvent = EmmaEvent;