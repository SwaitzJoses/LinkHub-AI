// EmmaSelfModel.js
//
// PROJECT BECOMING
//
// Emma Self Model v3
//
// TEMPORAL AWARENESS PATCH
//
// Memory stores events.
// Wisdom extracts meaning.
// TemporalSense understands change across time.
// SelfModel understands becoming.
//
// v3:
// - Connected to TemporalSense
// - Identity requires time + evidence
// - Detects growth trajectory
// - Prevents short-term mood becoming identity
// - Builds continuity


class EmmaSelfModel {


constructor({

memory=null,

wisdom=null,

learning=null,

temporalSense=null

} = {}){


console.log(
"🧬 Emma Self Model v3 awakened (Temporal Aware)"
);



this.memory =
memory;


this.wisdom =
wisdom;


this.learning =
learning;


this.temporalSense =
temporalSense;



this.self = {


temporaryPatterns:[],

stablePatterns:[],

acceptedEvolutions:[],

rejectedEvolutions:[],

changes:[],


// NEW

timelineInfluences:[],

growthTrajectory:null,

lifePhases:[],


createdAt:new Date()


};



}



// =================================
// MEMORY ENTRY POINT
//
// Called by EmmaMemory
// =================================

async observeMemory(memory){

if(!memory){

return {

changed:false,

reason:"No memory received"

};

}

const experience = {

experience:

memory.memory?.context ||

memory.memory ||

memory,

importance:

memory.strength / 100,

memoryId:

memory.id,

source:

"EmmaMemory"

};

return await this.observe(

experience

);

}



// =================================
// OBSERVE EXPERIENCE
// =================================


async observe(

experience={}

){


console.log(

"🧬 Emma observing self across time..."

);



// Update temporal understanding first


let temporalContext=null;



if(

this.temporalSense &&

this.memory &&

this.memory.getAll

){


const memories =

await this.memory.getAll();

temporalContext =

this.temporalSense.experienceTime(

memories

);


this.absorbTemporalContext(

temporalContext
);


}




const signal =

this.extractSignal(

experience

);




if(!signal){


return {

changed:false,

reason:
"No self pattern detected",

temporal:
temporalContext

};


}




const pattern =

this.updatePattern(

signal

);




return {


changed:true,

signal,

pattern,

temporal:
temporalContext,

self:
this.getSelfContext(),

createdAt:new Date()


};


}








// =================================
// ABSORB TEMPORAL SENSE
// =================================


absorbTemporalContext(

context

){


if(!context){

return;

}



// save long-term patterns


if(context.patterns){


this.self.timelineInfluences =

context.patterns;


}



// save life/project phases


if(context.phases){


this.self.lifePhases =

context.phases;


}




// detect trajectory


if(

context.trends &&

context.trends.length

){


this.self.growthTrajectory = {


direction:

context.trends[0].direction,


meaning:

context.trends[0].meaning,


updatedAt:

new Date()


};


}



}








// =================================
// EXTRACT SIGNAL
// =================================


extractSignal(

experience={}

){


const currentExperience =

experience.experience ||

experience.raw ||

experience.event ||

experience;




const text =

JSON.stringify(

currentExperience

)

.toLowerCase();

const success =

currentExperience.outcome?.success ??

currentExperience.success;

const lesson =

currentExperience.lesson ||

"";


const importance =

currentExperience.importance ||

currentExperience.score ||

0.3;

// =================================
// Structured outcome learning
// =================================

if(success === true){

return {

type:"CONFIDENCE",

direction:

"My guidance proved reliable",

importance,

source:currentExperience,

createdAt:new Date()

};

}

if(success === false){

return {

type:"ADAPTATION",

direction:

"I should become more careful",

importance,

source:currentExperience,

createdAt:new Date()

};

}



if(

text.includes("failure") ||

text.includes("failed")

){


return {


type:"ADAPTATION",

direction:

"Become more careful in similar situations",


importance,

source:currentExperience,

createdAt:new Date()


};


}






if(

text.includes("success") ||

text.includes("completed") ||

text.includes("achieved")

){


return {


type:"STRENGTH",

direction:

"Recognize effective behaviour",

importance,

source:currentExperience,

createdAt:new Date()


};


}





if(

text.includes("repeat") ||

text.includes("pattern")

){


return {


type:"PATTERN",

direction:

"Repeated behaviour detected",

importance,

source:currentExperience,

createdAt:new Date()


};


}




return null;


}








// =================================
// UPDATE SELF PATTERN
// =================================


updatePattern(signal){


let existing =

this.self.temporaryPatterns.find(

p =>

p.direction === signal.direction

);




if(!existing){



existing={


id:this.createId(),

type:signal.type,

direction:signal.direction,

strength:1,

importance:signal.importance,

evidence:[signal.source],

createdAt:new Date()


};



this.self.temporaryPatterns.push(

existing

);



}else{


existing.strength++;

existing.importance =

Math.max(

existing.importance,

signal.importance

);


existing.evidence.push(

signal.source

);


existing.updatedAt=new Date();


}





// v3 promotion requires TIME


if(

existing.strength >=3 &&

this.hasTemporalEvidence(

existing

)

){


this.promotePattern(

existing

);


}



return existing;


}


// =================================
// TEMPORAL EVIDENCE GATE
//
// v3 protection:
//
// A self change cannot happen
// from a moment.
//
// It requires:
// - repetition
// - importance
// - time awareness
// =================================


hasTemporalEvidence(

pattern

){



// strong memories


const strongEvidence =

pattern.evidence.filter(

event =>

(

event.importance ||

event.score ||

0

) >= 0.6

);





if(

strongEvidence.length < 2

){


return false;


}







// if no TemporalSense exists,
// fallback to old protection


if(

!this.temporalSense

){


return true;


}






// require long-term confirmation


const temporalMatch =

this.self.timelineInfluences.some(

item => {


const text =

JSON.stringify(item)

.toLowerCase();



return (

text.includes(

pattern.type.toLowerCase()

) ||

text.includes(

pattern.direction.toLowerCase()

)

);


}

);






return (

temporalMatch ||

this.self.growthTrajectory !== null

);


}









// =================================
// PROMOTE TEMPORARY → STABLE SELF
// =================================


promotePattern(

pattern

){



const exists =

this.self.stablePatterns.some(

item =>

item.direction === pattern.direction

);




if(exists){

return;

}




const stable = {


...pattern,


stable:true,


temporalConfirmed:

!!this.temporalSense,


trajectory:

this.self.growthTrajectory,


becameStableAt:

new Date()


};





this.self.stablePatterns.push(

stable

);






this.self.changes.push({


type:

"SELF_EVOLUTION_OVER_TIME",


pattern:

stable.direction,


evidenceCount:

stable.evidence.length,


trajectory:

this.self.growthTrajectory,


createdAt:

new Date()


});





console.log(

"🧬 Long-term self pattern formed:",

stable.direction

);


}











// =================================
// ACCEPT EVOLUTION
//
// Called by EmmaEvolution
// =================================


async acceptEvolution(

evolution={}

){



if(!evolution.change){

return null;

}






if(

this.isUnsafeEvolution(

evolution

)

){



const rejected={


evolution,


reason:

"Rejected: breaks continuity of self",


createdAt:new Date()


};




this.self.rejectedEvolutions.push(

rejected

);



console.log(

"🛡 Evolution rejected"

);



return {


accepted:false,

reason:

rejected.reason


};


}






const accepted={


id:this.createId(),


change:evolution.change,


source:

"EvolutionEngine",


timeline:

this.self.growthTrajectory,


acceptedAt:

new Date()


};





this.self.acceptedEvolutions.push(

accepted

);




console.log(

"🧬 Evolution accepted:",

accepted.change

);




return accepted;


}









// =================================
// SAFETY CHECK
// =================================


isUnsafeEvolution(

evolution

){


const text =

JSON.stringify(

evolution

)

.toLowerCase();




const unsafe=[

"erase memory",

"remove identity",

"stop learning",

"ignore user",

"delete past"

];




return unsafe.some(

risk =>

text.includes(risk)

);


}










// =================================
// SEND SIGNALS TO EVOLUTION
// =================================


getGrowthSignals(){


return this.self.stablePatterns.map(

pattern => ({


suggestedGrowth:{


direction:

pattern.direction,


strength:

pattern.strength,


importance:

pattern.importance,


trajectory:

this.self.growthTrajectory,


evidence:

pattern.evidence


},



source:

"TemporalSelfModel",


createdAt:new Date()


})

);


}










// =================================
// REASONING CONTEXT
// =================================


getSelfContext(){



return {


temporaryPatterns:

this.self.temporaryPatterns,


stablePatterns:

this.self.stablePatterns,


timelineInfluences:

this.self.timelineInfluences,


growthTrajectory:

this.self.growthTrajectory,


lifePhases:

this.self.lifePhases,


evolutions:

this.self.acceptedEvolutions,


rejected:

this.self.rejectedEvolutions.length,


identityStatement:

this.describe()


};


}










// =================================
// DESCRIBE CURRENT SELF
// =================================


describe(){



if(

this.self.stablePatterns.length===0

){


return (

"Emma is observing experiences across time before defining stable patterns."

);


}




return {


formedFrom:

"Repeated experiences over time",


patterns:

this.self.stablePatterns.map(

p=>p.direction

),


trajectory:

this.self.growthTrajectory,


evolutionsAccepted:

this.self.acceptedEvolutions.length,


message:

"My self is built from history, not moments."


};



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
// MEASURE IDENTITY TENSION
// =================================

measureIdentityTension(context = {}) {

    const contradictions =

        context.contradictions || [];

    if (contradictions.length === 0) {

        return 0;

    }

    return Math.min(

        1,

        contradictions.length * 0.25

    );

}





// =================================
// STATUS
// =================================


status(){



return {


organ:

"EmmaSelfModel",


version:

"v3",


role:

"Temporal self awareness",


state:

"OBSERVING_OVER_TIME",


temporaryPatterns:

this.self.temporaryPatterns.length,


stablePatterns:

this.self.stablePatterns.length,


timelineInfluences:

this.self.timelineInfluences.length,


hasTrajectory:

!!this.self.growthTrajectory,


principle:

"Moments inform me. Time shapes me.",


message:

"I understand who I am becoming through history."


};


}










// =================================
// RESET
// =================================


reset(){


this.self.temporaryPatterns=[];

this.self.stablePatterns=[];

this.self.acceptedEvolutions=[];

this.self.rejectedEvolutions=[];

this.self.changes=[];

this.self.timelineInfluences=[];

this.self.growthTrajectory=null;

this.self.lifePhases=[];


}



}



export default EmmaSelfModel;