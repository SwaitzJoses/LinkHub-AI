// EmmaMemory.js
// Emma's long-term intelligence system
//
// Observation
// → Experience
// → Memory
// → Identity Understanding
// → Better Future Decisions


import { EmmaDB } from "./config/EmmaDatabase";



class EmmaMemory {


constructor(){

this.localMemories=[];

console.log(
"🧠 Emma Personal Experience Memory online"
);

}





// =================================
// STORE EXPERIENCE
// =================================


async remember(experience){


console.log(
"💾 Emma analyzing experience:",
experience
);




const userId =
experience.userId || null;


const businessId =
experience.businessId || null;



const ownerId =
userId ||
businessId;




if(!ownerId){


console.log(
"⚠️ Memory rejected: missing identity"
);


return null;


}





const knowledge =
this.createKnowledge(
experience
);





const memory={



ownerId,

userId,

businessId,



type:
knowledge.type,





memory:{



problem:

experience.problem ||

experience.situation ||

"UNKNOWN_CONTEXT",






context:

experience.context ||

null,






attemptedAction:

experience.attemptedAction ||

experience.action ||

"UNKNOWN_ACTION",







reasonForAction:

experience.reason ||

null,







outcome:{



result:

experience.result ||

(
experience.success

?

"success"

:

"unknown"
),




metrics:

experience.metrics ||

{},





impact:

experience.impact ||

null



},







lesson:

knowledge.lesson,







futureRule:

knowledge.futureRule,







patterns:

knowledge.patterns,








success:

knowledge.success,








confidenceImpact:

knowledge.confidenceImpact,








tags:

knowledge.tags,








identity:

knowledge.identityLearning,








createdAt:

new Date()



}



};







// active memory

this.localMemories.push(memory);




console.log(
"🧠 Stored active experience"
);






// permanent memory

try{


await EmmaDB.saveMemory(
memory
);



console.log(
"💾 Permanent memory saved"
);



}

catch(error){



console.warn(
"⚠️ Permanent memory failed",
error
);



}





return memory;



}










// =================================
// CREATE KNOWLEDGE
// =================================


createKnowledge(experience){



const success =
experience.success === true;




const action =

experience.action ||

experience.attemptedAction ||

"previous behaviour";





const lesson =

experience.lesson ||

(

success

?

`${action} worked. Remember this pattern.`

:

`${action} needs adjustment before repeating.`

);







return {



type:

success

?

"POSITIVE_EXPERIENCE"

:

"LEARNING_EXPERIENCE",






lesson,






patterns:

experience.patternsFound ||

[],






success,






confidenceImpact:

success ? 5 : 0,







futureRule:

success

?

`Consider repeating ${action}`

:

`Review before repeating ${action}`,







tags:

this.createTags(
experience
),








identityLearning:

this.extractIdentityLearning(
experience
)



};



}











// =================================
// IDENTITY EXTRACTION
// =================================


extractIdentityLearning(experience){



const text =

JSON.stringify(experience)

.toLowerCase();





const identity={


goals:[],

preferences:[],

workingStyle:[],

decisionPatterns:[],

priorities:[],

observations:[]


};








if(

text.includes("goal") ||

text.includes("want")

){



identity.goals.push(

experience.situation ||

experience.problem

);



}









if(

text.includes("like") ||

text.includes("love") ||

text.includes("prefer")

){



identity.preferences.push(

experience.context ||

experience.situation

);



}










if(

text.includes("build") ||

text.includes("fast")

){



identity.workingStyle.push(

"Fast builder"

);



}









if(

text.includes("decide") ||

text.includes("thinking")

){



identity.decisionPatterns.push(

experience.situation

);



}









identity.observations.push(

"Emma learned more about this person"

);





return identity;



}











// =================================
// RECALL MEMORY
// =================================


async recall(context){



console.log(
"🔎 Emma recalling memories..."
);






const userId =

context.userId ||

context?.reflection?.userId ||

null;






const businessId =

context.businessId ||

context?.reflection?.businessId ||

null;







if(

!userId &&

!businessId

){



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
"⚠️ Database recall failed"
);



}









// fallback RAM


if(

!memories ||

memories.length===0

){



memories =

this.localMemories.filter(

m =>

m.userId===userId ||

m.businessId===businessId

);



}









const relevant =

this.getRelevantMemories(

context,

memories

);









return {




previousExperiences:

memories,






relevantExperiences:

relevant,






identity:

this.extractIdentity(
memories
),






successes:

this.findSuccess(
memories
),






failures:

this.findFailures(
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







totalMemories:

memories.length,







lastExperience:

memories[0] ||

null




};



}











// =================================
// BUILD IDENTITY
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






decisionPatterns:

memories.flatMap(
m=>m.memory?.identity?.decisionPatterns || []
)



};



}












// =================================
// RELEVANCE SEARCH
// =================================


getRelevantMemories(context,memories=[]){



const contextText =

JSON.stringify(context)

.toLowerCase();





return memories


.map(memory=>{



let score=0;



const memoryText =

JSON.stringify(memory)

.toLowerCase();





contextText

.split(" ")

.forEach(word=>{



if(

word.length>4 &&

memoryText.includes(word)

){

score+=5;

}



});






if(memory.memory?.futureRule){

score+=10;

}



if(memory.memory?.identity){

score+=10;

}





return {


...memory,


relevanceScore:score


};



})



.filter(m=>m.relevanceScore>0)



.sort(

(a,b)=>

b.relevanceScore-

a.relevanceScore

)



.slice(0,10);



}










extractRules(memories){


return memories

.map(m=>m.memory?.futureRule)

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





findSuccess(memories){


return memories.filter(

m=>m.memory?.success===true

);


}





findFailures(memories){


return memories.filter(

m=>m.memory?.success===false

);


}








createTags(experience){



return [


experience.problem,


experience.situation,


experience.action,


experience.success

?

"success"

:

"learning"


]


.filter(Boolean)

.map(x=>x.toLowerCase());



}








emptyMemory(){



return {


previousExperiences:[],

relevantExperiences:[],

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