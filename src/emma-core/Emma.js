// Emma.js
//
// PROJECT BECOMING
//
// Emma Central Nervous System v10.3
//
// Added:
// EmmaInitiative 🌱
// EmmaExpressionState 🎭
// Expression inside life loop
//
// Emma connects life.
//
// RULE:
//
// Do not think here.
// Do not judge here.
// Do not act here.
// Do not learn here.
//
// Organs create intelligence.
// Emma connects organs.
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


import EmmaSelfModel
from "./EmmaSelfModel";


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
"🌅 Emma nervous system starting..."
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
// MEMORY
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
// SELF MODEL
// ===============================


this.selfModel =
new EmmaSelfModel({


memory:

this.memory,


wisdom:

this.wisdom,


learning:

this.learning


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
// CURIOSITY
// ===============================


this.curiosity =
new EmmaCuriosity({


memory:

this.memory,


selfModel:

this.selfModel,


learning:

this.learning


});










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


selfModel:

this.selfModel,


curiosity:

this.curiosity


});










// ===============================
// JUDGEMENT
// ===============================


this.judgement =
new EmmaJudgement();










// ===============================
// ACTION EXECUTOR
// ===============================


this.executor =
new EmmaActionExecutor();










// ===============================
// OUTCOME
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
// Complete life loop
// ===============================


this.experienceEngine =

new EmmaExperienceEngine({



stream:

this.stream,



attention:

this.attention,



initiative:

this.initiative,



// NEW v10.3
// Expression participates
// in becoming cycle


expression:

this.expressionState,



memory:

this.memory,



wisdom:

this.wisdom,



selfModel:

this.selfModel,



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

this.evolution



});










console.log(
"✨ Emma v10.3 organism connected"
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


awake:

true,


message:

"I am awake. Experiences will shape what I become.",


createdAt:

new Date()


};


}










// =================================
// EXPERIENCE ENTRY POINT
// =================================


async experience(

event = {}

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








let reply = null;








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



reasoning:

result.reasoning,



judgement:

result.judgement,



self:

result.self,



curiosity:

result.curiosity,



initiative:

result.initiative,



// v10.3
// Use expression produced
// by life cycle first


expression:

result.expression

||

this.expressionState.status(),



evolution:

result.evolution



});



}











return {


experienced:

true,


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




self:


this.selfModel.describe(),




initiative:


this.initiative.status(),




expression:


this.expressionState.status(),




brain:


this.brain.status(),




message:


"I am the continuity created by my experiences."



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


"Central Nervous System v10.3",




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




self:


this.selfModel.status(),




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



"Attention",



"Initiative",



"Memory",



"Wisdom",



"Learning",



"Evolution",



"ExpressionState",



"SelfModel",



"Curiosity",



"Reasoning",



"Judgement",



"Action",



"Outcome",



"Communication",



"Identity"



],










principle:


"Emma connects organs. Organs create intelligence.",




message:


"The organism is connected."



};



}











// =================================
// RESET RUNTIME
// =================================


reset(){



this.isAwake =

false;






this.attention.reset?.();


this.initiative.reset?.();


this.curiosity.reset?.();


this.selfModel.reset?.();


this.executor.reset?.();






console.log(
"🌙 Emma runtime reset"
);



}



}




export default Emma;