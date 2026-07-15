import EmmaReflection from "../EmmaReflection.js";


// ----------------------------------
// Fake AI
// ----------------------------------

const fakeAI = {

    async reflect(messages) {

        console.log("========== PROMPT ==========");
        console.log(messages);

        return {

            choices: [

                {

                    message: {

                        content: JSON.stringify({

                            observation:
                                "The user wants a simpler architecture.",

                            evidence: [

                                "Previous discussions show repeated simplification."

                            ],

                            understanding:
                                "The user consistently prefers elegant designs.",

                            conclusion:
                                "Reflection should become prompt-driven.",

                            innerVoice:
                                "Every simplification makes Emma stronger.",

                            confidence: 9

                        })

                    }

                }

            ]

        };

    }

};


// ----------------------------------
// Fake Memory
// ----------------------------------

const fakeMemory = {

    async recall() {

        return {

            relevantExperiences: [

                {

                    type: "CREATION",

                    text: "EmmaMemory was simplified."

                }

            ]

        };

    }

};


// ----------------------------------
// Fake Wisdom
// ----------------------------------

const fakeWisdom = {

    async reflect() {

        return {

            wisdom:

                "Simple systems survive longer."

        };

    }

};


// ----------------------------------
// Reflection
// ----------------------------------

const reflection =

new EmmaReflection({

    ai: fakeAI,

    memory: fakeMemory,

    wisdom: fakeWisdom

});




// ----------------------------------
// Run
// ----------------------------------

const result =

await reflection.reflect(

    {

        type: "CREATION",

        message:

            "Let's simplify Emma Reflection."

    }

);

console.log(result);