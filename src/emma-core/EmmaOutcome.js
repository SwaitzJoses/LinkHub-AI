// EmmaOutcome.js
//
// PROJECT BECOMING
//
// Emma Outcome Engine v2
//
// Outcome is Emma's mirror.
//
// PURPOSE:
//
// Understand what happened
// after action touched reality.
//
// RULE:
//
// Do not learn.
// Do not judge.
// Do not evolve.
//
// Executor moves.
// Outcome observes result.
// Learning extracts meaning.
//
// v2:
// - Intention vs reality
// - Consequence tracking
// - World feedback support
// - Learning ready packets
//



class EmmaOutcome {





constructor(){


console.log(
"📊 Emma Outcome Engine v2 awakened"
);



this.outcomes = [];


this.totalObserved = 0;



}









// =================================
// RECORD OUTCOME
// =================================


async record(

execution = {},

intention = {}

){



console.log(
"📊 Observing result of action..."
);




this.totalObserved++;







// ===============================
// NOTHING OCCURRED
// ===============================


if(

!execution

){



return this.store({


type:"NO_RESULT",


state:"empty",


happened:false,


description:
"No world change was observed.",


readyForLearning:false


});


}










// ===============================
// WAITING STATES
// ===============================


if(

execution.type === "WAITING_APPROVAL" ||

execution.state === "prepared"

){



return this.store({


type:"WAITING",


action:
execution.action,


intention,


happened:true,


worldChange:false,


description:
"Action prepared but not released.",


difference:

this.compare(

intention,

execution

),


readyForLearning:true


});



}











// ===============================
// PAUSED / BLOCKED
// ===============================


if(

execution.type === "PAUSED" ||

execution.type === "BLOCKED"

){



return this.store({


type:"PREVENTED_ACTION",


action:
execution.action,


intention,


happened:true,


worldChange:false,


description:
"Action was intentionally prevented.",


reason:
execution.reason,


difference:

this.compare(

intention,

execution

),


readyForLearning:true


});


}











// ===============================
// NORMAL ACTION
// ===============================


const difference =

this.compare(

intention,

execution

);






const consequence =

this.observeConsequence(

execution

);







return this.store({


type:"ACTION_OUTCOME",


action:
execution.action,


intention,


execution,


difference,


consequence,


worldChange:true,


readyForLearning:true


});



}


// =================================
// EXPECTATION VS REALITY
// =================================


compare(

intention={},

execution={}

){



const expected = {

goal:

intention.goal ||

intention.expected ||

"unknown"

};






const actual = {

result:

execution.result ||

execution.state ||

execution.type ||

"unknown"

};









let alignment = "UNKNOWN";






const text =

JSON.stringify({

expected,

actual

})

.toLowerCase();








if(

text.includes("completed") ||

text.includes("success")

){


alignment =
"MATCHED";


}







if(

text.includes("failed") ||

text.includes("error")

){


alignment =
"DIFFERENT";


}










return {


expected,


actual,


alignment,


createdAt:

new Date()


};



}











// =================================
// OBSERVE CONSEQUENCE
//
// Not learning.
// Just describing.
// =================================


observeConsequence(

execution={}

){





let consequence = {


observed:true,


effect:"UNKNOWN",

relationshipImpact:null,


details:null,




};







const text =

JSON.stringify(execution)

.toLowerCase();








if(

text.includes("completed") ||

text.includes("created")

){



consequence.effect =

"CHANGE_OCCURRED";


}








if(

text.includes("waiting") ||

text.includes("prepared")

){



consequence.effect =

"PENDING";


}








if(

text.includes("failed") ||

text.includes("error")

){



consequence.effect =

"UNEXPECTED_RESULT";


}










consequence.details =

execution.result || null;






return consequence;



}











// =================================
// STORE OUTCOME
// =================================


store(

data={}

){



const outcome = {


id:

this.createId(),



...data,



source:

"EmmaOutcome",



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

"🌎 Outcome observed:",

outcome.type

);








return outcome;



}











// =================================
// SIMILAR OUTCOMES
//
// For Memory / Reasoning
// =================================


findSimilar(

context={}

){



const search =

JSON.stringify(context)

.toLowerCase();







return this.outcomes.filter(

item=>{



const text =

JSON.stringify(item)

.toLowerCase();




return search

.split(" ")

.some(

word =>

word.length > 4 &&

text.includes(word)

);



});



}












// =================================
// LEARNING PIPELINE
// =================================


getLearningReady(){



return this.outcomes.filter(

x =>

x.readyForLearning

);



}











// =================================
// INSIGHTS ONLY
// =================================


getCompleted(){



return this.outcomes.filter(

x =>

x.consequence?.effect ===

"CHANGE_OCCURRED"

);



}








getUnexpected(){



return this.outcomes.filter(

x =>

x.consequence?.effect ===

"UNEXPECTED_RESULT"

);



}










getHistory(){


return this.outcomes;


}









// =================================
// HELPERS
// =================================


createId(){



if(

typeof crypto !== "undefined"

&&

crypto.randomUUID

){


return crypto.randomUUID();


}






return (

Date.now()

+

"-"

+

Math.random()

);



}










// =================================
// STATUS
// =================================


status(){



return {


organ:

"EmmaOutcome",


version:

"v2",


role:

"Reality mirror after action",


state:

"OBSERVING",


observed:

this.totalObserved,


stored:

this.outcomes.length,


completed:

this.getCompleted().length,


unexpected:

this.getUnexpected().length,


principle:

"Do not decide what it means. Only record what happened.",


message:

"I observe the difference between intention and reality."



};



}










// =================================
// RESET
// =================================


reset(){



this.outcomes=[];


this.totalObserved=0;



}



}




export default new EmmaOutcome();