// EmmaReasoning.js
// Emma's personal thinking engine
//
// Identity
// + Memory
// + Experience
// → Reason
// → Better Decisions


import EmmaBrain from "./EmmaBrain";


class EmmaReasoning {


constructor(){

console.log(
"💭 Emma Personal Reasoning online"
);

}




// ===============================
// MAIN THINKING
// ===============================


async think(input, suppliedMemory=null){


console.log(
"💭 Emma thinking...",
input
);



const reflection =
input.reflection ||
input;



const memory =
suppliedMemory ||
input.memory ||
{};




// ===============================
// STUDY MEMORY FIRST
// ===============================


const experiences =

memory.relevantExperiences ||

memory.previousExperiences ||

[];



const identity =

memory.identity ||

{};



const successfulMemories =
this.findSuccess(experiences);



const failedMemories =
this.findFailures(experiences);



const lessons =
this.extractLessons(experiences);



const repeatedSituation =
this.detectSimilarSituation(
reflection,
experiences
);



console.log(
"🧠 Emma understands:",
{
memories: experiences.length,
identity
}
);





// ===============================
// PERSONAL AI REASONING
// ===============================


let aiThought=null;



try{


aiThought =

await EmmaBrain.think({



identity:
`
You are Emma 🤍

You are a personal AI assistant.

Your purpose:
Understand this person.

Never answer like a stranger.

Before responding:

1. Understand who this person is
2. Study memories
3. Look at goals
4. Notice patterns
5. Learn from past outcomes
6. Give personal judgement

Your goal is:

"Ah... she gets it."
`,





personUnderstanding:{


goals:

identity.goals || [],



preferences:

identity.preferences || [],



workingStyle:

identity.workingStyle || [],



decisionPatterns:

identity.decisionPatterns || [],



priorities:

identity.priorities || []


},






currentSituation:

reflection,





memory:{


experiencesStudied:

experiences.length,



pastExperiences:

experiences,



successes:

successfulMemories,



failures:

failedMemories,



lessons


},







task:
`

Think like someone who knows this person.

Answer:

1. What is happening?
2. What do I know about this person?
3. What past experience matters?
4. What pattern do I notice?
5. What should they do?


Return JSON:

{
"analysis":"",
"personalUnderstanding":"",
"pattern":"",
"prediction":"",
"recommendation":"",
"memoryUsed":"",
"confidence":0
}

`



});



}

catch(error){


console.warn(
"⚠️ AI reasoning unavailable",
error
);


}








// ===============================
// DECISION OPTIONS
// ===============================


let options=[

{

action:
"UNDERSTAND_MORE",

goal:
"context",

score:50,

risk:"low",

reason:
"Need more personal context"

}

];




const text =

JSON.stringify(reflection)
.toLowerCase();





if(

text.includes("goal") ||

text.includes("decision") ||

text.includes("should")

){


options.push({

action:
"PERSONAL_GUIDANCE",

goal:
"clarity",

score:80,

risk:"low",

reason:
"Personal decision detected"

});


}






if(successfulMemories.length){


options.push({

action:
"USE_SUCCESS_PATTERN",

goal:
"repeat what works",

score:95,

risk:"low",

reason:
"Successful pattern exists"

});


}







if(failedMemories.length){


options.push({

action:
"AVOID_OLD_MISTAKE",

goal:
"protection",

score:90,

risk:"low",

reason:
"Previous mistake detected"

});


}







if(

identity.goals?.length ||

identity.workingStyle?.length

){


options.push({

action:
"IDENTITY_BASED_ADVICE",

goal:
"personal alignment",

score:100,

risk:"low",

reason:
"Emma understands this person"

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



if(Object.keys(identity).length)

confidence +=20;



if(repeatedSituation)

confidence +=10;



if(aiThought?.confidence){

confidence =
aiThought.confidence;

}



confidence =

Math.min(confidence,100);








// ===============================
// RESULT
// ===============================


return {



analysis:

aiThought?.analysis ||

"Emma reasoned using personal history.",




personalUnderstanding:

aiThought?.personalUnderstanding ||

identity,




pattern:

aiThought?.pattern ||

null,





prediction:

aiThought?.prediction ||

"Future outcome depends on previous patterns.",





recommendation,





suggestion:

aiThought?.recommendation ||

recommendation.reason,






memoryInfluence:{


memoriesStudied:

experiences.length,



lessonsApplied:

lessons,



identityUsed:

identity


},






decisionExplanation:

this.explainDecision(

recommendation,

identity,

successfulMemories,

failedMemories,

lessons

),






confidence,



needsJudgement:true,



createdAt:

new Date()



};



}









// ===============================
// HELPERS
// ===============================


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






detectSimilarSituation(reflection,memories){


const current =

JSON.stringify(reflection)
.toLowerCase();



return memories.some(memory=>{


const old =

JSON.stringify(memory)
.toLowerCase();



return current

.split(" ")

.some(

word =>

word.length>5 &&

old.includes(word)

);


});


}







explainDecision(
decision,
identity,
success,
failure,
lessons
){


let text =

`I selected ${decision.action}. `;



if(identity.goals?.length){

text +=

"I considered this person's goals. ";

}




if(identity.workingStyle?.length){

text +=

"I considered their working style. ";

}




if(success.length){

text +=

`${success.length} successful experiences influenced me. `;

}




if(failure.length){

text +=

`${failure.length} previous mistakes were considered. `;

}




if(lessons.length){

text +=

"I applied learned lessons.";

}



return text;


}



}


export default EmmaReasoning;