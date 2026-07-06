// EmmaOutcome.js
// Emma's experience engine
//
// Action
// → Result
// → Understanding
// → Personal Learning
// → Memory
//
// RULE:
// Acting can succeed/fail.
// Observing is learning.
// Waiting is intelligence.



class EmmaOutcome {


constructor(){


console.log(
"📊 Emma Personal Outcome Learning online"
);


this.outcomes=[];


}









// =============================
// Main learning entry
// =============================


async record(
decision,
result={}
){


console.log(
"📊 Emma studying outcome:",
{
decision,
result
}
);




// =============================
// WAITING IS NOT FAILURE
// =============================


if(
decision?.type === "WAIT"
){


const outcome={


outcomeId:
crypto.randomUUID(),


type:
"MONITORING",


success:
null,


analysis:{


reason:
"Emma intentionally waited for more information",


pattern:
"continue_monitoring",


futureUse:
"Observe future signals before acting"


},


learning:{


type:
"MONITORING_EXPERIENCE",


lesson:
"Waiting was intentional. No success or failure assigned.",


futureRule:
"Continue watching this situation"


},


memoryReady:false,


createdAt:
new Date()


};




this.outcomes.push(outcome);



console.log(
"👀 Emma continues monitoring",
outcome
);


return outcome;


}









// =============================
// OBSERVATION IS LEARNING
// =============================


if(
decision?.type === "OBSERVE_ONLY"
){



const outcome={


outcomeId:
crypto.randomUUID(),



userId:
decision?.userId || null,


businessId:
decision?.businessId || null,



type:
"OBSERVED_PATTERN",



success:
null,



observation:
decision.reason,



analysis:{


reason:
"Emma discovered a possible pattern",


pattern:
"needs_more_evidence",


futureUse:
"Compare with future events"


},




learning:{


type:
"OBSERVATION_EXPERIENCE",


lesson:
"Pattern stored. More evidence required before action.",


rememberFor:[
decision.reason,
"observed"
],


futureRule:
"Use if pattern repeats"


},




memoryTags:[

"observation",
decision.reason,
"pattern"

]
.filter(Boolean),



memoryReady:true,



createdAt:
new Date()


};





this.outcomes.push(outcome);




console.log(
"🧠 Emma learned observation:",
outcome
);



return outcome;


}










// =============================
// ACTION OUTCOME
// =============================


const action =
decision;




const impact =
this.calculateImpact(
result?.metrics || {}
);





const analysis =
this.analyzeReason(
action,
result,
impact
);





const personalLearning =
this.learnAboutPerson(
action,
result
);






const learning =
this.createLearning(

action,

result,

impact,

analysis,

personalLearning

);









const outcome={



outcomeId:

crypto.randomUUID(),




type:

"ACTION_RESULT",





userId:

action?.userId ||

result?.userId ||

null,






businessId:

action?.businessId ||

result?.businessId ||

null,







action:

action?.action,







success:

result?.success === true,







impact,








analysis,








personalLearning,








originalDecision:

action,








result:

result?.result ||

result,









learning,










memoryTags:

this.createMemoryTags(

action,

impact,

learning,

personalLearning

),









memoryReady:true,









createdAt:

new Date()



};








this.outcomes.push(

outcome

);








console.log(
"🧠 Emma became smarter:",
outcome
);







return outcome;


}











// =============================
// Learn about person
// =============================


learnAboutPerson(
action,
result
){



const text =

JSON.stringify({

action,

result

})
.toLowerCase();





let learning={


preferences:[],


workingStyle:[],


decisionPatterns:[],


futureSupport:[]


};







if(

text.includes("approved") ||

text.includes("liked")

){


learning.preferences.push(

"User responded positively to this approach"

);


}






if(

text.includes("fast") ||

text.includes("quick")

){



learning.workingStyle.push(

"User prefers fast movement"

);



}







if(

text.includes("delayed") ||

text.includes("ignored")

){



learning.decisionPatterns.push(

"User may need better timing or reminders"

);



}








if(result?.success){



learning.futureSupport.push(

"Similar help may be useful again"

);



}

else{



learning.futureSupport.push(

"Adjust approach next time"

);



}







return learning;



}











// =============================
// Understand why outcome happened
// =============================


analyzeReason(
action,
result,
impact
){





if(

result?.success &&

impact !== "negative"

){



return {



reason:

"Action created a positive result",




pattern:

"repeat_possible",




futureUse:

"Use when similar personal context appears"



};



}










return {



reason:

"Action did not create expected result",




pattern:

"adjust_next_time",




futureUse:

"Improve before repeating"



};




}









// =============================
// Create memory lesson
// =============================


createLearning(

action,

result,

impact,

analysis,

personalLearning

){







if(

result?.success &&

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









personalLesson:

personalLearning,









rememberFor:[



action?.action,

"worked",

impact



],









futureRule:

"Use this approach when a similar situation appears"




};





}











return {




type:

"FAILED_EXPERIENCE",








confidenceImpact:

-5,









lesson:

this.failureLesson(

action,

analysis

),









personalLesson:

personalLearning,









rememberFor:[



action?.action,


"needs_adjustment"



],










futureRule:

"Adapt strategy before trying again"




};




}









successLesson(
action,
impact,
analysis
){



return (

`${action?.action} created ${impact} impact. ` +

`${analysis.reason}. ` +

"Emma should remember why this helped."

);



}










failureLesson(
action,
analysis
){



return (

`${action?.action} needs improvement. ` +

`${analysis.reason}. ` +

"Emma should adjust next time."

);



}









calculateImpact(metrics={}){





if(

metrics.revenueIncrease > 0 ||

metrics.salesIncrease > 0 ||

metrics.goalCompleted

){


return "high";


}







if(

metrics.timeSaved ||

metrics.progress ||

metrics.engagementIncrease

){


return "medium";


}








if(

metrics.problem ||

metrics.loss

){


return "negative";


}







return "low";



}









confidenceChange(impact){



switch(impact){



case "high":

return 20;



case "medium":

return 10;



case "low":

return 5;



case "negative":

return -10;



default:

return 0;



}



}









createMemoryTags(
action,
impact,
learning,
personal
){



return [


action?.action,


impact,


learning.type,


...(learning.rememberFor || []),


...(personal.preferences || []),


...(personal.workingStyle || [])


]

.filter(Boolean);



}










getHistory(){


return this.outcomes;


}








getSuccessfulActions(){



return this.outcomes.filter(

x =>

x.learning.type ===

"POSITIVE_EXPERIENCE"

);



}









getFailures(){



return this.outcomes.filter(

x =>

x.learning.type ===

"FAILED_EXPERIENCE"

);



}










findSimilar(context){



const search =

JSON.stringify(context)

.toLowerCase();




return this.outcomes.filter(item=>{



const memory =

JSON.stringify(item)

.toLowerCase();




return search

.split(" ")

.some(word =>

word.length>5 &&

memory.includes(word)

);



});



}









reset(){


this.outcomes=[];


}



}





export default new EmmaOutcome();