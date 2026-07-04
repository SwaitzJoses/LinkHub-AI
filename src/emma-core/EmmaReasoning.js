import { EmmaDB } from "./config/EmmaDatabase";
import { createEmmaInsight } from "./emmaInsight";


// ======================================
// Emma Reasoning 🤔
//
// Reads knowledge
// Thinks
// Creates insights
// ======================================


export async function reason(
  businessId
) {


  console.log(
  "🔥 NEW EMMA REASONING FILE LOADED"
);


  // If nobody gives business id,
  // Emma finds her owner herself


  if(!businessId){


    const {
      data:{user}
    } =
    await EmmaDB.auth.getUser();



    if(!user){

      console.log(
        "Emma reasoning: no owner"
      );


      return [];

    }



    businessId = user.id;


  }



  console.log(
    "👤 Emma reasoning for:",
    businessId
  );





  // ==========================
  // Read long term memory
  // ==========================


  const {
    data: memories,
    error
  } =
  await EmmaDB
    .from("emma_knowledge")
    .select("*")
    .eq(
      "business_id",
      businessId
    );





  if(error){


    console.log(
      "Emma knowledge read error:",
      error
    );


    return [];


  }





  console.log(
    "🧠 Emma knows:",
    memories
  );





  const insights = [];




  memories.forEach(
    (memory)=>{


      if(
        memory.knowledge_type
        ===
        "PRODUCT_PATTERN"
      ){


        insights.push({

          type:
          "MARKETING_ACTION",


          priority:
          "medium",


          message:
          "You are adding products regularly. Create a promotion campaign to attract customers."


        });


      }


    }
  );





  for(
    const insight of insights
  ){


    await createEmmaInsight(
      businessId,
      insight
    );


  }




  console.log(
    "💡 Emma created insights:",
    insights
  );



  return insights;


}




const EmmaReasoning = {

  reason

};


export default EmmaReasoning;