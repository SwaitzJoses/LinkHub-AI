// EmmaMemory.js
// Emma's long term memory system
// Reads previous experiences from Supabase


import { EmmaDB }
from "./config/EmmaDatabase";



class EmmaMemory {


  constructor(){

    console.log(
      "🧠 Emma Memory ready"
    );

  }





  async remember(
    reflection
  ){


    console.log(
      "🧠 Emma searching past experience..."
    );



    const businessId =
      reflection.businessId;



    if(!businessId){


      console.log(
        "No business id for memory search"
      );


      return {

        previousExperiences: [],

        totalMemories:0,

        lastAdvice:null

      };

    }




    const memories =
      await EmmaDB.getMemories(
        businessId
      );




    const lastMemory =
      memories[0];




    return {


      previousExperiences:
        memories,



      totalMemories:
        memories.length,



      lastAdvice:

        lastMemory
        ?.memory
        ?.reasoning
        ?.suggestion

        || null


    };


  }


}



export default EmmaMemory;