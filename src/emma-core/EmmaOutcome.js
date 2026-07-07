// EmmaOutcome.js
// Emma's experience engine
//
// PURPOSE:
//
// Understand what happened after Emma worked.
//
// Plan
// ↓
// Execution
// ↓
// Outcome
// ↓
// Lesson
// ↓
// Memory
//
// RULE:
//
// Success teaches.
// Failure teaches.
// Waiting teaches.
// Observing teaches.


class EmmaOutcome {


constructor(){


console.log(
"📊 Emma Outcome Intelligence online"
);


this.outcomes = [];


}









// =================================
// MAIN EXPERIENCE ENTRY
// =================================


async record(
execution,
plan={}
){


console.log(
"📊 Emma reviewing experience:",
{
execution,
plan
}
);




// -----------------------------
// NOTHING HAPPENED
// -----------------------------


if(!execution){


return this.store({


type:"NO_RESULT",


success:null,


lesson:
"Emma had nothing to evaluate.",


memoryReady:false


});


}









// -----------------------------
// WAITING / APPROVAL
// -----------------------------


if(
execution.status === "WAITING_FOR_APPROVAL" ||
execution.type === "PLAN_READY"
){



return this.store({


type:"WAITING",


success:null,


goal:
plan.goal,


analysis:{


reason:
"Emma prepared work but waited safely.",


pattern:
"responsible_autonomy"


},


learning:{


type:"SAFE_AUTONOMY",


lesson:
"Preparing without acting builds trust.",


futureRule:
"Ask approval for sensitive actions"


},


memoryReady:true


});



}










// -----------------------------
// BLOCKED ACTION
// -----------------------------


if(
execution.status === "NOT_EXECUTED"
){



return this.store({



type:"PREVENTED_ACTION",



success:true,



goal:
plan.goal,



analysis:{


reason:
"Emma avoided unsafe execution",


pattern:
"risk_prevention"


},




learning:{


type:"SAFETY_LEARNING",


lesson:
"Not acting was the correct action.",


futureRule:
"Respect autonomy limits"


},



memoryReady:true



});



}










// -----------------------------
// NORMAL ACTION RESULT
// -----------------------------



const impact =

this.calculateImpact(

execution

);





const analysis =

this.analyze(

execution,

plan,

impact

);





const learning =

this.createLearning(

execution,

plan,

impact,

analysis

);








return this.store({



type:"ACTION_EXPERIENCE",



success:

execution.success === true,



goal:

plan.goal,



plan,



execution,



impact,



analysis,



learning,



memoryTags:

this.createTags(

plan,

execution,

learning

),



memoryReady:true



});




}









// =================================
// ANALYSIS ENGINE
// =================================


analyze(
execution,
plan,
impact
){



if(execution.success){



return {


reason:

"Emma completed the planned work.",


pattern:

"repeat_candidate",


futureUse:

"Use similar approach when context matches"



};



}








return {


reason:

"Execution did not create expected result.",


pattern:

"needs_adjustment",


futureUse:

"Change approach next time"


};



}









// =================================
// CREATE EXPERIENCE
// =================================


createLearning(
execution,
plan,
impact,
analysis
){



if(execution.success){



return {


type:"POSITIVE_EXPERIENCE",


confidenceImpact:

this.confidenceChange(impact),



lesson:

`${plan.goal || "Action"} worked with ${impact} impact.`,



futureRule:

"Repeat when similar conditions appear",



rememberFor:[


plan.category,


impact,


"successful"


]


};



}









return {


type:"FAILED_EXPERIENCE",



confidenceImpact:-5,



lesson:

`${plan.goal || "Action"} needs improvement.`,



futureRule:

"Adjust before repeating",



rememberFor:[


plan.category,


"failed"


]


};



}









// =================================
// IMPACT SCORE
// =================================


calculateImpact(execution){



const text =

JSON.stringify(execution)

.toLowerCase();






if(
text.includes("revenue") ||
text.includes("saved") ||
text.includes("completed")
){


return "high";


}






if(
text.includes("created") ||
text.includes("generated") ||
text.includes("prepared")
){


return "medium";


}







if(
execution.success === false
){


return "negative";


}







return "low";



}










confidenceChange(impact){



const score={


high:20,


medium:10,


low:5,


negative:-10


};




return score[impact] || 0;



}










// =================================
// MEMORY TAGGING
// =================================


createTags(
plan,
execution,
learning
){



return [


plan.category,


plan.goal,


execution.type,


learning.type,


...(learning.rememberFor || [])


]
.filter(Boolean);



}









// =================================
// STORE EXPERIENCE
// =================================


store(data){



const outcome={



outcomeId:

crypto.randomUUID(),



...data,



createdAt:

new Date()



};





this.outcomes.unshift(

outcome

);





this.outcomes =

this.outcomes.slice(

0,

500

);






console.log(
"🧠 Emma learned:",
outcome
);




return outcome;



}










// =================================
// EXPERIENCE SEARCH
// =================================


findSimilar(context){



const search =

JSON.stringify(context)

.toLowerCase();




return this.outcomes.filter(

memory => {



const text =

JSON.stringify(memory)

.toLowerCase();




return search

.split(" ")

.some(

word =>

word.length > 5 &&

text.includes(word)

);



}


);



}









// =================================
// INSIGHTS
// =================================


getSuccessfulActions(){



return this.outcomes.filter(

x=>

x.learning?.type ===

"POSITIVE_EXPERIENCE"

);



}








getFailures(){



return this.outcomes.filter(

x=>

x.learning?.type ===

"FAILED_EXPERIENCE"

);



}









getHistory(){


return this.outcomes;


}









status(){



return {


state:"ACTIVE",


role:

"Turns Emma experiences into learning",



totalExperiences:

this.outcomes.length,



successes:

this.getSuccessfulActions().length,



failures:

this.getFailures().length



};



}









reset(){


this.outcomes=[];


}



}





export default new EmmaOutcome();