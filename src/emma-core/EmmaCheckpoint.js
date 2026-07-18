//
// PROJECT BECOMING
//
// EmmaCheckpoint.js
//
// Emma Checkpoint v1.0
//
// Captures a snapshot of Emma's internal state
// after every meaningful experience.
//

class EmmaCheckpoint {

    constructor() {

        console.log("📍 Emma Checkpoint v1.0 alive");

        this.version = "1.0";
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
            judgement = null

        } = context;

        const checkpoint = {

            id: crypto.randomUUID(),

            createdAt: new Date().toISOString(),

            version: this.version,

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

            state: {

                curiosity,

                temporal,

                relationship,

                self

            }

        };

        console.log("✅ Checkpoint created:", checkpoint);

        return checkpoint;
    }

}

export default EmmaCheckpoint;