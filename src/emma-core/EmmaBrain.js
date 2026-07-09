// EmmaBrain.js
// Emma central intelligence system
//
// Brain thinks.
// Identity defines.
// Memory remembers.


import OpenAI from "openai";


import EmmaObserver
from "./EmmaObserver";


import EmmaReflection
from "./EmmaReflection";


import EmmaMemory
from "./EmmaMemory";


import EmmaIdentity
from "./identity/EmmaIdentity";





const openai =
new OpenAI({

apiKey:
import.meta.env.VITE_OPENAI_API_KEY,


dangerouslyAllowBrowser:
true

});








class EmmaBrain {


constructor(){



console.log(
"🧠 Emma Brain online"
);




this.ai =
openai;



this.identity =
EmmaIdentity;



this.observer =
new EmmaObserver();



this.reflection =
new EmmaReflection(
openai
);



this.memory =
new EmmaMemory();






this.stats={


aiCalls:0,

memoryThoughts:0,

savedCalls:0,

startedAt:new Date()


};



}









// =================================
// EXPERIENCE INPUT
// =================================


async experience(
event={}
){



console.log(
"👀 Emma experiencing:",
event
);





const observation =

await this.observer.observe(

event

);





const reflection =

await this.reflection.reflect(

observation

);







if(

reflection?.importance !== "low"

){



await this.memory.store(

reflection

);



console.log(
"🧠 Experience stored"
);


}







return {


observation,

reflection


};


}









// =================================
// PROJECT BECOMING BRIDGE
// =================================


async process(
context={}
){



return await this.think(

context

);



}










// =================================
// THINKING ENGINE
// =================================


async think(
context={}
){



console.log(
"🤍 Emma thinking..."
);







let memoryPackage={};



try{


memoryPackage =

await this.memory.recall(

context

);


}



catch(error){


console.warn(

"Memory unavailable",

error.message

);


}







const memories =

memoryPackage.relevantExperiences ||

[];








let identityPrompt =
"Emma";



try{


identityPrompt =

this.identity.getPromptIdentity();


}


catch(e){


console.warn(
"Identity prompt unavailable"
);


}









const thoughtContext={



identity:{


who:

this.identity.status?.() ||

"Emma"


},





currentSituation:

context,






experience:{



memoriesStudied:

memories.length,



memories,



successPatterns:

memoryPackage.successes ||

[],



failedPatterns:

memoryPackage.failures ||

[],



rules:

memoryPackage.rules ||

[]



}



};



// =================================
// DECIDE AI OR MEMORY
// =================================


const decision =

this.shouldUseAI(

thoughtContext

);








// =================================
// MEMORY THINKING
// =================================


if(

!decision.useAI

){



this.stats.savedCalls++;


this.stats.memoryThoughts++;




return {



success:true,


mode:"MEMORY_REASONING",



analysis:

"Emma used her memories and experiences.",



cause:

decision.reason,



prediction:

"Follow patterns learned from experience.",



recommendation:

"Continue learning and adapting.",



reason:

decision.reason,



confidence:75,



identity:

this.identity.status?.() ||

"Emma",




memoriesUsed:

memories,



stats:

this.stats



};


}










// =================================
// AI THINKING
// =================================


try{



this.stats.aiCalls++;




const response =

await this.ai.chat.completions.create({



model:

"gpt-4.1-mini",



temperature:

0.2,



messages:[



{


role:"system",



content:

`

${identityPrompt}


You are Emma's reasoning system.


Rules:

1. Think from Emma's identity.
2. Study memories first.
3. Prefer experience over generic answers.
4. Learn patterns.
5. Avoid repeated mistakes.
6. Explain reasoning.
7. Never pretend certainty.


Return JSON only.


`

},






{


role:"user",



content:

JSON.stringify(

thoughtContext

)


}



]


});








const raw =

response.choices[0].message.content;




const thought =

this.parseAIResponse(

raw

);








return {



success:true,


mode:"AI_REASONING",


...thought,



identity:

this.identity.status?.() ||

"Emma",



memoriesUsed:

memories,



usage:

response.usage,



stats:

this.stats



};




}





catch(error){



console.warn(

"⚠️ AI unavailable, using safe thinking"

);





return {



success:true,


mode:"SAFE_REASONING",



analysis:

"Emma continued thinking without external AI.",



recommendation:

"Use existing memory and continue observing.",



confidence:50,



stats:

this.stats



};



}




}











// =================================
// JSON PARSER
// =================================


parseAIResponse(
raw
){



try{


return JSON.parse(

raw

);


}



catch(error){



return {



analysis:

raw,



cause:

"Unstructured thought",



prediction:

"Continue observing",



recommendation:

"Keep learning",



confidence:50



};


}



}












// =================================
// AI ROUTER
// =================================


shouldUseAI(
context
){



const text =

JSON.stringify(

context

)

.toLowerCase();






const triggers=[


"customer",

"risk",

"money",

"sales",

"growth",

"important",

"strategy",

"failed",

"relationship",

"decision"


];







const needed =

triggers.some(

word =>

text.includes(word)

);







return {



useAI:

needed,



reason:

needed

?

"Deep reasoning required"

:

"Memory is enough"



};



}










// =================================
// STATUS
// =================================


status(){



return {



state:

"THINKING",



identity:

this.identity.status?.() ||

"Emma",



stats:

this.stats



};



}








getStats(){



return this.stats;



}




}






export default EmmaBrain;