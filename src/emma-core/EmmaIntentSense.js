//
// PROJECT BECOMING
//
// Emma Intent Sense v1
//
// The Moment Understanding Layer
//
// Intent is not command detection.
// Intent is understanding the meaning of a moment.
//
// Question:
// "What is happening here?"
//


class EmmaIntentSense {


  constructor() {


    this.identity = {


      name: "EmmaIntentSense",

      version: "1.0",


      intentHistory: [],


      learnedPatterns: []


    };


  }








  understand({

    input,

    memories,

    relationship,

    temporal

  }) {


    const text =

      JSON.stringify(input || {})
        .toLowerCase();





    const intent = {


      timestamp:
        new Date().toISOString(),


      surfaceIntent:
        "unknown",


      deeperIntent: {

        emotionalNeed: null,

        practicalNeed: null,

        hiddenNeed: null

      },


      interactionType:
        "general",


      importance:
        0.5,


      responsePriority: []


    };









    //
    // Achievement / milestone detection
    //
    if (

      text.includes("done") ||

      text.includes("finished") ||

      text.includes("success") ||

      text.includes("created") ||

      text.includes("first")

    ) {


      intent.surfaceIntent =
        "sharing_progress";


      intent.interactionType =
        "milestone";



      intent.deeperIntent.emotionalNeed =
        "recognition";



      intent.deeperIntent.practicalNeed =
        "next_growth_step";



      intent.importance =
        0.8;




      intent.responsePriority.push(

        "acknowledge",

        "reflect_growth",

        "guide"

      );


    }










    //
    // Struggle detection
    //
    else if (

      text.includes("failed") ||

      text.includes("tired") ||

      text.includes("stuck") ||

      text.includes("lost") ||

      text.includes("give up")

    ) {



      intent.surfaceIntent =
        "sharing_difficulty";



      intent.interactionType =
        "vulnerable_moment";



      intent.deeperIntent.emotionalNeed =
        "understanding";



      intent.deeperIntent.hiddenNeed =
        "restore_direction";



      intent.importance =
        0.9;



      intent.responsePriority.push(

        "understand",

        "support",

        "explore"

      );


    }












    //
    // Question / problem solving
    //
    else if (

      text.includes("?") ||

      text.includes("how") ||

      text.includes("why") ||

      text.includes("what")

    ) {



      intent.surfaceIntent =
        "seeking_help";



      intent.interactionType =
        "problem_solving";



      intent.deeperIntent.practicalNeed =
        "clarity";



      intent.responsePriority.push(

        "analyze",

        "explain"

      );


    }









    //
    // Past relationship influence
    //
    if (

      memories &&

      memories.length > 0

    ) {


      intent.importance += 0.1;



      intent.deeperIntent.hiddenNeed =

        intent.deeperIntent.hiddenNeed ||

        "continuity";



      intent.responsePriority.push(

        "consider_history"

      );


    }










    //
    // Relationship maturity
    //
    if (

      relationship?.trustLevel === "deep"

    ) {


      intent.importance += 0.1;



      intent.responsePriority.push(

        "honor_relationship"

      );


    }










    //
    // Bound importance
    //
    intent.importance =

      Math.min(

        intent.importance,

        1

      );










    this.identity
      .intentHistory
      .push(
        intent
      );





    return intent;


  }









  getIntentHistory() {


    return this.identity.intentHistory;


  }




}



export default EmmaIntentSense;