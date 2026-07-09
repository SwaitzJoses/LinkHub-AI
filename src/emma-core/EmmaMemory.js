// EmmaMemory.js
//
// PROJECT BECOMING
//
// Emma Living Experience Memory v5
//
// Memory is not storage.
// Memory is Emma's life.
//
// RULE:
//
// Events become memories.
// Memories become wisdom.
// Wisdom changes identity.
//
// Emma does not remember everything.
// Emma remembers what changed her.
//


import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";





class EmmaMemory {



constructor(){



    console.log(
    "🧠 Emma Living Memory v5 awake"
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
    // EMOTIONAL / LIFE DEFINING
    // =============================

    this.coreMemories = [];



    // =============================
    // MEMORY RELATION GRAPH
    // =============================

    this.associations = new Map();




    // =============================
    // LOCAL FALLBACK
    // =============================

    this.localMemories = [];



    this.lastSync = null;


    this.cacheLife =
    1000 * 60 * 5;



    this.memoryLimit = 200;



    // Identity growth

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


async store(experience={}){


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
// CREATE MEMORY
// =================================


async remember(experience={}){



if(!experience)
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


let personMemory=null;



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


date:new Date()

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
// STORE ACTIVE EXPERIENCE
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
// BUILD CONNECTIONS
// ================================


this.buildAssociations(
memory
);









// ================================
// CORE MEMORY CREATION
// ================================


if(
this.isCoreMemory(memory)
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
// EXPERIENCE → KNOWLEDGE
// =================================

createKnowledge(experience={}){


let type =
"OBSERVED_EXPERIENCE";


let success =
null;


let importance =
experience.importance ||
"NORMAL";


let emotion =
"neutral";




// positive outcome

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




// negative outcome

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


isCoreMemory(memory){


return (

memory.strength >= 80 ||

memory.type ===
"FAILED_EXPERIENCE"

);


}









// =================================
// SHOULD SAVE LONG TERM
// =================================


shouldPersist(memory){


return (

memory.strength >= 30 ||

memory.importance === "HIGH"

);


}










// =================================
// ASSOCIATION NETWORK
// =================================


buildAssociations(memory){



const words =

JSON.stringify(memory)
.toLowerCase()
.split(/\W+/)
.filter(
w=>w.length>4
);





memory.memory.associations =
[
...new Set(words)
];




for(const word of words){



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


async recall(context={}){


console.log(
"🔎 Emma remembering..."
);



const memories =
await this.getAllMemories();





const relevant =
this.getRelevantMemories(
context,
memories
);






return {


relevantExperiences:
relevant,



coreMemories:
this.coreMemories,



wisdom:
this.extractWisdom(
memories
),



rules:
this.extractRules(
memories
),



patterns:
this.extractPatterns(
memories
),



reason:

this.explainRecall(
relevant
),



totalMemories:
memories.length



};



}









// =================================
// MEANING BASED RECALL
// =================================


getRelevantMemories(
context={},
memories=[]
){



const text =

JSON.stringify(context)
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

(memory.memory?.reinforced || 0)
*10;





return {


...memory,


_relevanceScore:
score


};



})




.filter(
m=>m._relevanceScore>25
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


reinforce(memory){


if(!memory.memory)
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
memory=>{


memory.age++;



// core memories survive

if(
this.isCoreMemory(memory)
)
return true;





// weak memories fade

memory.strength -= 5;




return memory.strength > 0;


});



}










// =================================
// EXPERIENCE → WISDOM
// =================================


formWisdom(){



return this.memoryCache


.filter(
m=>m.strength >= 60
)



.map(
m=>({


lesson:
m.memory.lesson,


rule:
m.memory.futureRule,


formedFrom:
m.type


})

);



}










extractWisdom(memories=[]){


return this.formWisdom(
memories
);


}









// =================================
// EXPLAIN WHY EMMA REMEMBERED
// =================================


explainRecall(memories=[]){


return memories.map(
m=>({


because:

m.memory?.lesson,


strength:

m.strength,


emotion:

m.memory?.emotion


})

);


}









// =================================
// LOAD MEMORY
// =================================


async getAllMemories(){



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
"DB unavailable, using living memory"
);



return this.localMemories;


}



}









isCacheValid(){


return (

this.lastSync &&

Date.now()-this.lastSync
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
type==="FAILED_EXPERIENCE"
)

return "Avoid repeating this mistake";



if(
type==="POSITIVE_EXPERIENCE"
)

return "Repeat when conditions match";



return "Observe before deciding";


}






createFutureRule(success){


if(success===false)
return "Check memories before action";



if(success===true)
return "Reuse proven patterns";



return "Learn from experience";


}







extractRules(memories=[]){


return memories

.map(
m=>m.memory?.futureRule
)

.filter(Boolean);


}







extractPatterns(memories=[]){



return [

...new Set(

memories.flatMap(

m=>m.memory?.patterns || []

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
x=>String(x).toLowerCase()
);


}



}



export default EmmaMemory;