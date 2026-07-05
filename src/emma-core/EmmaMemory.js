// EmmaMemory.js
// Emma's long-term intelligence system
//
// Observation
// → Experience
// → Memory
// → Reasoning
// → Better Future Decisions


import { EmmaDB } from "./config/EmmaDatabase";



class EmmaMemory {


constructor(){


this.localMemories = [];


console.log(
"🧠 Emma Experience Memory online"
);


}








// =================================
// Store permanent experience
// =================================


async remember(experience){


console.log(
"💾 Emma analyzing experience:",
experience
);




if(!experience.businessId){


console.log(
"⚠️ Memory rejected: missing business id"
);


return null;


}






const knowledge =
this.createKnowledge(
experience
);





const memory={


businessId:
experience.businessId,



type:
knowledge.type,



memory:{



problem:

experience.problem ||

experience.situation ||

"UNKNOWN_PROBLEM",





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

"failed"
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








createdAt:

new Date()



}



};











// ACTIVE MEMORY

this.localMemories.push(
memory
);



console.log(
"🧠 Stored in active memory"
);









// DATABASE MEMORY

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
"⚠️ Database unavailable, using active memory",
error
);



}







return memory;



}














// =================================
// Convert experience into knowledge
// =================================


createKnowledge(experience){



const success =

experience.success === true;





// IMPORTANT FIX

const action =

experience.attemptedAction ||

experience.action ||

"previous strategy";







let lesson =

experience.lesson;







if(!lesson){



lesson =

success

?

`${action} worked. Repeat or improve this strategy in similar situations`

:

`${action} failed. Avoid repeating without changing strategy`;



}









return {




type:

success

?

"POSITIVE_EXPERIENCE"

:

"NEGATIVE_EXPERIENCE",







lesson,








patterns:

experience.patternsFound ||

[],









success,









confidenceImpact:

success ? 5 : -5,










futureRule:


success


?


`Repeat successful strategy: ${action}`


:


`Avoid repeating failed strategy: ${action}`,









tags:

this.createTags(
experience
)




};




}














// =================================
// Recall memories
// =================================


async recall(context){



console.log(
"🔎 Emma recalling experience..."
);





const businessId =

context.businessId ||

context?.reflection?.businessId;






if(!businessId){


return this.emptyMemory();


}







let memories=[];






try{


memories =

await EmmaDB.getMemories(
businessId
);



}

catch(error){



console.warn(
"⚠️ DB recall failed"
);



}








// fallback

if(

!memories ||

memories.length===0

){



memories =

this.localMemories.filter(

m =>

m.businessId === businessId

);




console.log(
"🧠 Loaded active memories:",
memories.length
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
// Intelligent retrieval
// =================================


getRelevantMemories(context, memories=[]){



console.log(
"🧠 Searching useful past experiences"
);





if(memories.length===0){

return [];

}





const contextText =

JSON.stringify(context)
.toLowerCase();







return memories


.map(memory=>{



const memoryText =

JSON.stringify(memory)
.toLowerCase();





let score=0;








[
"sales",
"customer",
"lead",
"marketing",
"campaign",
"discount",
"offer",
"product",
"growth",
"revenue"
]

.forEach(word=>{



if(

contextText.includes(word)

&&

memoryText.includes(word)

){


score +=10;


}



});









if(

memoryText.includes("failed") ||

memoryText.includes("avoid")

){


score +=10;


}








if(

memoryText.includes("success") ||

memoryText.includes("worked")

){


score +=8;


}









if(memory.memory?.futureRule){


score +=10;


}








return {


...memory,


relevanceScore:

score



};



})





.filter(

m =>

m.relevanceScore > 0

)






.sort(

(a,b)=>

b.relevanceScore -

a.relevanceScore

)






.slice(
0,
10
);



}













extractRules(memories){


return memories

.map(

m => m.memory?.futureRule

)

.filter(Boolean);


}









extractPatterns(memories){



let patterns=[];




memories.forEach(memory=>{



if(memory.memory?.patterns){



patterns.push(

...memory.memory.patterns

);



}



});






return [

...new Set(patterns)

];


}










findSuccess(memories){


return memories.filter(

m =>

m.memory?.success === true

);


}









findFailures(memories){



return memories.filter(

m =>

m.memory?.success === false

);



}









// =================================
// Create searchable tags
// =================================


createTags(experience){



const action =

experience.attemptedAction ||

experience.action ||

null;






return [


experience.problem,


experience.situation,


action,


experience.success

?

"success"

:

"failure"



]


.filter(Boolean)


.map(

x =>

x.toLowerCase()

);



}










emptyMemory(){



return {



previousExperiences:[],


relevantExperiences:[],


successes:[],


failures:[],


rules:[],


patterns:[],


totalMemories:0



};



}




}



export default EmmaMemory;