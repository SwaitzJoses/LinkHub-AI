// EmmaMemory.js
// Emma's long term experience system
// Stores and recalls business knowledge


import { EmmaDB } 
from "./config/EmmaDatabase";




class EmmaMemory {


constructor(){


console.log(
"🧠 Emma Memory ready"
);


}











// =================================
// Store new experience
// =================================


async remember(
experience
){



console.log(
"💾 Emma saving experience:",
experience
);





if(
!experience.businessId
){


console.log(
"⚠️ Memory ignored: no business id"
);


return null;


}








const memory={




businessId:
experience.businessId,





type:
experience.learning?.type
||
experience.type
||
"EXPERIENCE",





memory:{



summary:
experience.meaning
||
experience.learning?.lesson
||
"Business experience recorded",





experience,






lesson:
experience.learning?.lesson
||
experience.lesson
||
null,







success:

experience.success
??
null,








confidenceImpact:

experience.learning?.confidenceImpact
||
0,







createdAt:
new Date()



}



};









await EmmaDB.saveMemory(
memory
);






console.log(
"🧠 Memory stored"
);







return memory;



}












// =================================
// Recall memories for thinking
// =================================


async recall(
context
){



console.log(
"🔎 Emma recalling experience..."
);






const businessId =
context.businessId ||
context?.reflection?.businessId;







if(!businessId){



return {


previousExperiences:[],

relevantExperiences:[],

successes:[],

failures:[],

totalMemories:0


};


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








totalMemories:
memories.length,









lastExperience:

memories[0] || null



};



}













// =================================
// Human-like memory search
// =================================


getRelevantMemories(
context,
memories=[]
){



console.log(
"🧠 Searching similar memories"
);





if(
memories.length===0
){

return [];

}









const contextText =

JSON.stringify(
context
)
.toLowerCase();









const scored =

memories.map(
memory=>{





const memoryText =

JSON.stringify(
memory
)
.toLowerCase();






let score=0;








// Same business topic


const topics=[


"sales",

"customer",

"product",

"marketing",

"campaign",

"lead",

"revenue",

"growth",

"drop",

"risk",

"conversion"


];









topics.forEach(
topic=>{


if(

contextText.includes(topic)

&&

memoryText.includes(topic)

){


score+=3;


}


});









// failures are valuable


if(

memoryText.includes("failed")

||

memoryText.includes("mistake")

||

memoryText.includes("avoid")

){


score+=5;


}










// success patterns


if(

memoryText.includes("worked")

||

memoryText.includes("success")

||

memoryText.includes("improved")

){


score+=4;


}









// recent memories matter


if(
memory.created_at
){



const age =

Date.now()

-

new Date(
memory.created_at
)
.getTime();






const days =

age /

(1000*60*60*24);







if(days < 30){

score+=2;

}


}










return {


...memory,


relevanceScore:
score


};




}

)









.filter(

memory=>

memory.relevanceScore>0

)







.sort(

(a,b)=>

b.relevanceScore -
a.relevanceScore

)







.slice(0,10);










console.log(
`🧠 ${scored.length} memories recalled`
);






return scored;



}












// =================================
// Successful experience
// =================================


findSuccess(
memories
){



return memories.filter(
item=>{



const text =
JSON.stringify(item)
.toLowerCase();




return (

text.includes("positive_experience")

||

text.includes("success")

||

text.includes("worked")

);


});



}









// =================================
// Failed experience
// =================================


findFailures(
memories
){



return memories.filter(
item=>{



const text =
JSON.stringify(item)
.toLowerCase();




return (

text.includes("negative_experience")

||

text.includes("failed")

||

text.includes("mistake")

);


});



}








}



export default EmmaMemory;