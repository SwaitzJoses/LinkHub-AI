// EmmaReasoning.js
// Emma's thinking engine
// Memory → Analysis → Options → Decision


import EmmaBrain from "./EmmaBrain";



class EmmaReasoning {


constructor(){

console.log(
"💭 Emma Reasoning ready"
);

}









async think(
reflection,
memory
){


console.log(
"💭 Emma thinking:",
{
reflection,
memory
}
);






// ==========================
// Recall company experience
// ==========================


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









// ==========================
// Deep AI thinking if needed
// ==========================


const aiThought =

await EmmaBrain.think({


role:
"AI growth employee",



situation:
reflection,



companyExperience:
experiences,



instruction:

`
Use company experience before general knowledge.

Rules:

- Find what worked before
- Avoid previous failures
- Protect business profit
- Recommend only useful actions
- Explain reasoning

`

});










// ==========================
// Understand current situation
// ==========================


const situation={


meaning:

reflection.meaning ||

"Unknown situation",



importance:

reflection.importance ||

"medium",



impact:

reflection.impact || {}

};











// ==========================
// Generate possible decisions
// ==========================



let options=[



{


action:
"GENERATE_REPORT",


goal:
"analysis",


reason:
"Understand business situation deeper",


score:50,


risk:
"low"


},








{


action:
"CREATE_TASK",


goal:
"operation",


reason:
"Create follow-up work",


score:55,


risk:
"low"


}


];









const text =

JSON.stringify(
reflection
)
.toLowerCase();







// Opportunity


if(

text.includes("growth") ||

text.includes("opportunity") ||

text.includes("interest") ||

text.includes("customer")


){



options.push({


action:
"CREATE_CAMPAIGN",


goal:
"growth",


reason:
"Detected possible growth opportunity",


score:75,


risk:
"medium"


});



}











// Use previous wins


if(
successfulMemories.length>0
){



options.push({


action:
"REPEAT_SUCCESSFUL_STRATEGY",


goal:
"growth",


reason:
"Company history shows this worked before",


basedOn:
successfulMemories.slice(0,3),


score:90,


risk:
"low"


});



}











// Penalize repeated mistakes


if(
failedMemories.length>0
){



options = options.map(
option=>{


return {

...option,


score:
option.score-10,


warning:

"Checked against previous failures"


};


});


}











// ==========================
// Choose strongest option
// ==========================


const recommendation =

options.sort(

(a,b)=>b.score-a.score

)[0];









// ==========================
// Confidence
// ==========================


let confidence=50;




if(
aiThought.success
){

confidence+=15;

}



if(
experiences.length>0
){

confidence+=15;

}



if(
recommendation.score>=80
){

confidence+=20;

}



if(confidence>100){

confidence=100;

}











// ==========================
// Final reasoning package
// ==========================


return {


thought:

aiThought.response ||

"Emma used memory reasoning",





situation,





memoriesUsed:{


total:
experiences.length,


successful:
successfulMemories.length,


failed:
failedMemories.length


},






options,






decisionExplanation:


this.explainDecision(
recommendation,
successfulMemories,
failedMemories
),







recommendation,





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











// ==========================
// Find successful memories
// ==========================


findSuccess(
memories
){


return memories.filter(
item=>{


const text =

JSON.stringify(item)
.toLowerCase();



return (

text.includes("success") ||

text.includes("worked") ||

text.includes("improved") ||

text.includes("growth")

);


});


}









// ==========================
// Find failures
// ==========================


findFailures(
memories
){


return memories.filter(
item=>{


const text =

JSON.stringify(item)
.toLowerCase();



return (

text.includes("failed") ||

text.includes("mistake") ||

text.includes("did not work") ||

text.includes("loss")


);


});


}










// ==========================
// Explain reasoning
// ==========================


explainDecision(
decision,
success,
failure
){



let explanation =

`Selected ${decision.action}. `;





if(success.length>0){


explanation +=

"Past successful experience influenced this decision. ";


}






if(failure.length>0){


explanation +=

"Previous failures were considered to avoid repeating mistakes.";


}





return explanation;



}



}



export default EmmaReasoning;