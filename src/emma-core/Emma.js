// Emma.js
// Emma's central nervous system
// Coordinates all Emma brain layers


import EmmaBrain from "./EmmaBrain";

import UniversalTranslator
from "./translators/UniversalTranslator";


import LinkHubConnector
from "./connectors/LinkHubConnector";


import EmmaObserver
from "./EmmaObserver";


import EmmaReflection
from "./EmmaReflection";


import EmmaMemory
from "./EmmaMemory";


import EmmaReasoning
from "./EmmaReasoning";


import EmmaJudgement
from "./EmmaJudgement";


import EmmaInsight
from "./EmmaInsight";


import EmmaCommunication
from "./EmmaCommunication";


import EmmaActionExecutor
from "./EmmaActionExecutor";


import EmmaOutcome
from "./EmmaOutcome";


import EmmaCapabilities
from "./EmmaCapabilities";


import { EmmaDB }
from "./config/EmmaDatabase";






class Emma {


  constructor(){


    console.log(
      "🧠 Emma AI Employee waking up..."
    );


    // External connectors

    this.linkhub =
      new LinkHubConnector();



    // Translation layer

    this.translator =
      new UniversalTranslator();




    // Emma brain

    this.observer =
      new EmmaObserver();



    this.reflection =
      new EmmaReflection();



    this.memory =
      new EmmaMemory();



    this.reasoning =
      new EmmaReasoning();




    // Emma skill awareness

    this.capabilities =
      EmmaCapabilities;




    // Emma decision system

    this.judgement =
      new EmmaJudgement();




    // Emma output layers

    this.insight =
      new EmmaInsight();



    this.communication =
      new EmmaCommunication();




    // Emma hands

    this.actionExecutor =
      EmmaActionExecutor;




    // Emma experience

    this.outcome =
      EmmaOutcome;


  }









  // =========================
  // CONNECTOR ENTRY POINT
  // =========================


  async analyzeLinkHub(
    businessData
  ){


    console.log(
      "🔗 Emma received external data",
      businessData
    );


    const event =
      this.linkhub.createEvent(
        businessData
      );


    return await this.think(
      event
    );


  }










  // =========================
  // MAIN EMMA LOOP
  // =========================


  async think(input){


    console.log(
      "🤖 Emma started working..."
    );



    try {




      // 1. Translate


      const translatedEvent =
        await this.translator.translate(
          input
        );


      console.log(
        "🌎 Translated:",
        translatedEvent
      );








      // 2. Observe


      const observation =
        await this.observer.observe(
          translatedEvent
        );


      console.log(
        "👀 Observation:",
        observation
      );








      // 3. Reflect


      const reflection =
        await this.reflection.reflect(
          observation
        );


      console.log(
        "🤔 Reflection:",
        reflection
      );








      // 4. Remember


      const memories =
        await this.memory.remember(
          reflection
        );


      console.log(
        "🧠 Memory:",
        memories
      );









      // 5. Reason


      const reasoning =
        await this.reasoning.think(
          reflection,
          memories
        );


      console.log(
        "💭 Reasoning:",
        reasoning
      );









      // 6. Check available skills


      const capabilities =
        this.capabilities.getSkills();


      console.log(
        "🖐️ Available Skills:",
        capabilities
      );










      // 7. Judge


      const judgement =
        await this.judgement.judge(

          reasoning,

          memories,

          capabilities

        );


      console.log(
        "⚖️ Judgement:",
        judgement
      );











      // 8. Create insight


      const insight =
        await this.insight.create(
          judgement
        );


      console.log(
        "💡 Insight:",
        insight
      );










      // 9. Act


      const actionResult =
        await this.actionExecutor.execute(
          judgement
        );


      console.log(
        "🖐️ Action:",
        actionResult
      );










      // 10. Learn outcome


      const outcome =
        await this.outcome.record(
          judgement,
          actionResult
        );


      console.log(
        "📊 Outcome:",
        outcome
      );











      // 11. Communicate


      const message =
        await this.communication.reply({

          insight,

          actionResult,

          outcome

        });


      console.log(
        "💬 Emma says:",
        message
      );










      // 12. Save experience


      await EmmaDB.saveMemory({

        input,

        observation,

        reflection,

        memories,

        reasoning,

        capabilities,

        judgement,

        insight,

        actionResult,

        outcome,

        message

      });








      return message;



    }


    catch(error){


      console.error(
        "❌ Emma brain error:",
        error
      );



      return {

        from:
        "Emma",


        message:
        "I need more context before deciding the best action.",


        priority:
        "low"

      };


    }


  }


}





export default Emma;