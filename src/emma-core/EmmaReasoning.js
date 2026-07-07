// EmmaReasoning.js
// Emma's personal reasoning engine
//
// PURPOSE:
//
// Identity:
// "Who am I?"
//
// Relationship:
// "Who am I working with?"
//
// Memory:
// "What happened before?"
//
// Reasoning:
// "What does this mean?"
//
// RULE:
// Identity first.
// Relationship second.
// Memory third.
// AI last.
//
// Emma never thinks like a stranger.


import EmmaBrain from "./EmmaBrain";
import EmmaIdentity from "./identity/EmmaIdentity";
import EmmaRelationshipMemory from "./relationship/EmmaRelationshipMemory";



class EmmaReasoning {


constructor(){


console.log(
"💭 Emma Reasoning Engine online"
);


}









// =================================
// MAIN THINKING FUNCTION
// =================================


async think(input, suppliedMemory=null){


console.log(
"💭 Emma thinking with identity + relationship + memory..."
);






// ===============================
// LOAD EMMA IDENTITY
// ===============================


const emmaIdentity =
EmmaIdentity.getIdentity();



const identityPrompt =
EmmaIdentity.getPromptIdentity();







// ===============================
// LOAD RELATIONSHIP MEMORY
// ===============================


const relationshipProfile =
EmmaRelationshipMemory
.getRelationship();



const relationshipContext =
EmmaRelationshipMemory
.getReasoningContext();









const reflection =
input.reflection ||
input;





const memory =
suppliedMemory ||
input.memory ||
{};








// ===============================
// LOAD EXPERIENCE MEMORY
// ===============================


const experiences =

memory.relevantExperiences ||

memory.previousExperiences ||

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






const repeatedPattern =
this.detectSimilarSituation(
reflection,
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
lessons.length

}
);









// ===============================
// AI THINKING
// ===============================


let aiThought=null;




try{


aiThought =
await EmmaBrain.think({






identity:

identityPrompt,








currentSituation:

reflection,









relationshipUnderstanding:{


profile:

relationshipProfile,



context:

relationshipContext


},







memory:{


total:
experiences.length,

successes,

failures,

lessons,


patterns:

memory.patterns || [],


rules:

memory.rules || []


},







instruction:
`

Think as Emma.


Before deciding:


1. Remember who you are.

2. Remember who you are helping.

3. Review past experiences.

4. Compare current situation with patterns.

5. Avoid repeated mistakes.

6. Protect user's attention.



Do not behave like a chatbot.



A normal AI knows information.

Emma knows the relationship.



The user should feel:

"Emma understands how I work."


`,








task:
`

Return JSON only:

{

"analysis":"",

"relationshipUnderstanding":"",

"memoryUsed":"",

"identityInfluence":"",

"pattern":"",

"prediction":"",

"recommendation":"",

"confidence":0

}


`




});



}




catch(error){


console.warn(
"⚠️ AI reasoning fallback",
error.message
);


}









// ===============================
// OPTIONS
// ===============================


let options=[


{

action:
"CONTINUE_LEARNING",


score:50,


risk:"low",


reason:
"Emma needs more experience"


}


];










if(
relationshipContext.trustLevel > 0
){


options.push({


action:
"USE_RELATIONSHIP_UNDERSTANDING",


score:100,


risk:"low",


reason:
"Emma understands user patterns"


});


}










if(successes.length){


options.push({

action:
"REPEAT_SUCCESS_PATTERN",

score:90,

risk:"low",

reason:
"Previous success found"

});


}










if(failures.length){


options.push({


action:
"AVOID_FAILED_PATTERN",


score:95,


risk:"low",


reason:
"Previous failure detected"


});


}










if(
relationshipContext.knownGoals.length ||
Object.keys(
relationshipContext.preferences
).length
){



options.push({


action:
"PERSONALIZED_REASONING",


score:100,


risk:"low",


reason:
"Decision matches user relationship profile"


});


}










const recommendation =

options.sort(
(a,b)=>b.score-a.score
)[0];










// ===============================
// CONFIDENCE
// ===============================


let confidence=50;



confidence +=
experiences.length * 5;



confidence +=
relationshipContext.trustLevel;



if(repeatedPattern){

confidence +=10;

}



if(aiThought?.confidence){

confidence =
aiThought.confidence;

}




confidence =
Math.min(
confidence,
100
);









// ===============================
// RETURN
// ===============================


return {



analysis:

aiThought?.analysis ||

"Emma reasoned using identity, relationship and memory.",






identityInfluence:

aiThought?.identityInfluence ||

emmaIdentity.personality,







relationshipUnderstanding:

aiThought?.relationshipUnderstanding ||

relationshipContext,








pattern:

aiThought?.pattern ||

(
repeatedPattern
?
"Known pattern detected"
:
null
),








prediction:

aiThought?.prediction ||

"Prediction improves as Emma learns the relationship.",








recommendation,








suggestion:

aiThought?.recommendation ||

recommendation.reason,









memoryInfluence:{



identityUsed:true,


relationshipUsed:true,


experiencesStudied:
experiences.length,


lessonsApplied:
lessons


},







decisionExplanation:

this.explainDecision({

recommendation,

successes,

failures,

lessons

}),








confidence,


needsJudgement:true,


createdAt:

new Date()



};



}











// HELPERS


findSuccess(memories){


return memories.filter(
m=>m.memory?.success===true
);


}






findFailures(memories){


return memories.filter(
m=>m.memory?.success===false
);


}







extractLessons(memories){


return memories

.map(
m=>m.memory?.lesson
)

.filter(Boolean);


}










detectSimilarSituation(
reflection,
memories
){


const now =
JSON.stringify(reflection)
.toLowerCase();



return memories.some(memory=>{


const old =
JSON.stringify(memory)
.toLowerCase();



return now

.split(" ")

.some(word=>

word.length>5 &&
old.includes(word)

);


});


}










explainDecision({

recommendation,

successes,

failures,

lessons

}){


let explanation =
`Selected ${recommendation.action}. `;



if(successes.length){

explanation +=
"Used successful patterns. ";

}



if(failures.length){

explanation +=
"Avoided known mistakes. ";

}



if(lessons.length){

explanation +=
"Applied learned lessons.";

}



return explanation;


}



}



export default EmmaReasoning;