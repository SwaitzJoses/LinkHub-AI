// EmmaExperienceEngine.js
//
// PROJECT BECOMING
//
// Experience Processor v2
//
// Emma.js connects.
// ExperienceEngine coordinates life events.
//
// PURPOSE:
// Transform experiences:
//
// attention
//    ↓
// memory filtering
//    ↓
// memory
//    ↓
// consolidation
//    ↓
// reflection
//    ↓
// learning
//    ↓
// reasoning
//    ↓
// choice
//
// RULE:
// Do not create intelligence here.
// Only coordinate Emma organs.


class EmmaExperienceEngine {


constructor({

    attention,

    memoryFilter,

    memory,

    memoryConsolidation,

    reflection,

    learning,

    reasoning,

    choice

}){


this.attention =
attention;



this.memoryFilter =
memoryFilter;



this.memory =
memory;



this.memoryConsolidation =
memoryConsolidation;



this.reflection =
reflection;



this.learning =
learning;



this.reasoning =
reasoning;



this.choice =
choice;





console.log(
"🧬 Emma Experience Engine v2 online"
);


}











// =================================
// EXPERIENCE PIPELINE
// =================================


async process(event={}){



console.log(
"👁 Emma experiencing:",
event
);







// ===============================
// 1. ATTENTION
// Should Emma care?
// ===============================


const attention =

await this.attention.evaluate(
event
);




if(!attention.payAttention){



return {


understood:
true,


ignored:
true,


attention,


message:

"Experience noticed but not meaningful enough to change me.",


createdAt:
new Date()


};



}









// ===============================
// 2. MEMORY FILTER
// Should this become memory?
// ===============================


const memoryDecision =

this.memoryFilter.analyze(
event
);




console.log(
"🧠 Memory decision:",
memoryDecision
);









let storedMemory =
null;



let reflection =
null;



let consolidation =
null;









// ===============================
// 3. STORE MEMORY
// ===============================


if(
memoryDecision.remember
){



storedMemory =

await this.memory.store({



...event,



memoryType:

memoryDecision.memoryType,



importance:

memoryDecision.importance,



reasons:

memoryDecision.reasons,



attention,



createdAt:

new Date()
.toISOString()



});









// ===============================
// 4. MICRO CONSOLIDATION
//
// Emma asks:
// "Does this change what I know?"
// ===============================


if(this.memoryConsolidation){



const recentMemories =

await this.memory.getAllMemories();




consolidation =

this.memoryConsolidation.sleep(
recentMemories
);



}










// ===============================
// 5. REFLECTION
// ===============================


reflection =

await this.reflection.reflect({



experience:
event,



storedMemory,



memoryDecision,



consolidation



});










// ===============================
// 6. LEARNING
// ===============================


await this.learning.learn({



reflection,



consolidation



});



}












// ===============================
// 7. REASONING
// ===============================


let thought =
null;




if(

attention.decision ===
"DEEP_THINK"

){



thought =

await this.reasoning.think({



experience:
event,



reflection,



memoryDecision,



consolidation



});



}












// ===============================
// 8. CHOICE
// ===============================


const finalChoice =

await this.choice.decide({



experience:
event,



attention,



memoryDecision,



reflection,



consolidation,



thought



});









// ===============================
// 9. EXPERIENCE RESULT
// ===============================


return {



understood:
true,



changed:

!!consolidation,



attention,



memoryDecision,



memory:

storedMemory,



consolidation,



reflection,



thought,



choice:
finalChoice,



message:

"Experience processed and integrated.",



timestamp:

new Date()
.toISOString()



};



}







}



export default EmmaExperienceEngine;