// EmmaDatabase.js
// Universal permanent memory storage for Emma

import { createClient } 
from "@supabase/supabase-js";



// Supabase connection

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL;


const supabaseKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY;



const supabase =
  createClient(
    supabaseUrl,
    supabaseKey
  );





export const EmmaDB = {




  // ==============================
  // SAVE EXPERIENCE TO MEMORY
  // ==============================


  async saveMemory(
    experience
  ){


    console.log(
      "💾 Emma saving universal memory...",
      experience
    );



    const { data, error } =
      await supabase

      .from("emma_memory")

      .insert({


        // Who owns this memory

        business_id:
          experience.input.businessId,




        // Where did this experience come from

        source:
          experience.input.source,




        // What type of event happened

        event_type:
          experience.input.type,





        // What Emma learned

        memory: {


          reflection:
            experience.reflection,


          reasoning:
            experience.reasoning,


          judgement:
            experience.judgement,


          insight:
            experience.insight,


          message:
            experience.message


        },






        // Facts behind the learning

        evidence: {


          original_event:
            experience.input,


          observation:
            experience.observation


        },






        // How important is this memory?

        importance:
          experience.judgement
          ?.priority || "normal"


      })


      .select();






    if(error){


      console.error(
        "❌ Emma memory save failed:",
        error
      );


      return null;


    }






    console.log(
      "🧠 Emma memory saved forever:",
      data
    );



    return data;


  },









  // ==============================
  // RETRIEVE BUSINESS MEMORY
  // ==============================



  async getMemories(
    businessId
  ){



    console.log(
      "🧠 Emma searching memories for:",
      businessId
    );




    const { data, error } =
      await supabase

      .from("emma_memory")

      .select("*")

      .eq(
        "business_id",
        businessId
      )

      .order(
        "created_at",
        {
          ascending:false
        }
      );






    if(error){


      console.error(
        "❌ Emma memory fetch failed:",
        error
      );


      return [];


    }






    console.log(
      "📚 Emma remembered:",
      data
    );



    return data;


  }






};