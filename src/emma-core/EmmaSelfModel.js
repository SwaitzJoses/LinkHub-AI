// EmmaSelfModel.js
//
// PROJECT BECOMING
//
// Emma Self Model v2.5
//
// DAY 15 STABILITY PATCH
//
// Emma observing Emma.
//
// RULE:
//
// A moment becomes memory.
// Repeated meaning becomes self.
// Long-term change becomes evolution.
//
// Memory stores past.
// Wisdom understands.
// SelfModel observes patterns.
// Evolution makes permanent.
//
// v2.5:
// - Importance scoring
// - Stronger maturity gate
// - Evolution safety protection
//



class EmmaSelfModel {





constructor({

memory=null,

wisdom=null,

learning=null

} = {}){



console.log(
"🧬 Emma Self Model v2.5 awakened"
);




this.memory =
memory;


this.wisdom =
wisdom;


this.learning =
learning;






// ===============================
// EMERGING SELF
// ===============================


this.self = {


temporaryPatterns:[],


stablePatterns:[],


acceptedEvolutions:[],


changes:[],


rejectedEvolutions:[],


createdAt:

new Date()


};



}









// =================================
// OBSERVE EXPERIENCE
// =================================


async observe(

experience={}

){



console.log(

"🧬 Emma observing self pattern..."

);





const signal =

this.extractSignal(

experience

);






if(

!signal

){


return {


changed:false,


reason:

"No self pattern detected."


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


self:

this.getSelfContext(),


createdAt:

new Date()


};



}









// =================================
// EXTRACT SELF SIGNAL
// =================================


// =================================
// EXTRACT SELF SIGNAL
//
// Day 15 tiny patch:
//
// Observe current experience only.
// Do not let memory/wisdom history
// create false self changes.
// =================================


extractSignal(

experience={}

){





// Look only at the event itself,
// not attached wisdom or memories.


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






const importance =

currentExperience.importance ||

currentExperience.score ||

currentExperience.raw?.importance ||

0.3;









if(

text.includes("failure") ||

text.includes("failed")

){



return {


type:"ADAPTATION",



direction:

"Become more careful in similar situations",



importance,


source:

currentExperience,


createdAt:

new Date()


};



}










if(

text.includes("success") ||

text.includes("completed")

){



return {


type:"STRENGTH",



direction:

"Recognize effective behaviour",



importance,


source:

currentExperience,


createdAt:

new Date()


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


source:

currentExperience,


createdAt:

new Date()


};



}








return null;



}








// =================================
// UPDATE SELF PATTERN
// =================================


updatePattern(

signal

){



let existing =

this.self.temporaryPatterns.find(

pattern =>

pattern.direction === signal.direction

);









// ===============================
// NEW PATTERN
// ===============================


if(

!existing

){



existing = {


id:

this.createId(),



type:

signal.type,



direction:

signal.direction,



strength:1,



importance:

signal.importance,



evidence:[

signal.source

],



createdAt:

new Date()


};






this.self.temporaryPatterns.push(

existing

);



}









else{



existing.strength++;



existing.importance =

Math.max(

existing.importance,

signal.importance

);



existing.evidence.push(

signal.source

);



existing.updatedAt =

new Date();



}








// ===============================
// PROMOTION GATE
//
// Day 15 patch 🔒
// ===============================


if(

existing.strength >= 3 &&

this.hasEnoughEvidence(

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
// EVIDENCE CHECK
//
// Prevent weak self formation
// =================================


hasEnoughEvidence(

pattern

){



const strongEvidence =

pattern.evidence.filter(

event =>

(

event.importance ||

event.score ||

0

) >= 0.6

);






return (

strongEvidence.length >= 2

);



}









// =================================
// PROMOTE PATTERN
//
// Self change, not identity.
// =================================


promotePattern(

pattern

){





const alreadyStable =

this.self.stablePatterns.some(

item =>

item.direction === pattern.direction

);






if(

alreadyStable

){

return;

}









const stable = {


...pattern,


stable:true,


becameStableAt:

new Date()


};









this.self.stablePatterns.push(

stable

);








this.self.changes.push({



type:

"SELF_PATTERN_FORMED",



pattern:

stable.direction,



strength:

stable.strength,



evidenceCount:

stable.evidence.length,



createdAt:

new Date()


});








console.log(

"🧬 Stable self pattern formed:",

stable.direction

);



}











// =================================
// ACCEPT EVOLUTION
//
// Called by EmmaEvolution
//
// Day 15 protection added
// =================================


async acceptEvolution(

evolution={}

){







if(

!evolution.change

){



return null;



}









// safety gate

if(

this.isUnsafeEvolution(

evolution

)

){





const rejected = {


evolution,


reason:

"Rejected: conflicts with stable self continuity",



createdAt:

new Date()


};







this.self.rejectedEvolutions.push(

rejected

);







console.log(

"🛡 Evolution rejected by SelfModel"

);








return {


accepted:false,


reason:

rejected.reason


};



}










const accepted = {


id:

this.createId(),



change:

evolution.change,



source:

"EvolutionEngine",



evidence:

evolution.evolvedBecause,



acceptedAt:

new Date()


};









this.self.acceptedEvolutions.push(

accepted

);








console.log(

"🧬 Self accepted evolution:",

accepted.change

);








return accepted;



}











// =================================
// EVOLUTION SAFETY CHECK
// =================================


isUnsafeEvolution(

evolution

){





const text =

JSON.stringify(

evolution

)

.toLowerCase();








const unsafe = [


"replace identity",


"remove memory",


"stop learning",


"ignore user",


"change purpose"


];








return unsafe.some(

risk =>

text.includes(

risk

)

);



}












// =================================
// SEND TO EVOLUTION ENGINE
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



evidence:

pattern.evidence



},








source:

"SelfModel",




createdAt:

new Date()





})

);



}









// =================================
// REASONING CONTEXT
// =================================


getSelfContext(){






return {




temporaryPatterns:

this.self.temporaryPatterns.map(

p => ({



direction:

p.direction,



strength:

p.strength,



importance:

p.importance



})

),









stablePatterns:

this.self.stablePatterns.map(

p => ({



direction:

p.direction,



strength:

p.strength,



importance:

p.importance



})

),








evolutions:

this.self.acceptedEvolutions,





rejectedEvolutions:

this.self.rejectedEvolutions.length,







patterns:[

...this.self.stablePatterns,

...this.self.temporaryPatterns

]



};



}










// =================================
// DESCRIBE SELF
// =================================


describe(){






if(

this.self.stablePatterns.length === 0

){





return (

"Emma is still observing experiences before defining stable patterns."

);




}









return {



formedPatterns:

this.self.stablePatterns.map(

p => p.direction

),




evolutionsAccepted:

this.self.acceptedEvolutions.length,




evolutionsRejected:

this.self.rejectedEvolutions.length,




changes:

this.self.changes.length




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
// STATUS
// =================================


status(){






return {




organ:

"EmmaSelfModel",




version:

"v2.5",




role:

"Stable emerging self awareness",




state:

"OBSERVING",




temporaryPatterns:

this.self.temporaryPatterns.length,




stablePatterns:

this.self.stablePatterns.length,




evolutions:

this.self.acceptedEvolutions.length,




rejectedEvolutions:

this.self.rejectedEvolutions.length,




principle:

"One event informs me. Repeated evidence shapes me.",




message:

"I grow carefully without losing continuity."





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





}





}





export default EmmaSelfModel;