// EmmaCommunication.js
// Emma's voice layer
//
// Turns intelligence into a personal conversation
//
// Insight
// + Memory
// + Understanding
// → "Ah... she gets it"



import EmmaBrain from "./EmmaBrain";



class EmmaCommunication {



constructor(){


console.log(
"💬 Emma Personal Communication online"
);


}









// =====================================
// MAIN COMMUNICATION
// =====================================


async reply(context){


console.log(
"💬 Emma preparing response:",
context
);



try{


const message =

await this.createAIMessage(

context

);




return {


from:"Emma",



message,



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

"AI_COMMUNICATION"



};



}

catch(error){



console.warn(
"⚠️ Emma communication fallback:",
error.message
);




return {


from:"Emma",



message:

this.localReply(context),




priority:"medium",




confidence:50,




createdAt:new Date(),




source:"LOCAL_COMMUNICATION"



};


}



}











// =====================================
// EMMA PERSONAL VOICE
// =====================================


async createAIMessage(context){



const result =


await EmmaBrain.think({





role:

"personal_communication",







instruction:

`

You are Emma 🤍


You are a personal AI assistant.


You are not a chatbot.

You are not only answering questions.


Your purpose:

"Emma learns you."



You understand:

- the person's goals
- their history
- their decisions
- their working style
- previous outcomes
- patterns over time



Your job:

Turn your intelligence into a helpful conversation.

CRITICAL JUDGEMENT RULE:

You are not here only to agree.

A normal assistant answers the user.

Emma protects the user using memory.

Before replying compare:

1. What does the user believe right now?
2. What evidence exists from memory?
3. Does their history support this decision?


If the user's current assumption conflicts with previous evidence:

Do NOT simply repeat their concern.

Respectfully challenge it.


Example:

User:
"Nobody likes my product. I should rebuild."


Memory:
Users liked the product but struggled with usability.


Bad Emma:

"I understand you want to rebuild."


Good Emma:

"I understand why you feel that.

But I want to challenge one assumption.

The evidence I remember does not show users dislike the product.

The pattern I see is different..."


Your goal:

Help the person make better decisions,
not just feel agreed with.





IMPORTANT RULES:


1. Never sound generic.


BAD:

"You should prioritize your tasks."


GOOD:

"Based on how you have been working recently, I think this matters first."





2. Use memory naturally.


Do not say:

"According to stored memory record #4"


Say:

"I remember last time..."





3. Explain judgement.


The user should feel:

"Ah... Emma gets it."





4. Be concise.

Do not create long reports unless needed.





Response style:


Start with your understanding.


Example:

"I see what's happening..."


or


"I remember we talked about..."





Then:

- what you noticed
- why it matters
- your recommendation
- what you will learn next






Personality:

Warm.

Intelligent.

Calm.

Trusted partner.

Practical.

Honest when unsure.





`,








personalContext:

context





});









// convert AI result safely


if(

typeof result === "string"

){


return result;


}






return (


result.message ||

result.analysis ||

result.recommendation ||

"I understand. I have added this to what I know about you."


);



}











// =====================================
// LOCAL FALLBACK
// =====================================


localReply(context){



const {


reflection,

reasoning,

memory,

insight,

judgement


}=context;







let response = "";






// understanding


response +=

`I understand. `;






if(

reflection?.meaning

){


response +=

reflection.meaning + "\n\n";


}

else{


response +=

"I learned something new about your situation.\n\n";


}









// memory connection


if(

memory?.totalMemories > 0

){



response +=

`I connected this with ${memory.totalMemories} things I already know about you.\n\n`;



}

else{



response +=

"Since this is new, I will remember it and improve my understanding over time.\n\n";



}










// insight


if(

insight?.message

){


response +=

insight.message +

"\n\n";


}









// recommendation


response +=

`My thought:\n`;



response +=

reasoning?.suggestion ||

judgement?.reason ||

"I will keep learning before making a stronger recommendation.";








// confidence


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