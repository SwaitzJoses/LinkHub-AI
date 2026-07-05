// EmmaCommunication.js
// Emma's communication layer
// Converts Emma's work into human communication


class EmmaCommunication {


  constructor(){

    console.log(
      "💬 Emma Communication ready"
    );

  }





  async reply(context){


    console.log(
      "💬 Preparing response:",
      context
    );



    const {

      insight,

      actionResult,

      outcome

    } = context;








    // If Emma successfully acted


    if(
      actionResult &&
      actionResult.success
    ){


      return {


        from:
        "Emma",


        message:
        `
        I analyzed the situation.

        I decided an action was useful.

        Action completed:
        ${actionResult.action}

        I will remember the outcome
        and use this experience for
        future decisions.
        `,


        priority:
        "medium",


        confidence:
        outcome?.success
        ? 80
        : 60,


        createdAt:
        new Date()


      };


    }









    // If Emma decided not to act


    return {


      from:
      "Emma",


      message:
      insight?.message ||
      "I reviewed the situation. I will continue observing before taking action.",


      priority:
      insight?.priority ||
      "low",


      confidence:
      insight?.confidence ||
      50,


      createdAt:
      new Date()


    };



  }



}



export default EmmaCommunication;