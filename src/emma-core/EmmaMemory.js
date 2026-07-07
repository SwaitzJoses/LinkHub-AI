// EmmaMemory.js
// Emma's long-term intelligence system
//
// PURPOSE:
// Store experiences forever.
//
// EmmaMemory:
// "What happened?"
// "Who was involved?"
// "What did we learn?"
//
// RULE:
// Memory remembers.
// Reasoning thinks.
// Judgement decides.


import { EmmaDB } from "./config/EmmaDatabase";
import EmmaIdentityMemory from "./EmmaIdentityMemory";



class EmmaMemory {


constructor(){


this.localMemories=[];


console.log(
"🧠 Emma Experience Memory online"
);


}





// =================================
// STORE EXPERIENCE
// =================================

async remember(experience){


console.log(
"💾 Emma storing experience:",
experience
);



const userId =
experience.userId || null;


const businessId =
experience.businessId || null;



const ownerId =
userId || businessId;



if(!ownerId){


console.warn(
"⚠️ Memory rejected: no owner"
);


return null;

}





// Convert experience into knowledge

const knowledge =
this.createKnowledge(
experience
);





// ===============================
// WHO WAS INVOLVED?
// ===============================

let personMemory=null;



const person =

experience.identity ||

experience.relationshipLearning?.person ||

null;




if(person){


personMemory =
EmmaIdentityMemory.remember(
person,
{

event:
experience.eventType,

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
// CREATE MEMORY OBJECT
// ===============================

const memory={



ownerId,


userId,


businessId,


type:
knowledge.type,





memory:{



// WHO

person:
personMemory,




// WHAT HAPPENED

situation:

experience.situation ||

experience.problem ||

"UNKNOWN_EVENT",




eventType:

experience.eventType ||

null,




// ORIGINAL CONTEXT

context:

experience.originalObservation ||

experience.context ||

null,




// ACTION

attemptedAction:

experience.attemptedAction ||

experience.action ||

"NO_ACTION",






// RESULT

outcome:{


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




// PERSONAL LEARNING

identity:

knowledge.identityLearning,



// RELATIONSHIP LEARNING

relationship:

experience.relationshipLearning ||

null,




confidenceImpact:

knowledge.confidenceImpact,



createdAt:

new Date()



}



};







// Active memory

this.localMemories.push(
memory
);



console.log(
"🧠 Active memory stored"
);







// Permanent memory

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

createKnowledge(experience){



let type =
"LEARNING_EXPERIENCE";


let success =
null;


let confidenceImpact =
0;


let futureRule =
"Use this experience for future decisions";




// SUCCESS

if(experience.success===true){


type =
"POSITIVE_EXPERIENCE";


success=true;


confidenceImpact=5;


futureRule =
"Repeat this pattern in similar situations";


}



// FAILURE

else if(experience.success===false){


type =
"FAILED_EXPERIENCE";


success=false;


confidenceImpact=-5;


futureRule =
"Avoid repeating without changing strategy";


}




// OBSERVATION

else if(
experience.eventType
){


type =
"OBSERVED_EXPERIENCE";


confidenceImpact=2;


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

extractIdentityLearning(experience){



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

async recall(context){



console.log(
"🔎 Emma searching memory..."
);




const userId =
context.userId || null;


const businessId =
context.businessId || null;




if(!userId && !businessId){

return this.emptyMemory();

}




let memories=[];





try{


memories =
await EmmaDB.getMemories({

userId,

businessId

});


}

catch(error){


console.warn(
"⚠️ Using local memories"
);


}





if(!memories || memories.length===0){


memories =
this.localMemories.filter(

m =>

m.userId===userId ||

m.businessId===businessId

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

extractRelationships(memories){


return memories

.map(
m=>m.memory?.person
)

.filter(Boolean)

.map(person=>({


name:
person.name,


email:
person.email,


lastSeen:
person.lastSeen,


interactions:

person.interactions?.length || 0


}));


}










// =================================
// PERSONAL IDENTITY SUMMARY
// =================================

extractIdentity(memories){



return {


goals:

memories.flatMap(
m=>m.memory?.identity?.goals || []
),



preferences:

memories.flatMap(
m=>m.memory?.identity?.preferences || []
),



workingStyle:

memories.flatMap(
m=>m.memory?.identity?.workingStyle || []
),



priorities:

memories.flatMap(
m=>m.memory?.identity?.priorities || []
)


};


}










// =================================
// SEARCH RELATED MEMORIES
// =================================

getRelevantMemories(
context,
memories=[]
){



const search =
JSON.stringify(context)
.toLowerCase();




return memories.filter(memory=>{


const text =
JSON.stringify(memory)
.toLowerCase();



return search
.split(" ")
.some(word =>

word.length>4 &&
text.includes(word)

);


})
.slice(0,10);


}










findByType(memories,type){


return memories.filter(
m=>m.type===type
);


}








extractRules(memories){


return memories

.map(
m=>m.memory?.futureRule
)

.filter(Boolean);


}









extractPatterns(memories){


return [

...new Set(

memories.flatMap(

m=>m.memory?.patterns || []

)

)

];


}









createTags(experience,type){



return [

type,

experience.eventType,

experience.situation

]

.filter(Boolean)

.map(
x=>String(x).toLowerCase()
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