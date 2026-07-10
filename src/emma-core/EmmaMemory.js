// EmmaMemory.js
//
// PROJECT BECOMING
//
// Emma Living Experience Memory v5.1
//
// DAY 15 STABILITY PATCH
//
// Memory is not storage.
// Memory is Emma's life.
//
// RULE:
//
// Events become memories.
// Memories become wisdom.
// Wisdom changes future behaviour.
//
// v5.1:
//
// - Scalable recall
// - Candidate memory retrieval
// - Importance filtering
// - No full memory scan while thinking
//
// Vector memory comes later.
//


import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";





class EmmaMemory {





constructor(){



console.log(
"🧠 Emma Living Memory v5.1 awake"
);




// =============================
// CONSCIOUS MEMORY
// =============================

this.activeMemory = [];




// =============================
// LONG TERM CACHE
// =============================

this.memoryCache = [];




// =============================
// LIFE DEFINING MEMORY
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





// Day 15 scaling patch

this.memoryLimit = 50;


this.recallLimit = 15;






this.identityMemory =

new EmmaIdentityMemory();






this.defaultOwner = {


userId:"owner",


businessId:null


};




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





if(

!experience

)

return null;







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









// ================================
// IDENTITY MEMORY
// ================================


let personMemory = null;





const person =

experience.person ||

experience.identity ||

experience.signal?.person;







if(

person

){



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










// ================================
// MEMORY OBJECT
// ================================



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









// ================================
// ACTIVE MEMORY
// ================================



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









// ================================
// ASSOCIATIONS
// ================================


this.buildAssociations(

memory

);










// ================================
// CORE MEMORY
// ================================


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









// ================================
// SAVE LONG TERM
// ================================


if(

this.shouldPersist(

memory

)

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
// EXPERIENCE → KNOWLEDGE
// =================================


createKnowledge(

experience={}

){



let type =
"OBSERVED_EXPERIENCE";


let success =
null;


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


success =
true;


emotion =
"positive";



}







if(

experience.success === false

){



type =
"FAILED_EXPERIENCE";


success =
false;


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

experience.lesson ||

this.extractLesson(

experience,

type

),





futureRule:

experience.futureBehavior ||

this.createFutureRule(

success

),





patterns:

experience.patternsFound || [],





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

)

score += 40;





if(

knowledge.success !== null

)

score += 25;





if(

experience.person

)

score += 15;





if(

knowledge.patterns.length

)

score += 20;







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


memory.strength >= 80 ||


memory.type ===

"FAILED_EXPERIENCE"


);



}










// =================================
// SHOULD SAVE LONG TERM
// =================================


shouldPersist(

memory

){



return (


memory.strength >= 30 ||


memory.importance === "HIGH"


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

w => w.length > 4

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
//
// v5.1 scalable recall
// =================================


async recall(

context={}

){



console.log(

"🔎 Emma focused remembering..."

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






reason:

this.explainRecall(

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
// IMPORTANT PATCH
//
// No full life scan.
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








return [


...candidates,


...stored


];






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

memory.memory?.emotion &&

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

m =>

m._relevanceScore > 25

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

)

return;






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
// Full memory thinking happens here,
// not during normal recall.
// =================================


async sleep(){





console.log(

"💤 Emma sleeping..."

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

memory => {






memory.age++;







if(

this.isCoreMemory(

memory

)

)

return true;








memory.strength -= 5;







return (

memory.strength > 0

);




});



}










// =================================
// EXPERIENCE → WISDOM
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



})

);



}










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



})

);



}









// =================================
// EXPLAIN WHY REMEMBERED
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



})

);



}










// =================================
// FULL MEMORY LOAD
//
// DO NOT USE DURING THINKING
//
// Sleep / maintenance only.
// =================================


async getAllMemories(){





console.log(

"🌙 Deep memory scan"

);







if(

this.isCacheValid()

)

return this.memoryCache;









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

"DB unavailable, using local memory"

);







return this.localMemories;



}



}









// =================================
// CACHE CHECK
// =================================


isCacheValid(){





return (



this.lastSync &&



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

type ===

"FAILED_EXPERIENCE"

)



return (

"Avoid repeating this mistake"

);








if(

type ===

"POSITIVE_EXPERIENCE"

)



return (

"Repeat when conditions match"

);








return (

"Observe before deciding"

);



}










createFutureRule(

success

){





if(

success === false

)



return (

"Check memories before action"

);







if(

success === true

)



return (

"Reuse proven patterns"

);








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
// STATUS
// =================================


status(){





return {



organ:

"EmmaMemory",



version:

"v5.1",



state:

"LIVING_MEMORY",



active:

this.activeMemory.length,



cached:

this.memoryCache.length,



core:

this.coreMemories.length,



principle:

"Remember meaning, not everything.",



message:

"I recall what matters before I think."



};



}





}





export default EmmaMemory;