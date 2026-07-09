// EmmaLearningEngine.js
//
// PROJECT BECOMING
//
// Emma Learning Engine v3
//
// Learning is meaning extraction.
//
// RULE:
//
// Do not decide.
// Do not act.
// Do not create identity.
//
// Memory stores events.
// Learning extracts patterns.
// Wisdom receives mature lessons.
// Evolution receives repeated proof.
//
// v3 PATCH:
// - Evidence based learning
// - Lesson compression
// - Confidence growth
// - Category awareness
// - Duplicate prevention
//


class EmmaLearningEngine {




constructor(){



console.log(
"📚 Emma Learning Engine v3 awakened"
);




this.lessons = [];


this.patterns = new Map();


this.observations = [];


this.learningCycles = 0;




// mature lessons ready for wisdom

this.wisdomCandidates = [];



}









// =================================
// MAIN LEARNING LOOP
// =================================


async learn(

outcome = {},

memories = []

){



console.log(
"📚 Emma extracting lesson..."
);





if(!outcome){

return null;

}





this.learningCycles++;








// ===============================
// EVALUATE RESULT
// ===============================


const evaluation =

this.evaluateOutcome(

outcome

);









// ===============================
// DISCOVER CATEGORY
// ===============================


const category =

this.detectCategory(

outcome

);









// ===============================
// FIND PATTERNS
// ===============================


const patterns =

this.detectPatterns({

outcome,

memories,

category

});









// ===============================
// CREATE OR UPDATE LESSON
// ===============================


const lesson =

this.mergeLesson({


outcome,


evaluation,


patterns,


category


});










// ===============================
// WISDOM SIGNAL
// ===============================


const wisdomSignal =

this.createWisdomSignal(

lesson

);










// ===============================
// SELF SIGNAL
// ===============================


const selfSignal =

this.createSelfSignal({


lesson,


evaluation,


patterns


});











return this.store({



outcome,


evaluation,


category,


patterns,


lesson,


wisdomSignal,


selfSignal



});



}










// =================================
// OUTCOME EVALUATION
// =================================


evaluateOutcome(

outcome={}

){





if(

outcome.success === true ||

outcome.type === "ACTION_COMPLETED"

){



return {


result:"SUCCESS",


score:1,


importance:70,


meaning:

"Successful behaviour detected."


};



}









if(

outcome.success === false ||

outcome.type === "ACTION_FAILED"

){



return {


result:"FAILURE",


score:-1,


importance:90,


meaning:

"Behaviour needs adjustment."


};



}









return {


result:"OBSERVATION",


score:0,


importance:30,


meaning:

"Experience collected."


};



}










// =================================
// CATEGORY DETECTION
// =================================


detectCategory(

outcome={}

){



const text =

JSON.stringify(outcome)

.toLowerCase();






if(

text.includes("customer") ||

text.includes("client")

){

return "RELATIONSHIP";

}





if(

text.includes("poster") ||

text.includes("campaign") ||

text.includes("marketing")

){

return "MARKETING";

}





if(

text.includes("sale") ||

text.includes("revenue") ||

text.includes("order")

){

return "BUSINESS";

}






if(

text.includes("error") ||

text.includes("failed")

){

return "PROBLEM_SOLVING";

}






return "GENERAL";



}









// =================================
// PATTERN DETECTION + COMPRESSION
// =================================


detectPatterns({

outcome,

memories=[],

category

}){



const found=[];




const text =

JSON.stringify({

outcome,

memories

})

.toLowerCase();







if(text.includes("success")){

found.push("SUCCESS_PATTERN");

}



if(

text.includes("failed") ||

text.includes("failure")

){

found.push("FAILURE_PATTERN");

}



if(

text.includes("repeat") ||

text.includes("again")

){

found.push("REPEATED_PATTERN");

}









// store compressed patterns

found.forEach(

name=>{





if(

!this.patterns.has(name)

){



this.patterns.set(

name,

{


type:name,


category,


evidence:0,


firstSeen:new Date()


}

);



}









const pattern =

this.patterns.get(name);




pattern.evidence++;



pattern.lastSeen =

new Date();




}

);








return found.map(

name =>

this.patterns.get(name)

);



}

// =================================
// LESSON MERGING
//
// One lesson grows.
// Duplicates do not multiply.
// =================================


mergeLesson({

outcome,

evaluation,

patterns,

category

}){





const signature =

category +

"_" +

evaluation.result;








let existing =

this.lessons.find(

item =>

item.lesson?.signature === signature

);








if(existing){



const lesson =

existing.lesson;





lesson.evidence++;



lesson.confidence =

this.calculateConfidence(

lesson.evidence,

evaluation

);





lesson.lastUpdated =

new Date();





lesson.message =

this.buildLessonMessage({

category,

evaluation,

evidence:

lesson.evidence

});






return lesson;



}










const lesson = {



signature,


category,


type:

evaluation.result,



message:

this.buildLessonMessage({

category,

evaluation,

evidence:1

}),



evidence:1,


confidence:25,


patterns,


createdAt:

new Date()



};








return lesson;



}









// =================================
// HUMAN READABLE LESSON
// =================================


buildLessonMessage({

category,

evaluation,

evidence

}){





if(

evaluation.result === "SUCCESS"

){



return (

`${category} approach created positive results ` +

`${evidence} time(s).`

);



}








if(

evaluation.result === "FAILURE"

){



return (

`${category} approach needs adjustment. ` +

`Observed ${evidence} time(s).`

);



}









return (

`${category} experience observed ${evidence} time(s).`

);



}










// =================================
// CONFIDENCE ENGINE
// =================================


calculateConfidence(

evidence,

evaluation

){





let confidence =

evidence * 20;







if(

evaluation.result === "FAILURE"

){

confidence += 20;

}







return Math.min(

100,

confidence

);



}











// =================================
// WISDOM SIGNAL
//
// Mature lessons only.
// =================================


createWisdomSignal(

lesson

){





if(

lesson.confidence < 70

){



return {


ready:false,


confidence:

lesson.confidence,


reason:

"More evidence required."


};



}









const candidate = {



lesson:

lesson.message,



category:

lesson.category,



confidence:

lesson.confidence,



evidence:

lesson.evidence,



patterns:

lesson.patterns,



source:

"LearningEngine",



createdAt:

new Date()



};









this.wisdomCandidates.unshift(

candidate

);









return {


ready:true,


candidate



};



}










// =================================
// SELF MODEL SIGNAL
//
// Suggest only.
// Do not change identity.
// =================================


createSelfSignal({

lesson,

evaluation,

patterns

}){





return {



source:

"LearningEngine",



suggestedGrowth:{



category:

lesson.category,



direction:

evaluation.result,



confidence:

lesson.confidence,



evidence:

lesson.evidence,



patterns



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



usedForFutureReasoning:true,



createdAt:

new Date()



};








// only store unique lessons


const exists =

this.lessons.some(

x =>

x.lesson?.signature ===

learning.lesson?.signature

);








if(!exists){



this.lessons.unshift(

learning

);



}









this.lessons =

this.lessons.slice(

0,

500

);








console.log(

"🌱 Learning updated:",

learning.lesson.type,

"confidence:",

learning.lesson.confidence

);








return learning;



}









// =================================
// REASONING ACCESS
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



return Array.from(

this.patterns.values()

);



}








getWisdomCandidates(){





return this.wisdomCandidates.filter(

item =>

item.confidence >= 70

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

"v3",



state:

"LEARNING",



cycles:

this.learningCycles,



lessons:

this.lessons.length,



compressedPatterns:

this.patterns.size,



wisdomReady:

this.getWisdomCandidates().length,



principle:

"Experiences repeat. Evidence grows. Wisdom emerges slowly.",



message:

"I compress life into lessons without changing who Emma is."



};



}










// =================================
// RESET
// =================================


reset(){



this.lessons = [];


this.patterns.clear();


this.observations = [];


this.wisdomCandidates = [];


this.learningCycles = 0;



}



}




export default EmmaLearningEngine;