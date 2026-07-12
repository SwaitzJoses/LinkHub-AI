// EmmaLearningEngine.js
//
// PROJECT BECOMING
//
// Emma Learning Engine v4
//
// Learning is not remembering what happened.
// Learning is discovering why it happened.
//
// RULE:
//
// Memory stores life.
// Wisdom stores understanding.
// SelfModel stores becoming.
// Evolution stores change.
//
// Learning only extracts meaning.
//
// v4 PATCH:
// - Cause discovery
// - Behavioral pattern extraction
// - Consequence awareness
// - Future adjustment creation
// - Evolution-ready lessons
//


class EmmaLearningEngine {


constructor(){


console.log(
"📚 Emma Learning Engine v4 awakened"
);



this.lessons = [];


this.patterns =
new Map();



this.wisdomCandidates = [];


this.learningCycles = 0;



// Long term tendencies

this.tendencies =
new Map();

// Emma's evolving worldview.
//
// Beliefs are not facts.
// They emerge from repeated evidence
// and can change over time.

this.beliefs = new Map();
}









// =================================
// MAIN LEARNING LOOP
// =================================


async learn(

    input = {},

    memories = []

){

    const outcome =

        input.outcome || input;

    const reflection =

        input.reflection || null;



console.log(
"📚 Emma extracting meaning..."
);



if(!outcome){

return null;

}



this.learningCycles++;





const evaluation =
this.evaluateOutcome(
outcome
);



const category =
this.detectCategory(
outcome
);





const cause =
this.findCause({

outcome,

memories,

evaluation

});





const patterns =
this.detectPatterns({

outcome,

memories,

category,

cause

});






const lesson =
this.createLesson({

    outcome,

    evaluation,

    category,

    cause,

    patterns,

    reflection

});


const beliefSignal =
this.createBeliefSignal(
    lesson
);



const wisdomSignal =
this.createWisdomSignal(
lesson
);





const selfSignal =
this.createSelfSignal(
lesson
);






return this.store({

    outcome,

    evaluation,

    category,

    cause,

    patterns,

    lesson,

    beliefSignal,

    wisdomSignal,

    selfSignal

});


}










// =================================
// OUTCOME UNDERSTANDING
// =================================


evaluateOutcome(outcome={}){


const text =
JSON.stringify(outcome)
.toLowerCase();





if(

outcome.success === true ||

text.includes("success") ||

text.includes("win") ||

text.includes("worked")

){


return {

result:"SUCCESS",

impact:1,

importance:80,

meaning:
"Something created a positive outcome."

};


}






if(

outcome.success === false ||

text.includes("fail") ||

text.includes("mistake") ||

text.includes("problem")

){



return {

result:"FAILURE",

impact:-1,

importance:90,

meaning:
"Something needs to be understood."

};


}






return {

result:"OBSERVATION",

impact:0,

importance:40,

meaning:
"Something was experienced."

};


}









// =================================
// CATEGORY DISCOVERY
// =================================

detectCategory(outcome = {}) {

    const text =

        JSON.stringify(outcome)
            .toLowerCase();

    const scores = {

        RELATIONSHIP: 0,

        BUSINESS: 0,

        SELF: 0,

        DECISION: 0,

        CREATION: 0,

        CHANGE: 0,

        GENERAL: 0

    };

    if (
        text.includes("person") ||
        text.includes("relationship") ||
        text.includes("shared") ||
        text.includes("trust")
    ) {
        scores.RELATIONSHIP += 2;
    }

    if (
        text.includes("business") ||
        text.includes("sale") ||
        text.includes("growth") ||
        text.includes("customer")
    ) {
        scores.BUSINESS += 2;
    }

    if (
        text.includes("think") ||
        text.includes("believe") ||
        text.includes("emotion") ||
        text.includes("feeling")
    ) {
        scores.SELF += 2;
    }

    if (
        text.includes("decision") ||
        text.includes("choice") ||
        text.includes("judge")
    ) {
        scores.DECISION += 2;
    }

    if (
        text.includes("create") ||
        text.includes("build") ||
        text.includes("develop")
    ) {
        scores.CREATION += 2;
    }

    if (
        text.includes("change") ||
        text.includes("different") ||
        text.includes("improve") ||
        text.includes("adapt")
    ) {
        scores.CHANGE += 2;
    }

    let best = "GENERAL";
    let highest = -1;

    for (const [category, score] of Object.entries(scores)) {

        if (score > highest) {

            highest = score;
            best = category;

        }

    }

    return best;

}










// =================================
// CAUSE DISCOVERY
// =================================


findCause({

outcome,

memories=[],

evaluation

}){


const text =
JSON.stringify({

outcome,

memories

})
.toLowerCase();






if(

text.includes("rush") ||

text.includes("quick") ||

text.includes("fast")

){


return {

type:"IMPATIENCE",

description:
"Action happened before enough understanding."

};


}






if(

text.includes("repeat") ||

text.includes("again")

){


return {

type:"REPEATED_PATTERN",

description:
"A previous pattern appeared again."

};


}






if(

evaluation.result === "FAILURE"

){


return {

type:"UNKNOWN_FAILURE_CAUSE",

description:
"A failure occurred. More evidence is needed."

};


}





if(

evaluation.result === "SUCCESS"

){


return {

type:"SUCCESS_FACTOR",

description:
"Something contributed to success."

};


}






return {

type:"OBSERVED_FACTOR",

description:
"Experience added understanding."

};


}










// =================================
// PATTERN DETECTION
// =================================


detectPatterns({

outcome,

memories=[],

category,

cause

}){


const discovered=[];





const key =

category +

"_" +

cause.type;








if(

!this.patterns.has(key)

){



this.patterns.set(

key,

{

id:key,

category,

cause:

cause.type,

meaning:

cause.description,

evidence:0,

createdAt:
new Date()

}

);


}








const pattern =
this.patterns.get(key);




pattern.evidence++;


pattern.lastSeen =
new Date();





discovered.push(
pattern
);





console.log(

"🔎 Pattern discovered:",

pattern.meaning,

"evidence:",

pattern.evidence

);





return discovered;


}


// =================================
// CREATE MEANINGFUL LESSON
// =================================


createLesson({

    outcome,

    evaluation,

    category,

    cause,

    patterns,

    reflection = null

}){



const signature =

category +

"_" +

cause.type;






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
lesson
);



lesson.lastUpdated =
new Date();




return lesson;


}









const lesson = {


signature,


category,



 reflection:
        reflection,




result:
evaluation.result,


cause:
cause.type,


understanding:
cause.description,


patterns,


evidence:1,


confidence:25,


createdAt:
new Date(),


// ===============================
// Evolution material
// ===============================


futureAdjustment:

this.createAdjustment(

evaluation,

cause

),



evolutionDirection:

this.findEvolutionDirection(

evaluation,

cause

)


};





return lesson;


}



// =================================
// BELIEF FORMATION
//
// Beliefs are not facts.
//
// They emerge from repeated lessons
// and remain open to change.
//
// =================================

createBeliefSignal(lesson){

    if(!lesson){

        return null;

    }

    return {

        statement: lesson.understanding,

        confidence: lesson.confidence / 100,

        evidence: lesson.evidence,

        status:

            lesson.evidence >= 5

                ? "STABLE"

                : "FORMING",

        createdAt: new Date()

    };

}


// =================================
// UPDATE BELIEF
//
// Beliefs evolve.
// They are strengthened,
// weakened or questioned
// by new evidence.
//
// =================================

updateBelief(signature, newBelief){

    const existing = this.beliefs.get(signature);

    if(!existing){

        this.beliefs.set(signature, newBelief);

        return;

    }

    existing.evidence = Math.max(
        existing.evidence++,
        newBelief.evidence
    );

 const delta =

    newBelief.confidence -

    existing.confidence;

existing.confidence +=

    delta * 0.25;

existing.confidence =

    Math.max(

        0,

        Math.min(

            1,

            existing.confidence

        )

    );

    existing.status =

        existing.confidence >= 0.8

            ? "STABLE"

            : "FORMING";

    existing.lastUpdated = new Date();

    this.beliefs.set(

        signature,

        existing

    );

}



// =================================
// FUTURE ADJUSTMENT
// =================================


createAdjustment(

evaluation,

cause

){





if(

evaluation.result === "FAILURE"

){


return (

"Change future behaviour when " +

cause.description

);


}






if(

evaluation.result === "SUCCESS"

){


return (

"Preserve behaviour connected to: " +

cause.description

);


}





return (

"Continue observing this pattern."

);


}










// =================================
// EVOLUTION DIRECTION
// =================================


findEvolutionDirection(

evaluation,

cause

){





if(

cause.type === "IMPATIENCE"

){


return "Become more patient before acting";


}





if(

cause.type === "REPEATED_PATTERN"

){


return "Recognize repeating cycles earlier";


}





if(

evaluation.result === "SUCCESS"

){


return "Strengthen successful behaviour";


}





if(

evaluation.result === "FAILURE"

){


return "Improve future judgement";


}





return "Increase understanding";


}










// =================================
// CONFIDENCE
// =================================


calculateConfidence(

lesson

){



let confidence =

lesson.evidence * 20;





if(

lesson.result === "FAILURE"

){


confidence += 20;


}




if(

lesson.patterns?.length > 0

){


confidence += 10;


}





return Math.min(

100,

confidence

);


}










// =================================
// WISDOM SIGNAL
// =================================


createWisdomSignal(

lesson

){





if(

lesson.confidence < 70

){


return {

ready:false,

reason:
"More lived evidence required.",

confidence:
lesson.confidence

};


}






const candidate = {


lesson:
lesson.understanding,


principle:
lesson.futureAdjustment,


category:
lesson.category,


confidence:
lesson.confidence,


evidence:
lesson.evidence,


patterns:
lesson.patterns,


createdAt:
new Date(),


source:
"LearningEngine"


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
// =================================


createSelfSignal(

lesson

){





return {


source:
"LearningEngine",


suggestedGrowth:{


direction:
lesson.evolutionDirection,


reason:
lesson.understanding,


confidence:
lesson.confidence,


evidence:
lesson.evidence


},



createdAt:
new Date()


};


}










// =================================
// STORE
// =================================


store(data={}){



const learning={


id:this.createId(),

...data,

createdAt:
new Date()


};



// =================================
// UPDATE BELIEF
// =================================

if (learning.beliefSignal) {

    this.updateBelief(

        learning.lesson.signature,

        learning.beliefSignal

    );

}




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

"🌱 Meaning learned:",

learning.lesson.understanding,

"| confidence:",

learning.lesson.confidence

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



}

);


}










// =================================
// GETTERS
// =================================


getLessons(){


return this.lessons;


}

// =================================
// BELIEFS
//
// Emma's current worldview.
//
// Beliefs are living.
// They strengthen, weaken,
// and may eventually disappear.
//
// =================================

getBeliefs(){

    return Array.from(

        this.beliefs.values()

    );

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
"v4",


state:
"MEANING_EXTRACTION",


cycles:
this.learningCycles,


lessons:
this.lessons.length,


patterns:
this.patterns.size,


wisdomReady:
this.getWisdomCandidates().length,


principle:
"Life is not counted. Meaning is extracted.",


message:
"I understand why things happened."


};


}










// =================================
// RESET
// =================================


reset(){


this.lessons=[];


this.patterns.clear();


this.wisdomCandidates=[];


this.learningCycles=0;


}



}



export default EmmaLearningEngine;