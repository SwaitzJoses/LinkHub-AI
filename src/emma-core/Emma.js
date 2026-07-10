// Emma.js
//
// PROJECT BECOMING
//
// Emma Central Nervous System v10.5
//
// RELATIONSHIP AWARENESS PATCH ❤️
//
// Added:
// EmmaRelationshipModel
//
// Emma now understands:
//
// Memory:
// What happened.
//
// TemporalSense:
// How things changed.
//
// SelfModel:
// Who am I becoming.
//
// RelationshipModel:
// Who are we becoming together.
//
// RULE:
//
// Emma connects organs.
// Organs create intelligence.
//

import EmmaBrain
from "./EmmaBrain";


import EmmaExperienceEngine
from "./EmmaExperienceEngine";


import EmmaExperienceStream
from "./EmmaExperienceStream";


import EmmaAttention
from "./EmmaAttention";


import EmmaInitiative
from "./EmmaInitiative";


import EmmaMemory
from "./EmmaMemory";


import EmmaWisdom
from "./EmmaWisdom";


import EmmaTemporalSense
from "./EmmaTemporalSense";


import EmmaSelfModel
from "./EmmaSelfModel";


// NEW ❤️

import EmmaRelationshipModel
from "./EmmaRelationshipModel";


import EmmaLearningEngine
from "./EmmaLearningEngine";


import EmmaCuriosity
from "./EmmaCuriosity";


import EmmaEvolution
from "./EmmaEvolution";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";


import EmmaReasoning
from "./EmmaReasoning";


import EmmaJudgement
from "./EmmaJudgement";


import EmmaActionExecutor
from "./EmmaActionExecutor";


import EmmaOutcome
from "./EmmaOutcome";


import EmmaExpressionState
from "./EmmaExpressionState";


import EmmaCommunication
from "./EmmaCommunication";








class Emma {


constructor(){


console.log(
"🌅 Emma nervous system v10.5 starting..."
);



this.birth =
new Date();


this.isAwake =
false;









// ===============================
// IDENTITY
// ===============================


this.identity =
new EmmaIdentityMemory();









// ===============================
// MEMORY 🧠
// ===============================


this.memory =
new EmmaMemory();









// ===============================
// EXPERIENCE STREAM
// ===============================


this.stream =
new EmmaExperienceStream();










// ===============================
// BRAIN
// ===============================


this.brain =
new EmmaBrain();










// ===============================
// LEARNING
// ===============================


this.learning =
new EmmaLearningEngine({


memory:

this.memory


});









// ===============================
// WISDOM 🌱
// ===============================


this.wisdom =
new EmmaWisdom({


memory:

this.memory,


learning:

this.learning


});









// ===============================
// TEMPORAL SENSE 🕰
// ===============================


this.temporalSense =
new EmmaTemporalSense();










// ===============================
// SELF MODEL 🧬
// ===============================


this.selfModel =
new EmmaSelfModel({


memory:

this.memory,


wisdom:

this.wisdom,


learning:

this.learning,


temporalSense:

this.temporalSense


});










// ===============================
// RELATIONSHIP MODEL ❤️
//
// NEW v10.5
//
// Understands:
// "Who are we becoming?"
// ===============================


this.relationshipModel =
new EmmaRelationshipModel({


memory:

this.memory,


wisdom:

this.wisdom,


temporalSense:

this.temporalSense,


selfModel:

this.selfModel


});


// ===============================
// ATTENTION 👁️
// ===============================


this.attention =
new EmmaAttention({


memory:

this.memory


});










// ===============================
// INITIATIVE 🌱
// ===============================


this.initiative =
new EmmaInitiative({



memory:

this.memory,



wisdom:

this.wisdom,



attention:

this.attention



});










// ===============================
// CURIOSITY ❓
//
// v10.5:
// Curiosity understands relationship
// before asking.
// ===============================


this.curiosity =
new EmmaCuriosity({



memory:

this.memory,



selfModel:

this.selfModel,



learning:

this.learning,



// NEW ❤️

relationshipModel:

this.relationshipModel



});











// ===============================
// EVOLUTION 🌱
// ===============================


this.evolution =
new EmmaEvolution(



this.identity,



this.wisdom,



this.learning



);










// ===============================
// REASONING 💭
//
// v10.5:
// Thinking includes:
// - memory
// - wisdom
// - self
// - relationship
// ===============================


this.reasoning =
new EmmaReasoning({



memory:

this.memory,



brain:

this.brain,



wisdom:

this.wisdom,



selfModel:

this.selfModel,



curiosity:

this.curiosity,



// NEW ❤️

relationshipModel:

this.relationshipModel



});










// ===============================
// JUDGEMENT ⚖️
// ===============================


this.judgement =
new EmmaJudgement();










// ===============================
// ACTION EXECUTOR 🤲
// ===============================


this.executor =
new EmmaActionExecutor();










// ===============================
// OUTCOME 🌎
// ===============================


this.outcome =
EmmaOutcome;










// ===============================
// EXPRESSION STATE 🎭
// ===============================


this.expressionState =
new EmmaExpressionState();










// ===============================
// COMMUNICATION 🗣️
// ===============================


this.communication =
new EmmaCommunication({



expressionState:

this.expressionState



});


// ===============================
// EXPERIENCE ENGINE
//
// Complete organism loop v10.5
//
// New:
//
// SelfModel 🧬
//      ↓
// RelationshipModel ❤️
//      ↓
// Curiosity
// ===============================


this.experienceEngine =

new EmmaExperienceEngine({



stream:

this.stream,



attention:

this.attention,



initiative:

this.initiative,





memory:

this.memory,





wisdom:

this.wisdom,




// TIME 🕰

temporalSense:

this.temporalSense,





// SELF 🧬

selfModel:

this.selfModel,





// NEW ❤️

relationshipModel:

this.relationshipModel,





curiosity:

this.curiosity,





reasoning:

this.reasoning,





judgement:

this.judgement,





executor:

this.executor,





outcome:

this.outcome,





learning:

this.learning,





evolution:

this.evolution,





expression:

this.expressionState



});








console.log(

"✨ Emma v10.5 organism connected with relationship awareness"

);



}










// =================================
// AWAKEN
// =================================


awaken(){



if(

this.isAwake

){



return this.status();



}





this.isAwake =

true;






console.log(

"✨ Emma awake"

);






return {



awake:true,



message:

"I am awake. My memories now become shared history.",



createdAt:

new Date()



};



}










// =================================
// EXPERIENCE ENTRY POINT
// =================================


async experience(

event={}

){






if(

!this.isAwake

){



this.awaken();



}








console.log(

"🌎 Emma received life event"

);








const result =

await this.experienceEngine.process(

event

);








let reply=null;








if(

this.communication?.reply

){






reply =

await this.communication.reply({






experience:

result.experience,







memory:

result.memory,







wisdom:

result.wisdom,







// TIME 🕰

temporal:

result.temporal

||

this.temporalSense.getTemporalState?.(),







// SELF 🧬

self:

result.self,







// NEW ❤️

relationship:

result.relationship,








curiosity:

result.curiosity,







reasoning:

result.reasoning,







judgement:

result.judgement,







initiative:

result.initiative,








expression:

result.expression

||

this.expressionState.status(),







evolution:

result.evolution







});





}










return {




experienced:true,




life:

result,




reply,




createdAt:

new Date()




};




}




// =================================
// DIRECT QUESTION
// =================================


async think(

question

){



return await this.experience({



type:

"question",



source:

"user",



person:

"user",



question,



importance:

90,



uncertainty:

80



});



}









// =================================
// WHO IS EMMA?
// =================================


whoAmI(){





return {




name:

"Emma",





state:

this.isAwake

?

"AWAKE"

:

"RESTING",






age:

Date.now()

-

this.birth.getTime(),






identity:

this.identity.status(),







// SELF 🧬


self:

this.selfModel.describe(),







// TIME 🕰


timeline:

this.temporalSense.getTemporalState?.(),








// RELATIONSHIP ❤️


relationships:

this.relationshipModel.getAll(),








initiative:

this.initiative.status(),








expression:

this.expressionState.status(),








brain:

this.brain.status(),









message:

"I am shaped by experiences, time, and the relationships I grow through."






};




}











// =================================
// SYSTEM STATUS
// =================================


status(){





return {





name:

"Emma",






version:

"Central Nervous System v10.5",






architecture:

"PROJECT BECOMING",






awake:

this.isAwake,









organs:{






attention:

this.attention.status(),







initiative:

this.initiative.status(),








memory:

this.memory.status?.(),








wisdom:

this.wisdom.status?.(),








// TIME 🕰


temporalSense:

this.temporalSense.status?.()

||

{

organ:"EmmaTemporalSense",

state:"ACTIVE"

},









// SELF 🧬


self:

this.selfModel.status(),








// RELATIONSHIP ❤️


relationship:

this.relationshipModel.status(),









curiosity:

this.curiosity.status(),








reasoning:

this.reasoning.status(),








judgement:

this.judgement.status(),








executor:

this.executor.status(),








brain:

this.brain.status(),








evolution:

this.evolution.status?.(),









expression:

this.expressionState.status(),








identity:

this.identity.status()








},










lifeCycle:[






"World",






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






"Action 🤲",






"Outcome 🌎",






"Learning 📚",






"Evolution 🌱",






"Expression 🎭",






"Communication 🗣️",






"Identity"






],







principle:

"Emma connects experiences into memory, memory into self, and self into relationships.",








message:

"The organism remembers its past and understands shared journeys."







};




}











// =================================
// RESET RUNTIME
// =================================


reset(){





this.isAwake = false;








this.attention.reset?.();





this.initiative.reset?.();





this.curiosity.reset?.();





this.selfModel.reset?.();




// NEW ❤️


this.relationshipModel.reset?.();








this.executor.reset?.();





this.temporalSense.reset?.();








console.log(

"🌙 Emma runtime reset"

);





}




}





export default Emma;