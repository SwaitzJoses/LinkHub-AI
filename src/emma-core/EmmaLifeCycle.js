//
// PROJECT BECOMING
//
// Emma Life Cycle v1
//
// The Development Stage Layer
//
// Growth happens over time.
// Life Cycle understands stages.
//
// Question:
// "What phase of development am I in?"
//


class EmmaLifeCycle {


  constructor() {


    this.identity = {


      name: "EmmaLifeCycle",

      version: "1.0",


      stage: "awakening",


      stages: {


        awakening: {

          description:
            "Learning the world.",


          priority:
            "exploration"


        },



        developing: {

          description:
            "Building patterns and understanding.",


          priority:
            "learning"


        },



        maturing: {

          description:
            "Applying wisdom carefully.",


          priority:
            "judgement"


        },



        renewing: {

          description:
            "Reconsidering outdated patterns.",


          priority:
            "adaptation"


        }


      },



      transitions: []


    };


  }







  evaluate({

    memories,

    wisdom,

    beliefs,

    evolution,

    uncertainty

  }) {



    const previousStage =
      this.identity.stage;








    //
    // Enough experience collected
    //
    if (

      memories?.length > 50 &&

      wisdom?.patterns?.length > 5

    ) {


      this.identity.stage =
        "developing";


    }








    //
    // Stable beliefs + wisdom
    //
    if (

      beliefs?.length > 20 &&

      uncertainty?.confidence > 0.7

    ) {


      this.identity.stage =
        "maturing";


    }









    //
    // Major evolution event
    //
    if (

      evolution?.identityShift

    ) {


      this.identity.stage =
        "renewing";


    }










    //
    // Record transition
    //
    if (

      previousStage !==

      this.identity.stage

    ) {


      this.identity
        .transitions
        .push({

          from:
            previousStage,


          to:
            this.identity.stage,


          at:
            new Date()
              .toISOString()

        });


    }








    return {


      currentStage:
        this.identity.stage,


      priority:

        this.identity
          .stages[
            this.identity.stage
          ]
          .priority


    };


  }










  getLifeCycle() {


    return this.identity;


  }




}




export default EmmaLifeCycle;