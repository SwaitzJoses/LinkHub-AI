// EmmaMemoryFilter.js
//
// PROJECT BECOMING
//
// Memory Gatekeeper
//
// Emma should not remember everything.
//
// This organ decides:
// - What becomes memory
// - Why it matters
// - What type of memory it is
//
// RULE:
// Storage is not memory.
// Meaning creates memory.


class EmmaMemoryFilter {


    constructor(){


        this.minimumImportance = 5;


        this.recentFingerprints = [];


    }






    analyze(experience){



        let importance = 0;


        let memoryType = "ordinary";


        const reasons = [];



        const text =
            JSON.stringify(experience)
            .toLowerCase();





        //
        // Duplicate protection
        //

        const fingerprint =
            this.createFingerprint(text);



        if(
            this.recentFingerprints.includes(
                fingerprint
            )
        ){


            return {


                remember: false,


                importance: 0,


                memoryType: "duplicate",


                reasons:[
                    "Already experienced recently."
                ],


                experience


            };


        }



        this.storeFingerprint(
            fingerprint
        );







        //
        // Failures create wisdom
        //

        if(
            this.contains(
                text,
                [
                    "fail",
                    "failed",
                    "mistake",
                    "wrong",
                    "error",
                    "problem"
                ]
            )
        ){


            importance += 6;


            memoryType = "lesson";


            reasons.push(
                "Failure can improve future decisions."
            );


        }








        //
        // Success creates patterns
        //

        if(
            this.contains(
                text,
                [
                    "success",
                    "worked",
                    "achieved",
                    "won",
                    "improved"
                ]
            )
        ){


            importance += 5;


            memoryType = "success_pattern";


            reasons.push(
                "Successful patterns should influence future behavior."
            );


        }








        //
        // User identity and preferences
        //

        if(
            this.contains(
                text,
                [
                    "prefer",
                    "like",
                    "dislike",
                    "love",
                    "hate",
                    "want"
                ]
            )
        ){


            importance += 6;


            memoryType = "user_preference";


            reasons.push(
                "Understanding the user strengthens relationship."
            );


        }








        //
        // Decisions
        //

        if(
            this.contains(
                text,
                [
                    "decided",
                    "decision",
                    "choose",
                    "changed",
                    "strategy"
                ]
            )
        ){


            importance += 5;


            memoryType = "decision";


            reasons.push(
                "Decisions shape future context."
            );


        }









        //
        // Relationships
        //

        if(
            this.contains(
                text,
                [
                    "customer",
                    "client",
                    "team",
                    "family",
                    "friend"
                ]
            )
        ){


            importance += 4;


            memoryType = "relationship";


            reasons.push(
                "Relationships create long-term context."
            );


        }








        //
        // Emotional weight
        //

        if(
            this.contains(
                text,
                [
                    "happy",
                    "sad",
                    "angry",
                    "excited",
                    "worried",
                    "afraid"
                ]
            )
        ){


            importance += 4;


            reasons.push(
                "Emotional experiences affect future interactions."
            );


        }








        const remember =
            importance >= this.minimumImportance;






        return {


            remember,


            importance,


            memoryType,


            confidence:
                Math.min(
                    importance / 10,
                    1
                ),


            reasons:


                remember
                ? reasons
                : [
                    "Experience did not contain enough long-term value."
                ],


            createdAt:
                new Date().toISOString(),


            experience


        };



    }










    contains(text, words){


        return words.some(
            word =>
                text.includes(word)
        );


    }








    createFingerprint(text){


        return text
            .replace(/\s/g,"")
            .slice(0,100);


    }








    storeFingerprint(id){



        this.recentFingerprints.push(id);



        if(
            this.recentFingerprints.length > 50
        ){


            this.recentFingerprints.shift();


        }



    }





}



export default EmmaMemoryFilter;