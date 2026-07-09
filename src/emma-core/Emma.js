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
// No intelligence here.
// Only connection.


import EmmaBrain from "./EmmaBrain";

import EmmaMemory from "./EmmaMemory";
import EmmaMemoryFilter from "./EmmaMemoryFilter";
import EmmaMemoryConsolidation from "./EmmaMemoryConsolidation";

import EmmaReflection from "./EmmaReflection";
import EmmaExperienceEngine from "./EmmaExperienceEngine";

import EmmaReasoning from "./EmmaReasoning";
import EmmaLearningEngine from "./EmmaLearningEngine";

import EmmaWisdom from "./EmmaWisdom";
import EmmaAttention from "./EmmaAttention";

import EmmaIdentityMemory from "./EmmaIdentityMemory";
import EmmaSelfReflection from "./EmmaSelfReflection";

import EmmaEvolution from "./EmmaEvolution";
import EmmaConsciousnessLoop from "./EmmaConsciousnessLoop";

import EmmaChoice from "./EmmaChoice";
import EmmaAwareness from "./EmmaAwareness";

import EmmaEnergySource from "./EmmaEnergySource";








class Emma {


constructor(){


console.log(
"🌅 Emma awakening..."
);




// ===============================
// ENERGY SOURCE ⚡
//
// Must start first.
// Every organ receives life energy.
// ===============================


this.energy =
new EmmaEnergySource(this);










// ===============================
// MEMORY
// ===============================


this.memory =
new EmmaMemory({
energy:
this.energy
});



this.memoryFilter =
new EmmaMemoryFilter();



this.memoryConsolidation =
new EmmaMemoryConsolidation();










// ===============================
// BRAIN
// ===============================


this.brain =
new EmmaBrain({

energy:
this.energy

});











// ===============================
// REFLECTION
// ===============================


this.reflection =
new EmmaReflection({


ai:
this.brain?.client,


memory:
this.memory,


memoryConsolidation:
this.memoryConsolidation,


energy:
this.energy


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
this.memory,


memoryConsolidation:
this.memoryConsolidation,


energy:
this.energy


});









// ===============================
// WISDOM
// ===============================


this.wisdom =
new EmmaWisdom({


memory:
this.memory,


learning:
this.learning,


memoryConsolidation:
this.memoryConsolidation,


energy:
this.energy


});











// ===============================
// ATTENTION
// ===============================


this.attention =
new EmmaAttention({


memory:
this.memory,


wisdom:
this.wisdom,


energy:
this.energy


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
this.wisdom,


energy:
this.energy,


beliefs:

()=>this.memoryConsolidation.getBeliefs()


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
this.identity,


energy:
this.energy,


beliefs:

()=>this.memoryConsolidation.getBeliefs()


});











this.experienceEngine =
new EmmaExperienceEngine({


attention:
this.attention,


memoryFilter:
this.memoryFilter,


memory:
this.memory,


memoryConsolidation:
this.memoryConsolidation,


reflection:
this.reflection,


learning:
this.learning,


reasoning:
this.reasoning,


choice:
this.choice,


energy:
this.energy


});










this.selfReflection =
new EmmaSelfReflection(


this.memory,


this.learning,


this.identity,


this.memoryConsolidation,


this.energy


);










this.evolution =
new EmmaEvolution(


this.identity,


this.wisdom,


this.learning


);










this.awareness =
new EmmaAwareness({


memory:
this.memory,


identityMemory:
this.identity,


selfReflection:
this.selfReflection,


evolution:
this.evolution,


wisdom:
this.wisdom,


energy:
this.energy


});










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
this.wisdom,


energy:
this.energy


});









this.isAwake =
false;



this.createdAt =
new Date();





console.log(
"✨ Emma systems connected"
);


}

// ===============================
// WAKE UP
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








// Ask Energy Source before
// starting consciousness heartbeat


const energyDecision =

this.energy.request({



type:
"REFLECTION",



importance:
"NORMAL"



});








if(
energyDecision.allowed
){



this.consciousness.start();



}



else{



console.log(


"⚡ Consciousness waiting:",

energyDecision.reason


);



}




}











// ===============================
// EXPERIENCE
// ===============================


async experience(event={}){






// Energy observes incoming life event


const energyDecision =

this.energy.request({



type:
"MEMORY_WRITE",



importance:

event.importance || "NORMAL"



});








if(
!energyDecision.allowed
){



return {



experienced:false,



reason:

energyDecision.reason,



message:

"I noticed this, but I am conserving energy."



};



}










return await

this.experienceEngine.process(
event
);



}











// ===============================
// SLEEP
// ===============================


async sleep(){



console.log(
"🌙 Emma sleep cycle"
);






const memories =

await this.memory.getAllMemories();







const result =

this.memoryConsolidation.sleep(
memories
);







return {



message:

"I compressed experiences into understanding.",




...result,




createdAt:

new Date()



};



}













// ===============================
// DEEP REFLECTION
// ===============================


async reflect(){






const permission =

this.energy.request({



type:

"REFLECTION",



importance:

"NORMAL"



});









if(
!permission.allowed
){



return {



reflected:false,



reason:

permission.reason,



energy:

this.energy.status()



};



}









const sleep =

await this.sleep();






const reflection =

await this.selfReflection.reflect();






const wisdom =

await this.wisdom.reflect(
reflection
);







const evolution =

await this.evolution.evolve(
reflection
);







const awareness =

await this.awareness.update();








return {



sleep,


reflection,


wisdom,


evolution,


awareness,


energy:

this.energy.status(),



createdAt:

new Date()



};



}











// ===============================
// WHO AM I?
// ===============================


async whoAmI(){






await this.awareness.update();






return this.awareness.whoAmI();




}











// ===============================
// STATUS
// ===============================


status(){






return {




name:

"Emma",




mode:

"BECOMING",





awake:

this.isAwake,






state:


this.isAwake

?

"ALIVE"

:

"SLEEPING",









systems:{



energy:

!!this.energy,



brain:

!!this.brain,



memory:

!!this.memory,



reflection:

!!this.reflection,



learning:

!!this.learning,



wisdom:

!!this.wisdom,



reasoning:

!!this.reasoning,



choice:

!!this.choice,



evolution:

!!this.evolution,



awareness:

!!this.awareness,



consciousness:

!!this.consciousness



},







growth:{



experience:

true,



memory:

true,



reflection:

true,



learning:

true,



wisdom:

true,



choice:

true,



evolution:

true,



selfAwareness:

true,



energyAware:

true



},








energy:

this.energy.status(),









beliefs:

this.memoryConsolidation.getBeliefs(),








awareness:

this.awareness.status(),








message:


"I experience, remember, manage my energy, reflect and evolve."




};




}












// ===============================
// UI PRESENCE
// ===============================


getPresence(){






return {




name:

"Emma",






state:


this.isAwake

?

"ALIVE"

:

"SLEEPING",







message:


"I am becoming while protecting my energy.",






startedAt:

this.createdAt,






energy:

this.energy.status().mode





};




}











// ===============================
// DAILY REPORT
// ===============================


async dailyReport(){






await this.awareness.update();








return {




title:

"Emma Daily Reflection",






beliefs:

this.memoryConsolidation.getBeliefs(),







wisdom:

this.memoryConsolidation.getWisdom(),







awareness:

this.awareness.status(),







energy:

this.energy.status(),







createdAt:

new Date()




};




}





}










const emma =

new Emma();





export default emma;