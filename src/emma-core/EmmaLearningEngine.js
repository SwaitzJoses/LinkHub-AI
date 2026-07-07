// EmmaLearningEngine.js
// Emma's self improvement system
//
// PURPOSE:
//
// Convert experience into:
//
// 1. Lessons
// 2. Future behaviour rules
// 3. Relationship understanding
//
// RULE:
//
// Events teach memory.
// Outcomes teach wisdom.
// Repetition teaches personality.


import EmmaRelationshipMemory
from "./relationship/EmmaRelationshipMemory";



class EmmaLearningEngine {


constructor(){


console.log(
"📚 Emma Learning Engine online"
);


this.lessons=[];

this.behaviourRules=[];


}









// =================================
// MAIN LEARNING LOOP
// =================================


async learn(outcome,memory={}){


console.log(
"📚 Emma studying outcome:",
outcome
);



if(!outcome){

return null;

}





// ===============================
// LEARN ABOUT RELATIONSHIP
// ===============================


const relationshipLearning =
this.learnRelationship(
outcome,
memory
);










// ===============================
// WAITING / OBSERVATION
// ===============================


if(
outcome.status==="WAITING" ||
outcome.type==="OBSERVATION"
){



return this.storeLearning({


type:
"PATIENCE_LESSON",




evaluation:{


result:
"INTELLIGENT_WAIT",


score:1,


shouldRepeat:true,


reason:
"Observation was better than unnecessary action"


},




relationshipLearning,




lesson:
"Sometimes the best action is to wait and understand more.",






futureBehavior:{


rule:
"OBSERVE_BEFORE_ACTING",


message:
"Understand context before interrupting"


}



});


}









// ===============================
// NORMAL EXPERIENCE
// ===============================


const evaluation =
this.evaluateOutcome(
outcome
);





const patterns =
this.detectPatterns(
memory,
outcome
);





const lesson =
this.createLesson(
outcome,
evaluation,
relationshipLearning
);





const futureRule =
this.createFutureRule(
evaluation,
outcome,
patterns,
relationshipLearning
);










return this.storeLearning({



type:
"EXPERIENCE_LESSON",




originalAction:
outcome.action,




relationshipLearning,




evaluation,




lesson,




patternsFound:
patterns,




confidenceChange:

this.calculateConfidenceChange(
evaluation
),





futureBehavior:
futureRule



});



}












// =================================
// RELATIONSHIP INTELLIGENCE
// =================================


learnRelationship(
outcome,
memory
){



let learning={};







// goals


if(outcome.goal){


learning.goal =
outcome.goal;


}








// preferences


if(outcome.preference){



learning.preference =
outcome.preference;



}









// repeated behaviour


if(outcome.pattern){



learning.pattern =
outcome.pattern;



}









// difficulty


if(
outcome.success===false
){



learning.struggle =


outcome.action ||

"Unknown challenge";



}









// strength


if(
outcome.success===true
){



learning.strength =


outcome.action ||

"Successful behaviour";




EmmaRelationshipMemory
.increaseTrust();



}









// decision history


if(outcome.action){



learning.decision =
outcome.action;



learning.result =
outcome.success;



}









// communication preference


if(
memory.communicationStyle
){



learning.communicationStyle =

memory.communicationStyle;



}









const updatedProfile =


EmmaRelationshipMemory.learn(
learning
);








return {


learned:

learning,



relationshipNow:

updatedProfile



};



}












// =================================
// SAVE LEARNING
// =================================


storeLearning(data){



const learning={


learningId:
crypto.randomUUID(),



...data,



usedForFutureReasoning:true,



createdAt:
new Date()



};







this.lessons.push(
learning
);







if(
learning.futureBehavior
){


this.behaviourRules.push(
learning.futureBehavior
);


}







console.log(
"🧠 Emma upgraded herself:",
learning
);




return learning;



}











// =================================
// OUTCOME EVALUATION
// =================================


evaluateOutcome(outcome){



if(outcome.success===true){



return {


result:
"SUCCESS_PATTERN",


score:5,


shouldRepeat:true,


reason:
"This action created a positive outcome"


};



}








if(outcome.success===false){



return {


result:
"FAILED_PATTERN",


score:-5,


shouldRepeat:false,


reason:
"This approach failed"


};



}









return {


result:
"UNKNOWN_RESULT",


score:0,


shouldRepeat:false,


reason:
"More experience required"


};



}












// =================================
// CREATE LESSON
// =================================


createLesson(
outcome,
evaluation,
relationship
){



if(
evaluation.shouldRepeat
){



return `Emma learned ${outcome.action} works for this relationship.`;



}





if(
evaluation.score < 0
){



return `Emma learned ${outcome.action} needs a different approach.`;



}







return (

"Emma stored this experience for future understanding."

);



}












// =================================
// PATTERN DISCOVERY
// =================================


detectPatterns(
memory,
outcome
){



const patterns=[];



const text =
JSON.stringify({

memory,
outcome

})
.toLowerCase();







if(text.includes("success")){


patterns.push(
"SUCCESS_PATTERN"
);


}




if(
text.includes("fail") ||
text.includes("mistake")
){


patterns.push(
"FAILURE_PATTERN"
);


}






if(text.includes("customer")){


patterns.push(
"CUSTOMER_PATTERN"
);


}





if(text.includes("preference")){


patterns.push(
"PREFERENCE_PATTERN"
);


}







return [

...new Set(patterns)

];



}












// =================================
// FUTURE RULE CREATION
// =================================


createFutureRule(
evaluation,
outcome,
patterns,
relationship
){



if(
evaluation.shouldRepeat
){



return {


rule:
"REPEAT_SUCCESSFUL_PATTERN",



basedOn:
outcome.action,



patterns,



relationshipAware:true,



message:
"Reuse because this worked before"



};



}










if(
evaluation.score < 0
){



return {


rule:
"AVOID_FAILED_PATTERN",



basedOn:
outcome.action,



patterns,



relationshipAware:true,



message:
"Change strategy next time"



};



}










return {


rule:
"KEEP_LEARNING",



patterns,



message:
"Collect more evidence"



};



}












// =================================
// CONFIDENCE UPDATE
// =================================


calculateConfidenceChange(
evaluation
){



if(
evaluation.shouldRepeat
){

return 10;

}



if(
evaluation.score < 0
){

return -10;

}



return 0;



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

.some(word=>

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