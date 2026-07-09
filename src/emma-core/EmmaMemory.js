// EmmaMemory.js
//
// Emma Long Term Experience Memory
//
// PROJECT BECOMING
//
// Memory is not storage.
// Memory is experience becoming wisdom.
//
// RULE:
// Memory remembers.
// Reasoning thinks.
// Wisdom understands.
// Evolution changes.


import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";






class EmmaMemory {




// =================================
// WAKE MEMORY
// =================================


constructor(){


this.localMemories =
[];



// Fast working memory
this.activeMemory =
[];


// Cached long memory
this.memoryCache =
[];


// Avoid repeated DB calls
this.lastSync =
null;



// cache valid time
this.cacheLife =
1000 * 60 * 5;




// Maximum memories loaded
this.memoryLimit =
100;




this.identityMemory =
new EmmaIdentityMemory();





this.defaultOwner = {


userId:
"owner",


businessId:
null


};




console.log(
"🧠 Emma Experience Memory v3 online"
);


}









// =================================
// STORE ENTRY
// =================================


async store(experience={}){


console.log(
"🧠 Emma receiving experience"
);



return await this.remember(
experience
);


}










// =================================
// MEMORY OWNER
// =================================


resolveOwner(experience={}){


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
// STORE EXPERIENCE
// =================================


async remember(experience={}){


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







let personMemory =
null;



const person =


experience.person ||

experience.identity ||

experience.signal?.person ||

null;






if(person){


personMemory =

await this.identityMemory.remember(

person,

{

event:
experience.type,


lesson:
knowledge.lesson,


date:
new Date()

}

);


}









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



tags:
knowledge.tags,



createdAt:
new Date().toISOString()


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







// update cache

this.memoryCache.unshift(
memory
);









try{


await EmmaDB.saveMemory(
memory
);



console.log(
"💾 Long memory saved"
);


}

catch(error){


console.warn(
"⚠️ Database skipped:",
error.message
);


}






return memory;


}












// =================================
// EXPERIENCE → KNOWLEDGE
// =================================


createKnowledge(experience={}){



let type =
"OBSERVED_EXPERIENCE";


let success =
null;


let importance =
experience.importance || "NORMAL";





if(
experience.success === true
){


type =
"POSITIVE_EXPERIENCE";


success =
true;


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


}







return {


type,


success,


importance,



lesson:

experience.lesson ||

`${type} remembered`,




futureRule:

experience.futureBehavior ||

"Use this experience when useful",




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
// SMART RECALL
// =================================


async recall(context={}){


console.log(
"🔎 Emma recalling useful memory"
);



const memories =

await this.getAllMemories();





return {


previousExperiences:
memories,



relevantExperiences:

this.getRelevantMemories(
context,
memories
),



successes:

this.findByType(
memories,
"POSITIVE_EXPERIENCE"
),



failures:

this.findByType(
memories,
"FAILED_EXPERIENCE"
),



patterns:

this.extractPatterns(
memories
),



rules:

this.extractRules(
memories
),



totalMemories:
memories.length


};


}

// =================================
// DEEP MEMORY SEARCH
//
// Meaning based retrieval
// =================================


getRelevantMemories(
context={},
memories=null
){



console.log(
"🧠 Emma searching meaningful memories"
);




const source =

memories ||

this.memoryCache ||

this.activeMemory ||

[];





const contextText =

JSON.stringify(context)
.toLowerCase();





const scored =

source.map(memory=>{



const memoryText =

JSON.stringify(memory)
.toLowerCase();




let score = 0;







// -------------------------------
// WORD ASSOCIATION
// -------------------------------


const words =

contextText
.split(/\W+/)
.filter(
w => w.length > 3
);




words.forEach(word=>{


if(
memoryText.includes(word)
){


score += 3;


}


});










// -------------------------------
// EMOTIONAL / MEANING MATCH
// -------------------------------


const meanings = [


{
words:[
"failed",
"mistake",
"problem",
"wrong",
"error"
],
score:30
},



{
words:[
"success",
"growth",
"improved",
"worked",
"win"
],
score:25
},



{
words:[
"user",
"relationship",
"trust",
"preference"
],
score:20
},



{
words:[
"business",
"customer",
"sales",
"money"
],
score:20
}


];








meanings.forEach(group=>{


const a =

group.words.some(
w => contextText.includes(w)
);



const b =

group.words.some(
w => memoryText.includes(w)
);




if(a && b){

score += group.score;

}


});











// important memories surface easier


if(
memory.importance === "HIGH"
){

score += 20;

}









return {


...memory,


_relevanceScore:
score


};



});









const results =


scored

.filter(
m => m._relevanceScore > 0
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







console.log(

`🧠 Relevant memories: ${results.length}`

);




return results;



}













// =================================
// NORMAL MEMORY ACCESS
//
// Consciousness safe
// =================================


async getAllMemories(){



console.log(
"📚 Emma loading active memory"
);




// --------------------------------
// 1. Use fresh cache
// --------------------------------


if(
this.isCacheValid()
){



console.log(
"⚡ Using memory cache"
);



return this.memoryCache;



}









let memories = [];








try{



// DO NOT LOAD WHOLE LIFE
// only recent useful memories


memories =

await EmmaDB.getMemories({



userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



limit:

this.memoryLimit



});






console.log(

`📚 Loaded ${memories.length} memories`

);



this.memoryCache =
memories;



this.lastSync =
Date.now();




}

catch(error){



console.warn(

"⚠️ Memory database unavailable:",
error.message

);



}











// fallback


if(
!memories ||
memories.length === 0
){



console.log(
"🧠 Using active memory fallback"
);



memories =
this.activeMemory;



}






return memories;



}











// =================================
// TRUE LIFETIME MEMORY
//
// Only call intentionally
// =================================


async getLifetimeMemories(){



console.log(
"🌌 Emma accessing lifetime memory"
);




try{


return await EmmaDB.getMemories({



userId:
this.defaultOwner.userId,


businessId:
this.defaultOwner.businessId,



limit:
1000



});



}


catch(error){



console.warn(
"Lifetime unavailable",
error.message
);



return this.memoryCache;



}



}











// =================================
// CACHE CHECK
// =================================


isCacheValid(){



if(
!this.lastSync
){


return false;


}




return (

Date.now() -
this.lastSync

)

<

this.cacheLife;



}











// =================================
// MEMORY STATISTICS
// =================================


stats(){



return {


active:
this.activeMemory.length,


cached:
this.memoryCache.length,


lastSync:
this.lastSync,


status:
"healthy"



};



}












// =================================
// HELPERS
// =================================


findByType(
memories=[],
type
){



return memories.filter(

memory =>

memory.type === type

);



}









extractRules(
memories=[]
){



return memories


.map(

m =>

m.memory?.futureRule

)


.filter(Boolean);



}










extractPatterns(
memories=[]
){



return [


...new Set(


memories.flatMap(

m =>

m.memory?.patterns || []

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


experience.eventType,


experience.situation


]


.filter(Boolean)


.map(

tag =>

String(tag).toLowerCase()

);



}










// =================================
// EMPTY MEMORY
// =================================


emptyMemory(){



return {


previousExperiences:[],


relevantExperiences:[],


successes:[],


failures:[],


patterns:[],


rules:[],


totalMemories:0



};



}






}


export default EmmaMemory;