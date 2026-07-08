// EmmaMemory.js
// Emma's long-term intelligence system
//
// PURPOSE:
// Store experiences forever.
//
// RULE:
//
// Memory remembers.
// Reasoning thinks.
// Judgement decides.
//
// Connectors stay dumb.
// Emma owns identity.


import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";







class EmmaMemory {



// ===============================
// WAKE MEMORY
// ===============================


constructor(){



this.localMemories =
[];




// Default owner for local Emma

this.defaultOwner =
{
userId:"owner",
businessId:null
};




console.log(
"🧠 Emma Experience Memory online"
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
// STORE EXPERIENCE
// =================================


async remember(
experience={}
){





console.log(

"💾 Emma storing experience:",

experience

);







// ===============================
// WHO OWNS MEMORY?
// ===============================


const owner =

this.resolveOwner(

experience

);





if(

!owner.ownerId

){



console.warn(

"⚠️ Memory rejected: no owner"

);



return null;



}









// ===============================
// CREATE KNOWLEDGE
// ===============================


const knowledge =

this.createKnowledge(

experience

);









// ===============================
// WHO WAS INVOLVED?
// ===============================


let personMemory =
null;






const person =


experience.identity ||


experience.person ||


experience.relationshipLearning?.person ||


experience.signal?.person ||


null;








if(

person

){





personMemory =

EmmaIdentityMemory.remember(


person,


{


event:

experience.eventType ||


experience.type,



lesson:

knowledge.lesson,



date:

new Date()


}


);






console.log(

"🧑 Linked person memory:",

personMemory?.name

);



}









// ===============================
// MEMORY OBJECT
// ===============================


const memory =
{





ownerId:

owner.ownerId,




userId:

owner.userId,




businessId:

owner.businessId,








type:

knowledge.type,








memory:
{








// WHO


person:

personMemory,









// WHAT


situation:



experience.situation ||


experience.problem ||


experience.type ||


"UNKNOWN_EVENT",









eventType:



experience.eventType ||


experience.type ||


null,









// CONTEXT


context:



experience.originalObservation ||


experience.context ||


experience.signal ||


experience ||


null,









// ACTION


attemptedAction:



experience.attemptedAction ||


experience.action ||


"NO_ACTION",









// RESULT


outcome:
{



result:



experience.result ||


knowledge.type,





metrics:



experience.metrics || {},





success:



knowledge.success




},










// LEARNING


lesson:



knowledge.lesson,






futureRule:



knowledge.futureRule,






patterns:



knowledge.patterns,






tags:



knowledge.tags,









// OWNER LEARNING


identity:



knowledge.identityLearning,







relationship:



experience.relationshipLearning ||


null,







confidenceImpact:



knowledge.confidenceImpact,








createdAt:



new Date()








}




};










// ===============================
// ACTIVE MEMORY
// ===============================


this.localMemories.push(

memory

);






console.log(

"🧠 Active memory stored"

);










// ===============================
// PERMANENT MEMORY
// ===============================


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

"⚠️ Supabase memory unavailable",

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


let confidenceImpact =
0;


let futureRule =
"Use this experience for future decisions";







// ======================
// SUCCESS
// ======================


if(
experience.success === true
){



type =
"POSITIVE_EXPERIENCE";



success =
true;



confidenceImpact =
5;



futureRule =
"Repeat this pattern in similar situations";



}








// ======================
// FAILURE
// ======================


else if(
experience.success === false
){



type =
"FAILED_EXPERIENCE";



success =
false;



confidenceImpact =
-5;



futureRule =
"Avoid repeating without changing strategy";



}








// ======================
// OBSERVED EVENT
// ======================


else if(

experience.eventType ||

experience.type

){



type =
"OBSERVED_EXPERIENCE";



confidenceImpact =
2;



futureRule =
"Compare future events with this pattern";



}










return {



type,


success,


confidenceImpact,



lesson:


experience.lesson ||

`${type} stored`,





futureRule:


experience.futureBehavior ||

futureRule,





patterns:


experience.patternsFound ||

[],





tags:


this.createTags(

experience,

type

),





identityLearning:


this.extractIdentityLearning(

experience

)



};



}











// =================================
// LEARN ABOUT OWNER
// =================================


extractIdentityLearning(
experience={}
){



return {



goals:


experience.identityLearning?.goals ||

[],





preferences:


experience.identityLearning?.preferences ||

[],





workingStyle:


experience.identityLearning?.workingStyle ||

[],





priorities:


experience.identityLearning?.priorities ||

[],





observations:[


"Emma gained more understanding"


]



};



}











// =================================
// RECALL MEMORY
// =================================


async recall(
context={}
){





console.log(

"🔎 Emma searching memory..."

);








const owner =

this.resolveOwner(

context

);







let memories =
[];








try{





memories =

await EmmaDB.getMemories({




userId:


owner.userId,




businessId:


owner.businessId




});






}




catch(error){





console.warn(

"⚠️ Using local memories"

);





}










if(

!memories ||

memories.length === 0

){





memories =

this.localMemories.filter(

m =>


m.ownerId === owner.ownerId


);



}









return {








previousExperiences:



memories,









relevantExperiences:



this.getRelevantMemories(


context,


memories


),







relationships:



this.extractRelationships(


memories


),








identity:



this.extractIdentity(


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








rules:



this.extractRules(


memories


),








patterns:



this.extractPatterns(


memories


),








totalMemories:



memories.length,








lastExperience:



memories[0] || null







};



}











// =================================
// RELATIONSHIP MEMORY
// =================================


extractRelationships(
memories=[]
){



return memories


.map(

m => m.memory?.person

)


.filter(Boolean)


.map(

person => ({



name:

person.name,



email:

person.email,



lastSeen:

person.lastSeen,



interactions:


person.interactions?.length || 0




})


);



}











// =================================
// OWNER IDENTITY SUMMARY
// =================================


extractIdentity(
memories=[]
){



return {



goals:


memories.flatMap(

m =>

m.memory?.identity?.goals || []

),





preferences:


memories.flatMap(

m =>

m.memory?.identity?.preferences || []

),





workingStyle:


memories.flatMap(

m =>

m.memory?.identity?.workingStyle || []

),





priorities:


memories.flatMap(

m =>

m.memory?.identity?.priorities || []

)



};



}











// =================================
// SEARCH RELATED MEMORY
// =================================


getRelevantMemories(
context,
memories=[]
){



const search =

JSON.stringify(

context

)

.toLowerCase();







return memories


.filter(memory=>{





const text =

JSON.stringify(

memory

)

.toLowerCase();






return search


.split(" ")


.some(word =>



word.length > 4 &&

text.includes(word)



);




})


.slice(

0,

10

);



}









findByType(
memories,
type
){



return memories.filter(

m =>

m.type === type

);



}









extractRules(
memories=[]
){



return memories


.map(

m => m.memory?.futureRule

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
experience,
type
){



return [



type,



experience.eventType,



experience.type,



experience.situation



]


.filter(Boolean)


.map(

x =>

String(x)

.toLowerCase()

);



}










emptyMemory(){



return {



previousExperiences:[],


relevantExperiences:[],


relationships:[],


identity:{},


successes:[],


failures:[],


rules:[],


patterns:[],


totalMemories:0



};



}




}







export default EmmaMemory;