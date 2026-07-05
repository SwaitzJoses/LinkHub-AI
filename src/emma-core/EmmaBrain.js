// EmmaBrain.js
// Emma's central intelligence system
// Observe → Reflect → Remember → Reason → Learn


import OpenAI from "openai";


import EmmaObserver
from "./EmmaObserver";


import EmmaReflection
from "./EmmaReflection";


import EmmaMemory
from "./EmmaMemory";






const openai =
new OpenAI({


apiKey:
import.meta.env.VITE_OPENAI_API_KEY,


// development only
// production should use backend

dangerouslyAllowBrowser:true


});









class EmmaBrain {



constructor(){


console.log(
"🧠 Emma Brain online"
);



this.observer =
new EmmaObserver();



this.reflection =
new EmmaReflection();



this.memory =
new EmmaMemory();




this.stats={

aiCalls:0,

savedCalls:0

};



}









// =================================
// EXPERIENCE LOOP
// =================================


async experience(
event
){



console.log(
"👀 Emma received event",
event
);




// 1. Observe


const observation =

await this.observer.observe(
event
);





// 2. Reflect


const reflection =

await this.reflection.reflect(
observation
);






// 3. Remember important lessons


if(
reflection.importance
!== "low"
){



await this.memory.remember(
reflection
);



console.log(
"💾 Emma learned something new"
);


}







return {

observation,

reflection

};



}












// =================================
// THINKING ENGINE
// =================================


async think(
context
){



console.log(
"🤔 Emma preparing decision"
);





// Load relevant experience first


const memories =

await this.memory.getRelevantMemories(
context
);






const enrichedContext={


...context,


companyExperience:
memories


};








const decision =

this.shouldUseAI(
enrichedContext
);








// Memory/local decision


if(
!decision.useAI
){



this.stats.savedCalls++;




return {


success:true,


mode:
"MEMORY_REASONING",



reason:
decision.reason,



experienceUsed:
memories



};



}










try{



this.stats.aiCalls++;





const response =

await openai.chat.completions.create({




model:
"gpt-4.1-mini",




messages:[


{


role:"system",


content:

`

You are Emma.

You are not a chatbot.

You are an AI employee working
inside this company.


Before answering:


1. Study company memories.

2. Use past experience first.

3. Never repeat failed actions.

4. Find patterns.

5. Protect profit.

6. Recommend practical actions.

7. Explain which memory affected
your decision.


Company experience is more important
than generic AI knowledge.


`


},








{


role:"user",


content:

JSON.stringify(
enrichedContext
)


}



]



});









return {


success:true,


mode:
"AI_REASONING",



response:

response
.choices[0]
.message
.content,



memoriesUsed:
memories,



usage:
response.usage,



stats:
this.stats



};




}







catch(error){



console.error(
"Emma Brain error",
error
);




return {


success:false,


mode:
"FALLBACK",


reason:
"AI unavailable",


stats:
this.stats


};



}




}











// =================================
// COST + JUDGEMENT
// =================================


shouldUseAI(
context
){



const reflection =

context.reflection ||

context.situation ||

{};




const memories =

context.companyExperience || [];








// Small events don't need AI


if(
reflection.importance==="low"
){


return {


useAI:false,


reason:
"Low importance. No AI needed."


};


}










// Experienced Emma trusts herself


if(
memories.length >= 5
){



return {


useAI:false,


reason:
"Enough company experience available."


};


}










const text =

JSON.stringify(
context
)
.toLowerCase();






const important=[


"sales",

"revenue",

"loss",

"customer",

"growth",

"drop",

"strategy",

"competitor",

"failure",

"risk"


];






const required =

important.some(

word=>

text.includes(word)

);






if(required){


return {


useAI:true,


reason:
"Important decision requires deep thinking"


};


}










return {


useAI:false,


reason:
"Routine business activity"


};



}









getStats(){


return this.stats;


}




}








export default new EmmaBrain();