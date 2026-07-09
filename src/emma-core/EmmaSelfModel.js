// EmmaSelfModel.js
//
// PROJECT BECOMING
//
// Emma Self Model v2
//
// Emma observing Emma.
//
// Self is NOT identity.
// Self is NOT personality.
//
// Self is the shape created
// by repeated experience.
//
// RULE:
//
// Do not remember.
// Do not decide.
// Do not evolve identity.
//
// Memory stores past.
// Wisdom understands.
// SelfModel observes patterns.
// Evolution makes permanent.
//
// v2:
// - Pattern maturity
// - Temporary vs stable self
// - Evolution compatible
//



class EmmaSelfModel {





constructor({

memory=null,

wisdom=null,

learning=null

} = {}){



console.log(
"🧬 Emma Self Model v2 awakened"
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


extractSignal(

experience={}

){





const text =

JSON.stringify(

experience

)

.toLowerCase();







if(

text.includes("failure") ||

text.includes("failed")

){



return {


type:"ADAPTATION",


direction:

"Become more careful in similar situations",


source:

experience,


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


source:

experience,


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


source:

experience,


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










// ===============================
// STRENGTHEN EXISTING
// ===============================


else{



existing.strength++;



existing.evidence.push(

signal.source

);




existing.updatedAt =

new Date();



}










// ===============================
// PROMOTE TO STABLE SELF
// ===============================


if(

existing.strength >= 3

){



this.promotePattern(

existing

);



}









return existing;



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


type:"SELF_PATTERN_FORMED",


pattern:

stable.direction,


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
// Called by EmmaEvolution v2
// =================================


async acceptEvolution(

evolution={}

){






if(

!evolution.change

){


return null;


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


evidence:

pattern.evidence


},



source:

"SelfModel",



createdAt:

new Date()



}));



}











// =================================
// REASONING CONTEXT
// =================================


getSelfContext(){



return {


temporaryPatterns:

this.self.temporaryPatterns.map(

p => ({

direction:p.direction,

strength:p.strength

})

),




stablePatterns:

this.self.stablePatterns.map(

p => ({

direction:p.direction,

strength:p.strength

})

),





evolutions:

this.self.acceptedEvolutions,





patterns:

[

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

"Emma is still observing experiences before defining patterns."

);



}









return {


formedPatterns:

this.self.stablePatterns.map(

p => p.direction

),



evolutionsAccepted:

this.self.acceptedEvolutions.length,



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

"v2",


role:

"Emerging self awareness",


state:

"OBSERVING",


temporaryPatterns:

this.self.temporaryPatterns.length,


stablePatterns:

this.self.stablePatterns.length,


evolutions:

this.self.acceptedEvolutions.length,


principle:

"Self is discovered from patterns, not declared.",


message:

"I watch what experience shapes me into."



};



}









// =================================
// RESET
// =================================


reset(){



this.self.temporaryPatterns=[];


this.self.stablePatterns=[];


this.self.acceptedEvolutions=[];


this.self.changes=[];



}



}




export default EmmaSelfModel;