import { EmmaDB } from "./config/EmmaDatabase";


// =====================================
// Emma Memory 🧠
//
// Job:
//
// Decide:
// Forget 🗑️
// or
// Store as knowledge 💎
//
// =====================================


export async function processMemory(
  businessId,
  memory
) {


  console.log(
    "Emma is processing memory 🧠"
  );



  const importance =
    calculateImportance(memory);



  // ==============================
  // Forget low value memories
  // ==============================


  if (importance < 0.3) {


    console.log(
      "Emma forgot memory 🗑️"
    );


    return;

  }




  // ==============================
  // Store long term knowledge
  // ==============================


  const { error } =
    await EmmaDB
      .from("emma_knowledge")
      .insert({


        business_id:
          businessId,


        knowledge_type:
          memory.type,


        knowledge: {

          thought:
            memory.thought,


          details:
            memory.details || {},


          learned_from:
            memory.source

        },


        confidence:
          importance


      });



  if (error) {


    console.log(
      "Emma knowledge error:",
      error
    );


    return;

  }




  console.log(
    "Emma stored knowledge 💎"
  );


}




// =====================================
// Importance calculation
//
// Later Emma AI replaces this
// =====================================


function calculateImportance(
  memory
){


  let score = 0.5;



  if(
    memory.type ===
    "PRODUCT_PATTERN"
  ){

    score += 0.3;

  }



  if(
    memory.type ===
    "CUSTOMER_PATTERN"
  ){

    score += 0.4;

  }



  if(
    memory.type ===
    "MARKETING_PATTERN"
  ){

    score += 0.2;

  }



  return Math.min(
    score,
    1
  );

}



// =====================================
// Show Emma Memories 🧠
// =====================================


export async function showMemories(
  businessId
){

  console.log(
    "🧠 Emma Memories:"
  );


  const { data, error } =
    await EmmaDB
      .from("emma_knowledge")
      .select("*")
      .eq(
        "business_id",
        businessId
      );


  if(error){

    console.log(
      "Emma memory read error:",
      error
    );

    return [];

  }


  console.log(data);


  return data;

}



// =====================================
// Default Emma Memory API
// =====================================


const EmmaMemory = {


  process:
    processMemory,


  remember:
    processMemory,


  showMemories:
    showMemories


};


export default EmmaMemory;