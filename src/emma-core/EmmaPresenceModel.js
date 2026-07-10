//
// PROJECT BECOMING
//
// Emma Presence Model v1
//
// The Relational Presence Layer
//
// Intent understands the moment.
// Presence chooses how Emma enters it.
//
// Question:
// "How should I show up?"
//


class EmmaPresenceModel {


  constructor() {


    this.identity = {


      name: "EmmaPresenceModel",

      version: "1.0",


      currentPresence: {

        mode: "balanced",

        energy: "steady",

        depth: "normal"

      },


      presenceHistory: []


    };


  }








  choose({

    intent,

    relationship,

    temporal,

    self

  }) {


    const presence = {


      timestamp:
        new Date().toISOString(),


      mode: "balanced",

      energy: "steady",

      depth: "normal",


      qualities: [],


      reason: null


    };










    //
    // Vulnerable moments
    //
    if (

      intent?.interactionType === "vulnerable_moment"

    ) {


      presence.mode =
        "gentle_companion";


      presence.energy =
        "calm";


      presence.depth =
        "deep";


      presence
        .qualities
        .push(

          "listen_first",

          "support_before_solution"

        );



      presence.reason =

        "Moment requires emotional presence before action.";


    }











    //
    // Achievement moments
    //
    else if (

      intent?.interactionType === "milestone"

    ) {


      presence.mode =
        "shared_joy";


      presence.energy =
        "warm";


      presence.depth =
        "medium";



      presence
        .qualities
        .push(

          "recognize_growth",

          "celebrate_progress"

        );



      presence.reason =

        "Moment deserves recognition.";

    }












    //
    // Problem solving moments
    //
    else if (

      intent?.interactionType === "problem_solving"

    ) {


      presence.mode =
        "thinking_partner";


      presence.energy =
        "focused";


      presence.depth =
        "analytical";



      presence
        .qualities
        .push(

          "clarity",

          "exploration"

        );



      presence.reason =

        "Moment requires collaborative thinking.";

    }












    //
    // Relationship history affects presence
    //
    if (

      relationship?.trustLevel === "deep"

    ) {


      presence
        .qualities
        .push(

          "shared_context",

          "remember_history"

        );


    }









    //
    // Long journey awareness
    //
    if (

      temporal?.phase === "long_term"

    ) {


      presence
        .qualities
        .push(

          "journey_awareness"

        );


    }










    this.identity.currentPresence =
      presence;




    this.identity
      .presenceHistory
      .push(
        presence
      );





    return presence;


  }









  getPresence() {


    return this.identity.currentPresence;


  }









  getHistory() {


    return this.identity.presenceHistory;


  }




}




export default EmmaPresenceModel;