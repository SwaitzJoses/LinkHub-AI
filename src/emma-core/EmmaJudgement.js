// EmmaJudgement.js
// Emma's wisdom layer
// Decides if an action SHOULD happen
// Not just whether it CAN happen


class EmmaJudgement {


  constructor(){

    console.log(
      "⚖️ Emma Judgement ready"
    );

  }









  async judge(
    reasoning,
    memory,
    capabilities
  ){



    console.log(
      "⚖️ Judging Emma decision:",
      {
        reasoning,
        memory,
        capabilities
      }
    );









    const confidence =

      reasoning.confidence
      || 50;







    let decision = {


      shouldAct:false,


      priority:"low",


      action:null,


      confidence,


      reason:

      "Emma decided observation is better"


    };












    // ==============================
    // Low confidence protection
    // ==============================



    if(
      confidence < 50
    ){


      return {


        ...decision,


        reason:

        "Not enough confidence. Need more learning before acting"


      };


    }












    // ==============================
    // Study reasoning warnings
    // ==============================



    const recommendation =

      reasoning.recommendation

      || {};






    if(
      recommendation.warning
    ){



      return {


        shouldAct:false,


        priority:"high",


        action:null,


        confidence,


        reason:

        recommendation.warning,


        lesson:

        recommendation.failedExperience

        || []


      };


    }














    // ==============================
    // Check past failures
    // ==============================



    const memories =


      memory
      ?.relevantExperiences

      || [];






    const failedBefore =


      memories.some(item => {



        const text =

        JSON.stringify(item)
        .toLowerCase();




        return (

          text.includes("failed")

          ||

          text.includes("did not work")

        );


      });







    if(failedBefore){



      return {


        shouldAct:false,


        priority:"high",


        action:null,


        confidence,


        reason:

        "Emma found similar failures in company history. Action stopped to avoid repeating mistakes"


      };


    }














    // ==============================
    // Decide needed capability
    // ==============================



    let desiredAction =

      "CREATE_TASK";







    if(

      reasoning.goal === "growth"

      ||

      reasoning.type === "growth"

    ){


      desiredAction =

      "CREATE_CAMPAIGN";


    }








    if(

      reasoning.goal === "analysis"

      ||

      reasoning.type === "analysis"

    ){


      desiredAction =

      "GENERATE_REPORT";


    }













    // ==============================
    // Find Emma ability
    // ==============================



    const skill =


      capabilities.find(

        item =>

        item.name === desiredAction

      );








    if(!skill){



      return {


        shouldAct:false,


        action:null,


        confidence,


        reason:

        `Emma understands the solution but does not have ${desiredAction} ability yet`


      };



    }














    // ==============================
    // Risk judgement
    // ==============================



    if(

      skill.risk === "high"

      &&

      confidence < 85

    ){



      return {


        shouldAct:false,


        action:null,


        confidence,


        reason:

        "Risk is too high compared with confidence level"


      };


    }













    // ==============================
    // Approval judgement
    // ==============================



    if(
      skill.requiresApproval
    ){



      return {


        shouldAct:true,


        action:

        desiredAction,


        confidence,


        priority:

        "medium",



        mode:

        "prepare",



        needsApproval:

        true,



        reason:

        "Emma recommends this action but owner approval is required"


      };


    }













    // ==============================
    // Final approval
    // ==============================



    return {



      shouldAct:true,



      action:

      desiredAction,



      confidence,



      priority:

      skill.risk === "low"

      ? "medium"

      : "high",




      mode:

      "execute",



      needsApproval:false,




      reason:

      "Emma approved this action after checking memory, risk and capability"




    };




  }




}



export default EmmaJudgement;