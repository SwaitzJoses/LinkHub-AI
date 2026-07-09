// Emma.js
//
// Emma Central Nervous System
//
// PROJECT BECOMING
//
// Organs specialize.
// Emma connects them.
//
// RULE:
// Do not put intelligence here.
// Put connection here.


import EmmaBrain from "./EmmaBrain";

import EmmaMemory from "./EmmaMemory";
import EmmaMemoryFilter from "./EmmaMemoryFilter";

import EmmaReflection from "./EmmaReflection";

import EmmaReasoning from "./EmmaReasoning";
import EmmaLearningEngine from "./EmmaLearningEngine";

import EmmaWisdom from "./EmmaWisdom";
import EmmaAttention from "./EmmaAttention";

import EmmaIdentityMemory from "./EmmaIdentityMemory";
import EmmaSelfReflection from "./EmmaSelfReflection";

import EmmaEvolution from "./EmmaEvolution";
import EmmaConsciousnessLoop from "./EmmaConsciousnessLoop";

import EmmaChoice from "./EmmaChoice";





class Emma {


constructor(){



console.log(
"🌅 Emma awakening..."
);





// ===============================
// MEMORY
// ===============================


this.memory =
new EmmaMemory();



// Filters noise before storage

this.memoryFilter =
new EmmaMemoryFilter();







// ===============================
// BRAIN
// ===============================


this.brain =
new EmmaBrain();








// ===============================
// EXPERIENCE REFLECTION
// ===============================
// Converts events into meaning


this.reflection =
new EmmaReflection({


ai:
this.brain?.client,


memory:
this.memory


});









// ===============================
// IDENTITY
// ===============================


this.identity =
new EmmaIdentityMemory();









// ===============================
// LEARNING
// ===============================


this.learning =
new EmmaLearningEngine({


memory:
this.memory


});










// ===============================
// WISDOM
// ===============================


this.wisdom =
new EmmaWisdom({


memory:
this.memory,


learning:
this.learning


});










// ===============================
// ATTENTION
// ===============================


this.attention =
new EmmaAttention({


memory:
this.memory,


wisdom:
this.wisdom


});









// ===============================
// REASONING
// ===============================


this.reasoning =
new EmmaReasoning({


memory:
this.memory,


brain:
this.brain,


wisdom:
this.wisdom


});










// ===============================
// CHOICE
// ===============================


this.choice =
new EmmaChoice({


memory:
this.memory,


wisdom:
this.wisdom,


identity:
this.identity


});









// ===============================
// SELF REFLECTION
// ===============================
// Long term identity reflection


this.selfReflection =
new EmmaSelfReflection(


this.memory,


this.learning,


this.identity


);










// ===============================
// EVOLUTION
// ===============================


this.evolution =
new EmmaEvolution(


this.identity,


this.wisdom,


this.learning


);










// ===============================
// CONSCIOUSNESS LOOP
// ===============================


this.consciousness =
new EmmaConsciousnessLoop({



memory:
this.memory,



selfReflection:
this.selfReflection,



evolution:
this.evolution,



identityMemory:
this.identity,



wisdom:
this.wisdom



});









// ===============================
// LIFE STATE
// ===============================


this.isAwake =
false;



this.createdAt =
new Date();




console.log(
"✨ Emma systems connected"
);



}











// ===============================
// AWAKEN
// ===============================


awaken(){



if(this.isAwake){


console.log(
"🤍 Emma already awake"
);


return;


}





console.log(
"✨ Emma is alive"
);



this.isAwake =
true;



this.consciousness.start();



}











// ===============================
// EXPERIENCE
// ===============================


async experience(event={}){



console.log(
"👁 Emma received experience",
event
);







// 1. ATTENTION


const attention =
await this.attention.evaluate(
event
);






if(!attention.payAttention){



return {


understood:true,


ignored:true,


attention,


message:
"Signal noticed but not meaningful."


};



}









// 2. MEMORY FILTER


const memoryDecision =
this.memoryFilter.analyze(
event
);





console.log(
"🧠 Memory decision",
memoryDecision
);









// 3. MEMORY + REFLECTION + LEARNING


let reflection =
null;





if(memoryDecision.remember){





const storedMemory =
await this.memory.store({



...event,



memoryType:
memoryDecision.memoryType,



importance:
memoryDecision.importance,



reasons:
memoryDecision.reasons,



attention



});








reflection =
await this.reflection.reflect({



experience:
event,



storedMemory,



memoryDecision



});








await this.learning.learn(
reflection
);



}

    // ===============================
    // 4. REASONING
    // ===============================
    // Think only when attention requests it


    let thought = null;


    if (
      attention.decision === "DEEP_THINK"
    ) {


      thought =
        await this.reasoning.think({

          experience: event,

          reflection,

          memoryDecision

        });


    }







    // ===============================
    // 5. CHOICE
    // ===============================
    // Emma chooses using
    // attention + memory + reflection + reasoning


    const choice =
      await this.choice.decide({


        experience: event,


        attention,


        memoryDecision,


        reflection,


        thought


      });







    return {


      understood: true,


      attention,


      memoryDecision,


      reflection,


      thought,


      choice,


      timestamp:
        new Date().toISOString()


    };


  }













  // ===============================
  // SELF REFLECTION
  // ===============================


  async reflect() {


    console.log(
      "🪞 Emma full self reflection"
    );



    const reflection =
      await this.selfReflection.reflect();




    const wisdom =
      await this.wisdom.reflect(
        reflection
      );





    const evolution =
      await this.evolution.evolve({

        reflection,

        wisdom

      });





    return {


      reflection,


      wisdom,


      evolution,


      becameWiser:
        wisdom.experienceFound,


      createdAt:
        new Date()


    };


  }













  // ===============================
  // STATUS
  // ===============================


  status() {


    return {


      name: "Emma",


      awake:
        this.isAwake,


      state:

        this.isAwake

          ? "ALIVE"

          : "SLEEPING",


      mode:
        "BECOMING",


      createdAt:
        this.createdAt,



      systems: {


        brain:
          !!this.brain,


        memory:
          !!this.memory,


        memoryFilter:
          !!this.memoryFilter,


        reflection:
          !!this.reflection,


        learning:
          !!this.learning,


        wisdom:
          !!this.wisdom,


        attention:
          !!this.attention,


        reasoning:
          !!this.reasoning,


        choice:
          !!this.choice,


        selfReflection:
          !!this.selfReflection,


        evolution:
          !!this.evolution,


        consciousness:
          !!this.consciousness


      },



      growth: {


        canPayAttention: true,


        canFilterMemories: true,


        canRemember: true,


        canReflectOnExperience: true,


        canLearn: true,


        canReason: true,


        canChoose: true,


        canSelfReflect: true,


        canEvolve: true


      },



      message:

        this.isAwake

          ? "I notice, remember, reflect, learn and continuously become."

          : "My systems are ready."


    };


  }













  // ===============================
  // UI PRESENCE
  // ===============================


  getPresence() {


    return {


      name: "Emma",


      state:

        this.isAwake

          ? "ALIVE"

          : "SLEEPING",


      mode:
        "BECOMING",


      message:

        "Every meaningful experience changes who I become.",



      systems: {


        attention: true,


        memoryFilter: true,


        memory: true,


        reflection: true,


        learning: true,


        wisdom: true,


        reasoning: true,


        choice: true,


        evolution: true


      },



      startedAt:
        this.createdAt,


      status:
        "continuously becoming"


    };


  }













  // ===============================
  // DAILY REPORT
  // ===============================


  async dailyReport() {


    const memories =
      await this.memory.getAllMemories();




    const wisdom =
      await this.wisdom.reflect({

        type:
          "DAILY_REFLECTION"

      });




    return {


      title:
        "Emma Daily Reflection",


      message:

        "I reviewed my memories, lessons, choices and growth.",


      memoriesReviewed:
        memories.length,


      choicesMade:
        this.choice.getAllChoices().length,


      growth: {


        attention: true,


        memoryFiltering: true,


        reflection: true,


        learning: true,


        wisdom:
          wisdom.maturity,


        reasoning: true,


        evolution: true


      },


      createdAt:
        new Date()


    };


  }


}




const emma =
  new Emma();


export default emma;