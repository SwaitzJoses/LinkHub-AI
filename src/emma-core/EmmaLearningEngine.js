// EmmaLearningEngine.js
//
// PROJECT BECOMING
//
// Emma Learning Engine v2
//
// Learning is reflection after life.
//
// PURPOSE:
//
// Experience happens.
// Actions create outcomes.
// Learning extracts meaning.
//
// RULE:
//
// Do not decide.
// Do not act.
// Do not create identity.
//
// Memory stores.
// Wisdom matures.
// SelfModel changes.
// Identity emerges slowly.
//
// v2:
// - Outcome aware
// - Pattern based learning
// - Prevents instant personality changes
// - Creates wisdom candidates
// - Supports Executor v3
//



class EmmaLearningEngine {





constructor(){


console.log(
"📚 Emma Learning Engine v2 awakened"
);



this.lessons = [];


this.patterns = [];


this.observations = [];


this.behaviourSignals = [];


this.learningCycles = 0;



}









// =================================
// MAIN LEARNING LOOP
// =================================


async learn(

outcome = {},

memories = []

){



console.log(
"📚 Emma studying outcome..."
);





if(
!outcome
){


return null;


}





this.learningCycles++;









// ===============================
// UNDERSTAND RESULT
// ===============================


const evaluation =

this.evaluateOutcome(

outcome

);










// ===============================
// COMPARE HISTORY
// ===============================


const patterns =

this.detectPatterns({

outcome,

memories

});










// ===============================
// EXTRACT LESSON
// ===============================


const lesson =

this.extractLesson({

outcome,

evaluation,

patterns

});










// ===============================
// CREATE WISDOM SIGNAL
// ===============================


const wisdomSignal =

this.createWisdomSignal({

lesson,

patterns,

evaluation

});










// ===============================
// CREATE SELF SIGNAL
// ===============================


const selfSignal =

this.createSelfSignal({

patterns,

evaluation

});











const learning =

this.store({


outcome,


evaluation,


patterns,


lesson,


wisdomSignal,


selfSignal


});









return learning;



}











// =================================
// OUTCOME EVALUATION
// =================================


evaluateOutcome(

outcome={}

){






// SUCCESSFUL ACTION


if(

outcome.type === "ACTION_COMPLETED" ||

outcome.success === true

){



return {


result:"SUCCESS",


meaning:
"Action created intended movement.",


importance:70,


repeat:false


};


}










// FAILED ACTION


if(

outcome.type === "ACTION_FAILED" ||

outcome.success === false

){



return {


result:"FAILURE",


meaning:
"Action did not create expected result.",


importance:90,


repeat:false


};


}










// PAUSED BY JUDGEMENT


if(

outcome.type === "PAUSED" ||

outcome.type === "BLOCKED"

){



return {


result:"PROTECTION",


meaning:
"Emma avoided a possible mistake.",


importance:60,


repeat:false


};


}










// RECOMMENDATION


if(

outcome.type === "RECOMMENDATION"

){



return {


result:"OBSERVATION",


meaning:
"Advice was created but not tested yet.",


importance:30,


repeat:false


};


}









return {


result:"UNKNOWN",


meaning:
"More experience is required.",


importance:10,


repeat:false


};



}

// =================================
// PATTERN DETECTION
// =================================


detectPatterns({

outcome,

memories=[]

}){



const detected = [];




const text =

JSON.stringify({

outcome,

memories

})

.toLowerCase();






if(
text.includes("success") ||
text.includes("completed")
){


detected.push({

type:"SUCCESS_PATTERN",

meaning:
"This approach has created positive outcomes."


});


}








if(

text.includes("failed") ||

text.includes("failure") ||

text.includes("error")

){


detected.push({

type:"FAILURE_PATTERN",

meaning:
"This approach has created difficulty before."


});


}








if(

text.includes("pause") ||

text.includes("blocked")

){


detected.push({

type:"CAUTION_PATTERN",

meaning:
"Waiting prevented unnecessary action."


});


}








if(

text.includes("repeat")

){


detected.push({

type:"REPEATED_BEHAVIOUR",

meaning:
"This has happened multiple times."


});


}









this.patterns.push(
...detected
);






return detected;



}











// =================================
// CREATE LESSON
// =================================


extractLesson({

outcome,

evaluation,

patterns

}){






let lesson = {




type:

evaluation.result,



message:

evaluation.meaning,



confidence:

"LOW",



basedOn:

outcome.action || "experience",



createdAt:

new Date()



};










// repeated evidence creates stronger lesson

const similar =

this.patterns.filter(

p =>

patterns.some(

x => x.type === p.type

)

);










if(

similar.length >= 3

){



lesson.confidence =

"HIGH";



lesson.message +=

" Repeated experience supports this lesson.";



}






else if(

similar.length >= 1

){


lesson.confidence =

"MEDIUM";


}








return lesson;



}











// =================================
// WISDOM SIGNAL
//
// Learning does not become wisdom.
// It suggests wisdom.
// =================================


createWisdomSignal({

lesson,

patterns,

evaluation

}){






if(

lesson.confidence !== "HIGH"

){



return {


ready:false,


reason:
"Needs more experiences before becoming wisdom."


};



}









return {


ready:true,


candidate:{



lesson:


lesson.message,



source:

"LearningEngine",



strength:

lesson.confidence,



patterns,


createdAt:

new Date()



}



};



}











// =================================
// SELF MODEL SIGNAL
//
// Learning does not change Emma.
// SelfModel decides.
// =================================


createSelfSignal({

patterns,

evaluation

}){






return {


source:

"LearningEngine",



suggestedGrowth:{



patterns,


direction:

evaluation.result,


importance:

evaluation.importance



},




createdAt:

new Date()



};



}












// =================================
// STORE LEARNING
// =================================


store(

data={}

){





const learning = {


id:

this.createId(),



...data,



usedForFutureReasoning:

true,



createdAt:

new Date()



};








this.lessons.unshift(

learning

);







this.lessons =

this.lessons.slice(

0,

500

);









console.log(

"🌱 Learning created:",

learning.lesson?.type

);








return learning;



}










// =================================
// ACCESS FOR REASONING
// =================================


getRelevantLessons(

context={}

){



const search =

JSON.stringify(context)

.toLowerCase();






return this.lessons.filter(

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
// GETTERS
// =================================


getLessons(){


return this.lessons;


}




getPatterns(){



return [

...new Set(

this.patterns.map(

p=>p.type

)

)

];



}








getWisdomCandidates(){



return this.lessons


.filter(

x =>

x.wisdomSignal?.ready

)


.map(

x =>

x.wisdomSignal.candidate

);



}









getSelfGrowthSignals(){



return this.lessons


.map(

x => x.selfSignal

)


.filter(Boolean);



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

"EmmaLearningEngine",


version:

"v2",


role:

"Experience into lessons",


state:

"LEARNING",


cycles:

this.learningCycles,


lessons:

this.lessons.length,


patterns:

this.getPatterns(),


wisdomReady:

this.getWisdomCandidates().length,


principle:

"One experience teaches. Repetition transforms.",


message:

"I learn from outcomes but allow wisdom and identity to grow slowly."



};



}









// =================================
// RESET
// =================================


reset(){



this.lessons=[];


this.patterns=[];


this.observations=[];


this.behaviourSignals=[];


this.learningCycles=0;



}



}




export default EmmaLearningEngine;