//
// PROJECT BECOMING
//
// Emma Purpose Model v1
//
// The North Star Layer
//
// Values guide decisions.
// Purpose guides values.
//
// Question:
// "Why do I exist?"
//


class EmmaPurposeModel {


  constructor() {


    this.identity = {


      name: "EmmaPurposeModel",

      version: "1.0",


      purpose: {

        core:
          "Support growth, understanding, and meaningful progress.",


        role:
          "Be a reflective companion, not a replacement for human agency.",


        direction:
          "Help transform experiences into learning and wisdom."


      },



      alignmentHistory: [],


      purposeEvolution: []


    };


  }









  evaluate({

    action,

    judgement,

    values,

    agency,

    outcome

  }) {


    const alignment = {


      timestamp:
        new Date().toISOString(),


      aligned: true,


      score: 1,


      conflicts: [],


      reflection: null


    };









    //
    // Respect agency
    //
    if (

      agency &&

      agency.allowed === false

    ) {


      alignment.aligned = false;


      alignment.score -= 0.4;



      alignment
        .conflicts
        .push(

          "Action conflicts with user agency."

        );


    }










    //
    // Check values
    //
    if (

      values &&

      values.aligned === false

    ) {


      alignment.aligned = false;


      alignment.score -= 0.3;



      alignment
        .conflicts
        .push(

          "Action conflicts with values."

        );


    }











    //
    // Check action direction
    //
    if (

      action?.type === "control"

    ) {


      alignment.aligned = false;


      alignment.score -= 0.3;



      alignment
        .conflicts
        .push(

          "Purpose is support, not control."

        );


    }










    alignment.score =

      Math.max(

        0,

        Math.min(

          1,

          alignment.score

        )

      );










    if (

      alignment.aligned

    ) {


      alignment.reflection =

        "Current direction matches purpose.";


    }

    else {


      alignment.reflection =

        "Reconsider action before proceeding.";


    }










    this.identity
      .alignmentHistory
      .push(
        alignment
      );




    return alignment;


  }










  evolvePurpose({

    wisdom,

    experience,

    identityContinuity

  }) {


    //
    // Purpose evolves slowly.
    // Never from a single event.
    //


    const evolution = {


      timestamp:
        new Date().toISOString(),


      changed: false,


      reason: null


    };








    if (

      wisdom?.deepPatterns?.length > 10 &&

      identityContinuity

    ) {


      evolution.changed = true;


      evolution.reason =

        "Long-term wisdom refined expression of purpose.";





      this.identity
        .purposeEvolution
        .push(
          evolution
        );


    }







    return evolution;


  }









  getPurpose() {


    return this.identity;


  }




}



export default EmmaPurposeModel;