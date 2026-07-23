export default class EmmaRuntime {

  constructor(emma) {

    this.emma = emma;
    this.adapters = new Map();

    this.workspace = {
        repository: null,
        branch: null,
        session: null
    };

}
setWorkspace(workspace) {

    this.workspace = workspace;

}


getWorkspace() {

    return this.workspace;

}
    // =====================================
    // Adapter Registration
    // =====================================

    registerAdapter(adapter) {

        if (!adapter?.name) {
            throw new Error("Adapter must have a name.");
        }

        this.adapters.set(adapter.name, adapter);

    }

    // =====================================
    // Runtime Startup
    // =====================================

    async start() {

        console.log("🚀 Emma Runtime Starting");

        for (const adapter of this.adapters.values()) {

            try {

                await adapter.initialize();

                console.log(`✅ ${adapter.name} Initialized`);

            } catch (error) {

                console.error(
                    `❌ ${adapter.name} Failed`,
                    error
                );

            }

        }

        console.log("🧠 Emma Runtime Ready (Idle)");

    }

    // =====================================
    // Adapter Helpers
    // =====================================

    getAdapter(name) {

        return this.adapters.get(name);

    }

    hasAdapter(name) {

        return this.adapters.has(name);

    }

    getAdapters() {

        return Array.from(
            this.adapters.values()
        );

    }

    // =====================================
    // Capture Only
    // No Emma Thinking Here
    // =====================================

    async capture(provider) {

        const adapter =
            this.getAdapter(provider);

        if (!adapter) {

            throw new Error(
                `Adapter "${provider}" not found.`
            );

        }

        if (
            typeof adapter.captureConversation !== "function"
        ) {

            throw new Error(
                `${provider} does not support conversation capture.`
            );

        }

        return await adapter.captureConversation();

    }

    // =====================================
    // Checkpoint
    // Runtime coordinates.
    // Emma thinks.
    // =====================================

    async checkpoint(provider) {

        console.log("📦 Starting Checkpoint...");

        const conversation =
            await this.capture(provider);

            console.log(
    "📨 Adapter captured:",
    conversation.messageCount,
    "messages"
);
console.log(
    "📨 Last message:",
    conversation.messages[conversation.messages.length - 1]
);

console.log("🗂 Workspace:", this.getWorkspace());


 const result =
    await this.emma.experience({

        type: "CHECKPOINT",

        provider,

        conversation,

        workspaceId: conversation.conversationId,

        createdAt: Date.now()

    });

        console.log("✅ Checkpoint Complete");

        return {

            conversation,

            result

        };

    }

}