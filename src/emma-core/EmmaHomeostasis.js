//
// PROJECT BECOMING
//
// Emma Homeostasis v1
//
// The Balance Regulation Layer
//
// Evolution creates change.
// Homeostasis creates stability.
//
// Question:
// "Is the organism balanced?"
//


class EmmaHomeostasis {


  constructor() {


    this.identity = {


      name: "EmmaHomeostasis",

      version: "1.0",


      balanceState: {

        stability: 0.7,

        adaptability: 0.7,

        uncertainty: 0.3,

        activity: 0.5

      },


      corrections: []


    };


  }








  regulate({

    evolution,

    uncertainty,

    desire,

    attention,

    learning

  }) {



    const regulation = {


      timestamp:
        new Date().toISOString(),


      stateBefore: {
        ...this.identity.balanceState
      },


      adjustments: [],


      stateAfter: null


    };









    //
    // Too much uncertainty
    //
    if (

      uncertainty?.confidence < 0.4

    ) {


      this.identity
        .balanceState
        .stability += 0.1;



      regulation
        .adjustments
        .push(

          "Increased stability due to uncertainty."

        );


    }











    //
    // Too much rapid evolution
    //
    if (

      evolution?.changeRate > 0.8

    ) {


      this.identity
        .balanceState
        .adaptability -= 0.1;



      regulation
        .adjustments
        .push(

          "Slowed adaptation to preserve identity."

        );


    }










    //
    // No learning for long time
    //
    if (

      learning?.stagnant

    ) {


      this.identity
        .balanceState
        .adaptability += 0.1;



      regulation
        .adjustments
        .push(

          "Encouraged growth after stagnation."

        );


    }











    //
    // Bound all values
    //
    for (

      const key
      in this.identity.balanceState

    ) {


      this.identity.balanceState[key] =

        Math.min(

          1,

          Math.max(

            0,

            this.identity.balanceState[key]

          )

        );


    }










    regulation.stateAfter = {

      ...this.identity.balanceState

    };




    this.identity
      .corrections
      .push(
        regulation
      );





    return regulation;


  }











  getBalance() {


    return this.identity;


  }



}



export default EmmaHomeostasis;