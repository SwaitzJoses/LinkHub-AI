import { EmmaDB } from "./config/EmmaDatabase";
import { processMemory } from "./EmmaMemory";


// =====================================
// Emma Reflection 🔄
//
// Job:
//
// Experience
//      ↓
// Understanding
//
// Converts EmmaEvent into thoughts
//
// =====================================


export async function reflectOnEvent(
  businessId,
  event
) {


  console.log(
    "Emma is reflecting 🔄:",
    event
  );



  if (!event) {

    console.log(
      "Emma reflection: no event"
    );

    return [];

  }



  // ===========================
  // Understand universal event
  // ===========================


  const eventType =
    event.type ||
    event.event_type ||
    "UNKNOWN_EVENT";


  const eventData =
    event.rawData ||
    event.event_data ||
    {};



  let reflection = null;




  // ===========================
  // Product intelligence
  // ===========================


  if (
    eventType === "PRODUCT_ADDED"
  ) {


    reflection = {


      type:
      "PRODUCT_PATTERN",


      thought:
      "Business is expanding its product catalogue",


      source:
      event.source,


      details: {

        product:
        eventData.name,

        category:
        eventData.category,

        price:
        eventData.price

      }

    };


  }





  // ===========================
  // Customer intelligence
  // ===========================


  if (
    eventType === "LEAD_CREATED" ||
    eventType === "CUSTOMER_MESSAGE"
  ) {


    reflection = {


      type:
      "CUSTOMER_PATTERN",


      thought:
      "Customers are showing interest",


      source:
      event.source,


      details:
      eventData


    };


  }





  // ===========================
  // Marketing intelligence
  // ===========================


  if (
    eventType === "POSTER_CREATED" ||
    eventType === "CAMPAIGN_CREATED"
  ) {


    reflection = {


      type:
      "MARKETING_PATTERN",


      thought:
      "Business is actively marketing",


      source:
      event.source,


      details:
      eventData


    };


  }





  // Nothing useful


  if (!reflection) {


    console.log(
      "Emma reflection: nothing important learned"
    );


    return [];

  }





  // ===========================
  // Store temporary memory
  // ===========================


  const { error } =
    await EmmaDB
    .from(
      "emma_working_memory"
    )
    .insert({


      business_id:
      businessId,


      memory_type:
      reflection.type,


      content:
      reflection,


      importance:
      0.5,


      expires_at:
      new Date(
        Date.now() +
        7*24*60*60*1000
      )


    });





  if(error){


    console.log(
      "Emma working memory error:",
      error
    );


    return [];


  }




  console.log(
    "Emma created working memory 🧠"
  );




  // ===========================
  // Decide permanent memory
  // ===========================


  await processMemory(

    businessId,

    reflection

  );





  return [
    reflection
  ];


}






// =====================================
// Emma public API
// =====================================


const EmmaReflection = {


  reflect:
  reflectOnEvent,


  reflectOnEvent:
  reflectOnEvent


};



export default EmmaReflection;