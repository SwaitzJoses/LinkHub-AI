// EmmaMemory.js
//
// PROJECT BECOMING
//
// Emma Living Experience Memory v5.2
//
// TEMPORAL MEMORY PATCH 🕰
//
// Memory is not storage.
// Memory is Emma's life.
//
// v5.2:
//
// - TemporalSense support
// - Safe timeline recall
// - No full lifetime scans
// - Cache-first memory
// - Important history retrieval
//
// RULE:
//
// Remember a lifetime.
// Recall what matters.
//

import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";





class EmmaMemory {




constructor(){



console.log(
"🧠 Emma Living Memory v5.2 awake"
);




// =============================
// ACTIVE CONSCIOUS MEMORY
// =============================


this.activeMemory = [];




// =============================
// LONG TERM CACHE
// =============================


this.memoryCache = [];




// =============================
// CORE LIFE MEMORIES
// =============================


this.coreMemories = [];




// =============================
// ASSOCIATION GRAPH
// =============================


this.associations =
new Map();




// =============================
// FALLBACK MEMORY
// =============================


this.localMemories = [];





this.lastSync = null;



this.cacheLife =

1000 * 60 * 5;





// =============================
// LIMITS
// =============================


this.memoryLimit = 50;


this.recallLimit = 15;


// NEW 🕰

this.timelineLimit = 50;






this.identityMemory =

new EmmaIdentityMemory();


// =================================
// DAY 15 ORGAN REFERENCES
// =================================

this.selfModel = null;

this.relationshipModel = null;





this.defaultOwner = {


userId:

"owner",


businessId:

null


};



}

// =================================
// CONNECT ORGANISM
// =================================

connect({

selfModel = null,

relationshipModel = null

} = {}){

this.selfModel = selfModel;

this.relationshipModel = relationshipModel;

return this;

}

// =================================
// EXPERIENCE ENTRY POINT
// =================================

async store(

experience={}

){


console.log(
"🌊 Experience entered Emma memory"
);



return await this.remember(

experience

);


}










// =================================
// OWNER RESOLUTION
// =================================


resolveOwner(

experience={}

){



const userId =

experience.userId ||

experience.ownerId ||

experience.signal?.userId ||

"owner";




const businessId =

experience.businessId ||

experience.signal?.businessId ||

null;




return {


userId,


businessId,


ownerId:

businessId || userId


};



}









// =================================
// CREATE MEMORY
// =================================


async remember(

experience={}

){



if(!experience){

return null;

}





const owner =

this.resolveOwner(

experience

);




const knowledge =

this.createKnowledge(

experience

);




const strength =

this.calculateStrength(

knowledge,

experience

);






// =============================
// IDENTITY MEMORY
// =============================


let personMemory = null;




const person =

experience.person ||

experience.identity ||

experience.signal?.person;




if(person){



personMemory =

await this.identityMemory.remember(

person,

{


event:

experience.type,


lesson:

knowledge.lesson,


emotion:

knowledge.emotion,


date:

new Date()


}

);


}








// =============================
// MEMORY OBJECT
// =============================


const memory = {


id:

crypto.randomUUID?.()

||

Date.now(),



ownerId:

owner.ownerId,


userId:

owner.userId,


businessId:

owner.businessId,



type:

knowledge.type,


importance:

knowledge.importance,


strength,


age:0,


createdAt:

Date.now(),




memory:{


person:

personMemory,



situation:

experience.situation ||

experience.type ||

"UNKNOWN",



context:

experience,



outcome:{


success:

knowledge.success,


result:

experience.outcome || null


},



lesson:

knowledge.lesson,


futureRule:

knowledge.futureRule,


patterns:

knowledge.patterns,


emotion:

knowledge.emotion,


tags:

knowledge.tags,


reinforced:0,


associations:[],


createdAt:

new Date()

.toISOString()


}


};








// =============================
// ACTIVE MEMORY
// =============================


this.activeMemory.unshift(

memory

);



this.activeMemory =

this.activeMemory.slice(

0,

50

);





this.localMemories.unshift(

memory

);



this.memoryCache.unshift(

memory

);




this.buildAssociations(
memory
);

if(

this.isCoreMemory(

memory

)

){

this.coreMemories.unshift(

memory

);

console.log(

"🔥 Core memory created"

);

}

// =============================
// DAY 15
// Notify organism
// =============================

await this.notifySelfModel(
memory
);

await this.notifyRelationshipModel(
memory
);








// =============================
// LONG TERM STORAGE
// =============================


if(

this.shouldPersist(memory)

){


try{


await EmmaDB.saveMemory(

memory

);



console.log(

"💾 Long term memory stored"

);


}


catch(error){


console.warn(

"⚠️ Memory sleeping locally:",

error.message

);


}


}


else{


console.log(

"🍃 Temporary experience"

);


}





return memory;



}


// =================================
// NOTIFY SELF MODEL
// =================================

async notifySelfModel(memory){

if(!this.selfModel){

return;

}

try{

if(typeof this.selfModel.observeMemory === "function"){

await this.selfModel.observeMemory(memory);

}

}catch(error){

console.warn(

"⚠️ SelfModel notification failed",

error.message

);

}

}

// =================================
// NOTIFY RELATIONSHIP MODEL
// =================================

async notifyRelationshipModel(memory){

if(!this.relationshipModel){

return;

}

try{

if(typeof this.relationshipModel.observeMemory === "function"){

await this.relationshipModel.observeMemory(memory);

}

}catch(error){

console.warn(

"⚠️ Relationship notification failed",

error.message

);

}

}

// =================================
// EXPERIENCE → KNOWLEDGE
// =================================


createKnowledge(

experience={}

){



let type =

"OBSERVED_EXPERIENCE";



let success = null;



let importance =

experience.importance ||

"NORMAL";



let emotion =

"neutral";






if(

experience.success === true

){



type =

"POSITIVE_EXPERIENCE";



success = true;



emotion =

"positive";



}






if(

experience.success === false

){



type =

"FAILED_EXPERIENCE";



success = false;



importance =

"HIGH";



emotion =

"negative";



}






return {



type,


success,


importance,


emotion,



lesson:

experience.lesson

||

this.extractLesson(

experience,

type

),




futureRule:

experience.futureBehavior

||

this.createFutureRule(

success

),




patterns:

experience.patternsFound

||

[],


tags:

this.createTags(

experience,

type

)



};



}










// =================================
// MEMORY STRENGTH
// =================================


calculateStrength(

knowledge,

experience

){



let score = 10;





if(

knowledge.importance === "HIGH"

||

knowledge.importance === "critical"

){

score += 40;

}





if(

knowledge.success !== null

){

score += 25;

}





if(

experience.person

){

score += 15;

}





if(

knowledge.patterns.length

){

score += 20;

}




return Math.min(

score,

100

);



}










// =================================
// CORE MEMORY DETECTION
// =================================


isCoreMemory(

memory

){



return (

memory.strength >= 80

||

memory.type ===

"FAILED_EXPERIENCE"

);



}









// =================================
// SHOULD PERSIST
// =================================


shouldPersist(

memory

){



return (

memory.strength >= 30

||

memory.importance === "HIGH"

||

memory.importance === "critical"

);



}










// =================================
// ASSOCIATION GRAPH
// =================================


buildAssociations(

memory

){



const words =

JSON.stringify(

memory

)

.toLowerCase()

.split(/\W+/)

.filter(

word => word.length > 4

);






memory.memory.associations =

[

...new Set(words)

];






for(

const word of words

){



if(

!this.associations.has(word)

){


this.associations.set(

word,

[]

);


}




this.associations

.get(word)

.push(

memory.id

);



}



}










// =================================
// RECALL
// =================================


async recall(

context={}

){



console.log(

"🔎 Emma focused remembering"

);





const memories =

await this.getMemoryCandidates(

context

);






const relevant =

this.getRelevantMemories(

context,

memories

);






return {



relevantExperiences:

relevant,



coreMemories:

this.coreMemories.slice(

0,

5

),




wisdom:

this.extractWisdom(

relevant

),




rules:

this.extractRules(

relevant

),




patterns:

this.extractPatterns(

relevant

),




searchedMemories:

memories.length,



returnedMemories:

relevant.length



};



}










// =================================
// MEMORY CANDIDATES
//
// Fast thinking recall
// =================================


async getMemoryCandidates(

context={}

){



let candidates = [


...this.activeMemory,


...this.coreMemories


];






if(

candidates.length >=

this.recallLimit

){



return candidates.slice(

0,

this.memoryLimit

);



}







try{



const stored =

await EmmaDB.getMemories({



userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



limit:

this.memoryLimit,



importantOnly:

true



});






return this.removeDuplicates([


...candidates,


...stored


]);




}



catch(error){



console.warn(

"⚠️ Memory fallback mode"

);




return this.localMemories.slice(

0,

this.memoryLimit

);



}



}










// =================================
// RECENT IMPORTANT MEMORIES 🕰
//
// Used by TemporalSense
//
// Prevents Supabase timeout
// =================================


async getRecentImportant(

limit = 50

){



console.log(

"🕰 Loading timeline memories"

);





let memories = [


...this.activeMemory,


...this.coreMemories


];







// cache first


if(

this.memoryCache.length

){



memories.push(

...this.memoryCache

);



}






memories =

this.removeDuplicates(

memories

);







if(

memories.length >= limit

){



return memories


.sort(

(a,b)=>

(b.createdAt || 0)

-

(a.createdAt || 0)

)


.slice(

0,

limit

);



}










// Database only if needed


try{



const stored =

await EmmaDB.getMemories({



userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



limit,


importantOnly:true



});







return this.removeDuplicates([


...memories,


...stored


])

.slice(

0,

limit

);




}



catch(error){



console.warn(

"⚠️ Temporal memory fallback",

error.message

);




return this.localMemories.slice(

0,

limit

);



}



}










// =================================
// SAFE GET ALL
//
// Compatibility for old organs
// =================================


async getAll(){



console.log(

"🛡 Safe getAll redirected"

);




return await this.getRecentImportant(

this.timelineLimit

);



}










// =================================
// REMOVE DUPLICATES
// =================================


removeDuplicates(

memories=[]

){



const seen =

new Set();





return memories.filter(

memory=>{



const id =

memory.id ||

JSON.stringify(memory);





if(

seen.has(id)

){

return false;

}




seen.add(id);



return true;



});



}


// =================================
// MEANING BASED RECALL
// =================================


getRelevantMemories(

context={},

memories=[]

){



const text =

JSON.stringify(

context

)

.toLowerCase();





return memories



.map(memory=>{



let score =

memory.strength || 0;






for(

const tag of

memory.memory?.tags || []

){



if(

text.includes(tag)

){


score += 20;


}



}






if(

memory.memory?.emotion

&&

text.includes(

memory.memory.emotion

)

){



score += 15;



}






score +=

(

memory.memory?.reinforced ||

0

)

*

10;






return {


...memory,


_relevanceScore:

score


};



})





.filter(

memory =>

memory._relevanceScore > 25

)





.sort(

(a,b)=>

b._relevanceScore -

a._relevanceScore

)





.slice(

0,

10

);



}










// =================================
// MEMORY REINFORCEMENT
// =================================


reinforce(

memory

){



if(

!memory.memory

){

return;

}




memory.memory.reinforced++;




memory.strength =

Math.min(

memory.strength + 10,

100

);




return memory;



}










// =================================
// SLEEP CONSOLIDATION
//
// Deep reflection happens here.
// =================================


async sleep(){



console.log(

"💤 Emma sleeping"

);




this.ageMemories();




const wisdom =

this.formWisdom();




console.log(

"🌙 Emma woke with wisdom"

);




return wisdom;



}










// =================================
// MEMORY AGING
// =================================


ageMemories(){



this.memoryCache =

this.memoryCache.filter(

memory=>{



memory.age++;




if(

this.isCoreMemory(memory)

){

return true;

}





memory.strength -= 5;





return (

memory.strength > 0

);



});



}










// =================================
// FORM WISDOM
// =================================


formWisdom(){



return this.memoryCache



.filter(

memory =>

memory.strength >= 60

)



.map(

memory => ({



lesson:

memory.memory.lesson,



rule:

memory.memory.futureRule,



formedFrom:

memory.type



}));



}










// =================================
// EXTRACT WISDOM
// =================================


extractWisdom(

memories=[]

){



return memories



.filter(

memory =>

memory.strength >= 60

)



.map(

memory => ({



lesson:

memory.memory?.lesson,



rule:

memory.memory?.futureRule,



source:

memory.type



}));



}










// =================================
// EXPLAIN RECALL
// =================================


explainRecall(

memories=[]

){



return memories.map(

memory => ({



because:

memory.memory?.lesson,



strength:

memory.strength,



emotion:

memory.memory?.emotion,



relevance:

memory._relevanceScore



}));



}










// =================================
// DEEP MEMORY LOAD
//
// Sleep only.
// Not active thinking.
// =================================


async getAllMemories(){



console.log(

"🌙 Deep memory scan"

);




if(

this.isCacheValid()

){


return this.memoryCache;


}






try{



const memories =

await EmmaDB.getMemories({



userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



limit:

this.memoryLimit



});






this.memoryCache =

memories;



this.lastSync =

Date.now();




return memories;



}




catch(error){



console.warn(

"DB unavailable, local memory used"

);




return this.localMemories;



}



}










// =================================
// CACHE CHECK
// =================================


isCacheValid(){



return (


this.lastSync


&&


Date.now()

-

this.lastSync

<

this.cacheLife


);



}










// =================================
// BASIC WISDOM HELPERS
// =================================


extractLesson(

experience,

type

){



if(

type === "FAILED_EXPERIENCE"

){


return (

"Avoid repeating this mistake"

);


}





if(

type === "POSITIVE_EXPERIENCE"

){


return (

"Repeat when conditions match"

);


}





return (

"Observe before deciding"

);



}










createFutureRule(

success

){



if(success === false){


return (

"Check memories before action"

);


}





if(success === true){


return (

"Reuse proven patterns"

);


}





return (

"Learn from experience"

);



}










extractRules(

memories=[]

){



return memories



.map(

memory =>

memory.memory?.futureRule

)



.filter(Boolean);



}










extractPatterns(

memories=[]

){



return [


...new Set(


memories.flatMap(

memory =>

memory.memory?.patterns || []

)


)


];



}










createTags(

experience={},

type

){



return [



type,



experience.type,



experience.situation



]



.filter(Boolean)



.map(

item =>

String(item)

.toLowerCase()

);



}



// =================================
// MEASURE NOVELTY
// =================================

measureNovelty(context = {}) {

    const memories = context.memories || [];

    if (memories.length === 0) {

        return 1;

    }

    if (memories.length <= 2) {

        return 0.7;

    }

    if (memories.length <= 5) {

        return 0.4;

    }

    return 0.1;

}








// =================================
// STATUS
// =================================


status(){



return {



organ:

"EmmaMemory",



version:

"v5.2",



state:

"LIVING_TEMPORAL_MEMORY",



active:

this.activeMemory.length,



cached:

this.memoryCache.length,



core:

this.coreMemories.length,



recallLimit:

this.recallLimit,



timelineLimit:

this.timelineLimit,


supports:[
"Experience Memory",
"Meaning Recall",
"TemporalSense Timeline",
"Safe History Retrieval",
"SelfModel Updates",
"Relationship Updates"
],




principle:

"Remember a lifetime. Recall only what matters now.",




message:

"My past is large, but my attention is focused."



};



}



}




export default EmmaMemory;