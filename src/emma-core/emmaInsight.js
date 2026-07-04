// EmmaInsight.js
// Emma's understanding layer
// Converts judgement into useful business insights


class EmmaInsight {


  constructor(){

    console.log(
      "💡 Emma Insight ready"
    );

  }



  async create(judgement){


    console.log(
      "💡 Creating insight:",
      judgement
    );



    if(
      judgement.shouldAct
    ){


      return {

        type:
          "actionable_insight",


        message:
          judgement.action,


        priority:
          judgement.priority,


        confidence:
          judgement.confidence,


        reason:
          judgement.reason

      };


    }




    return {

      type:
        "observation",


      message:
        "I noticed this, but I will wait for stronger signals before suggesting action.",


      priority:
        "low",


      confidence:
        judgement.confidence

    };


  }


}



export default EmmaInsight;