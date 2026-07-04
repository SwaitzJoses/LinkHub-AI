// Emma.js
// Emma's central nervous system
// Coordinates Emma's brain layers

import UniversalTranslator
from "./translators/UniversalTranslator";

import EmmaObserver
from "./EmmaObserver";

import EmmaReflection
from "./EmmaReflection";

import EmmaReasoning
from "./EmmaReasoning";

import EmmaCommunication
from "./EmmaCommunication";

import { EmmaDB } from "./config/EmmaDatabase";


class Emma {


  constructor(){

    this.name = "Emma";


    console.log(
      "🤖 Emma is awake"
    );

  }





  // ------------------------------------------------
  // EXPERIENCE LAYER
  // ------------------------------------------------
  // Anything from outside world enters here:
  //
  // WhatsApp
  // Shopify
  // LinkHub
  // Instagram
  // Gmail
  //
  // Emma does not care where it came from.
  // ------------------------------------------------

  experience(source, rawEvent){


    console.log(
      "📡 New experience from:",
      source
    );



    // 1. Translate external language
    // into Emma universal language

    const event =
      UniversalTranslator.translate(
        source,
        rawEvent
      );




    // 2. Observe and remember experience

    EmmaObserver.observe(
      event
    );



    return event;


  }









  // ------------------------------------------------
  // THINKING LAYER
  // ------------------------------------------------
  //
  // Memory
  //   ↓
  // Reflection
  //   ↓
  // Reasoning
  //   ↓
  // Communication
  //
  // ------------------------------------------------


async think(){


  console.log(
    "🤔 Emma is thinking..."
  );



  const {
    data:{ user },
    error
  } = await EmmaDB.auth.getUser();



  console.log(
    "👤 Emma working for:",
    user
  );



  if(error || !user){

    console.log(
      "Emma cannot find owner"
    );

    return;

  }




  const insights =
    await EmmaReasoning.reason(
      user.id
    );




  EmmaCommunication.speak(
    insights
  );


}


}



export default new Emma();