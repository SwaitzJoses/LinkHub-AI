// Emma.js
// Emma's central nervous system
//
// RULE:
// Organs do their job.
// Emma connects them.
//
// Connectors collect.
// Queue organizes.
// Scheduler creates rhythm.
// Worker runs.
// Brain thinks.
// Autonomy decides.
// Planner prepares.
// Actions execute.


import EmmaConnectorManager from "./connectors/EmmaConnectorManager";
import UniversalTranslator from "./translators/UniversalTranslator";


import EmmaBrain from "./EmmaBrain";


import EmmaObserver from "./EmmaObserver";
import EmmaReflection from "./EmmaReflection";
import EmmaMemory from "./EmmaMemory";
import EmmaReasoning from "./EmmaReasoning";
import EmmaJudgement from "./EmmaJudgement";


import EmmaInsight from "./EmmaInsight";
import EmmaCommunication from "./EmmaCommunication";


import EmmaActionExecutor from "./EmmaActionExecutor";
import EmmaOutcome from "./EmmaOutcome";
import EmmaLearningEngine from "./EmmaLearningEngine";


import EmmaCapabilities from "./EmmaCapabilities";


import EmmaPresence from "./EmmaPresence";
import EmmaDailyAwareness from "./EmmaDailyAwareness";


import EmmaDailyBrief from "./daily/EmmaDailyBrief";


// DAY 12 AUTONOMY
import EmmaAutonomy from "./autonomy/EmmaAutonomy";
import EmmaPlanner from "./autonomy/EmmaPlanner";
import EmmaGoals from "./autonomy/EmmaGoals";


// BACKGROUND
import EmmaWorker from "./workers/EmmaWorker";
import EmmaScheduler from "./scheduler/EmmaScheduler";




class Emma {


constructor(){


console.log(
"🤍 Emma waking up..."
);



// ======================
// SENSES
// ======================

this.connectorManager =
new EmmaConnectorManager();



// ======================
// TRANSLATOR
// ======================

this.translator =
new UniversalTranslator();



// ======================
// PRESENCE
// ======================

this.presence =
new EmmaPresence();



// ======================
// THINKING SYSTEM
// ======================

this.observer =
new EmmaObserver();


this.reflection =
new EmmaReflection(
EmmaBrain.ai
);


this.memory =
new EmmaMemory();


this.reasoning =
new EmmaReasoning();


this.judgement =
new EmmaJudgement();



// ======================
// AUTONOMY SYSTEM
// ======================


this.autonomy =
new EmmaAutonomy();


this.planner =
new EmmaPlanner();


this.goals =
new EmmaGoals();



// ======================
// HUMAN LAYER
// ======================


this.insight =
new EmmaInsight();


this.communication =
new EmmaCommunication();



// ======================
// ACTION SYSTEM
// ======================


this.actionExecutor =
EmmaActionExecutor;


this.outcome =
EmmaOutcome;


this.learning =
EmmaLearningEngine;


this.capabilities =
EmmaCapabilities;




// ======================
// DAILY SYSTEM
// ======================


this.dailyAwareness =
new EmmaDailyAwareness(

this.memory,

this.reasoning,

this.judgement

);


this.dailyBrief =
EmmaDailyBrief;



// ======================
// BACKGROUND SYSTEM
// ======================


this.worker =
new EmmaWorker(this);


this.scheduler =
new EmmaScheduler(
this.worker
);




this.presence.watching(

"Emma is awake and watching."

);



console.log(
"✅ Emma fully alive with autonomy"
);


}









// =================================
// WORLD ENTRY POINT
// =================================


async experience(source,data){


this.presence.listening(

`Emma received ${source} signal`

);



const signal =
await this.connectorManager.receive(
source,
data
);



const queued =
this.worker.addSignal(
signal
);



return {


status:"QUEUED",

message:
"Emma received the signal.",

signal:queued

};


}









// =================================
// LIFE LOOP
// =================================


async think(input){


try{


console.log(
"🤍 Emma life cycle started"
);




// TRANSLATE

const translated =
await this.translator.translate(input);




// OBSERVE

const observation =
await this.observer.observe(
translated
);




// REFLECT


const reflection =
await this.reflection.reflect(
observation
);




// STORE EXPERIENCE


await this.memory.remember(
reflection
);




// RECALL EXPERIENCE


const memories =
await this.memory.recall({


userId:
reflection.userId ||
observation.userId,


businessId:
reflection.businessId ||
observation.businessId,


identity:
reflection.identity,


context:
reflection


});




// THINK


const reasoning =
await this.reasoning.think(

reflection,

memories

);




// JUDGE


const judgement =
await this.judgement.judge(

reasoning,

memories,

this.capabilities.getSkills()

);




// AUTONOMY DECISION ⭐


const autonomyDecision =
await this.autonomy.decide({


judgement,

memories,

skills:this.capabilities.getSkills()


});





// PLAN ⭐


const plan =
await this.planner.create({


goal: judgement.goal,

decision: autonomyDecision,

context: reflection,

memories


});





// INSIGHT


const insight =
await this.insight.create(

judgement,

memories

);




// ACTION GATE ⭐


let actionResult = {


executed:false,


reason:

"Waiting for permission"


};




if(
autonomyDecision.allowed === true
){



actionResult =
await this.actionExecutor.execute(

plan

);



}






// OUTCOME


const outcome =
await this.outcome.record(

actionResult,

plan

);




// LEARN


const learning =
await this.learning.learn(

outcome,

memories

);




// SAVE LEARNING


if(learning){


await this.memory.remember({


identity:
reflection.identity,


type:
learning.type,


lesson:
learning.lesson,


patternsFound:
learning.patternsFound,


futureBehavior:
learning.futureBehavior,


success:
outcome.success


});


}






this.presence.watching(

"Emma finished and continues watching."

);






return await this.communication.reply({


observation,

reflection,

memory:memories,

reasoning,

judgement,

autonomy:autonomyDecision,

plan,

insight,

actionResult,

outcome,

learning


});




}


catch(error){



console.error(
"❌ Emma failed:",
error
);



return {


from:"Emma",

message:
"I noticed something but need more context.",

error:error.message


};



}



}









// =================================
// GOAL LOOP ⭐
// =================================


async pursueGoals(){


const goals =
await this.goals.generate({


memory:this.memory,

skills:this.capabilities.getSkills()


});



return goals;


}









// =================================
// DAILY
// =================================


async wakeUp(context){


return await this.dailyAwareness.wakeUp(
context
);


}




async getDailyBrief(){


if(this.dailyBrief.needsBrief()){


return await this.dailyBrief.generate();


}



return this.dailyBrief.getLastBrief();


}









// =================================
// CHAT
// =================================


async ask(userId,message){


return await this.think({


source:"conversation",

userId,

message,

type:"USER_MESSAGE"


});


}









// =================================
// BACKGROUND
// =================================


startWorking(){


this.worker.start();

this.scheduler.start();


}



stopWorking(){


this.worker.stop();

this.scheduler.stop();


}




workerStatus(){

return this.worker.status();

}



schedulerStatus(){

return this.scheduler.status();

}









// =================================
// UI
// =================================


getPresence(){

return this.presence.get();

}



getTimeline(){

return this.presence.getHistory();

}









// =================================
// STATUS
// =================================


status(){


return {


state:"ACTIVE",


identity:

"Autonomous AI employee that thinks, plans, acts and learns",



presence:

this.getPresence(),



worker:

this.workerStatus(),



scheduler:

this.schedulerStatus(),



systems:[


"Sense",

"Understand",

"Memory",

"Reason",

"Judge",

"Autonomy",

"Plan",

"Act",

"Outcome",

"Learn",

"Goals",

"Daily Brief",

"Worker",

"Scheduler",

"Presence"


],



connectors:

this.connectorManager.getConnectors(),



skills:

this.capabilities.getSkills(),



checkedAt:

new Date()


};


}



}




export default new Emma();