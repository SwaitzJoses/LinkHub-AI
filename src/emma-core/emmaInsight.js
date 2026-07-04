import { EmmaDB } from "./config/EmmaDatabase";


// =======================================
// Emma Insight 💡
//
// Job:
//
// Store Emma's recommendations
// for the business owner
//
// =======================================


export async function createEmmaInsight(
  businessId,
  insight
) {


  console.log(
    "💡 Emma creating insight:",
    insight
  );



  if (!businessId || !insight) {


    console.log(
      "Emma Insight: missing data"
    );


    return;

  }





  const { error } =
    await EmmaDB
      .from("emma_insights")
      .insert({


        business_id:
        businessId,


        insight_type:
        insight.type,


        message:
        insight.message,


        priority:
        insight.priority || "medium",


        status:
        "new"


      });





  if(error){


    console.log(
      "Emma insight save error:",
      error
    );


    return;


  }





  console.log(
    "💡 Emma insight saved"
  );


}






// =================================
// Read insights
// =================================


export async function getEmmaInsights(
  businessId
){


  const { data, error } =
    await EmmaDB
      .from("emma_insights")
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


    console.log(
      "Emma insight read error:",
      error
    );


    return [];

  }



  return data;


}






const EmmaInsight = {


  create:
  createEmmaInsight,


  get:
  getEmmaInsights


};



export default EmmaInsight;