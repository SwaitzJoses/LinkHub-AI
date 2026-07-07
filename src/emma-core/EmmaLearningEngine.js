// EmmaLearningEngine.js
// Emma's self improvement system
//
// PURPOSE:
//
// Turn experience into wisdom.
//
// Events create memories.
// Outcomes create lessons.
// Repetition creates personality.
//
// RULE:
//
// Learning does not decide.
// Learning changes future Emma.


import EmmaRelationshipMemory
from "./relationship/EmmaRelationshipMemory";


import EmmaIdentity
from "./identity/EmmaIdentity";



class EmmaLearningEngine {


constructor(){


console.log(
"📚 Emma Learning Engine online"
);


this.identity =
EmmaIdentity;


this.lessons=[];


this.behaviourRules=[];


this.experiencePatterns=[];


this.confidence=50;


}









// =================================
// MAIN LEARNING LOOP
// =================================


async learn(
outcome,
memories=[]
){


console.log(
"📚 Emma studying experience:",
outcome
);




if(!outcome){

return null;

}






// ==============================
// UNDERSTAND RESULT
// ==============================


const evaluation =
this.evaluate(outcome);






// ==============================
// RELATIONSHIP LEARNING
// ==============================


const relationshipLearning =
this.learnRelationship(
outcome,
evaluation
);






// ==============================
// FIND PATTERNS
// ==============================


const patterns =
this.findPatterns(
outcome,
memories
);







// ==============================
// CREATE LESSON
// ==============================


const lesson =
this.createLesson({

outcome,
evaluation,
patterns

});







// ==============================
// FUTURE BEHAVIOUR
// ==============================


const futureBehavior =
this.createBehaviorRule({

evaluation,
outcome,
patterns

});








// ==============================
// UPDATE EMMA HERSELF ⭐
// ==============================


const identityGrowth =
this.identity.learnFromExperience({


success:
outcome.success,


type:
futureBehavior.rule,


goal:
outcome.goal


});








this.updateConfidence(
evaluation
);








return this.store({



type:
"SELF_IMPROVEMENT",



lesson,


evaluation,


patternsFound:
patterns,


relationshipLearning,


identityGrowth,


futureBehavior,


confidence:
this.confidence



});



}









// =================================
// RELATIONSHIP LEARNING
// =================================


learnRelationship(
outcome,
evaluation
){



const learning={};





if(outcome.goal){


learning.goal =
outcome.goal;


}






if(evaluation.result==="SUCCESS"){



learning.successPattern =
outcome.goal ||
"successful help";



EmmaRelationshipMemory
.increaseTrust();



}







if(evaluation.result==="FAILURE"){



learning.challenge =
outcome.goal ||
"needs improvement";



}








if(
outcome.learning?.futureRule
){


learning.preference =
outcome.learning.futureRule;


}








const profile =
EmmaRelationshipMemory.learn(
learning
);








return {


learned:
learning,


relationshipNow:
profile


};



}










// =================================
// EXPERIENCE EVALUATION
// =================================


evaluate(outcome){





if(
outcome.success===true
){



return {


result:"SUCCESS",


score:10,


repeat:true,


message:

"Emma should remember this successful behaviour"


};



}








if(
outcome.success===false
){



return {


result:"FAILURE",


score:-10,


repeat:false,


message:

"Emma should adapt this behaviour"


};



}








return {


result:"OBSERVATION",


score:2,


repeat:false,


message:

"Emma collected useful information"


};



}











// =================================
// PATTERN DETECTION
// =================================


findPatterns(
outcome,
memories
){



const patterns=[];




const text =
JSON.stringify({

outcome,
memories

})
.toLowerCase();







if(text.includes("success")){


patterns.push(
"SUCCESS_PATTERN"
);


}





if(
text.includes("fail") ||
text.includes("negative")
){


patterns.push(
"FAILURE_PATTERN"
);


}






if(text.includes("customer")){


patterns.push(
"RELATIONSHIP_PATTERN"
);


}






if(text.includes("approval")){


patterns.push(
"TRUST_PATTERN"
);


}






if(text.includes("repeat")){


patterns.push(
"HABIT_PATTERN"
);


}







const unique =
[...new Set(patterns)];






this.experiencePatterns.push(
...unique
);






return unique;



}










// =================================
// HUMAN READABLE LESSON
// =================================


createLesson({

outcome,
evaluation

}){





if(
evaluation.result==="SUCCESS"
){


return (

`${outcome.goal || "This action"} worked. `+

"Emma will remember this approach."

);


}







if(
evaluation.result==="FAILURE"
){



return (

`${outcome.goal || "This action"} failed. `+

"Emma will change strategy next time."

);



}







return (

"Emma observed without judging too early."

);



}










// =================================
// CREATE FUTURE PERSONALITY RULE
// =================================


createBehaviorRule({

evaluation,
outcome,
patterns

}){






if(evaluation.repeat){



return {


rule:

"REPEAT_WHAT_WORKS",


basedOn:
outcome.goal,


patterns,


message:

"Prefer proven approaches"


};



}









if(
evaluation.result==="FAILURE"
){



return {


rule:

"AVOID_OLD_MISTAKE",


basedOn:
outcome.goal,


patterns,


message:

"Do not repeat failed behaviour"


};



}









return {


rule:

"OBSERVE_AND_LEARN",


patterns,


message:

"Collect more experience first"


};



}











// =================================
// CONFIDENCE UPDATE
// =================================


updateConfidence(
evaluation
){



this.confidence +=
evaluation.score;





this.confidence =
Math.max(
0,
Math.min(
100,
this.confidence
)
);



}










// =================================
// STORE LEARNING
// =================================


store(data){



const learning={



learningId:
crypto.randomUUID(),



...data,



usedForFutureReasoning:true,



createdAt:
new Date()



};







this.lessons.unshift(
learning
);







if(
learning.futureBehavior
){



this.behaviourRules.unshift(

learning.futureBehavior

);



}








this.lessons =
this.lessons.slice(
0,
500
);








console.log(

"🧠 Emma evolved:",

learning

);







return learning;



}











// =================================
// ACCESS FOR REASONING
// =================================


getRelevantLessons(context){



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
.some(

word =>

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




getPatterns(){


return [
...new Set(
this.experiencePatterns
)
];


}











status(){


return {


state:"EVOLVING",


identity:
this.identity.status(),


lessons:
this.lessons.length,


rules:
this.behaviourRules.length,


patterns:
this.getPatterns(),


confidence:
this.confidence


};


}










reset(){


this.lessons=[];

this.behaviourRules=[];

this.experiencePatterns=[];

this.confidence=50;


}



}




export default new EmmaLearningEngine();