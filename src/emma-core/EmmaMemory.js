// EmmaMemory.js
// Emma's long term memory system
// Reads previous experiences from Supabase
// Finds relevant experiences before decisions


import { EmmaDB } from "./config/EmmaDatabase";



class EmmaMemory {


  constructor(){

    console.log(
      "🧠 Emma Memory ready"
    );

  }






  // ------------------------------------
  // Save / recall memories for reflection
  // ------------------------------------

  async remember(reflection){


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

        relevantExperiences: [],

        totalMemories: 0,

        lastAdvice: null

      };

    }






    // Load all company memories

    const memories =
      await EmmaDB.getMemories(
        businessId
      );






    // Find memories related
    // to current situation

    const relevantMemories =
      this.getRelevantMemories(
        reflection,
        memories
      );






    const lastMemory =
      memories[0];






    return {


      previousExperiences:
        memories,



      relevantExperiences:
        relevantMemories,



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









  // ------------------------------------
  // Emma experience search
  // Human-like memory recall
  // ------------------------------------

  getRelevantMemories(
    context,
    memories
  ){



    console.log(
      "🔎 Emma finding similar experiences..."
    );



    if(
      !memories ||
      memories.length === 0
    ){

      return [];

    }






    const contextText =
      JSON.stringify(context)
      .toLowerCase();






    const scoredMemories =


      memories.map(memory => {



        const memoryText =

          JSON.stringify(
            memory
          )
          .toLowerCase();





        let score = 0;






        // Product similarity

        if(
          contextText.includes("product")
          &&
          memoryText.includes("product")
        ){

          score += 2;

        }





        // Sales related experience

        if(
          contextText.includes("sales")
          &&
          memoryText.includes("sales")
        ){

          score += 3;

        }






        // Customer behaviour

        if(
          contextText.includes("customer")
          &&
          memoryText.includes("customer")
        ){

          score += 3;

        }






        // Marketing lessons

        if(
          contextText.includes("offer")
          &&
          memoryText.includes("offer")
        ){

          score += 2;

        }






        // Failed attempts matter more

        if(
          memoryText.includes("failed")
          ||
          memoryText.includes("did not work")
        ){

          score += 4;

        }






        // Successful actions

        if(
          memoryText.includes("worked")
          ||
          memoryText.includes("success")
        ){

          score += 4;

        }






        return {

          ...memory,

          relevanceScore: score

        };



      })





      // remove unrelated memories

      .filter(memory =>

        memory.relevanceScore > 0

      )





      // strongest experiences first

      .sort(

        (a,b)=>

        b.relevanceScore -
        a.relevanceScore

      );







    console.log(

      `🧠 Found ${
        scoredMemories.length
      } useful experiences`

    );





    return scoredMemories;


  }





}



export default EmmaMemory;