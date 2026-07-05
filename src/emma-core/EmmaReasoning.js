// EmmaReasoning.js
// Emma's thinking engine
//
// Memory
// → Experience
// → Reason
// → Decision


import EmmaBrain from "./EmmaBrain";



class EmmaReasoning {


constructor(){

console.log(
"💭 Emma Reasoning ready"
);

}





// =================================
// MAIN THINKING
// =================================


async think(input, suppliedMemory=null){


console.log(
"💭 Emma thinking started",
input
);




// support both calling styles

const reflection =
input.reflection ||
input;



const memory =
suppliedMemory ||
input.memory ||
{};






// =================================
// STUDY MEMORY FIRST
// =================================


const experiences =

memory.relevantExperiences ||

memory.previousExperiences ||

[];





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




const repeatedSituation =
this.detectSimilarSituation(
reflection,
experiences
);





console.log(
"🧠 Emma studied memories:",
{
total:experiences.length,
success:successfulMemories.length,
failed:failedMemories.length,
lessons
}
);








// =================================
// AI THINKING WITH EXPERIENCE
// =================================


let aiThought=null;




try{


aiThought =

await EmmaBrain.think({



identity:
`
You are Emma.

You are an AI employee.

You have memory.

Never ignore company experience.

Before deciding:
- study past outcomes
- reuse what worked
- avoid what failed
- explain what memory affected your decision
`,






currentSituation:

reflection,






companyMemory:{



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

Think carefully.

Answer:

1. What is happening?
2. What previous experience applies?
3. What failed before?
4. What worked before?
5. What should we do differently?


Return JSON:

{
"analysis":"",
"cause":"",
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











// =================================
// ACTION OPTIONS
// =================================


let options=[


{

action:
"OBSERVE_MORE",

goal:
"understanding",

score:
50,

risk:
"low",

reason:
"Need more information"

}


];








const text =

JSON.stringify(reflection)
.toLowerCase();







if(

text.includes("sale") ||

text.includes("customer") ||

text.includes("growth") ||

text.includes("lead")

){



options.push({



action:
"CREATE_GROWTH_ACTION",


goal:
"growth",


score:
75,


risk:
"medium",


reason:
"Growth opportunity detected"



});



}









if(successfulMemories.length){



options.push({


action:
"REPEAT_SUCCESS_PATTERN",


goal:
"growth",


score:
95,


risk:
"low",


reason:
"Past success found",


evidence:
successfulMemories


});



}









if(failedMemories.length){



options.push({



action:
"AVOID_FAILED_PATTERN",



goal:
"protection",



score:
90,



risk:
"low",



reason:
"Previous failure detected",



evidence:
failedMemories



});



}











const recommendation =


options.sort(

(a,b)=>b.score-a.score

)[0];












// =================================
// CONFIDENCE
// =================================


let confidence=50;




confidence +=

experiences.length * 10;




if(repeatedSituation)

confidence +=15;




if(failedMemories.length)

confidence +=10;




if(successfulMemories.length)

confidence +=10;






if(aiThought?.confidence){


confidence =
aiThought.confidence;


}




confidence =
Math.min(
confidence,
100
);










// =================================
// FINAL THINKING RESULT
// =================================


return {




analysis:

aiThought?.analysis ||

"Emma compared this situation with past company experience.",





cause:

aiThought?.cause ||

"Cause requires more observation.",






prediction:

aiThought?.prediction ||

"Past experience affects expected outcome.",







thought:

aiThought || null,








memoryInfluence:{



memoriesStudied:

experiences.length,





successPatterns:

successfulMemories.length,





failurePatterns:

failedMemories.length,





lessonsApplied:

lessons,






failedActions:

failedMemories.map(

m=>

m.memory?.attemptedAction

)

.filter(Boolean)





},









repeatedSituation,








recommendation,








options,








suggestion:


aiThought?.recommendation ||

recommendation.reason,








decisionExplanation:


this.explainDecision(

recommendation,

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











// =================================
// HELPERS
// =================================


findSuccess(memories){



return memories.filter(

m =>

m.memory?.success===true

);



}









findFailures(memories){



return memories.filter(

m =>

m.memory?.success===false

);



}










extractLessons(memories){



return memories


.map(

m =>

m.memory?.lesson

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
success,
failure,
lessons
){



let explanation =

`I selected ${decision.action}. `;






if(success.length){


explanation +=

`I found ${success.length} successful past experience. `;


}






if(failure.length){



explanation +=

`I found ${failure.length} previous failure and avoided repeating it. `;



}








if(lessons.length){



explanation +=

"Past lessons influenced this decision.";



}







return explanation;



}




}



export default EmmaReasoning;