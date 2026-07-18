//
// PROJECT BECOMING
//
// EmmaCheckpoint.js
//
// Emma Checkpoint v2.0
//
// Captures a snapshot of Emma's internal state
// together with the conversation that produced it.
//

class EmmaCheckpoint {

    constructor() {

        console.log("📍 Emma Checkpoint v2.0 alive");

        this.version = "2.0";
    }

    create(context = {}) {

        console.log("📍 Creating checkpoint...");

        const {

            experience = {},
            memory = [],
            wisdom = null,
            temporal = null,
            self = null,
            relationship = null,
            curiosity = null,
            reasoning = null,
            judgement = null,

            // NEW
            conversation = {}

        } = context;

        const checkpoint = {

            id: crypto.randomUUID(),

            createdAt: new Date().toISOString(),

            version: this.version,

            // =====================================================
            // Experience
            // =====================================================

            experience: {

                source:
                    experience.source ?? null,

                type:
                    experience.type ?? null,

                content:
                    experience.content ??
                    experience.message ??
                    null,

                importance:
                    experience.importance ?? 0

            },

            // =====================================================
            // Evidence
            // =====================================================

            evidence: {

                memoriesRetrieved:

                    Array.isArray(memory)
                        ? memory.length
                        : Array.isArray(memory?.memories)
                            ? memory.memories.length
                            : 0,

                wisdomAvailable:
                    !!wisdom,

                relationshipKnown:
                    !!relationship,

                selfKnown:
                    !!self

            },

            // =====================================================
            // Emma Understanding
            // =====================================================

            understanding: {

                reasoning:

                    reasoning?.summary ??
                    reasoning?.message ??
                    reasoning ??
                    null,

                judgement:

                    judgement?.decision ??
                    judgement?.summary ??
                    judgement ??
                    null

            },

            // =====================================================
            // Emma State
            // =====================================================

            state: {

                curiosity,

                temporal,

                relationship,

                self

            },

            // =====================================================
            // Conversation Snapshot
            // Immutable source of truth
            // =====================================================

            conversation: {

                provider:
                    conversation.provider ?? "chatgpt",

                conversationId:
                    conversation.conversationId ?? null,

                checkpointNumber:
                    conversation.checkpointNumber ?? null,

                firstMessageId:
                    conversation.firstMessageId ?? null,

                lastMessageId:
                    conversation.lastMessageId ?? null,

                messageCount:
                    conversation.messageCount ?? 0,

                compression:
                    conversation.compression ?? "brotli",

                compressedChat:
                    conversation.compressedChat ?? null,

                hash:
                    conversation.hash ?? null

            }

        };

        console.log("✅ Checkpoint created:", checkpoint);

        return checkpoint;
    }

}

export default EmmaCheckpoint;