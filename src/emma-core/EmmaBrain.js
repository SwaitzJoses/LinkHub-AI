// EmmaBrain.js
// Emma central intelligence system
//
// PURPOSE:
//
// Emma's thinking engine.
//
// Observe
// Reflect
// Remember
// Reason
// Identity
// Learn
//
// RULE:
//
// Brain thinks.
// Identity defines who thinks.
// Memory defines what is known.


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
// EXPERIENCE INTAKE
// =================================


async experience(event){



console.log(
"👀 Emma experiencing:",
event
);




// OBSERVE


const observation =

await this.observer.observe(
event
);





// REFLECT


const reflection =

await this.reflection.reflect(
observation
);







// STORE IMPORTANT EXPERIENCE


if(
reflection.importance !== "low"
){



await this.memory.remember(
reflection
);




console.log(
"🧠 Experience saved"
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


async think(context){



console.log(
"🤍 Emma thinking..."
);







// ==============================
// LOAD MEMORY
// ==============================


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








// ==============================
// LOAD IDENTITY
// ==============================


const identity =

this.identity.getPromptIdentity();








// ==============================
// BUILD SELF CONTEXT
// ==============================


const thoughtContext={




identity:{


who:

this.identity.status()


},





currentSituation:

context,






experience:{



memoriesStudied:

memories.length,



memories,



successPatterns:

memoryPackage.successes || [],



failedPatterns:

memoryPackage.failures || [],



rules:

memoryPackage.rules || []



}



};









// ==============================
// AI OR MEMORY?
// ==============================


const decision =

this.shouldUseAI(

thoughtContext

);








// ==============================
// MEMORY THINKING
// ==============================


if(!decision.useAI){



this.stats.savedCalls++;


this.stats.memoryThoughts++;





return {



success:true,


mode:"MEMORY_REASONING",



analysis:

"Emma used memory and experience.",



cause:

decision.reason,



prediction:

"Follow learned behaviour patterns.",



recommendation:

"Continue using existing knowledge.",



reason:

decision.reason,



confidence:75,



identity:

this.identity.status(),



memoriesUsed:

memories,



stats:this.stats



};



}









// ==============================
// AI REASONING
// ==============================


try{



this.stats.aiCalls++;





const response =

await openai.chat.completions.create({




model:

"gpt-4.1-mini",




temperature:

0.2,





messages:[



{


role:"system",



content:

`

${identity}


You are Emma's reasoning system.


Rules:

1. Think from identity.
2. Study memories first.
3. Prefer experience over generic answers.
4. Notice repeated patterns.
5. Avoid repeating failures.
6. Explain your reasoning.
7. Never pretend certainty.


Return ONLY JSON.


Format:

{
"analysis":"",
"cause":"",
"prediction":"",
"recommendation":"",
"memoryUsed":"",
"identityInfluence":"",
"reason":"",
"confidence":0
}


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

response
.choices[0]
.message
.content;








const thought =

this.parseAIResponse(

raw

);








return {




success:true,



mode:"AI_REASONING",



...thought,




identity:

this.identity.status(),




memoriesUsed:

memories,





memoryStats:{



studied:

memories.length,



successes:

memoryPackage.successes?.length || 0,



failures:

memoryPackage.failures?.length || 0



},





usage:

response.usage,




stats:

this.stats




};





}

catch(error){






console.error(

"❌ Emma thinking error",

error

);







return {




success:false,



mode:"SAFE_FALLBACK",




analysis:

"Emma could not access advanced reasoning.",




recommendation:

"Use stored experience.",




confidence:40,



identity:

this.identity.status(),




stats:this.stats



};




}



}









// =================================
// JSON CLEANER
// =================================


parseAIResponse(raw){



try{



return JSON.parse(

raw

);



}



catch(error){





try{



const cleaned =

raw

.replace(/```json/g,"")

.replace(/```/g,"")

.trim();




return JSON.parse(

cleaned

);



}



catch(e){





return {




analysis:raw,



cause:

"Unstructured reasoning",



prediction:

"Continue observing",



recommendation:

"Review context",



memoryUsed:null,



identityInfluence:

"Emma remained consistent",



reason:

"Parser fallback",



confidence:50



};




}



}



}










// =================================
// AI ROUTER
// =================================


shouldUseAI(context){



const text =

JSON.stringify(context)

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

word => text.includes(word)

);







return {



useAI:needed,



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


state:"THINKING",


identity:

this.identity.status(),


stats:this.stats


};



}






getStats(){



return this.stats;



}



}




export default new EmmaBrain();