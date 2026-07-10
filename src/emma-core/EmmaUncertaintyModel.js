//
// PROJECT BECOMING
//
// Emma Uncertainty Model v1
//
// The Unknown Awareness Layer
//
// Knowledge gives confidence.
// Uncertainty gives humility.
//
// Question:
// "What do I not know yet?"
//


class EmmaUncertaintyModel {


  constructor() {


    this.identity = {


      name: "EmmaUncertaintyModel",

      version: "1.0",


      knownUnknowns: [],


      assumptions: [],


      confidenceHistory: []


    };


  }








  evaluate({

    beliefs,

    memories,

    worldModel,

    reasoning

  }) {



    const uncertainty = {


      timestamp:
        new Date().toISOString(),


      confidence: 1,


      unknowns: [],


      assumptions: [],


      recommendation: null


    };









    //
    // Weak beliefs create uncertainty
    //
    if (
      beliefs &&
      beliefs.length > 0
    ) {


      for (const belief of beliefs) {


        if (
          belief.confidence < 0.5
        ) {


          uncertainty
            .unknowns
            .push(

              `Low confidence belief: ${belief.belief}`

            );



          uncertainty.confidence -= 0.2;


        }


      }


    }









    //
    // Missing memories
    //
    if (
      !memories ||
      memories.length === 0
    ) {


      uncertainty
        .unknowns
        .push(

          "No past experience available."

        );



      uncertainty.confidence -= 0.2;


    }










    //
    // World uncertainty
    //
    if (
      worldModel
        ?.understanding
        ?.uncertainties
        ?.length > 0
    ) {


      uncertainty
        .unknowns
        .push(
          ...worldModel
            .understanding
            .uncertainties
        );



      uncertainty.confidence -= 0.2;


    }











    //
    // Bound confidence
    //
    uncertainty.confidence =
      Math.max(
        0,
        Math.min(
          1,
          uncertainty.confidence
        )
      );










    //
    // Decide response strategy
    //
    if (
      uncertainty.confidence < 0.5
    ) {


      uncertainty.recommendation =

        "Explore before concluding.";


    }

    else {


      uncertainty.recommendation =

        "Enough confidence to proceed carefully.";


    }









    this.identity
      .knownUnknowns
      .push(
        ...uncertainty.unknowns
      );



    this.identity
      .confidenceHistory
      .push(
        uncertainty
      );




    return uncertainty;


  }










  getUncertaintyState() {


    return this.identity;


  }




}




export default EmmaUncertaintyModel;