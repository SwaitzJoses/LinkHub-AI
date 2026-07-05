// EmmaReasoning.js
// Emma's thinking engine
// Uses OpenAI brain + company memories + fallback logic


import EmmaBrain from "./EmmaBrain";



class EmmaReasoning {


  constructor(){

    console.log(
      "💭 Emma Reasoning ready"
    );

  }










  async think(
    reflection,
    memory
  ){



    console.log(
      "💭 Emma thinking with experience:",
      {
        reflection,
        memory
      }
    );









    // ==========================
    // Recall memories first
    // ==========================



    const experiences =

      memory
      ?.relevantExperiences

      || [];









    // ==========================
    // Ask Emma LLM Brain
    // ==========================



    const aiThought =

      await EmmaBrain.think({



        role:

        "AI business growth employee",




        situation:

        reflection,





        companyExperience:

        experiences,






        instruction:

        `
        Think like an employee working inside this company.

        Before deciding:

        1. Study previous memories.
        2. Find what worked.
        3. Find what failed.
        4. Avoid repeating mistakes.
        5. Recommend the best action.

        Available actions:

        CREATE_TASK
        CREATE_CAMPAIGN
        GENERATE_REPORT


        Return your reasoning clearly.
        `



      });










    console.log(
      "🧠 Emma AI Thought:",
      aiThought
    );









    // ==========================
    // Understand situation
    // ==========================



    const situation = {


      meaning:

      reflection.meaning

      || "Unknown situation",




      importance:

      reflection.importance

      || "medium"



    };













    // ==========================
    // Study memories locally
    // (backup intelligence)
    // ==========================





    const successfulMemories =



      experiences.filter(item=>{



        const text =

        JSON.stringify(item)
        .toLowerCase();





        return (

          text.includes("success")

          ||

          text.includes("worked")

          ||

          text.includes("improved")

        );



      });










    const failedMemories =



      experiences.filter(item=>{



        const text =

        JSON.stringify(item)
        .toLowerCase();




        return (

          text.includes("failed")

          ||

          text.includes("did not work")


        );



      });














    // ==========================
    // Possible actions
    // ==========================





    let options = [





      {


        action:

        "CREATE_TASK",



        goal:

        "operations",



        reason:

        "Organize business follow-up work",



        risk:

        "low",



        expectedImpact:

        "medium"


      },









      {


        action:

        "GENERATE_REPORT",



        goal:

        "analysis",



        reason:

        "Analyze business situation deeper",



        risk:

        "low",



        expectedImpact:

        "medium"


      }





    ];













    // ==========================
    // Growth detection
    // ==========================





    const meaning =

      reflection
      ?.meaning
      ?.toLowerCase()

      || "";








    if(

      meaning.includes("growth")

      ||

      meaning.includes("sales")

      ||

      meaning.includes("opportunity")

      ||

      meaning.includes("interest")


    ){



      options.push({



        action:

        "CREATE_CAMPAIGN",



        goal:

        "growth",




        reason:

        "Growth opportunity detected",



        risk:

        "medium",



        expectedImpact:

        "high"




      });



    }













    // ==========================
    // Repeat proven success
    // ==========================





    if(

      successfulMemories.length > 0

    ){



      options.push({



        action:

        "REPEAT_SUCCESSFUL_STRATEGY",




        goal:

        "growth",




        reason:

        "Previous company experience worked",




        basedOn:

        successfulMemories.slice(0,3),




        risk:

        "low",




        expectedImpact:

        "high"




      });



    }












    // ==========================
    // Pick recommendation
    // ==========================





    let recommended =

    options[0];






    const highImpact =


    options.find(

      option =>

      option.expectedImpact === "high"

    );






    if(highImpact){


      recommended = highImpact;


    }













    // ==========================
    // Avoid failures
    // ==========================





    if(

      failedMemories.length > 0

    ){



      recommended.warning =

      "Past similar failures detected. Avoid repeating mistakes";




      recommended.failedExperience =

      failedMemories.slice(0,3);



    }














    // ==========================
    // Confidence
    // ==========================





    let confidence = 60;





    if(
      aiThought.success
    ){


      confidence += 10;


    }






    if(
      experiences.length > 0
    ){


      confidence += 10;


    }






    if(
      recommended.expectedImpact === "high"
    ){


      confidence += 20;


    }






    if(confidence > 100){

      confidence = 100;

    }












    // ==========================
    // Final reasoning output
    // ==========================




    return {




      thought:


      aiThought.response

      ||

      "Emma used internal reasoning engine",







      situation,








      memoriesUsed:{



        total:

        experiences.length,




        successful:

        successfulMemories.length,




        failed:

        failedMemories.length



      },









      options,








      recommendation:

      recommended,








      suggestion:

      recommended.reason,





      goal:

      recommended.goal,





      type:

      recommended.goal,








      confidence,








      createdAt:

      new Date()



    };



  }




}



export default EmmaReasoning;