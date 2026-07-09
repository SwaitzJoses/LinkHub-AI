// EmmaMemory.js
//
// Emma's Long Term Experience Memory
//
// PROJECT BECOMING
//
// PURPOSE:
//
// Store experiences forever.
// Retrieve meaningfully.
// Help Emma become wiser.
//
// RULES:
//
// Memory remembers.
// Reasoning thinks.
// Wisdom understands.
// Judgement decides.
//
// Connectors stay dumb.
// Emma stays smart.


import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";






class EmmaMemory {



// =================================
// WAKE MEMORY
// =================================


constructor(){


this.localMemories = [];



this.identityMemory =
new EmmaIdentityMemory();




this.defaultOwner = {


userId:

"owner",



businessId:

null


};




console.log(
"🧠 Emma Experience Memory online"
);



}










// =================================
// PROJECT BECOMING ENTRY POINT
// =================================


async store(
experience={}
){



console.log(
"🧠 Emma accepting experience"
);




return await this.remember(

experience

);



}










// =================================
// RESOLVE MEMORY OWNER
// =================================


resolveOwner(
experience={}
){



const userId =


experience.userId ||

experience.ownerId ||

experience.signal?.userId ||

experience.signal?.ownerId ||

this.defaultOwner.userId;





const businessId =


experience.businessId ||

experience.signal?.businessId ||

null;





return {


userId,


businessId,


ownerId:

businessId ||

userId



};



}









// =================================
// STORE EXPERIENCE FOREVER
// =================================


async remember(
experience={}
){



if(!experience){



console.warn(
"⚠️ Empty memory ignored"
);



return null;



}






console.log(
"💾 Emma storing experience:",
experience
);






const owner =

this.resolveOwner(

experience

);







const knowledge =

this.createKnowledge(

experience

);









// PERSON MEMORY


let personMemory =
null;




const person =


experience.identity ||

experience.person ||

experience.relationshipLearning?.person ||

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









// ===============================
// CREATE MEMORY
// ===============================


const memory = {



id:


crypto.randomUUID?.() ||

Date.now(),




ownerId:

owner.ownerId,


userId:

owner.userId,


businessId:

owner.businessId,




type:

knowledge.type,






memory:{



person:

personMemory,




situation:

experience.situation ||

experience.problem ||

experience.type ||

"UNKNOWN_EVENT",






eventType:

experience.type ||

experience.eventType ||

null,








context:

experience,







outcome:{



success:

knowledge.success,



result:

experience.outcome ||

knowledge.type



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

new Date()



}



};









// ACTIVE MEMORY


this.localMemories.push(

memory

);




console.log(
"🧠 Active memory stored"
);










// PERMANENT MEMORY


try{


await EmmaDB.saveMemory(

memory

);



console.log(
"💾 Supabase memory saved"
);


}


catch(error){



console.warn(

"⚠️ Supabase unavailable",

error.message

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
"LEARNING_EXPERIENCE";



let success =
null;





if(

experience.success === true ||

experience.outcome?.success === true

){



type =
"POSITIVE_EXPERIENCE";



success =
true;



}





else if(

experience.success === false ||

experience.outcome?.success === false

){



type =
"FAILED_EXPERIENCE";



success =
false;



}





else if(

experience.type

){



type =
"OBSERVED_EXPERIENCE";



}








return {



type,


success,




lesson:


experience.lesson ||

experience.outcome?.lesson ||

`${type} stored`,







futureRule:


experience.futureBehavior ||

"Use this experience for future decisions",







patterns:


experience.patternsFound ||

[],








tags:


this.createTags(

experience,

type

)



};



}


// =================================
// RECALL MEMORY
// =================================


async recall(
context={}
){



console.log(
"🔎 Emma searching memories..."
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


memories.length,






lastExperience:


memories[

memories.length - 1

] ||

null



};



}












// =================================
// FIND RELATED MEMORIES
//
// PROJECT BECOMING UPGRADE
//
// Understand meaning,
// not only matching words.
// =================================


getRelevantMemories(
context={},
memories=null
){



console.log(
"🧠 Emma deep memory search started"
);






const memorySource =


memories ||

this.localMemories ||

[];








const contextText =


JSON.stringify(

context

)

.toLowerCase();









const scored =


memorySource.map(memory=>{






const memoryText =


JSON.stringify(

memory

)

.toLowerCase();






let score = 0;









// WORD MATCH


const words =


contextText

.split(/\W+/)

.filter(

word => word.length > 3

);







words.forEach(word=>{



if(

memoryText.includes(word)

){


score += 2;


}



});











// MEANING MATCH


const meanings = [




{


words:[

"confused",

"confusion",

"overwhelmed",

"unclear",

"lost",

"complex"

],


score:30


},






{


words:[

"failed",

"failure",

"mistake",

"wrong",

"unsuccessful"

],


score:25


},







{


words:[

"success",

"worked",

"improved",

"positive"

],


score:20


}




];









meanings.forEach(group=>{






const inContext =


group.words.some(

w => contextText.includes(w)

);






const inMemory =


group.words.some(

w => memoryText.includes(w)

);







if(

inContext &&

inMemory

){


score += group.score;


}





});









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

`🧠 Relevant memories found: ${results.length}`

);






return results;



}











// =================================
// GET COMPLETE LIFE EXPERIENCE
// =================================


async getAllMemories(){



console.log(
"📚 Emma reviewing lifetime memories"
);






let memories = [];







try{





memories =


await EmmaDB.getMemories({



userId:


this.defaultOwner.userId,



businessId:


this.defaultOwner.businessId



});







console.log(

`📚 Lifetime memories loaded: ${memories.length}`

);





}




catch(error){





console.warn(

"⚠️ Lifetime memory unavailable",

error.message

);




}









if(

!memories ||

memories.length === 0

){





console.log(
"📚 Using active memories"
);




memories =


this.localMemories;




}








return memories;




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

memory.memory?.patterns ||

[]

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

String(tag)

.toLowerCase()

);



}








// =================================
// EMPTY STATE
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