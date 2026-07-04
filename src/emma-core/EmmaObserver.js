import { EmmaDB } from "./config/EmmaDatabase";
import { reflectOnEvent } from "./EmmaReflection";


// ===================================
// Emma Observer 👀
//
// Emma's eyes
// Receives experiences from any source
//
// LinkHub
// WhatsApp
// Shopify
// POS
// Calendar
//
// Everything enters Emma here
// ===================================


export async function recordEmmaEvent(
  eventType,
  eventData = {},
  source = "LINKHUB"
) {


  // Who owns this experience?

  const {
    data: { user },
  } = await EmmaDB.auth.getUser();



  if (!user) {

    console.log(
      "Emma Observer: no user found"
    );

    return;

  }



  // ===========================
  // Save raw experience
  // ===========================


  const { error } = await EmmaDB
    .from("emma_events")
    .insert({

      business_id: user.id,

      source: source,

      event_type: eventType,

      event_data: eventData,

    });



  if (error) {

    console.log(
      "Emma memory error:",
      error
    );

    return;

  }




  console.log(
    "Emma observed 👀:",
    eventType
  );




  // ===========================
  // Send to Reflection
  //
  // Observer does NOT think
  // ===========================


  await reflectOnEvent(

    user.id,

    eventType,

    eventData

  );


}



// ===================================
// Compatibility with Emma.js
// ===================================


const EmmaObserver = {


  observe: recordEmmaEvent,


  recordEmmaEvent: recordEmmaEvent,


};



export default EmmaObserver;