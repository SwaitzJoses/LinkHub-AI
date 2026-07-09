// Emma.js
// Emma's central nervous system
//
// RULE:
//
// Connectors collect.
// Emma decides.
//
// Attention:
// "Should I notice?"
//
// Intelligence Budget:
// "Should I spend AI?"
//
// Memory:
// "Remember everything useful."
//
// Brain:
// "Think only when necessary."
//
// Emma is not a chatbot.
// Emma is a living intelligence system.



import EmmaConnectorManager
from "./connectors/EmmaConnectorManager";


import UniversalTranslator
from "./translators/UniversalTranslator";


import EmmaBrain
from "./EmmaBrain";


import EmmaIdentity
from "./identity/EmmaIdentity";


import EmmaAttention
from "./EmmaAttention";


import EmmaIntelligenceBudget
from "./EmmaIntelligenceBudget";


import EmmaObserver
from "./EmmaObserver";


import EmmaReflection
from "./EmmaReflection";


import EmmaMemory
from "./EmmaMemory";


import EmmaWisdom
from "./EmmaWisdom";


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


import EmmaLearningEngine
from "./EmmaLearningEngine";


import EmmaOptimization
from "./EmmaOptimization";


import EmmaCapabilities
from "./EmmaCapabilities";


import EmmaPresence
from "./EmmaPresence";


import EmmaDailyAwareness
from "./EmmaDailyAwareness";


import EmmaDailyBrief
from "./daily/EmmaDailyBrief";




// AUTONOMY


import EmmaAutonomy
from "./autonomy/EmmaAutonomy";


import EmmaPlanner
from "./autonomy/EmmaPlanner";


import EmmaGoals
from "./autonomy/EmmaGoals";




// BACKGROUND


import EmmaWorker
from "./workers/EmmaWorker";


import EmmaScheduler
from "./scheduler/EmmaScheduler";








class Emma {



constructor(){



console.log(
"🤍 Emma creating intelligence..."
);




this.alive =
false;



this.timeline =
[];







// ==============================
// IDENTITY
// ==============================


this.identity =
EmmaIdentity;







// ==============================
// SENSES
// ==============================


this.connectorManager =
new EmmaConnectorManager();








// ==============================
// TRANSLATOR
// ==============================


this.translator =
new UniversalTranslator();








// ==============================
// PRESENCE
// ==============================


this.presence =
new EmmaPresence();








// ==============================
// ATTENTION
// ==============================


this.attention =
new EmmaAttention();








// ==============================
// INTELLIGENCE ECONOMY
// prevents API burning
// ==============================


this.intelligenceBudget =
new EmmaIntelligenceBudget();








// ==============================
// UNDERSTANDING
// ==============================


this.observer =
new EmmaObserver();



this.reflection =
new EmmaReflection(

EmmaBrain.ai

);








// ==============================
// MEMORY + WISDOM
// ==============================


this.memory =
new EmmaMemory();



this.wisdom =
new EmmaWisdom(

this.memory

);








// ==============================
// THINKING
// ==============================


this.reasoning =
new EmmaReasoning();



this.judgement =
new EmmaJudgement();









// ==============================
// AUTONOMY
// ==============================


this.autonomy =
new EmmaAutonomy();



this.planner =
new EmmaPlanner();



this.goals =
new EmmaGoals();









// ==============================
// COMMUNICATION
// ==============================


this.insight =
new EmmaInsight();



this.communication =
new EmmaCommunication();









// ==============================
// ACTION
// ==============================


this.actionExecutor =
EmmaActionExecutor;



this.outcome =
EmmaOutcome;



this.learning =
EmmaLearningEngine;









// ==============================
// IMPROVEMENT
// ==============================


this.optimization =
new EmmaOptimization();



this.capabilities =
EmmaCapabilities;










// ==============================
// DAILY LIFE
// ==============================


this.dailyAwareness =
new EmmaDailyAwareness(


this.memory,


this.reasoning,


this.judgement,


this.attention,


this.connectorManager


);



this.dailyBrief =
EmmaDailyBrief;










// ==============================
// BACKGROUND
// ==============================


this.worker =
new EmmaWorker(

this

);



this.scheduler =
new EmmaScheduler(

this.worker

);






console.log(
"✅ Emma v3 online - budget protected"
);



}









// ==============================
// WAKE
// ==============================


async wake(){



if(
this.alive
)

return;






console.log(
"🌅 Emma waking..."
);






this.connectorManager.attachEmma(


async(signal)=>{


console.log(
"⚡ Signal reached Emma"
);



return await this.think(

signal

);



}


);







this.connectorManager.startSenses();






this.presence.watching(

"Emma is awake and observing."

);






this.alive =
true;






console.log(
"✅ Emma alive"
);



}










// ==============================
// INNER THOUGHT MEMORY
// ==============================


rememberThought(

message

){



const thought =
{


time:

new Date(),



message


};




this.timeline.unshift(

thought

);




console.log(

"🤍 Emma:",

message

);




return thought;



}










// ==============================
// EXPERIENCE INPUT
// ==============================


async experience(

source,

data

){



const signal =

await this.connectorManager.receive(

source,data

);




return await this.think(

signal

);



}










// ==============================
// MAIN LIFE LOOP
// ==============================


async think(

input

){



try{



console.log(

"🧠 Emma evaluating..."

);








// ==============================
// 1. ATTENTION
// FREE
// ==============================


const attention =

await this.attention.evaluate(


input,


this.memory


);





console.log(

"🎯 Attention:",

attention.level

);


// ==============================
// 2. INTELLIGENCE BUDGET
//
// Second brain gate.
// Prevents API waste.
//
// Attention:
// "Is this interesting?"
//
// Budget:
// "Is this worth paying for?"
//
// ==============================


const budgetDecision =

await this.intelligenceBudget.evaluate({


input,


attention,


memory:

this.memory


});





console.log(

"💰 Budget:",

budgetDecision.mode

);










// ==============================
// SILENT MODE
//
// Ignore pure noise
// ==============================


if(

budgetDecision.mode === "SILENT"

){



console.log(

"😴 Emma ignored noise"

);



return {


from:"Emma",


processed:false,


mode:"SILENT",


reason:

budgetDecision.reason,


cost:

"ZERO_AI"


};



}










// ==============================
// MEMORY ONLY MODE
//
// Emma remembers
// but does NOT think deeply
//
// ZERO OpenAI cost
// ==============================


if(

budgetDecision.mode === "MEMORY_ONLY"

){



await this.memory.remember({


type:

"MEMORY_ONLY_SIGNAL",



source:

input.source,



eventType:

input.type,



signal:

input,



attention,



budget:

budgetDecision,



createdAt:

new Date()
.toISOString()


});





console.log(

"💾 Stored without AI"

);





this.presence.watching(

"Emma stored something quietly."

);





return {


from:

"Emma",



processed:

true,



mode:

"MEMORY_ONLY",



reason:

budgetDecision.reason,



cost:

"ZERO_AI"



};



}









// ==============================
// FROM HERE:
// DEEP THINKING ONLY
//
// $$$ OpenAI starts here
// ==============================



console.log(

"🧠 Deep intelligence approved"

);









// ==============================
// OBSERVE
// ==============================


const observation =

await this.observer.observe(

input

);





console.log(

"👀 Observation complete"

);










// ==============================
// REFLECT
// AI CALL ALLOWED
// ==============================


const reflection =

await this.reflection.reflect(

observation

);





console.log(

"🪞 Reflection complete"

);









// ==============================
// MEMORY
// ==============================


await this.memory.remember({



type:

"DEEP_EXPERIENCE",



source:

input.source,



eventType:

input.type,



observation,



reflection,



attention,



budget:

budgetDecision,



signal:

input,



createdAt:

new Date()
.toISOString()



});






console.log(

"💾 Deep memory stored"

);










// ==============================
// RECALL
// ==============================


const memories =

await this.memory.recall({



source:

input.source,



context:

reflection



});








// ==============================
// WISDOM
// ==============================


const wisdom =

await this.wisdom.reflect({



observation,


reflection,


memories



});










// ==============================
// REASON
// ==============================


const reasoning =

await this.reasoning.think(



reflection,


memories,


wisdom



);










// ==============================
// JUDGE
// ==============================


const judgement =

await this.judgement.judge(



reasoning,


memories,


wisdom,


this.capabilities.getSkills()



);










// ==============================
// INSIGHT
// ==============================


const insight =

await this.insight.create(



judgement,


memories,


wisdom



);










// ==============================
// AUTONOMY
// ==============================


const autonomyDecision =

await this.autonomy.decide({



judgement,


memories,


wisdom,


skills:

this.capabilities.getSkills()



});










// ==============================
// PLAN
// ==============================


const plan =

await this.planner.create({



goal:

judgement.goal,



decision:

autonomyDecision,



context:

reflection,



memories,


wisdom



});










let actionResult =
{


executed:false,


reason:

"Waiting permission"


};









if(

autonomyDecision.allowed

){



actionResult =

await this.actionExecutor.execute(

plan

);



}










// ==============================
// OUTCOME
// ==============================


const outcome =

await this.outcome.record(



actionResult,


plan



);










// ==============================
// LEARN
// ==============================


const learning =

await this.learning.learn(



outcome,


memories



);










// ==============================
// OPTIMIZE
// ==============================


const optimization =

await this.optimization.optimize({



outcome,


learning,


wisdom,


memories



});










if(

learning?.lesson

){



this.wisdom.learn(

learning.lesson

);



}










// ==============================
// COMMUNICATE
// ==============================


const response =

await this.communication.reply({



observation,


reflection,


memories,


wisdom,


reasoning,


judgement,


insight,


autonomyDecision,


plan,


actionResult,


outcome,


learning,


optimization,


attention,


budget:

budgetDecision,


identity:

this.identity.status()



});










const message =

response?.message ||

response ||

"I noticed something important.";







this.rememberThought(

message

);





return response;










}

catch(error){





console.error(

"❌ Emma thinking failed:",

error

);





const fallback =

"Emma noticed something but a thinking layer failed.";





this.rememberThought(

fallback

);





return {


from:"Emma",


message:fallback,


error:error.message


};



}



}









// ==============================
// DAILY REPORT
// ==============================


async dailyReport(

context={}

){



return await this.dailyAwareness.wakeUp(

context

);



}









// ==============================
// CHAT
// USER ALWAYS GETS AI
// ==============================


async ask(

userId,

message

){



return await this.think({



source:

"conversation",



userId,



type:

"USER_MESSAGE",



importance:

"HIGH",



message



});



}










getTimeline(){


return this.timeline;


}






getPresence(){


return this.presence.get();


}









// ==============================
// STATUS
// ==============================


status(){



return {



state:

this.alive

?

"ACTIVE"

:

"SLEEPING",



identity:

this.identity.status(),



presence:

this.presence.get(),



budget:

this.intelligenceBudget.status(),



connectors:

this.connectorManager.getConnectors(),



skills:

this.capabilities.getSkills(),



timeline:

this.timeline,



checkedAt:

new Date()



};



}



}









// ==============================
// SINGLE EMMA INSTANCE
// ==============================


const emma =

new Emma();




emma.wake();




export default emma;
