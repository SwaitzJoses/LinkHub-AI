// EmmaMemory.js
// Emma's long-term intelligence system
// Stores experience, lessons and business wisdom
// Experience → Knowledge → Future Decisions


import { EmmaDB }
from "./config/EmmaDatabase";



class EmmaMemory {


constructor(){


console.log(
"🧠 Emma Memory ready"
);


}









// =================================
// Store permanent experience
// =================================


async remember(
experience
){


console.log(
"💾 Emma storing experience:",
experience
);




if(
!experience.businessId
){


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


summary:
knowledge.summary,


experience,


lesson:
knowledge.lesson,


patterns:
knowledge.patterns,


success:
knowledge.success,


confidenceImpact:
knowledge.confidenceImpact,


futureRule:
knowledge.futureRule,


tags:
knowledge.tags,


createdAt:
new Date()


}


};








await EmmaDB.saveMemory(
memory
);





console.log(
"🧠 Long-term memory saved"
);





return memory;


}











// =================================
// Convert experience into knowledge
// =================================


createKnowledge(
experience
){



const learning =
experience.learning || {};




return {


type:
learning.type ||
experience.type ||
"BUSINESS_EXPERIENCE",



summary:

learning.lesson ||

experience.meaning ||

"Emma learned something new",




lesson:

learning.lesson ||

experience.lesson ||

null,




patterns:

experience.patternsFound ||

learning.rememberFor ||

[],




success:

experience.success ?? null,




confidenceImpact:

learning.confidenceImpact || 0,




futureRule:

learning.futureRule ||
experience.futureBehavior ||
null,




tags:
this.createTags(
experience
)


};



}










// =================================
// Recall memory for reasoning
// =================================


async recall(
context
){


console.log(
"🔎 Emma searching memory..."
);




const businessId =

context.businessId ||

context?.reflection?.businessId;




if(
!businessId
){


return this.emptyMemory();


}








const memories =

await EmmaDB.getMemories(
businessId
);







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
memories[0] || null


};


}










// =================================
// Intelligent memory retrieval
// =================================


getRelevantMemories(
context,
memories=[]
){


console.log(
"🧠 Finding useful memories"
);



if(
memories.length===0
){

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





// business similarity


const keywords=[

"customer",
"sales",
"lead",
"product",
"marketing",
"campaign",
"offer",
"growth",
"revenue",
"conversion",
"engagement",
"complaint",
"risk"

];





keywords.forEach(word=>{


if(

contextText.includes(word)

&&

memoryText.includes(word)

){

score +=5;

}


});







// failures are important

if(

memoryText.includes("failed") ||

memoryText.includes("mistake") ||

memoryText.includes("avoid")

){

score +=8;

}








// successful patterns

if(

memoryText.includes("success") ||

memoryText.includes("worked") ||

memoryText.includes("improved")

){

score +=6;

}








// learned rules matter

if(

memoryText.includes("futureRule")

){

score +=5;

}









// recent experience bonus

const date =
memory.created_at ||
memory.memory?.createdAt;




if(date){


const days =

(
Date.now() -
new Date(date).getTime()
)

/

(1000*60*60*24);



if(days < 30){

score +=3;

}


}








return {

...memory,

relevanceScore:
score

};


})





.filter(
memory=>

memory.relevanceScore > 0

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










// =================================
// Extract learned rules
// =================================


extractRules(
memories
){


return memories


.map(
item =>

item.memory?.futureRule

)


.filter(Boolean);


}










// =================================
// Extract patterns
// =================================


extractPatterns(
memories
){


let patterns=[];



memories.forEach(memory=>{


if(
memory.memory?.patterns
){


patterns.push(
...memory.memory.patterns
);


}


});




return [

...new Set(patterns)

];


}









// =================================
// Find successful memories
// =================================


findSuccess(
memories
){


return memories.filter(item=>{


const text =
JSON.stringify(item)
.toLowerCase();



return (

text.includes("positive_experience") ||

text.includes("success") ||

text.includes("worked") ||

text.includes("improved")

);


});


}










// =================================
// Find failed memories
// =================================


findFailures(
memories
){


return memories.filter(item=>{


const text =
JSON.stringify(item)
.toLowerCase();



return (

text.includes("negative_experience") ||

text.includes("failed") ||

text.includes("mistake") ||

text.includes("avoid")

);


});


}










// =================================
// Create searchable tags
// =================================


createTags(
experience
){


return [

experience.action,

experience.impact,

experience.success
? "success"
: "failure"

]
.filter(Boolean);


}









// =================================
// Empty memory response
// =================================


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