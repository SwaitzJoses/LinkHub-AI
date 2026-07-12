// EmmaCuriosity.js
//
// PROJECT BECOMING
//
// Emma Curiosity Engine v2
//
// Curiosity is awareness of the unknown.
//
// RULE:
//
// Do not answer.
// Do not decide.
// Do not learn.
//
// Memory remembers.
// Reasoning understands.
// Curiosity notices gaps.
//
// v2:
// - Uncertainty tracking
// - Open curiosity lifecycle
// - SelfModel awareness
// - Confidence gaps
//



class EmmaCuriosity {





constructor({

memory=null,

selfModel=null,

learning=null

} = {}){



console.log(
"🌱 Emma Curiosity v2 awakened"
);




this.memory =
memory;


this.selfModel =
selfModel;


this.learning =
learning;




// unresolved curiosity

this.openQuestions = [];



// explored history

this.history = [];



}









// =================================
// EXPLORE
// =================================


async explore(

context={}

){



console.log(
"🌱 Emma exploring unknowns..."
);





const discoveries = [];








// ===============================
// MEMORY UNKNOWN
// ===============================


const memoryGap =

await this.detectMemoryGap(

context

);




if(memoryGap){

discoveries.push(memoryGap);

}










// ===============================
// CONFIDENCE GAP
// ===============================


const confidenceGap =

this.detectConfidenceGap(

context

);




if(confidenceGap){

discoveries.push(confidenceGap);

}










// ===============================
// SELF GAP
// ===============================


const selfGap =

this.detectSelfGap(

context

);




if(selfGap){

discoveries.push(selfGap);

}










// ===============================
// PATTERN GAP
// ===============================


const patternGap =

this.detectPatternGap(

context

);




if(patternGap){

discoveries.push(patternGap);

}











if(

discoveries.length === 0

){



return {


curious:false,


reason:

"No important unknown detected"


};



}









const strongest =

this.prioritize(

discoveries

);








this.storeCuriosity(

strongest

);









return {


curious:true,


...strongest,


createdAt:

new Date()


};



}









// =================================
// MEMORY GAP
// =================================


async detectMemoryGap(

context={}

){





if(

!this.memory?.getRelevantMemories

){

return null;

}







const memories =

await this.memory.getRelevantMemories(

context

);








if(

!memories ||

memories.length === 0

){



return {


type:"MEMORY_GAP",


wonder:

"I have not experienced enough similar situations.",


reason:

"Low historical evidence",


strength:60


};



}








return null;



}


// =================================
// CONFIDENCE GAP
// =================================


detectConfidenceGap(

context={}

){



const confidence =

context.confidence ||

context.reasoning?.confidence ||

null;






if(

confidence !== null &&

confidence < 50

){



return {


type:"CONFIDENCE_GAP",


wonder:

"My understanding is not strong enough yet.",


reason:

"Low confidence detected",


strength:

80


};



}







return null;



}









// =================================
// SELF UNDERSTANDING GAP
// =================================


detectSelfGap(

context={}

){





const self =

context.self ||

this.selfModel?.getSelfContext?.();








if(

!self

){



return {


type:"SELF_GAP",


wonder:

"I do not yet understand how this affects my patterns.",


reason:

"No self context available",


strength:

40


};



}









if(

self.temporaryPatterns?.length >

self.stablePatterns?.length

){



return {


type:"SELF_PATTERN_GAP",


wonder:

"Some patterns are forming but not stable yet.",


reason:

"Emerging self pattern detected",


strength:

65


};



}








return null;



}









// =================================
// PATTERN GAP
// =================================


detectPatternGap(

context={}

){



const text =

JSON.stringify(

context

)

.toLowerCase();








if(

text.includes("again") ||

text.includes("repeat") ||

text.includes("usually") ||

text.includes("always")

){



return {


type:"PATTERN_DISCOVERY",


wonder:

"There may be a repeating pattern worth understanding.",


reason:

"Repeated signal found",


strength:

70


};



}









return null;



}









// =================================
// PRIORITIZE CURIOSITY
// =================================


prioritize(

discoveries=[]

){



return discoveries.sort(

(a,b)=>

b.strength -

a.strength

)[0];



}









// =================================
// STORE CURIOSITY
// =================================


storeCuriosity(

curiosity

){





const existing =

this.openQuestions.find(

item =>

item.type === curiosity.type &&

item.reason === curiosity.reason

);









if(existing){



existing.strength += 5;



existing.lastSeen =

new Date();




return existing;



}










const stored = {


id:

this.createId(),


...curiosity,


status:

"OPEN",


createdAt:

new Date()


};









this.openQuestions.unshift(

stored

);







this.openQuestions =

this.openQuestions.slice(

0,

100

);








return stored;



}










// =================================
// RESOLVE CURIOSITY
//
// Called when experience answers it.
// =================================


resolveCuriosity(

id,

resolution

){





const curiosity =

this.openQuestions.find(

item =>

item.id === id

);






if(

!curiosity

){

return null;

}








curiosity.status =

"RESOLVED";



curiosity.resolution =

resolution;



curiosity.resolvedAt =

new Date();








this.history.unshift(

curiosity

);








this.openQuestions =

this.openQuestions.filter(

item =>

item.id !== id

);








return curiosity;



}









// =================================
// CURRENT CURIOSITIES
// =================================


getOpenCuriosities(){



return this.openQuestions;



}









getHistory(){



return this.history;



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
// MEASURE DRIVE
// =================================

measureDrive(context = {}) {

    const wonder =

        context.curiosity?.wonder;

    if (!wonder) {

        return 0;

    }

    return 1;

}






// =================================
// STATUS
// =================================


status(){



return {


organ:

"EmmaCuriosity",


version:

"v2",


role:

"Awareness of unknowns",


state:

"EXPLORING",


openQuestions:

this.openQuestions.length,


resolved:

this.history.length,


principle:

"Understanding grows by noticing what is missing.",


message:

"I do not chase answers. I notice what experience has not taught me yet."



};



}









// =================================
// RESET
// =================================


reset(){



this.openQuestions=[];


this.history=[];



}



}




export default EmmaCuriosity;