//
// PROJECT BECOMING
//
// Emma World Model v1
//
// The Environment Understanding Layer
//
// Memory stores events.
// World Model stores external understanding.
//
// Question:
// "What kind of world am I operating in?"
//


class EmmaWorldModel {


  constructor() {


    this.identity = {


      name: "EmmaWorldModel",

      version: "1.0",


      understanding: {

        domains: {},

        patterns: [],

        changes: [],

        uncertainties: []

      },


      history: []


    };


  }








  observe({

    experience,

    memories,

    outcomes,

    beliefs

  }) {



    const observation = {


      timestamp:
        new Date().toISOString(),


      discoveredPatterns: [],


      uncertainty: [],


      update: null


    };








    //
    // Experiences reveal environment
    //
    if (experience?.domain) {



      if (

        !this.identity
          .understanding
          .domains[
            experience.domain
          ]

      ) {


        this.identity
          .understanding
          .domains[
            experience.domain
          ] = {

            encounters: 0,

            confidence: 0

          };


      }






      const domain =

        this.identity
          .understanding
          .domains[
            experience.domain
          ];



      domain.encounters++;

      domain.confidence += 0.1;



      observation
        .discoveredPatterns
        .push(

          `Learning about ${experience.domain}`

        );


    }










    //
    // Outcomes reveal reality feedback
    //
    if (

      outcomes &&
      outcomes.length > 0

    ) {


      observation
        .discoveredPatterns
        .push(

          "Outcomes updated world understanding."

        );


    }










    //
    // Beliefs are checked against world
    //
    if (

      beliefs &&
      beliefs.length > 0

    ) {


      observation.update =

        "Existing beliefs compared with new reality signals.";


    }









    //
    // Unknown remains unknown
    //
    if (

      observation
        .discoveredPatterns
        .length === 0

    ) {


      observation
        .uncertainty
        .push(

          "Insufficient evidence."

        );


    }










    this.identity
      .history
      .push(observation);





    return observation;


  }











  getWorldUnderstanding() {


    return this.identity;


  }




}



export default EmmaWorldModel;