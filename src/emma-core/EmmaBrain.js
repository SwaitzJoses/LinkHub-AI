// EmmaBrain.js
// Emma's LLM brain
// Connection between Emma and OpenAI


import OpenAI from "openai";



const openai = new OpenAI({


  apiKey:

  import.meta.env.VITE_OPENAI_API_KEY,



  dangerouslyAllowBrowser:true


});








class EmmaBrain {




  constructor(){


    console.log(
      "🧠 Emma LLM Brain connected"
    );


  }









  async think(
    context
  ){



    try{





      const response =

      await openai.chat.completions.create({



        model:

        "gpt-4.1-mini",






        messages:[



          {


            role:"system",


            content:

            `
            You are Emma.

            You are not a chatbot.

            You are an AI growth employee.

            Think like someone working
            inside the business.

            Use:
            - memories
            - past success
            - failures
            - results

            before making decisions.
            `



          },









          {


            role:"user",


            content:

            JSON.stringify(context)



          }




        ]




      });











      return {


        success:true,


        response:

        response
        .choices[0]
        .message
        .content



      };





    }









    catch(error){



      console.error(

        "❌ Emma Brain error:",

        error

      );






      return {


        success:false,


        response:null



      };



    }





  }




}





export default new EmmaBrain();

