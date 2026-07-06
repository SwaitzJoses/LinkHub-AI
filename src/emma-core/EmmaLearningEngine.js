// EmmaLearningEngine.js
// Emma's self improvement system
//
// Turns experiences into intelligence
//
// Outcomes
// → Patterns
// → Rules
// → Better Future Decisions
//
// RULE:
// Failed actions teach.
// Observations create wisdom.
// Waiting is intelligence.



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
memory={}
){


console.log(
"📚 Emma studying experience:",
outcome
);




if(!outcome){

return null;

}





// ===============================
// WAITING
// ===============================


if(
outcome.type === "MONITORING"
){


const learning={


learningId:
crypto.randomUUID(),


type:
"MONITORING_LESSON",


evaluation:{


result:
"INTELLIGENT_WAIT",


reason:
"Emma chose to continue observing instead of forcing action",


score:0,


shouldRepeat:true


},


lesson:
"Waiting was intentional. Continue gathering signals.",


futureBehavior:{


rule:
"CONTINUE_MONITORING",


message:
"Do not act until enough evidence exists"


},


usedForFutureReasoning:true,


createdAt:
new Date()


};




this.lessons.push(
learning
);



console.log(
"👀 Emma learned patience:",
learning
);



return learning;


}









// ===============================
// OBSERVATION
// ===============================


if(
outcome.type === "OBSERVED_PATTERN"
){


const patterns =
this.detectPatterns(memory);



const learning={


learningId:
crypto.randomUUID(),


type:
"OBSERVATION_LESSON",


businessId:
outcome.businessId || null,


evaluation:{


result:
"PATTERN_DISCOVERED",


reason:
"Emma noticed a possible recurring signal",


score:1,


shouldRepeat:true


},



lesson:
outcome.learning?.lesson ||
"Observation stored for future comparison",



patternsFound:
patterns,



confidenceChange:
5,



futureBehavior:{


rule:
"WATCH_PATTERN",


basedOn:
outcome.observation,


patterns,


message:
"If this repeats, increase confidence and consider action"


},



usedForFutureReasoning:true,



createdAt:
new Date()


};




this.lessons.push(
learning
);


this.behaviourRules.push(
learning.futureBehavior
);




console.log(
"🧠 Emma learned a pattern:",
learning
);



return learning;


}











// ===============================
// NORMAL ACTION LEARNING
// ===============================


const evaluation =
this.evaluateDecision(
outcome
);





const lesson =
this.extractLesson(
outcome,
evaluation
);





const patterns =
this.detectPatterns(
memory
);





const futureRule =
this.createFutureRule(
evaluation,
outcome,
patterns
);







const learning={



learningId:
crypto.randomUUID(),




type:
"ACTION_LESSON",




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





// Important:
// only ACTION_RESULT can fail



if(
outcome.type==="ACTION_RESULT" &&
outcome.success === false
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
"Created major improvement",


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
"Limited evidence collected",


score:0,


shouldRepeat:false


};



}









// ===============================
// Human lesson
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

"Reuse when similar conditions appear."

);


}







if(
evaluation.result==="BAD_EXPERIENCE"
){


return (

`${outcome.action} failed. ` +

"Change approach before trying again."

);


}








return (

`${outcome.action} needs more evidence. ` +

"Keep learning before creating a rule."

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



case "PATTERN_DISCOVERED":

return 5;



case "BAD_EXPERIENCE":

return -20;



default:

return 0;


}


}









// ===============================
// Future rules
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
"Use when similar conditions appear"


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
"Do not repeat without changing strategy"


};


}








return {


rule:
"KEEP_OBSERVING",


basedOn:
outcome.action,


patterns,


message:
"Collect more evidence"


};


}










// ===============================
// Reasoning access
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
.some(word =>

word.length>5 &&
text.includes(word)

);


});


}









getRules(){

return this.behaviourRules;

}




getLessons(){

return this.lessons;

}




reset(){

this.lessons=[];

this.behaviourRules=[];

}



}





export default new EmmaLearningEngine();