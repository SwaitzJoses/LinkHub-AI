// EmmaCommunication.js
// Emma's personality and communication layer

class EmmaCommunication {


  speak(decisions){


    const messages =
      decisions.map(decision => {


        return this.createMessage(
          decision
        );


      });



    console.log(
      "🗣 Emma says:",
      messages
    );


    return messages;


  }






  createMessage(decision){



    if(
      decision.confidence >= 3
    ){


      return {

        message:
        `
I noticed something interesting.

${decision.conclusion}

I have seen this pattern multiple times,
so I think this is worth your attention.
        `,


        emotion:"confident",


        confidence:
        decision.confidence


      };


    }





    return {


      message:
      `
I noticed something happening.

I will continue observing before making
a strong suggestion.
      `,


      emotion:"curious",


      confidence:
      decision.confidence


    };


  }


}



export default new EmmaCommunication();