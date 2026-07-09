// EmmaMemoryConsolidation.js
//
// PROJECT BECOMING
//
// Version 2:
// Sleep & Wisdom Engine
//
// Emma does not store everything forever.
// Emma sleeps.
// Emma compresses.
// Emma learns.
//
// Memories → Patterns → Lessons → Beliefs → Wisdom


class EmmaMemoryConsolidation {


    constructor(){

        this.wisdom = [];

        this.beliefs = [];

        this.contradictions = [];


        this.config = {

            minimumImportance: 40,

            beliefThreshold: 3,

            maxConfidence: 100,

            memoryDecayDays: 90

        };


        console.log(
            "🌙 Emma Memory Consolidation v2 online"
        );

    }







    //
    // NIGHTLY BRAIN PROCESS
    //

    sleep(memories = []){


        console.log(
            "🌙 Emma is sleeping and processing memories..."
        );



        const scored =
        memories.map(memory =>
            this.scoreMemory(memory)
        );



        const important =
        this.removeNoise(scored);



        const aged =
        this.applyMemoryAging(important);



        const patterns =
        this.findPatterns(aged);



        const lessons =
        this.extractLessons(patterns);



        this.detectContradictions(
            lessons
        );



        this.createBeliefs(
            lessons
        );



        this.wisdom.push(
            ...lessons
        );



        return {

            processed:
            memories.length,


            remembered:
            important.length,


            newLessons:
            lessons,


            beliefs:
            this.beliefs,


            contradictions:
            this.contradictions

        };

    }









    //
    // EMMA DECIDES MEMORY VALUE
    //

    scoreMemory(memory){


        let score = 0;



        if(memory.success){

            score += 30;

        }


        if(memory.failure){

            score += 35;

        }


        if(memory.emotion){

            score +=
            memory.emotion * 20;

        }


        if(memory.userImpact){

            score += 25;

        }


        if(memory.importance){

            score +=
            memory.importance;

        }



        return {

            ...memory,

            importance:
            Math.min(
                score,
                100
            )

        };


    }










    //
    // FORGET USELESS EVENTS
    //

    removeNoise(memories){


        return memories.filter(
            memory =>

            memory.importance >=
            this.config.minimumImportance

        );


    }









    //
    // OLD MEMORIES FADE
    //

    applyMemoryAging(memories){


        return memories.map(memory => {


            if(!memory.createdAt){

                return memory;

            }



            const age =
            (
                Date.now()
                -
                new Date(
                    memory.createdAt
                )
            )
            /
            (1000*60*60*24);



            let confidence =
            memory.confidence || 100;



            if(
                age >
                this.config.memoryDecayDays
            ){

                confidence -= 10;

            }



            return {

                ...memory,

                confidence:
                Math.max(
                    confidence,
                    0
                )

            };


        });


    }









    //
    // FIND REPEATED LIFE PATTERNS
    //

    findPatterns(memories){


        const groups = {};



        memories.forEach(memory => {


            const key =

            memory.category ||

            memory.type ||

            "general";



            if(!groups[key]){


                groups[key] = [];


            }



            groups[key].push(
                memory
            );


        });



        return groups;


    }










    //
    // CREATE LESSONS
    //

    extractLessons(patterns){


        let lessons = [];



        Object.entries(patterns)
        .forEach(([topic, memories])=>{


            if(
                memories.length >=
                this.config.beliefThreshold
            ){


                const success =
                memories.filter(
                    m => m.success
                ).length;



                const failure =
                memories.filter(
                    m => m.failure
                ).length;





                lessons.push({

                    type:
                    "lesson",


                    topic,


                    lesson:
                    this.generateLesson(
                        topic,
                        success,
                        failure
                    ),


                    confidence:

                    Math.min(

                    memories.length * 20,

                    this.config.maxConfidence

                    ),


                    createdAt:
                    new Date()
                    .toISOString()

                });


            }


        });



        return lessons;


    }









    //
    // SIMPLE REASONING
    //

    generateLesson(
        topic,
        success,
        failure
    ){


        if(success > failure){

            return (
            `${topic} often leads to positive outcomes`
            );

        }



        if(failure > success){

            return (
            `${topic} often creates problems. Be careful.`
            );

        }



        return (

        `${topic} needs more observation before deciding`

        );


    }










    //
    // FIND CONFLICTING KNOWLEDGE
    //

    detectContradictions(lessons){


        lessons.forEach(newLesson => {


            this.wisdom.forEach(old => {


                if(

                old.topic ===
                newLesson.topic


                &&


                old.lesson !==
                newLesson.lesson


                ){


                    this.contradictions.push({


                        topic:
                        newLesson.topic,


                        old:
                        old.lesson,


                        new:
                        newLesson.lesson,


                        question:
                        "Why did the result change?"


                    });


                }


            });


        });


    }










    //
    // FORM LONG TERM BELIEFS
    //

    createBeliefs(lessons){


        lessons.forEach(
            lesson => {


            const existing =

            this.beliefs.find(

            b =>
            b.topic ===
            lesson.topic

            );



            if(existing){


                existing.confidence =
                Math.min(

                existing.confidence + 10,

                100

                );


            }

            else {


                this.beliefs.push({


                    topic:
                    lesson.topic,


                    belief:
                    lesson.lesson,


                    confidence:
                    lesson.confidence,


                    createdAt:
                    new Date()
                    .toISOString()


                });


            }


        });


    }










    //
    // ACCESS WISDOM
    //

    getWisdom(){

        return this.wisdom;

    }




    getBeliefs(){

        return this.beliefs;

    }




    getContradictions(){

        return this.contradictions;

    }




}



export default EmmaMemoryConsolidation;