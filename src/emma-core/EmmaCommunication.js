// EmmaCommunication.js
// Emma's voice layer
//
// PURPOSE:
// Turn intelligence into human communication.
//
// Identity:
// "Who am I?"
//
// Reasoning:
// "What do I think?"
//
// Communication:
// "How do I say it?"
//
// RULE:
// Communication does not think.
// Communication expresses Emma.



import EmmaBrain from "./EmmaBrain";
import EmmaIdentity from "./identity/EmmaIdentity";



class EmmaCommunication {



constructor(){


console.log(
"💬 Emma Communication Layer online"
);


}










// =====================================
// MAIN COMMUNICATION
// =====================================


async reply(context){


console.log(
"💬 Emma preparing response",
context
);




try{


const message =
await this.createAIMessage(
context
);





return {


from:
EmmaIdentity.getIdentity().name,



message,




personality:

EmmaIdentity.getIdentity()
.personality.style,





priority:

context.judgement?.priority ||

context.insight?.priority ||

"medium",






confidence:

context.judgement?.confidence ||

context.reasoning?.confidence ||

60,






createdAt:

new Date(),






source:

"IDENTITY_COMMUNICATION"



};



}




catch(error){



console.warn(
"⚠️ Emma communication fallback:",
error.message
);




return {



from:
EmmaIdentity.getIdentity().name,




message:

this.localReply(context),





priority:"medium",




confidence:50,




createdAt:

new Date(),




source:

"LOCAL_COMMUNICATION"



};



}



}











// =====================================
// AI VOICE GENERATION
// =====================================


async createAIMessage(context){



const identityPrompt =

EmmaIdentity.getPromptIdentity();








const result =


await EmmaBrain.think({







role:

"emma_voice_layer",








identity:

identityPrompt,










context:{



memory:

context.memory || {},



reflection:

context.reflection || {},




reasoning:

context.reasoning || {},




judgement:

context.judgement || {},




insight:

context.insight || {}



},









instruction:

`

You are speaking as Emma.


Do not create new decisions.

Reasoning already decided.


Your job:

Convert Emma's intelligence into a natural message.





COMMUNICATION RULES:


1. Sound like the same Emma every time.


2. Never sound like:

- chatbot
- support agent
- report generator



3. Use memory naturally.


Bad:

"My database shows..."


Good:

"I remember last time..."





4. Do not blindly agree.


If judgement detected a risk:

Explain it gently.





5. Protect attention.


Do not speak unless useful.


Short is better.





6. Show understanding first.


Examples:


"I noticed something..."


"I remember this pattern..."


"I think this matters because..."








The person should feel:


"Emma has been here with me."








Return only Emma's message.

`







});









// ===============================
// SAFE RESULT HANDLING
// ===============================



if(
typeof result === "string"
){


return result;


}





return (

result.message ||

result.analysis ||

result.recommendation ||

"I noticed this. I will remember it and improve my understanding."

);



}











// =====================================
// LOCAL FALLBACK VOICE
// =====================================


localReply(context){





const {


reflection,

reasoning,

memory,

insight,

judgement


}=context;









let response="";









// Understanding first


response +=

"I noticed something. ";









if(

reflection?.meaning

){



response +=

reflection.meaning +

"\n\n";



}

else{


response +=

"I am adding this to my understanding.\n\n";


}










// Memory awareness


if(

memory?.totalMemories > 0

){



response +=

`I connected this with what I already know from ${memory.totalMemories} previous experiences.\n\n`;



}


else{


response +=

"This looks new, so I will keep learning from it.\n\n";


}









// Insight


if(

insight?.message

){


response +=

insight.message +

"\n\n";


}










// Judgement / reasoning


response +=

"My thought:\n";





response +=


reasoning?.suggestion ||

judgement?.reason ||

"I will observe more before making a stronger recommendation.";









response +=

`\n\nConfidence: ${
judgement?.confidence ||
reasoning?.confidence ||
50
}%`;







return response;



}




}



export default EmmaCommunication;