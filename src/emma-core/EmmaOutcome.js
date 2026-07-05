// EmmaOutcome.js
// Emma's experience engine
// Converts actions into wisdom
// Action → Result → Understanding → Lesson → Memory


class EmmaOutcome {


constructor(){

console.log(
"📊 Emma Outcome Learning ready"
);


this.outcomes=[];

}



// =============================
// Main learning entry
// =============================


async record(
action,
result
){


console.log(
"📊 Emma analyzing outcome:",
{
action,
result
}
);



// Measure business impact

const impact =
this.calculateImpact(
result?.metrics || {}
);



// Understand why it happened

const analysis =
this.analyzeReason(
action,
result,
impact
);



// Convert into lesson

const learning =
this.createLearning(
action,
result,
impact,
analysis
);




// Create experience memory

const outcome={


outcomeId:
crypto.randomUUID(),


action:
action?.action,


success:
result?.success || false,


impact,


analysis,


originalDecision:
action,


result:
result?.result || result,


learning,


memoryTags:
this.createMemoryTags(
action,
impact,
learning
),


memoryReady:true,


createdAt:
new Date()


};





this.outcomes.push(
outcome
);



console.log(
"🧠 Emma gained new experience:",
outcome
);



return outcome;


}









// =============================
// Understand WHY
// =============================


analyzeReason(
action,
result,
impact
){



if(
result.success &&
impact !== "negative"
){


return {


reason:
"Action created positive business movement",


pattern:
"repeat_possible",


futureUse:
"Use when similar conditions appear"


};


}




return {


reason:
"Outcome did not meet expectations",


pattern:
"avoid_or_improve",


futureUse:
"Study before repeating"


};



}










// =============================
// Convert result into knowledge
// =============================


createLearning(
action,
result,
impact,
analysis
){



if(
result.success &&
impact !== "negative"
){



return {


type:
"POSITIVE_EXPERIENCE",


confidenceImpact:
this.confidenceChange(
impact
),


lesson:
this.successLesson(
action,
impact,
analysis
),


rememberFor:[

action.action,

"worked",

"successful_strategy",

impact

],


futureRule:
"Prefer this approach when similar situations happen"


};


}







return {


type:
"NEGATIVE_EXPERIENCE",


confidenceImpact:
-15,


lesson:
this.failureLesson(
action,
analysis
),


rememberFor:[

action.action,

"failed",

"avoid_repetition"

],


futureRule:
"Do not repeat unless strategy changes"


};



}










// =============================
// Success lesson creator
// =============================


successLesson(
action,
impact,
analysis
){


return (

`${action.action} created ${impact} impact. ` +

`${analysis.reason}. ` +

"Emma should reuse this experience intelligently."

);


}









// =============================
// Failure lesson creator
// =============================


failureLesson(
action,
analysis
){


return (

`${action.action} was not successful. ` +

`${analysis.reason}. ` +

"Emma should avoid repeating this mistake."

);


}










// =============================
// Business impact measurement
// =============================


calculateImpact(
metrics={}
){



if(
metrics.revenueIncrease > 0 ||
metrics.salesIncrease > 0 ||
metrics.leadsGenerated >= 5
){

return "high";

}




if(
metrics.viewsIncrease ||
metrics.engagementIncrease ||
metrics.clicksIncrease
){

return "medium";

}




if(
metrics.customerComplaints > 0 ||
metrics.loss > 0 ||
metrics.unsubscribes > 0
){

return "negative";

}




return "low";


}










// =============================
// Confidence evolution
// =============================


confidenceChange(
impact
){


switch(
impact
){


case "high":

return 20;


case "medium":

return 10;


case "low":

return 5;


case "negative":

return -20;


default:

return 0;


}


}










// =============================
// Create searchable memory tags
// =============================


createMemoryTags(
action,
impact,
learning
){


return [

action?.action,

impact,

learning.type,

...learning.rememberFor

]
.filter(Boolean);


}










// =============================
// Retrieve all experience
// =============================


getHistory(){

return this.outcomes;

}










// =============================
// Successful patterns
// =============================


getSuccessfulActions(){


return this.outcomes.filter(
item =>

item.learning.type ===
"POSITIVE_EXPERIENCE"

);


}









// =============================
// Failed patterns
// =============================


getFailures(){


return this.outcomes.filter(
item =>

item.learning.type ===
"NEGATIVE_EXPERIENCE"

);


}









// =============================
// Search similar experience
// =============================


findSimilar(
context
){


const search =
JSON.stringify(context)
.toLowerCase();



return this.outcomes.filter(
item => {


const memory =
JSON.stringify(item)
.toLowerCase();


return search
.split(" ")
.some(word =>

word.length > 5 &&
memory.includes(word)

);


});


}






// =============================
// Clear debug memory
// =============================


reset(){

this.outcomes=[];

}


}




export default new EmmaOutcome();