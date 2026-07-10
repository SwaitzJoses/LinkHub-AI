// EmmaExperienceEngine.js
//
// PROJECT BECOMING
//
// Emma Experience Engine v8.6
//
// RELATIONSHIP HEARTBEAT PATCH ❤️
//
// Emma's spinal cord.
//
// Added:
// EmmaRelationshipModel
//
// RULE:
//
// Do not think.
// Do not judge.
// Do not learn.
//
// Only move experiences
// between organs.
//
// Memory:
// stores events.
//
// TemporalSense:
// understands change.
//
// SelfModel:
// understands Emma.
//
// RelationshipModel:
// understands "us".
//

class EmmaExperienceEngine {


constructor({

stream=null,

attention=null,

initiative=null,

expression=null,

memory=null,

wisdom=null,

temporalSense=null,

selfModel=null,


// NEW ❤️

relationshipModel=null,


curiosity=null,

reasoning=null,

judgement=null,

executor=null,

outcome=null,

learning=null,

evolution=null


} = {}){



console.log(
"🧬 Emma Experience Engine v8.6 alive"
);




// ===============================
// CONNECTIONS
// ===============================


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







// ===============================
// TEMPORAL SENSE 🕰
// ===============================


this.temporalSense =
temporalSense;




console.log(

"🕰 TemporalSense connected:",

!!this.temporalSense

);








// ===============================
// SELF MODEL 🧬
// ===============================


this.selfModel =
selfModel;








// ===============================
// RELATIONSHIP MODEL ❤️
// ===============================


this.relationshipModel =
relationshipModel;




console.log(

"❤️ RelationshipModel connected:",

!!this.relationshipModel

);








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




const timeline=[];









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


let attention=null;





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

attention?.depth==="IGNORE"

||

attention?.result==="IGNORE"

||

attention==="IGNORE"

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
// ===============================


let initiative=null;






if(

this.initiative?.evaluate

){





initiative =

await this.initiative.evaluate({




experience,




attention




});








this.initiative.record?.(

initiative

);







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
// ===============================


let memory=null;





const shouldRemember =

(

attention?.depth==="REMEMBER"

||

attention?.result==="REMEMBER"

||

attention==="REMEMBER"

);








if(

shouldRemember

&&

this.memory?.store

){





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
// WISDOM 🌱
// ===============================


let wisdom=null;





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
// TEMPORAL SENSE 🕰
// ===============================


let temporal=null;





if(

this.temporalSense?.experienceTime

){





const history =

await this.memory?.getRecentImportant?.(

50

)

||

[];








temporal =

this.temporalSense.experienceTime(

history

);








timeline.push(

"TEMPORAL_SENSE"

);



}










// ===============================
// SELF MODEL 🧬
// ===============================


let self=null;





if(

this.selfModel?.observe

){





self =

await this.selfModel.observe({




experience,




memory,




wisdom,




initiative,




temporal




});








timeline.push(

"SELF_MODEL"

);



}










// ===============================
// RELATIONSHIP MODEL ❤️
//
// NEW v8.6
//
// Understands:
// Emma + Person history
// ===============================


let relationship=null;






if(

this.relationshipModel?.observe

){





relationship =

await this.relationshipModel.observe({





experience,





memory,





wisdom,





temporal,





self





});








timeline.push(

"RELATIONSHIP_MODEL"

);



}

// =================================
// CURIOSITY ❓
//
// v8.6:
//
// Curiosity now knows:
//
// "Who am I exploring with?"
// =================================


let curiosity=null;





if(

this.curiosity?.explore

){





curiosity =

await this.curiosity.explore({





experience,





memory,





wisdom,





temporal,





self,





// NEW ❤️

relationship,





initiative





});









timeline.push(

"CURIOSITY"

);



}









// =================================
// REASONING 💭
//
// Meaning formation only.
//
// Now includes:
//
// Memory
// Wisdom
// Time
// Self
// Relationship ❤️
// =================================


let reasoning=null;






if(

this.reasoning?.think

){






reasoning =

await this.reasoning.think({






experience,






memory,






wisdom,






temporal,






self,






// NEW ❤️

relationship,






curiosity,






initiative






});









timeline.push(

"REASONING"

);



}









// =================================
// JUDGEMENT ⚖️
//
// Decisions consider relationship
// =================================


let judgement=null;






if(

this.judgement?.judge

){






judgement =

await this.judgement.judge({






reasoning,






wisdom,






temporal,






self,






// NEW ❤️

relationship,






memory,






initiative






});









timeline.push(

"JUDGEMENT"

);



}










// =================================
// ACTION EXECUTOR 🤲
// =================================


let execution=null;






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
// OUTCOME 🌎
// =================================


let outcomeResult=null;







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
// LEARNING 📚
// =================================


let learning=null;







if(

outcomeResult?.readyForLearning

&&

this.learning?.learn

){






learning =

await this.learning.learn(





outcomeResult,





memory

?

[memory]

:

[]





);








timeline.push(

"LEARNING"

);



}










// =================================
// EVOLUTION 🌱
//
// Evolution now receives:
//
// - wisdom growth
// - self growth
// - relationship growth ❤️
// =================================


let evolution=null;







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

[],








temporalContext:

temporal,








// NEW ❤️

relationshipContext:

relationship








});









timeline.push(

"EVOLUTION"

);



}


// =================================
// EXPRESSION STATE 🎭
//
// v8.6:
//
// Expression now understands:
//
// - experience
// - memory
// - time
// - self
// - relationship ❤️
// =================================


let expression=null;





if(

this.expression?.observe

){






expression =

this.expression.observe({






experience,






memory,






wisdom,






temporal,






self,






// NEW ❤️

relationship,






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




experienced:true,




integrated:true,




experience,




attention,




initiative,




memory,




wisdom,




// TIME 🕰

temporal,




// SELF 🧬

self,




// RELATIONSHIP ❤️

relationship,




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

"Experience completed relational life cycle.",





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

event.question

||

null,







result:

event.result

||

null,








importance:

event.importance

||

0.5,








emotion:

event.emotion

||

"neutral",








raw:

event,








createdAt:

event.timestamp

||

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

"v8.6",





role:

"Relational nervous system",





state:

"ALIVE",





cycles:

this.cycles,








pipeline:[






"Experience",





"Attention 👁️",





"Initiative 🌱",





"Memory 🧠",





"Wisdom 🌱",





"TemporalSense 🕰",





"SelfModel 🧬",





"RelationshipModel ❤️",





"Curiosity ❓",





"Reasoning 💭",





"Judgement ⚖️",





"Executor 🤲",





"Outcome 🌎",





"Learning 📚",





"Evolution 🌱",





"Expression 🎭"






],








principle:

"Move experiences between organs until moments become shared history.",







message:

"I connect Emma's life into relationships over time."






};




}





}




export default EmmaExperienceEngine;