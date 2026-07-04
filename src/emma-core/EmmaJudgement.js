// EmmaJudgement.js
// Emma's wisdom layer
// Guardrails before Emma takes action


class EmmaJudgement {


  constructor(){

    console.log(
      "⚖️ Emma Judgement ready"
    );

  }




  async judge(
    reasoning,
    memory
  ){


    console.log(
      "⚖️ Judging Emma decision:",
      {
        reasoning,
        memory
      }
    );



    // Default decision
    // Emma does nothing unless approved

    let decision = {

      shouldAct: false,

      priority: "low",

      action: null,

      confidence:
        reasoning.confidence || 0,

      reason:
        "Waiting for judgement"

    };





    // ==================================================
    // GUARDRAIL 1:
    // Do not act without enough confidence
    // ==================================================


    if(
      reasoning.confidence < 70
    ){


      decision.reason =
        "Confidence too low. Need more information.";


      return decision;

    }






    // ==================================================
    // GUARDRAIL 2:
    // Do not repeat same advice again and again
    // ==================================================


    if(
      memory &&
      memory.lastAdvice &&
      memory.lastAdvice === reasoning.suggestion
    ){


      decision.reason =
        "Emma already suggested this before";


      return decision;

    }







    // ==================================================
    // GUARDRAIL 3:
    // Respect business identity
    // ==================================================


    if(
      reasoning.conflictsWithBusiness === true
    ){


      decision.reason =
        "Suggestion conflicts with business identity";


      return decision;

    }







    // ==================================================
    // GUARDRAIL 4:
    // Dangerous actions need owner approval
    // ==================================================


    const riskyActions = [

      "send_campaign",

      "delete_data",

      "change_price",

      "spend_money"

    ];



    if(
      riskyActions.includes(
        reasoning.actionType
      )
    ){


      decision.reason =
        "Owner approval required before this action";


      decision.needsApproval = true;


      return decision;

    }








    // ==================================================
    // GUARDRAIL 5:
    // Do not repeat failed strategies
    // ==================================================


    if(
      memory &&
      memory.failedStrategies &&
      memory.failedStrategies.includes(
        reasoning.suggestion
      )
    ){


      decision.reason =
        "This strategy failed before. Try another approach.";


      return decision;

    }









    // ==================================================
    // PASSED ALL GUARDRAILS
    // Emma can proceed
    // ==================================================


    decision = {

      shouldAct: true,


      priority:
        reasoning.impact || "medium",


      action:
        reasoning.suggestion,


      confidence:
        reasoning.confidence,


      reason:
        "Approved by Emma Judgement",


      needsApproval:
        false

    };




    console.log(
      "✅ Judgement result:",
      decision
    );



    return decision;



  }



}



export default EmmaJudgement;