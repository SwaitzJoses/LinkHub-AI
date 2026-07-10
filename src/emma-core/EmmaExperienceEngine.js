// EmmaExperienceEngine.js
//
// PROJECT BECOMING
//
// Emma Experience Engine v8.4
//
// Emma's spinal cord.
//
// Added:
// EmmaInitiative 🌱
// EmmaExpressionState 🎭
//
// Fixed:
// Initiative no longer blocks life.
// Silence does not stop growth.
//
// RULE:
//
// Do not think.
// Do not decide.
// Do not learn.
//
// Only move experiences
// between organs.
//


class EmmaExperienceEngine {





constructor({

stream=null,

attention=null,

initiative=null,

expression=null,

memory=null,

wisdom=null,

selfModel=null,

curiosity=null,

reasoning=null,

judgement=null,

executor=null,

outcome=null,

learning=null,

evolution=null

} = {}){



console.log(
"🧬 Emma Experience Engine v8.4 alive"
);




this.stream =
stream;


this.attention =
attention;


this.initiative =
initiative;




console.log(
"🌱 Initiative connected:",
!!this.initiative
);




this.expression =
expression;




console.log(
"🎭 Expression connected:",
!!this.expression
);




this.memory =
memory;


this.wisdom =
wisdom;


this.selfModel =
selfModel;


this.curiosity =
curiosity;


this.reasoning =
reasoning;


this.judgement =
judgement;


this.executor =
executor;


this.outcome =
outcome;


this.learning =
learning;


this.evolution =
evolution;




this.cycles = 0;



}









// =================================
// LIFE PROCESS
// =================================


async process(

event={}

){



console.log(
"🌎 Life entered Emma"
);




this.cycles++;




const timeline = [];









// ===============================
// EXPERIENCE
// ===============================


const experience =

this.createExperience(

event

);




timeline.push(

"EXPERIENCE"

);










// ===============================
// STREAM
// ===============================


if(

this.stream?.record

){



await this.stream.record(

experience

);




timeline.push(

"STREAM"

);



}










// ===============================
// ATTENTION 👁️
// ===============================


let attention = null;





if(

this.attention?.evaluate

){



attention =

await this.attention.evaluate(

experience

);




timeline.push(

"ATTENTION"

);



}










// ===============================
// IGNORE ROUTE
// ===============================


const shouldIgnore =

(

attention?.depth === "IGNORE"

||

attention?.result === "IGNORE"

||

attention === "IGNORE"

);






if(

shouldIgnore

){



return {


experienced:true,


integrated:false,


reason:

"Attention ignored low value signal.",


timeline,


createdAt:

new Date()


};



}










// ===============================
// INITIATIVE 🌱
//
// Should Emma enter?
//
// Does NOT stop life.
// ===============================


let initiative = null;





console.log(
"🌱 Checking initiative..."
);






if(

this.initiative?.evaluate

){



console.log(
"🌱 Initiative evaluating moment"
);





initiative =

await this.initiative.evaluate({



experience,


attention



});






this.initiative.record?.(

initiative

);







// Important:
// Silence affects communication,
// not memory.


initiative.canExpress =

this.initiative.shouldExpress(

initiative

);








timeline.push(

"INITIATIVE"

);



}









// ===============================
// MEMORY 🧠
//
// Attention decides.
// ===============================


let memory = null;





const shouldRemember =

(

attention?.depth === "REMEMBER"

||

attention?.result === "REMEMBER"

||

attention === "REMEMBER"

);








if(

shouldRemember

&&

this.memory?.store

){



console.log(
"🧠 Sending experience to memory"
);






memory =

await this.memory.store({



...experience,



attention



});








timeline.push(

"MEMORY"

);



}










// ===============================
// WISDOM
// ===============================


let wisdom = null;





if(

this.wisdom?.reflect

){



wisdom =

await this.wisdom.reflect({



experience,


memory,


initiative



});








timeline.push(

"WISDOM"

);



}

// ===============================
// SELF MODEL
// ===============================


let self = null;





if(

this.selfModel?.observe

){



self =

await this.selfModel.observe({



experience,


wisdom,


memory,


initiative



});







timeline.push(

"SELF_MODEL"

);



}










// =================================
// CURIOSITY
// =================================


let curiosity = null;





if(

this.curiosity?.explore

){



curiosity =

await this.curiosity.explore({



experience,


memory,


wisdom,


self,


initiative



});








timeline.push(

"CURIOSITY"

);



}










// =================================
// REASONING
//
// Meaning formation only
// =================================


let reasoning = null;





if(

this.reasoning?.think

){



reasoning =

await this.reasoning.think({



experience,


memory,


wisdom,


self,


curiosity,


initiative



});








timeline.push(

"REASONING"

);



}










// =================================
// JUDGEMENT
//
// Permission boundary
// =================================


let judgement = null;





if(

this.judgement?.judge

){



judgement =

await this.judgement.judge({



reasoning,


wisdom,


self,


memory,


initiative



});








timeline.push(

"JUDGEMENT"

);



}










// =================================
// ACTION EXECUTOR
// =================================


let execution = null;





if(

judgement

&&

this.executor?.execute

){



execution =

await this.executor.execute(

judgement

);








timeline.push(

"EXECUTOR"

);



}










// =================================
// OUTCOME
//
// Reality mirror
// =================================


let outcomeResult = null;





if(

execution

&&

this.outcome?.record

){



outcomeResult =

await this.outcome.record(



execution,



{



goal:

experience.situation,



source:

experience.source



}



);








timeline.push(

"OUTCOME"

);



}










// =================================
// LEARNING
//
// Outcome → meaning
// =================================


let learning = null;





if(

outcomeResult?.readyForLearning

&&

this.learning?.learn

){



learning =

await this.learning.learn(



outcomeResult,



memory ? [memory] : []



);








timeline.push(

"LEARNING"

);



}










// =================================
// EVOLUTION
//
// Slow becoming only
// =================================


let evolution = null;





if(

this.evolution?.evolve

){



evolution =

await this.evolution.evolve({





wisdomCandidates:


this.learning?.getWisdomCandidates?.()

||

[],






selfGrowthSignals:


this.selfModel?.getGrowthSignals?.()

||

[]





});








timeline.push(

"EVOLUTION"

);



}










// =================================
// EXPRESSION STATE 🎭
//
// Presence update
// =================================


let expression = null;





if(

this.expression?.observe

){



expression =

this.expression.observe({




experience,


memory,


wisdom,


self,


initiative,


evolution




});








timeline.push(

"EXPRESSION"

);



}










// =================================
// COMPLETE LIFE CYCLE
// =================================


return {




experienced:

true,




integrated:

true,




experience,


attention,


initiative,


memory,


wisdom,


self,


curiosity,


reasoning,


judgement,


execution,




outcome:

outcomeResult,




learning,


evolution,


expression,


timeline,




message:

"Experience completed a full Emma life cycle.",




createdAt:

new Date()




};



}











// =================================
// CREATE EXPERIENCE OBJECT
// =================================


createExperience(

event={}

){



return {




id:

this.createId(),




type:

event.type

||

"EXPERIENCE",




source:

event.source

||

"world",




person:

event.person

||

event.user

||

null,




situation:

event.situation

||

event.message

||

event.text

||

event.description

||

null,




result:

event.result

||

null,




raw:

event,




createdAt:

new Date()




};



}









// =================================
// CREATE ID
// =================================


createId(){



if(

typeof crypto !== "undefined"

&&

crypto.randomUUID

){



return crypto.randomUUID();



}








return (

Date.now()

+

"-"

+

Math.random()

);



}










// =================================
// STATUS
// =================================


status(){



return {




organ:

"EmmaExperienceEngine",




version:

"v8.4",




role:

"Central nervous system",




state:

"ALIVE",




cycles:

this.cycles,




pipeline:[




"Experience",


"Attention",


"Initiative",


"Memory",


"Wisdom",


"SelfModel",


"Curiosity",


"Reasoning",


"Judgement",


"Executor",


"Outcome",


"Learning",


"Evolution",


"Expression"




],







principle:

"Move life between organs. Never become an organ.",






message:

"I connect Emma's experiences into a continuous life cycle."




};



}



}




export default EmmaExperienceEngine;