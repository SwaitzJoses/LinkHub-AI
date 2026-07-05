// EmmaBrain.js
// Emma central intelligence system
//
// Observe
// Reflect
// Remember
// Reason
// Learn


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


savedCalls:0


};



}












// =================================
// EXPERIENCE LOOP
// =================================


async experience(event){



console.log(
"👀 Emma received event:",
event
);





// observe

const observation =

await this.observer.observe(
event
);






// understand

const reflection =

await this.reflection.reflect(
observation
);








// remember

if(

reflection.importance !== "low"

){



await this.memory.remember(
reflection
);




console.log(
"🧠 Emma stored experience"
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
"🤔 Emma deep thinking started"
);









// =================================
// LOAD EXPERIENCE MEMORY
// =================================


let memoryPackage={};



try{



memoryPackage =

await this.memory.recall(
context
);



}

catch(error){



console.warn(
"⚠️ Memory skipped",
error
);



}








const memories =

memoryPackage.relevantExperiences ||

[];









const enrichedContext={



current:

context,



memory:{



memoriesStudied:

memories.length,




experiences:

memories,




failures:

memoryPackage.failures || [],




successes:

memoryPackage.successes || [],




rules:

memoryPackage.rules || []



}



};










const decision =

this.shouldUseAI(
enrichedContext
);









// =================================
// LOCAL THINKING
// =================================


if(!decision.useAI){



this.stats.savedCalls++;




return {



success:true,


mode:"MEMORY_REASONING",




analysis:

"I reviewed company experience before deciding.",




cause:

decision.reason,




prediction:

"Future actions should follow learned patterns.",





recommendation:

"Use stored experience.",





reason:

decision.reason,




confidence:70,




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

You are Emma.

You are an AI employee.

You have company memory.

Your priority:

Experience > generic advice.


Before answering:

1. Read memory
2. Find repeated situations
3. Avoid past failures
4. Reuse success
5. Explain why


Return ONLY valid JSON.

No markdown.

No text outside JSON.


Format:

{
"analysis":"",
"cause":"",
"prediction":"",
"recommendation":"",
"memoryUsed":"",
"reason":"",
"confidence":0
}

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




mode:

"AI_REASONING",





...thought,






memoriesUsed:

memories,







memoryStats:{



studied:

memories.length,



failures:

memoryPackage.failures?.length || 0,



successes:

memoryPackage.successes?.length || 0



},








usage:

response.usage,







stats:

this.stats




};









}

catch(error){






console.error(
"❌ Emma Brain error",
error
);






return {




success:false,



mode:"FALLBACK",




analysis:

"Advanced reasoning unavailable.",




cause:

"AI unavailable.",





prediction:

"Use stored memory.",





recommendation:

"Continue with known experience.",





confidence:40,




stats:this.stats




};




}



}












// =================================
// SMART JSON PARSER
// =================================


parseAIResponse(raw){



try{


return JSON.parse(
raw
);



}



catch(error){





console.warn(
"⚠️ Cleaning AI JSON"
);






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




analysis:

raw,





cause:

"Unable to parse structured reasoning.",






prediction:

"Continue monitoring.",





recommendation:

"Review manually.",





memoryUsed:

null,





reason:

"Parsing fallback",





confidence:

50




};



}



}



}












// =================================
// SHOULD USE AI?
// =================================


shouldUseAI(context){






const text =

JSON.stringify(context)

.toLowerCase();






const important=[



"sales",


"customer",


"growth",


"loss",


"revenue",


"strategy",


"problem",


"failed"



];








const required =

important.some(

word =>

text.includes(word)

);






return {



useAI:

required,




reason:

required

?

"Important reasoning required"

:

"Routine event"




};



}










getStats(){


return this.stats;


}



}






export default new EmmaBrain();