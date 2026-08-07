import Emma from "../../src/emma-core/Emma";
import AISettings from "../../src/emma-core/settings/AISettings";

export default class EmmaRuntime {

    constructor() {

        this.emma = new Emma();

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
    // =====================================

  async checkpoint(provider) {

    console.log("📦 Starting Checkpoint...");

    const conversation =
        await this.capture(provider);

//     const configured =
//         await AISettings.isConfigured();

//     if (!configured) {

//        throw new Error(
//     "AI provider not configured. Please configure your AI settings before using Evolve."
// );

//     }

    console.log(
        "📨 Adapter captured:",
        conversation.messageCount,
        "messages"
    );

    console.log(
        "📨 Last message:",
        conversation.messages[
            conversation.messages.length - 1
        ]
    );

    console.log(
        "🗂 Workspace:",
        this.getWorkspace()
    );



    console.log("📦 Capture Complete");

return {
    conversation
};

//     console.log("➡️ Calling Emma...");

//     if (!this.emma) {

//     this.emma = new Emma();

// }

//     const result =
//         await this.emma.experience(conversation);

//     console.log(
//         "⬅️ Emma returned:",
//         result
//     );

//     console.log("✅ Checkpoint Complete");

//     return {
//         conversation,
//         result
//     };

}
}