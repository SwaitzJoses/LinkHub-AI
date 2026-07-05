// EmmaLearningEngine.js
// Emma's self improvement system
// Turns experiences into intelligence
// Outcomes → Patterns → Rules → Better Future Decisions


class EmmaLearningEngine {


constructor(){

console.log(
"📚 Emma Learning Engine ready"
);


this.lessons=[];


this.behaviourRules=[];


}








// ===============================
// Main learning process
// ===============================


async learn(
outcome,
memory
){


console.log(
"📚 Emma studying experience:",
outcome
);




// Evaluate decision quality

const evaluation =
this.evaluateDecision(
outcome
);




// Extract lesson

const lesson =
this.extractLesson(
outcome,
evaluation
);




// Detect patterns from memory

const patterns =
this.detectPatterns(
memory
);




// Create future behaviour

const futureRule =
this.createFutureRule(
evaluation,
outcome,
patterns
);




// Create learning record

const learning={


learningId:
crypto.randomUUID(),


businessId:
outcome.businessId || null,


originalAction:
outcome.action,


evaluation,


lesson,


patternsFound:
patterns,


confidenceChange:
this.calculateConfidenceChange(
evaluation
),


futureBehavior:
futureRule,


usedForFutureReasoning:true,


createdAt:
new Date()


};





this.lessons.push(
learning
);



this.behaviourRules.push(
futureRule
);




console.log(
"🧠 Emma upgraded herself:",
learning
);




return learning;


}









// ===============================
// Judge past decision
// ===============================


evaluateDecision(
outcome
){



if(
!outcome.success
){


return {


result:
"BAD_EXPERIENCE",


reason:
"Action failed or produced no value",


score:-2,


shouldRepeat:false


};


}







if(
outcome.impact==="high"
){


return {


result:
"STRONG_SUCCESS",


reason:
"Created major business improvement",


score:3,


shouldRepeat:true


};


}







if(
outcome.impact==="medium"
){


return {


result:
"SUCCESS_PATTERN",


reason:
"Created useful improvement",


score:2,


shouldRepeat:true


};


}








return {


result:
"SMALL_RESULT",


reason:
"Worked but needs more evidence",


score:0,


shouldRepeat:false


};



}









// ===============================
// Create human lesson
// ===============================


extractLesson(
outcome,
evaluation
){



if(
evaluation.shouldRepeat
){


return (

`${outcome.action} produced useful results. ` +

"Emma should remember the conditions and reuse carefully."

);


}







if(
evaluation.result==="BAD_EXPERIENCE"
){


return (

`${outcome.action} failed or hurt results. ` +

"Emma should avoid repeating without a better strategy."

);


}








return (

`${outcome.action} gave limited information. ` +

"Emma should collect more data before trusting this pattern."

);


}











// ===============================
// Pattern discovery
// ===============================


detectPatterns(
memory
){


const experiences =
memory?.relevantExperiences || [];



let patterns=[];




experiences.forEach(item=>{


const text =
JSON.stringify(item)
.toLowerCase();




if(
text.includes("customer")
){

patterns.push(
"CUSTOMER_BEHAVIOUR_PATTERN"
);

}




if(
text.includes("sale") ||
text.includes("revenue")
){

patterns.push(
"SALES_PATTERN"
);

}




if(
text.includes("failed")
){

patterns.push(
"FAILURE_PATTERN"
);

}




if(
text.includes("worked") ||
text.includes("success")
){

patterns.push(
"SUCCESS_PATTERN"
);

}


});





return [
...new Set(patterns)
];


}











// ===============================
// Confidence evolution
// ===============================


calculateConfidenceChange(
evaluation
){


switch(
evaluation.result
){



case "STRONG_SUCCESS":

return 20;




case "SUCCESS_PATTERN":

return 10;




case "BAD_EXPERIENCE":

return -20;




default:

return 0;


}


}











// ===============================
// Create future rule
// ===============================


createFutureRule(
evaluation,
outcome,
patterns
){



if(
evaluation.shouldRepeat
){


return {


rule:
"REPEAT_INTELLIGENTLY",


basedOn:
outcome.action,


patterns,


message:
"Prefer this strategy when similar business conditions appear"


};


}







if(
evaluation.score < 0
){


return {


rule:
"AVOID_MISTAKE",


basedOn:
outcome.action,


patterns,


message:
"Do not repeat this action without changing approach"


};


}








return {


rule:
"KEEP_OBSERVING",


basedOn:
outcome.action,


patterns,


message:
"Need more evidence before creating a permanent strategy"


};


}









// ===============================
// Give knowledge to Reasoning
// ===============================


getRelevantLessons(
context
){


const search =
JSON.stringify(context)
.toLowerCase();



return this.lessons.filter(
lesson=>{


const text =
JSON.stringify(lesson)
.toLowerCase();


return search
.split(" ")
.some(word=>

word.length>5 &&
text.includes(word)

);


});


}










// ===============================
// Get learned rules
// ===============================


getRules(){

return this.behaviourRules;

}








// ===============================
// All lessons
// ===============================


getLessons(){

return this.lessons;

}








// ===============================
// Debug reset
// ===============================


reset(){

this.lessons=[];

this.behaviourRules=[];

}


}




export default new EmmaLearningEngine();