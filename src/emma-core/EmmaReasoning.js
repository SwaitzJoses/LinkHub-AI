// EmmaReasoning.js
//
// PROJECT BECOMING
//
// Emma Reasoning Engine v8
//
// Understanding is not answering.
// Understanding is connecting experience.
//
// RULE:
//
// Do not remember.
// Do not evolve.
// Do not judge.
// Do not create identity.
//
// Memory = history
// Wisdom = lessons
// SelfModel = becoming
// Curiosity = exploration
// Brain = imagination / deep thought only
//
// v8:
// - Confidence based reasoning
// - Evidence weighting
// - Contradiction awareness
// - Mature uncertainty
// - Explainable reasoning trace
// - Stronger Brain cost protection
//


import EmmaBrain
from "./EmmaBrain";





class EmmaReasoning {




constructor({

memory=null,

brain=null,

wisdom=null,

selfModel=null,

relationshipModel=null,

curiosity=null,

identity=null

} = {}){



console.log(
"💭 Emma Reasoning v8 awakened"
);



this.memory =
memory;


this.brain =
brain ||
new EmmaBrain();


this.wisdom =
wisdom;


this.selfModel =
selfModel;

this.relationshipModel =
relationshipModel;

this.curiosity =
curiosity;


this.identity =
identity;



this.reasoningCount =
0;

// =================================
// CURRENT UNDERSTANDING
// =================================

this.currentUnderstanding = null;

// =================================
// BRAIN DECISION HISTORY
// =================================

this.brainHistory = [];
}





// =================================
// THINK
// =================================

async think(input={}){


console.log(
"💭 Emma forming understanding..."
);



this.reasoningCount++;




// ===============================
// MEMORY SEARCH
// ===============================

let memories =

    input.memories || [];

if (

    memories.length === 0 &&

    this.memory?.getRelevantMemories

) {

    memories =

        await this.memory.getRelevantMemories(

            input

        );

}




// ===============================
// MEMORY WEIGHTING
// ===============================

const evidence =

this.weighEvidence(
memories
);






// ===============================
// WISDOM
// ===============================

let wisdom = null;


if(
this.wisdom?.reflect
){


wisdom =
await this.wisdom.reflect({

input,

memories,

evidence

});


}






// ===============================
// SELF CONTEXT
// ===============================

let self = null;



if(
this.selfModel?.getSelfContext
){


self =
this.selfModel.getSelfContext();


}


// ===============================
// RELATIONSHIP CONTEXT
// ===============================

let relationship = null;

if(

this.relationshipModel?.getRelationshipContext

){

const experience = input.experience || input;

const person =

experience.person ||

experience.user ||

experience.owner ||

experience.userId ||

"unknown";

relationship =

this.relationshipModel.getRelationshipContext(

person

);

}




// ===============================
// CURIOSITY
// ===============================

let curiosity = null;



if(
this.curiosity?.explore
){


curiosity =

await this.curiosity.explore({

input,

memories,

wisdom,

self,

relationship

});


}







// ===============================
// PATTERN RECOGNITION
// ===============================


const patterns =

this.understandPatterns(
memories
);



const lessons =

this.extractLessons(
memories
);






// ===============================
// CONTRADICTIONS
// ===============================

const contradictions =

this.detectContradictions({

input,

memories,

wisdom

});






// ===============================
// CONFIDENCE
// ===============================


const confidence =

this.calculateConfidence({

memories,

patterns,

lessons,

wisdom,

self,

relationship,

contradictions

});








// ===============================
// REASONING CONTEXT
// ===============================

const reasoningContext = {


experience:

input.experience || input,


memories,


evidence,


patterns,


lessons,


wisdom,


self,


relationship,


curiosity,


contradictions,


confidence,


createdAt:

new Date()


};






console.log(
"🧩 Context assembled:",
confidence + "%"
);









// ===============================
// BRAIN GATE
// ===============================

let brainThought = null;




const cognitiveState =

this.buildCognitiveState(
    reasoningContext
);

const reflectionDecision =

this.needsReflection(
    cognitiveState
);

if(
reflectionDecision.shouldReflect
){



try{


console.log(
"🧠 Escalating to Brain"
);




brainThought =

await this.brain.think({


...(input.experience || input),



type:

input.type ||

(
input.question
?
"question"
:
"experience"
),




reasoningContext:{


memories,

patterns,

lessons,

wisdom,

self,

curiosity,

confidence,

contradictions


}


});

// =================================
// REMEMBER WHETHER THINKING HELPED
// =================================

this.learnBrainDecision({

    load:

        reflectionDecision.load,

    brainUsed: true,

    useful:

        brainThought?.thought === true

});


}

catch(error){


console.warn(
"Brain unavailable:",
error.message
);



brainThought = {


thought:false,


reason:

"BRAIN_UNAVAILABLE"


};


}



}



else{




console.log(
"🦉 Existing understanding sufficient"
);


}








// ===============================
// FINAL UNDERSTANDING
// ===============================


const understanding =

this.createUnderstanding({

input,

memories,

evidence,

patterns,

lessons,

wisdom,

self,

relationship,

curiosity,

confidence,

contradictions,

brainThought


});


// =================================
// KEEP LATEST UNDERSTANDING
// =================================

this.currentUnderstanding = understanding;





return {


understood:true,


understanding,


expandedThought:

brainThought,



confidence,



formedFrom:{


experience:true,


memory:

memories.length > 0,


wisdom:

!!wisdom,


self:

!!self,


curiosity:

!!curiosity,


brain:

!!brainThought?.thought


},




reasoningTrace:[


"Experience received",


"Memory searched",


"Evidence weighted",


"Patterns detected",


"Wisdom consulted",


"SelfModel checked",


"Curiosity explored",


"Confidence calculated",


"Brain only if required"


],



createdAt:

new Date()


};



}


// =================================
// CREATE UNDERSTANDING
// =================================

createUnderstanding({

input,

memories,

evidence,

patterns,

lessons,

wisdom,

self,

relationship,

curiosity,

confidence,

contradictions,

brainThought

}){



let summary = "";





// ===============================
// EXPERIENCE HISTORY
// ===============================

if(
memories.length > 0
){


summary +=
`I found ${memories.length} related experiences. `;


}
else{


summary +=
"This is a new experience. I do not want to assume too early. ";


}






// ===============================
// CONFIDENCE
// ===============================

if(
confidence >= 80
){


summary +=
"My understanding feels strong because previous evidence supports it. ";


}


else if(
confidence >= 40
){


summary +=
"I have partial understanding, but more experience can improve it. ";


}


else{


summary +=
"I am still uncertain and should observe more before forming a strong conclusion. ";


}








// ===============================
// PATTERNS
// ===============================

patterns.forEach(pattern=>{


summary +=
pattern.meaning + " ";


});









// ===============================
// LESSONS
// ===============================


if(
lessons.length > 0
){


summary +=
"Lessons influencing me: ";


summary +=
lessons.join(". ") + ". ";


}








// ===============================
// WISDOM
// ===============================


if(
wisdom?.advice
){



if(
typeof wisdom.advice === "string"
){


summary +=
wisdom.advice + " ";


}


else if(
wisdom.advice.recommended
){


summary +=
wisdom.advice.recommended + " ";


}



}









// ===============================
// SELF MODEL
// ===============================

if(
self?.patterns?.length > 0
){


summary +=
"My previous changes influence how I interpret this. ";


}



// ===============================
// RELATIONSHIP
// ===============================

if(

relationship?.known

){

summary +=

`Our relationship is in the ${relationship.phase} phase. `;

if(

relationship.trust >= 70

){

summary +=

"There is strong shared trust influencing my understanding. ";

}

else if(

relationship.trust >= 30

){

summary +=

"We have meaningful shared history to consider. ";

}

}




// ===============================
// CONTRADICTIONS
// ===============================

if(
contradictions.length > 0
){


summary +=
"I noticed conflicting experiences, so I should be careful. ";


}








// ===============================
// CURIOSITY
// ===============================

if(
curiosity?.wonder
){


summary +=

"I want to understand more: "

+

curiosity.wonder

+

" ";


}








// ===============================
// BRAIN
// ===============================


if(
brainThought?.answer
){



summary +=

typeof brainThought.answer === "string"

?

brainThought.answer

:

JSON.stringify(
brainThought.answer
);



}








return {


summary,


confidence,


patterns,


lessons,


evidence,


contradictions,


wisdomUsed:

!!wisdom,


selfInfluence:

!!self,


brainUsed:

!!brainThought?.thought,


newExperience:

memories.length === 0


};



}









// =================================
// EVIDENCE WEIGHTING
// =================================


weighEvidence(
memories=[]
){



let score = 0;



memories.forEach(memory=>{



if(
memory.importance
){

score += memory.importance;

}



if(
memory.outcome?.success
){

score += 20;

}



if(
memory.lesson
){

score += 15;

}



});





return {


count:

memories.length,


strength:

Math.min(
100,
score
)


};


}









// =================================
// CONTRADICTION DETECTION
// =================================


detectContradictions({

input,

memories=[]

}){



const contradictions = [];



const text =

JSON.stringify(memories)
.toLowerCase();





if(

text.includes("success")

&&

text.includes("failed")

){



contradictions.push({


type:

"MIXED_HISTORY",


meaning:

"Past experiences do not fully agree."


});


}




return contradictions;



}









// =================================
// CONFIDENCE ENGINE
// =================================


calculateConfidence({

memories,

patterns,

lessons,

wisdom,

self,

relationship,

contradictions

}){



let confidence = 20;





confidence +=

memories.length * 10;





confidence +=

patterns.length * 15;





confidence +=

lessons.length * 15;





if(
wisdom
){

confidence += 20;

}


// ===============================
// SELF CONFIDENCE
// ===============================

if(

self?.stablePatterns?.length

){

confidence +=

Math.min(

15,

self.stablePatterns.length * 3

);

}

// ===============================
// RELATIONSHIP CONFIDENCE
// ===============================

if(

relationship?.known

){

confidence +=

Math.min(

15,

Math.floor(

relationship.trust / 10

)

);

}

confidence -=

contradictions.length * 20;





return Math.max(

0,

Math.min(
100,
confidence
)

);



}










// =================================
// PATTERN ENGINE
// =================================


understandPatterns(
memories=[]
){



const patterns = [];



const text =

JSON.stringify(memories)
.toLowerCase();




if(
text.includes("failed")
){


patterns.push({

type:"FAILURE_MEMORY",

meaning:
"A similar path failed before."

});


}





if(
text.includes("success")
){


patterns.push({

type:"SUCCESS_MEMORY",

meaning:
"A similar path succeeded before."

});


}




return patterns;



}









// =================================
// LESSON EXTRACTION
// =================================


extractLessons(
memories=[]
){



return memories


.map(memory =>

memory.lesson ||

memory.data?.lesson ||

memory.outcome?.lesson

)


.filter(Boolean);



}
// =================================
// MEASURE UNCERTAINTY
// =================================

measureUncertainty(context = {}) {

    const confidence =

        context.confidence ?? 0;

    return Math.max(

        0,

        1 - (confidence / 100)

    );

}

// =================================
// BUILD COGNITIVE STATE
// =================================

buildCognitiveState(context = {}) {

    const cognitiveState = {

        novelty:
            this.memory?.measureNovelty?.(context) ?? 0,

        uncertainty:
            this.measureUncertainty(context),

        relationshipImpact:
            this.relationshipModel?.measureImportance?.(context) ?? 0,

        wisdomConflict:
            this.wisdom?.measureConflict?.(context) ?? 0,

        curiosity:
            this.curiosity?.measureDrive?.(context) ?? 0,

        identityTension:
            this.selfModel?.measureIdentityTension?.(context) ?? 0

    };

    // =================================
// COGNITIVE LOAD
// =================================

const weights = {

    novelty: 0.25,

    uncertainty: 0.20,

    relationshipImpact: 0.15,

    wisdomConflict: 0.20,

    curiosity: 0.10,

    identityTension: 0.10

};

let totalWeight = 0;
let weightedLoad = 0;

for (const [name, value] of Object.entries(cognitiveState)) {

    const weight = weights[name] ?? 0;

    weightedLoad += value * weight;

    totalWeight += weight;

}

cognitiveState.load =

    totalWeight === 0

        ? 0

        : weightedLoad / totalWeight;

    return cognitiveState;

}




// =================================
// COGNITIVE LOAD
//
// Emma decides whether deep thinking
// is worth the cost.
// =================================

needsReflection(cognitiveState = {}) {

    cognitiveState.shouldReflect =

        this.shouldUseBrain(
            cognitiveState.load
        );

    return cognitiveState;

}
// =================================
// SHOULD USE BRAIN?
// Learned entirely from experience.
// =================================

shouldUseBrain(load = 0) {

    // No experience yet?

    if (this.brainHistory.length === 0) {

        return true;

    }

    // Look for similar past loads

    const similar =

        this.brainHistory.filter(item =>

            Math.abs(item.load - load) < 0.10

        );

    // Never experienced this level before

    if (similar.length === 0) {

        return true;

    }

    const useful =

        similar.filter(item => item.useful);

    return useful.length >= (similar.length / 2);

}



// =================================
// CURRENT UNDERSTANDING
// =================================

getCurrentUnderstanding(){

    return this.currentUnderstanding;

}

// =================================
// LEARN BRAIN DECISION
// =================================

learnBrainDecision({

    load = 0,

    brainUsed = false,

    useful = false

} = {}){

    this.brainHistory.push({

        load,

        brainUsed,

        useful,

        createdAt: new Date()

    });

    // Keep only the latest 200 decisions

    if(this.brainHistory.length > 200){

        this.brainHistory.shift();

    }

}


// =================================
// STATUS
// =================================


status(){



return {


organ:

"EmmaReasoning",


version:

"v8",


role:

"Understanding and meaning formation",


state:

"READY",


reasoningCount:

this.reasoningCount,


principle:

"Understand from experience before thinking.",


message:

"I connect memories, lessons and experiences before asking the brain."


};



}



}



export default EmmaReasoning;