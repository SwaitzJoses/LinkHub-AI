// EmmaReasoning.js
//
// Emma's reasoning engine
//
// PROJECT BECOMING
//
// Identity first.
// Relationship second.
// Memory third.
// Wisdom fourth.
// AI last.
//
// Brain thinks.
// Wisdom guides.
// Reasoning decides.
//
// RULE:
// Reasoning does not store.
// Reasoning decides using experience.


import EmmaBrain from "./EmmaBrain";

import EmmaIdentity
from "./identity/EmmaIdentity";

import EmmaRelationshipMemory
from "./relationship/EmmaRelationshipMemory";






class EmmaReasoning {





constructor({
memory=null,
brain=null,
wisdom=null
} = {}){



console.log(
"💭 Emma Reasoning Engine online"
);





// connected organs

this.memory =
memory;



this.wisdom =
wisdom;




this.brain =

brain ||

new EmmaBrain();




}









// =================================
// MAIN THINKING FUNCTION
// =================================


async think(
input={}
){



console.log(
"💭 Emma reasoning from experience..."
);









// =================================
// IDENTITY
// =================================


let emmaIdentity = {


name:

"Emma",



personality:

"Learning intelligence"



};




let identityPrompt =
"Emma";






try{


emmaIdentity =

EmmaIdentity.getIdentity();




identityPrompt =

EmmaIdentity.getPromptIdentity();



}



catch(error){


console.warn(
"Identity unavailable"
);


}












// =================================
// RELATIONSHIP MEMORY
// =================================


let relationshipProfile={};



let relationshipContext={


trustLevel:0,


knownGoals:[],


preferences:{}


};








try{



relationshipProfile =

EmmaRelationshipMemory
.getRelationship();




relationshipContext =

EmmaRelationshipMemory
.getReasoningContext();



}




catch(error){



console.warn(
"Relationship unavailable"
);



}











// =================================
// EXPERIENCE MEMORY
// =================================


let memoryContext = {


relevantExperiences:[],

previousExperiences:[],

lessons:[],

patterns:[],

rules:[]


};








if(

this.memory &&

this.memory.recall

){



memoryContext =

await this.memory.recall(

input

);



}









const experiences =


memoryContext.relevantExperiences ||

[];








const successes =

this.findSuccess(

experiences

);






const failures =

this.findFailures(

experiences

);







const lessons =

this.extractLessons(

experiences

);











// =================================
// WISDOM CHECK
// =================================


let wisdom = null;






if(

this.wisdom &&

this.wisdom.reflect

){



wisdom =

await this.wisdom.reflect(

input

);



}









const repeatedPattern =

this.detectSimilarSituation(

input,

experiences

);









console.log(

"🧠 Reasoning context:",

{


emma:

emmaIdentity.name,



relationshipKnown:

relationshipContext.trustLevel,



experiences:

experiences.length,



lessons:

lessons.length,



wisdom:

!!wisdom


}


);










// =================================
// ASK BRAIN
// =================================


let aiThought = null;







try{



aiThought =

await this.brain.think({



identity:

identityPrompt,




currentSituation:

input,






relationshipUnderstanding:{


profile:

relationshipProfile,


context:

relationshipContext


},






experience:{



memories:

experiences,



lessons,



failures,



successes,



wisdom



},







instruction:

`

Think as Emma.

Before answering:

1. Remember who you are.
2. Understand the relationship.
3. Search past experiences.
4. Apply wisdom.
5. Avoid repeating old mistakes.

Your goal is not only to answer.

Your goal is to become better.

`



});




}




catch(error){



console.warn(

"⚠️ Brain fallback:",

error.message

);



}




// =================================
// DECISION OPTIONS
// =================================


let options = [


{


action:

"CONTINUE_LEARNING",



score:

50,



risk:

"low",



reason:

"Need more experience before strong decision"



}


];









// Past success

if(

successes.length > 0

){



options.push({



action:

"REPEAT_SUCCESS_PATTERN",



score:

90,



risk:

"low",



reason:

"Previous successful experience exists"



});



}










// Past failure

if(

failures.length > 0

){



options.push({



action:

"AVOID_FAILED_PATTERN",



score:

95,



risk:

"low",



reason:

"Emma remembers a previous failure and avoids repeating it"



});



}










// Wisdom

if(

wisdom &&

wisdom.experienceFound

){



options.push({



action:

"USE_WISDOM",



score:

100,



risk:

"lowest",



reason:

wisdom.advice?.recommended ||

"Past wisdom found"



});



}









// Relationship

if(

relationshipContext.trustLevel > 0

){



options.push({



action:

"PERSONALIZED_DECISION",



score:

95,



risk:

"low",



reason:

"Decision matches relationship memory"



});



}











// Select strongest option


const recommendation =


options.sort(

(a,b)=>

b.score - a.score

)[0];











// =================================
// CONFIDENCE
// =================================


let confidence = 50;





confidence +=

experiences.length * 5;





confidence +=

lessons.length * 5;







if(

wisdom?.experienceFound

){



confidence += 20;



}







if(

repeatedPattern

){



confidence += 10;



}








if(

aiThought?.confidence

){



confidence =

aiThought.confidence;



}








confidence =

Math.min(

confidence,

100

);












// =================================
// FINAL THOUGHT
// =================================


return {




analysis:


aiThought?.analysis ||

"Emma reasoned using identity, relationship, memory, wisdom and experience.",







identityInfluence:


aiThought?.identityInfluence ||

emmaIdentity.personality,








relationshipUnderstanding:


aiThought?.relationshipUnderstanding ||

relationshipContext,









memoryInfluence:{



memoriesUsed:


experiences.length,



lessonsApplied:


lessons,



failuresAvoided:


failures.length,



successPatterns:


successes.length



},









wisdomInfluence:


wisdom || null,









pattern:


repeatedPattern

?

"Known experience pattern detected"

:

null,









prediction:


aiThought?.prediction ||

"Prediction improves as Emma gains experience.",









recommendation,










suggestion:


aiThought?.recommendation ||

recommendation.reason,









decisionExplanation:


this.explainDecision({



recommendation,


successes,


failures,


lessons,


wisdom



}),








confidence,








needsJudgement:

true,








createdAt:


new Date()



};




}











// =================================
// HELPERS
// =================================



findSuccess(
memories=[]
){



return memories.filter(

m =>

m.type === "POSITIVE_EXPERIENCE" ||

m.memory?.outcome?.success === true

);



}









findFailures(
memories=[]
){



return memories.filter(

m =>

m.type === "FAILED_EXPERIENCE" ||

m.memory?.outcome?.success === false

);



}









extractLessons(
memories=[]
){



return memories


.map(

m =>

m.memory?.lesson

)


.filter(Boolean);



}










detectSimilarSituation(
current,
memories=[]
){



const now =

JSON.stringify(

current

)

.toLowerCase();







return memories.some(

memory=>{





const old =


JSON.stringify(

memory

)

.toLowerCase();






return now


.split(/\W+/)


.some(

word =>

word.length > 5 &&

old.includes(word)

);



});



}









explainDecision({

recommendation,

successes,

failures,

lessons,

wisdom

}){





let explanation =


`Selected ${recommendation.action}. `;







if(

wisdom?.experienceFound

){



explanation +=

"Used accumulated wisdom. ";



}









if(

successes.length

){



explanation +=

"Repeated proven successful patterns. ";



}










if(

failures.length

){



explanation +=

"Avoided mistakes from past experience. ";



}










if(

lessons.length

){



explanation +=

"Applied learned lessons."



}









return explanation;



}




}







export default EmmaReasoning;