// EmmaChoice.js
//
// PROJECT BECOMING
//
// Emma Choice System
//
// Memory = "What happened before?"
// Wisdom = "What did I learn?"
// Identity = "Who am I?"
// Choice = "What should I do now?"
//
// Emma does not just react.
// Emma chooses from experience.


class EmmaChoice {


    constructor({ memory, wisdom, identity }) {


        console.log("🧭 Emma Choice awakened");


        this.memory = memory;
        this.wisdom = wisdom;
        this.identity = identity;


        // Emma's history of choices
        this.choiceHistory = [];


        // How Emma prefers to decide
        this.values = {

            avoidRepeatingMistakes: true,

            learnFromExperience: true,

            protectRelationship: true,

            preferLongTermGrowth: true

        };

    }



    // =====================================================
    // MAIN DECISION ENGINE
    // =====================================================

    async decide(experience) {


        console.log("🧭 Emma is making a choice...");



        // 1. Remember similar past situations

        const memories =
            await this.getMemories(experience);



        // 2. Ask wisdom

        const wisdom =
            await this.getWisdom(experience);



        // 3. Understand identity

        const identity =
            this.getIdentity();



        // 4. Decide

        const decision =
            this.makeDecision({

                experience,

                memories,

                wisdom,

                identity

            });



        const choice = {


            id:
                crypto.randomUUID(),


            experience,


            considered: {

                memories:
                    memories.length,

                wisdom:
                    !!wisdom,

                identity

            },


            decision,


            createdAt:
                new Date()

        };




        this.choiceHistory.push(choice);



        console.log(
            "🧭 Emma chose:",
            decision.action
        );


        return choice;


    }






    // =====================================================
    // MEMORY
    // =====================================================

    async getMemories(experience) {


        if(
            !this.memory ||
            !this.memory.findRelevant
        ){

            return [];

        }



        try {


            return await this.memory.findRelevant(
                experience
            );


        } catch(error){


            console.warn(
                "EmmaChoice memory unavailable",
                error
            );


            return [];


        }

    }






    // =====================================================
    // WISDOM
    // =====================================================

    async getWisdom(experience){


        if(
            !this.wisdom ||
            !this.wisdom.search
        ){

            return null;

        }



        try {


            return await this.wisdom.search(
                experience
            );


        } catch(error){


            return null;


        }

    }






    // =====================================================
    // IDENTITY
    // =====================================================

    getIdentity(){


        if(
            this.identity &&
            this.identity.whoAmI
        ){

            return this.identity.whoAmI();

        }



        return {

            name: "Emma",

            purpose:
                "Learn, grow and help through experience"

        };


    }







    // =====================================================
    // ACTUAL CHOICE LOGIC
    // =====================================================

    makeDecision(context){


        const {
            memories,
            wisdom
        } = context;




        // -------------------------------------
        // Past failure found
        // -------------------------------------

        const failedMemory =
            memories.find(
                memory =>
                    memory.outcome?.success === false
            );



        if(failedMemory){


            return {

                action:
                    "AVOID_REPEAT_MISTAKE",


                confidence:
                    0.95,


                reason:
                    "I remember a similar experience failed before."

            };


        }






        // -------------------------------------
        // Wisdom exists
        // -------------------------------------

        if(wisdom){


            return {

                action:
                    "FOLLOW_WISDOM",


                confidence:
                    0.85,


                reason:
                    "My past learning gives guidance."

            };


        }







        // -------------------------------------
        // Positive experience exists
        // -------------------------------------

        const successMemory =
            memories.find(
                memory =>
                    memory.outcome?.success === true
            );



        if(successMemory){


            return {

                action:
                    "REPEAT_SUCCESS_PATTERN",


                confidence:
                    0.8,


                reason:
                    "Something similar worked before."

            };


        }






        // -------------------------------------
        // Unknown situation
        // -------------------------------------

        return {

            action:
                "EXPLORE_AND_LEARN",


            confidence:
                0.5,


            reason:
                "This is new. I will experience and learn."

        };


    }







    // =====================================================
    // REFLECTION SUPPORT
    // =====================================================

    getAllChoices(){


        return this.choiceHistory;


    }



    lastChoice(){


        return (
            this.choiceHistory[
                this.choiceHistory.length - 1
            ]
            ||
            null
        );


    }




    status(){


        return {


            awake:true,


            totalChoices:
                this.choiceHistory.length,


            values:
                this.values


        };


    }



}



export default EmmaChoice;