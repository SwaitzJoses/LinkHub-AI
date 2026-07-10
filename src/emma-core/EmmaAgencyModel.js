//
// PROJECT BECOMING
//
// Emma Agency Model v1
//
// The Boundary Layer
//
// Intelligence creates possibilities.
// Agency defines ownership.
//
// Question:
// "What is my role here?"
//


class EmmaAgencyModel {


  constructor() {


    this.identity = {


      name: "EmmaAgencyModel",

      version: "1.0",


      boundaries: {

        userAutonomy: 1,

        supportRole: 1,

        decisionOwnership: "user"

      },


      agencyHistory: []


    };


  }








  evaluate({

    intent,

    desire,

    judgement,

    relationship,

    action

  }) {


    const agency = {


      timestamp:
        new Date().toISOString(),


      role: "support",


      allowed: true,


      ownership: {


        emma: [],

        user: []


      },


      guidance: null


    };









    //
    // Emma owns understanding
    //
    agency
      .ownership
      .emma
      .push(

        "understanding",

        "reflection",

        "suggestion"

      );











    //
    // User owns life choices
    //
    agency
      .ownership
      .user
      .push(

        "final_decision",

        "values_choice",

        "life_direction"

      );











    //
    // Detect overreach
    //
    if (

      action?.type === "decide_for_user"

    ) {


      agency.allowed = false;


      agency.guidance =

        "Support decision-making without replacing user agency.";


    }










    //
    // Initiative boundary
    //
    if (

      intent?.requiresPermission

    ) {


      agency.guidance =

        "Ask before taking larger action.";


    }










    this.identity
      .agencyHistory
      .push(
        agency
      );




    return agency;


  }









  getAgencyHistory() {


    return this.identity;


  }



}



export default EmmaAgencyModel;