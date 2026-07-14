// =======================================
// EmmaMemory.test.js
//
// Emma Memory Organ Test
//
// Tests:
// ✓ Store Everything
// ✓ Semantic Associations
// ✓ Evidence Builder
// ✓ Recall
//
// =======================================

import EmmaMemory from "../EmmaMemory.js";

async function runTests() {

    console.clear();

    console.log("================================");
    console.log("🧠 Emma Memory Tests");
    console.log("================================");

    const memory = new EmmaMemory();

    // ===================================
    // TEST 1
    // PEOPLE
    // ===================================

    console.log("\nTEST 1 - Store Royzer");

    await memory.store({

        type: "Conversation",

        person: "Royzer",

        people: ["Royzer"],

        projects: ["Emma"],

        topics: ["Memory"],

        goals: ["Launch MVP"],

        message:
            "Royzer suggested using SQLite."

    });

    // ===================================
    // TEST 2
    // PROJECT
    // ===================================

    console.log("\nTEST 2 - Store Emma Reflection");

    await memory.store({

        type: "Conversation",

        projects: ["Emma"],

        topics: ["Reflection"],

        message:
            "Reflection should consume evidence."

    });

    // ===================================
    // TEST 3
    // GOAL
    // ===================================

    console.log("\nTEST 3 - Store Goal");

    await memory.store({

        type: "Planning",

        goals: ["Launch MVP"],

        projects: ["Emma"],

        message:
            "Finish Memory before LLM Adapter."

    });

    // ===================================
    // TEST 4
    // RECALL BY PERSON
    // ===================================

    console.log("\n================================");
    console.log("Recall : Royzer");
    console.log("================================");

    let result = await memory.recall({

        people: ["Royzer"]

    });

    console.log(result);

    // ===================================
    // TEST 5
    // RECALL BY PROJECT
    // ===================================

    console.log("\n================================");
    console.log("Recall : Emma");
    console.log("================================");

    result = await memory.recall({

        projects: ["Emma"]

    });

    console.log(result);

    // ===================================
    // TEST 6
    // RECALL BY GOAL
    // ===================================

    console.log("\n================================");
    console.log("Recall : Launch MVP");
    console.log("================================");

    result = await memory.recall({

        goals: ["Launch MVP"]

    });

    console.log(result);

    // ===================================
    // TEST 7
    // MULTIPLE EVIDENCE
    // ===================================

    console.log("\n================================");
    console.log("Recall : Royzer + Emma");
    console.log("================================");

    result = await memory.recall({

        people: ["Royzer"],

        projects: ["Emma"]

    });

    console.log(result);

    // ===================================
    // TEST 8
    // EVIDENCE
    // ===================================

    console.log("\n================================");
    console.log("Evidence");
    console.log("================================");

    if (
        result.relevantExperiences.length > 0
    ) {

        console.log(

            JSON.stringify(

                result
                    .relevantExperiences[0]
                    .evidence,

                null,

                2

            )

        );

    }

    // ===================================
    // TEST 9
    // ASSOCIATION GRAPH
    // ===================================

    console.log("\n================================");
    console.log("Semantic Graph");
    console.log("================================");

    console.log(

        memory.semanticAssociations

    );

    // ===================================
    // TEST 10
    // STATUS
    // ===================================

    console.log("\n================================");
    console.log("Status");
    console.log("================================");

    console.log(

        memory.status()

    );

    console.log("\n================================");
    console.log("✅ Memory Tests Finished");
    console.log("================================");

}

runTests();