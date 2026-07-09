// testBecoming.js
//
// PROJECT BECOMING TEST v2
//
// Purpose:
//
// Can Emma:
// Experience → Remember → Reflect → Learn → Change?
//
// Emma.js is now the CNS.
// It already awakens itself.
// Do NOT create new Emma() here.


import Emma from "../Emma";





async function testBecoming(){


    console.log(
        "\n🚀 PROJECT BECOMING TEST STARTED\n"
    );




    // ---------------------------------------
    // CONNECT TO EXISTING EMMA
    // ---------------------------------------


    const emma = Emma;



    console.log(
        "🌅 Connected to Emma:",
        emma
    );




    if(!emma){

        console.error(
            "❌ Emma not found"
        );

        return;

    }



    if(!emma.experience){

        console.error(
            "❌ Emma Experience system missing"
        );

        return;

    }






    // =======================================
    // DAY 1 EXPERIENCE
    // =======================================



    console.log(
        "\n=============================="
    );

    console.log(
        "📅 DAY 1 — First Business Lesson"
    );

    console.log(
        "==============================\n"
    );




    const day1 =
        await emma.experience({



            source:
            "LinkHub",



            type:
            "campaign_result",



            business:
            "Fashion Hub",




            event:{


                action:
                "Customer created 50% discount campaign",



                result:
                "Campaign received many views but very few purchases",



                outcome:
                "failed"



            },



            importance: 9



        });






    console.log(
        "\n🤖 Emma After Day 1:"
    );


    console.log(
        day1
    );










    // =======================================
    // TIME PASSES
    // =======================================




    console.log(
        "\n⏳ 30 days pass..."
    );










    // =======================================
    // DAY 30 EXPERIENCE
    // =======================================




    console.log(
        "\n=============================="
    );

    console.log(
        "📅 DAY 30 — Similar Situation"
    );

    console.log(
        "==============================\n"
    );






    const day30 =
        await emma.experience({



            source:
            "LinkHub",



            type:
            "campaign_request",




            business:
            "Fashion Hub",




            event:{



                request:
                "Owner wants to run another 50% discount campaign"



            },




            importance: 8



        });








    console.log(
        "\n🤖 Emma After Day 30:"
    );


    console.log(
        day30
    );










    // =======================================
    // MEMORY TEST
    // =======================================





    console.log(
        "\n=============================="
    );


    console.log(
        "🧠 MEMORY SEARCH TEST"
    );


    console.log(
        "==============================\n"
    );








    if(
        emma.memory &&
        emma.memory.getRelevantMemories
    ){



        const memories =
            await emma.memory.getRelevantMemories(

                "50% discount campaign failed"

            );




        console.log(
            "🧠 Related memories:"
        );


        console.log(
            memories
        );



    }


    else{


        console.warn(
            "⚠️ Memory search unavailable"
        );


    }









    // =======================================
    // FINAL RESULT
    // =======================================





    console.log(
        "\n🎉 PROJECT BECOMING TEST COMPLETE"
    );



    console.log(
        "\nQUESTION:"
    );


    console.log(
        "Did Emma remember yesterday when deciding today?"
    );




}





testBecoming();