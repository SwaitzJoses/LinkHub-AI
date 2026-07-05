// EmmaDatabase.js
// Universal permanent memory storage for Emma
// Stores experience, outcomes and lessons


// import { createClient }
// from "@supabase/supabase-js";

import { supabase } from "../../lib/supabase";

// ==============================
// Supabase connection
// ==============================


// const supabaseUrl =
//   import.meta.env.VITE_SUPABASE_URL;



// const supabaseKey =
//   import.meta.env.VITE_SUPABASE_ANON_KEY;





// const supabase =
//   createClient(
//     supabaseUrl,
//     supabaseKey
//   );










export const EmmaDB = {









  // ==============================
  // SAVE FULL EXPERIENCE
  // ==============================



  async saveMemory(
    experience
  ){



    console.log(
      "💾 Emma saving memory:",
      experience
    );









    const { data,error } =
      await supabase


      .from("emma_memory")


      .insert({







        // OWNER


        business_id:

        experience
        ?.input
        ?.businessId,









        // EVENT SOURCE


        source:

        experience
        ?.input
        ?.source

        || "unknown",








        event_type:

        experience
        ?.input
        ?.type

        || "GENERAL",












        // BRAIN SNAPSHOT


        memory:{



          reflection:

          experience.reflection,





          reasoning:

          experience.reasoning,





          judgement:

          experience.judgement,





          action:

          experience.action,





          outcome:

          experience.outcome,





          message:

          experience.message




        },









        // WHY EMMA LEARNED THIS


        evidence:{



          original_event:

          experience.input,





          observation:

          experience.observation,





          result:

          experience
          ?.outcome
          ?.result





        },









        // LEARNING


        lesson:


        experience
        ?.outcome
        ?.learning

        || null,









        experience_type:


        experience
        ?.outcome
        ?.learning
        ?.type

        || "UNKNOWN",










        importance:



        experience
        ?.judgement
        ?.priority


        || "normal"








      })



      .select();









    if(error){



      console.error(
        "❌ Memory save failed:",
        error
      );



      return null;



    }










    console.log(
      "🧠 Memory stored permanently:",
      data
    );







    return data;



  },














  // ==============================
  // GET ALL BUSINESS MEMORY
  // ==============================




  async getMemories(
    businessId
  ){





    console.log(
      "🧠 Loading memories:",
      businessId
    );









    const {data,error} =

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
        "❌ Memory fetch failed:",
        error
      );



      return [];



    }








    return data || [];




  },













  // ==============================
  // GET IMPORTANT EXPERIENCE
  // ==============================



  async getImportantMemories(
    businessId
  ){





    const {data,error} =


    await supabase



    .from("emma_memory")



    .select("*")



    .eq(
      "business_id",
      businessId
    )



    .in(
      "importance",
      [
        "high",
        "critical"
      ]
    )



    .order(
      "created_at",
      {
        ascending:false
      }
    );








    if(error){


      console.error(error);


      return [];


    }







    return data || [];




  },













  // ==============================
  // DELETE OLD LOW VALUE MEMORY
  // future maintenance
  // ==============================




  async forgetMemory(
    memoryId
  ){





    const {error} =

    await supabase


    .from("emma_memory")


    .delete()


    .eq(
      "id",
      memoryId
    );








    if(error){



      console.error(
        "❌ Forget failed",
        error
      );



      return false;



    }








    return true;




  }








};