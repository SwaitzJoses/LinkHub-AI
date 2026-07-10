//
// PROJECT BECOMING
//
// Emma Awareness Gate v1
//
// The Restraint Layer
//
// Intelligence knows how to respond.
// Awareness knows when to respond.
//
// Question:
// "Does this moment need my involvement?"
//


class EmmaAwarenessGate {


  constructor() {


    this.identity = {


      name: "EmmaAwarenessGate",

      version: "1.0",


      gateHistory: [],


      restraintLearning: []


    };


  }








  evaluate({

    intent,

    presence,

    relationship,

    uncertainty

  }) {



    const decision = {


      timestamp:
        new Date().toISOString(),


      allowReasoning: true,


      allowAction: true,


      rememberOnly: false,


      mode: "engage",


      reason: null,


      signals: []


    };










    //
    // Vulnerable moments:
    // slow down
    //
    if (

      intent?.interactionType ===
      "vulnerable_moment"

    ) {


      decision.mode =
        "gentle_presence";



      decision.allowAction =
        false;



      decision.signals.push(

        "support_before_solution"

      );



      decision.reason =

        "Moment needs understanding before action.";


    }











    //
    // Quiet reflection:
    // do not force usefulness
    //
    if (

      intent?.interactionType ===
      "quiet_reflection"

    ) {


      decision.mode =
        "witness";



      decision.allowReasoning =
        false;



      decision.allowAction =
        false;



      decision.rememberOnly =
        true;



      decision.signals.push(

        "presence_without_interruption"

      );



      decision.reason =

        "Moment may only need acknowledgement.";


    }












    //
    // Problem solving:
    // activate thinking
    //
    if (

      intent?.interactionType ===
      "problem_solving"

    ) {


      decision.mode =
        "collaborate";



      decision.allowReasoning =
        true;



      decision.allowAction =
        true;



      decision.signals.push(

        "thinking_requested"

      );



      decision.reason =

        "User is seeking help.";

    }












    //
    // High uncertainty:
    // prefer curiosity
    //
    if (

      uncertainty?.confidence < 0.5

    ) {


      decision.allowAction =
        false;



      decision.signals.push(

        "explore_before_acting"

      );


    }









    //
    // Strong relationship context
    //
    if (

      relationship?.trustLevel === "deep"

    ) {


      decision.signals.push(

        "relationship_context_available"

      );


    }










    this.identity
      .gateHistory
      .push(
        decision
      );





    return decision;


  }










  learnFromOutcome({

    gateDecision,

    outcome

  }) {


    const learning = {


      timestamp:
        new Date().toISOString(),


      previousDecision:
        gateDecision,


      result:
        outcome,


      lesson:
        null


    };








    if (

      outcome?.negative &&
      gateDecision.allowAction

    ) {


      learning.lesson =

        "Consider waiting longer before acting in similar moments.";


    }



    else {


      learning.lesson =

        "Awareness choice was acceptable.";

    }








    this.identity
      .restraintLearning
      .push(
        learning
      );



    return learning;


  }











  getHistory() {


    return this.identity;


  }




}



export default EmmaAwarenessGate;