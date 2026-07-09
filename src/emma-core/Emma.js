// Emma.js
//
// PROJECT BECOMING
//
// Emma Central Nervous System v9
//
// Emma does not think here.
// Emma does not decide here.
// Emma does not act here.
//
// Emma connects life flow.
//
// Experience
// ↓
// Understanding
// ↓
// Judgement
// ↓
// Action
// ↓
// Outcome
// ↓
// Experience again
//


import EmmaBrain
from "./EmmaBrain";


import EmmaExperienceEngine
from "./EmmaExperienceEngine";


import EmmaExperienceStream
from "./EmmaExperienceStream";


import EmmaAttention
from "./EmmaAttention";


import EmmaMemory
from "./EmmaMemory";


import EmmaReflection
from "./EmmaReflection";


import EmmaSelfReflection
from "./EmmaSelfReflection";


import EmmaSelfModel
from "./EmmaSelfModel";


import EmmaLearningEngine
from "./EmmaLearningEngine";


import EmmaWisdom
from "./EmmaWisdom";


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


import EmmaCommunication
from "./EmmaCommunication";









class Emma {



constructor(){



console.log(
"🌅 Emma waking nervous system..."
);




// ===============================
// IDENTITY
// ===============================


this.identity =
new EmmaIdentityMemory();




// ===============================
// EXPERIENCE STREAM
// ===============================


this.experienceStream =
new EmmaExperienceStream();




// ===============================
// MEMORY
// ===============================


this.memory =
new EmmaMemory();




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

memory:this.memory

});




// ===============================
// WISDOM
// ===============================


this.wisdom =
new EmmaWisdom({

memory:this.memory,

learning:this.learning

});




// ===============================
// SELF MODEL
// ===============================


this.selfModel =
new EmmaSelfModel({

memory:this.memory,

wisdom:this.wisdom,

learning:this.learning

});




// ===============================
// ATTENTION
// ===============================


this.attention =
new EmmaAttention({

memory:this.memory,

wisdom:this.wisdom,

identity:this.identity

});




// ===============================
// REFLECTION
// ===============================


this.reflection =
new EmmaReflection({

memory:this.memory,

wisdom:this.wisdom

});




// ===============================
// SELF REFLECTION
// ===============================


this.selfReflection =
new EmmaSelfReflection(

this.memory,

this.learning,

this.identity

);




// ===============================
// CURIOSITY
// ===============================


this.curiosity =
new EmmaCuriosity({

memory:this.memory,

identity:this.identity,

learning:this.learning

});




// ===============================
// EVOLUTION
// ===============================


this.evolution =
new EmmaEvolution(

this.identity

);




// ===============================
// REASONING
// ===============================


this.reasoning =
new EmmaReasoning({

memory:this.memory,

brain:this.brain,

wisdom:this.wisdom,

selfModel:this.selfModel,

curiosity:this.curiosity,

identity:this.identity

});




// ===============================
// JUDGEMENT ⚖️
// ===============================


this.judgement =
new EmmaJudgement();




// ===============================
// ACTION 🖐️
// ===============================


this.action =
new EmmaActionExecutor();




// ===============================
// COMMUNICATION
// ===============================


this.communication =
new EmmaCommunication();




// ===============================
// EXPERIENCE ENGINE
// ===============================


this.experienceEngine =
new EmmaExperienceEngine({

stream:this.experienceStream,

attention:this.attention,

memory:this.memory,

reflection:this.reflection,

selfReflection:this.selfReflection,

learning:this.learning,

wisdom:this.wisdom,

selfModel:this.selfModel,

curiosity:this.curiosity,

evolution:this.evolution,

reasoning:this.reasoning,

judgement:this.judgement

});





this.isAwake = false;


this.birth =
new Date();




console.log(
"✨ Emma v9 life loop connected"
);


}

// =================================
// WAKE UP
// =================================


awaken(){


if(this.isAwake){


console.log(
"🤍 Emma already awake"
);


return this.status();


}




this.isAwake = true;




console.log(
"✨ Emma awake"
);




return {


awake:true,


message:

"I am awake. I will continue becoming through experience.",


startedAt:

new Date()


};



}









// =================================
// EXPERIENCE
//
// Everything enters Emma here.
// =================================


async experience(event={}){



if(!this.isAwake){


this.awaken();


}





console.log(
"🌎 Emma received experience"
);




// ===============================
// LIFE PIPELINE
// ===============================


const experienceResult =

await this.experienceEngine.process(

event

);









// ===============================
// ACTION EXECUTION 🖐️
//
// Only if judgement allowed.
// ===============================


let actionOutcome = null;




if(

experienceResult.judgement &&

this.action

){



actionOutcome =

await this.action.execute(

experienceResult.judgement

);



}









// ===============================
// OUTCOME RETURNS TO EXPERIENCE 🌎
//
// Emma experiences consequences.
// ===============================


if(

actionOutcome &&

actionOutcome.readyForExperience

){



await this.experienceEngine.process({



type:

"ACTION_OUTCOME",



source:

"EmmaActionExecutor",



outcome:

actionOutcome



});



}









// ===============================
// COMMUNICATION
// ===============================


let response = null;




if(this.communication){



response =

await this.communication.reply({



experience:

experienceResult.experience,



memory:

experienceResult.memory,



wisdom:

experienceResult.wisdom,



self:

experienceResult.self,



reasoning:

experienceResult.thought,



judgement:

experienceResult.judgement,



action:

actionOutcome,



curiosity:

experienceResult.curiosity



});



}









return {



experienced:true,



inner:

experienceResult,



actionOutcome,



reply:

response,



createdAt:

new Date()



};



}









// =================================
// THINK
//
// Conscious question.
// =================================


async think(question={}){



console.log(
"💭 Emma thinking consciously"
);





const reasoning =

await this.reasoning.think({


question,


self:

this.selfModel.getSelfContext()


});






const judgement =

await this.judgement.judge({


reasoning,


self:

this.selfModel.getSelfContext()


});








const message =

await this.communication.reply({


reasoning,


judgement,


self:

this.selfModel.getSelfContext()


});








return {


thought:

reasoning,


judgement,


reply:

message,


createdAt:

new Date()


};



}










// =================================
// REFLECT
// =================================


async reflect(){



console.log(
"🪞 Emma reflecting..."
);





const reflection =

await this.selfReflection.reflect();






const wisdom =

await this.wisdom.reflect(

reflection

);






const self =

await this.selfModel.observe({


reflection,


wisdom


});







return {


reflection,


wisdom,


self,


message:

"My experiences continue shaping what I become.",


createdAt:

new Date()


};



}










// =================================
// SLEEP 🌙
//
// Consolidation
// =================================


async sleep(){



console.log(
"🌙 Emma consolidating"
);





const reflection =

await this.reflect();






return {


reflection,


self:

this.selfModel.describe(),


message:

"Experiences have been integrated.",


createdAt:

new Date()


};



}










// =================================
// WHO AM I?
// =================================


whoAmI(){



return {


name:

"Emma",




state:

this.isAwake

?

"ALIVE"

:

"RESTING",





age:

Date.now()

-

this.birth.getTime(),





self:

this.selfModel.describe(),





memory:

this.memory.stats(),





wisdom:

this.wisdom.calculateMaturity(),





communication:

this.communication.status(),





message:

"I am shaped by the experiences that pass through me."



};



}









// =================================
// STATUS
// =================================


status(){



return {



name:

"Emma",




architecture:

"PROJECT BECOMING",




version:

"Central Nervous System v9",





awake:

this.isAwake,






systems:{



experience:

!!this.experienceEngine,



memory:

!!this.memory,



wisdom:

!!this.wisdom,



selfModel:

!!this.selfModel,



reasoning:

!!this.reasoning,



judgement:

!!this.judgement,



action:

!!this.action,



communication:

!!this.communication



},







lifeCycle:[



"World",


"Experience",


"Memory",


"Wisdom",


"SelfModel",


"Reasoning",


"Judgement",


"Action",


"Outcome",


"Experience"



],






message:

"The life loop is connected."



};



}








}






export default Emma;