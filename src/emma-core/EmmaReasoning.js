// EmmaReasoning.js
// Emma's thinking engine
// Memory-first intelligence
// Experience → Lessons → Analysis → Decision

import EmmaBrain from "./EmmaBrain";


class EmmaReasoning {


constructor(){

console.log(
"💭 Emma Reasoning ready"
);

}



// ==============================
// Main thinking process
// ==============================

async think(
reflection,
memory
){


console.log(
"💭 Emma studying experience before thinking",
{
reflection,
memory
}
);


// ==============================
// 1. Retrieve memories first
// ==============================

const experiences =
memory?.relevantExperiences || [];


const successfulMemories =
this.findSuccess(
experiences
);


const failedMemories =
this.findFailures(
experiences
);


const lessons =
this.extractLessons(
experiences
);


// ==============================
// 2. Detect repeated situations
// ==============================

const repeatedSituation =
this.detectSimilarSituation(
reflection,
experiences
);


// ==============================
// 3. Ask Emma Brain AFTER memory
// ==============================

const aiThought =
await EmmaBrain.think({

role:
"AI business growth employee",

currentSituation:
reflection,

companyExperience:
experiences,

pastSuccesses:
successfulMemories,

pastFailures:
failedMemories,

lessonsLearned:
lessons,


instruction:
`
You are not a generic AI assistant.

You are an employee of this company.

Before answering:

1. Study company memories
2. Reuse what worked before
3. Avoid actions that failed before
4. Protect profit and customer trust
5. Explain what experience influenced you

Never ignore company history.
`

});




// ==============================
// Understand situation
// ==============================

const situation={

meaning:
reflection?.meaning ||
"Unknown situation",

importance:
reflection?.importance ||
"medium",

impact:
reflection?.impact || {},

repeated:
repeatedSituation

};




// ==============================
// Generate decisions
// ==============================


let options=[

{

action:
"ANALYZE_MORE",

goal:
"understanding",

reason:
"Need deeper understanding before acting",

score:50,

risk:"low"

},


{

action:
"CREATE_TASK",

goal:
"operation",

reason:
"Useful follow-up action detected",

score:55,

risk:"low"

}

];





const text =
JSON.stringify(
reflection
)
.toLowerCase();




// Growth opportunity

if(

text.includes("growth") ||
text.includes("customer") ||
text.includes("lead") ||
text.includes("sale") ||
text.includes("opportunity")

){

options.push({

action:
"CREATE_GROWTH_ACTION",

goal:
"growth",

reason:
"Business growth opportunity detected",

score:75,

risk:"medium"

});

}




// Memory based winning action

if(
successfulMemories.length>0
){

options.push({

action:
"REPEAT_PROVEN_ACTION",

goal:
"growth",

reason:
"Similar action succeeded previously",

memoryEvidence:
successfulMemories.slice(0,3),

score:95,

risk:"low"

});

}




// Avoid repeating mistakes

if(
failedMemories.length>0
){

options =
options.map(option=>({

...option,

score:
option.score-15,

failureCheck:
"Compared with previous failures"

}));

}





// Repeated situation bonus

if(
repeatedSituation
){

options.push({

action:
"USE_PREVIOUS_EXPERIENCE",

goal:
"experience",

reason:
"Emma has handled a similar situation before",

score:90,

risk:"low"

});

}




// ==============================
// Pick best decision
// ==============================


const recommendation =

options.sort(
(a,b)=>b.score-a.score
)[0];





// ==============================
// Confidence calculation
// ==============================


let confidence=50;


if(
experiences.length>0
)
confidence +=20;


if(
successfulMemories.length>0
)
confidence +=15;


if(
aiThought.success
)
confidence +=10;


if(
repeatedSituation
)
confidence +=10;


confidence =
Math.min(
confidence,
100
);




// ==============================
// Return reasoning result
// ==============================


return {


thought:

aiThought.response ||
"Emma reasoned from company experience",


situation,


memoryInfluence:{

memoriesStudied:
experiences.length,

successPatterns:
successfulMemories.length,

failurePatterns:
failedMemories.length,

lessons

},


options,


recommendation,


decisionExplanation:

this.explainDecision(
recommendation,
successfulMemories,
failedMemories,
lessons
),


suggestion:
recommendation.reason,


goal:
recommendation.goal,


confidence,


needsJudgement:true,


createdAt:
new Date()


};


}






// ==============================
// Find successful memories
// ==============================


findSuccess(memories){


return memories.filter(item=>{

const text =
JSON.stringify(item)
.toLowerCase();


return (

text.includes("success") ||
text.includes("worked") ||
text.includes("increase") ||
text.includes("improved") ||
text.includes("customer liked")

);

});


}







// ==============================
// Find failures
// ==============================


findFailures(memories){


return memories.filter(item=>{

const text =
JSON.stringify(item)
.toLowerCase();


return (

text.includes("failed") ||
text.includes("mistake") ||
text.includes("ignored") ||
text.includes("loss") ||
text.includes("did not work")

);

});


}








// ==============================
// Extract lessons
// ==============================


extractLessons(memories){


return memories
.map(memory=>{

return (

memory.lesson ||
memory.learning ||
memory.outcome ||
null

);

})
.filter(Boolean);


}









// ==============================
// Detect similar past events
// ==============================


detectSimilarSituation(
reflection,
memories
){


const current =
JSON.stringify(reflection)
.toLowerCase();


return memories.some(memory=>{


const old =
JSON.stringify(memory)
.toLowerCase();


return current
.split(" ")
.some(word=>

word.length>5 &&
old.includes(word)

);


});


}








// ==============================
// Human explanation
// ==============================


explainDecision(
decision,
success,
failure,
lessons
){


let explanation =

`Selected ${decision.action}. `;



if(
success.length>0
){

explanation +=

"Emma found previous successful company experience. ";

}



if(
failure.length>0
){

explanation +=

"Emma avoided repeating known failures. ";

}



if(
lessons.length>0
){

explanation +=

"Past lessons influenced the decision.";

}



return explanation;


}



}


export default EmmaReasoning;