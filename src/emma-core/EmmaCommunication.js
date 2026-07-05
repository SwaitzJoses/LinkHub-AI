// EmmaCommunication.js
// Emma's communication layer
// Turns Emma's intelligence into an employee briefing


import EmmaBrain from "./EmmaBrain";



class EmmaCommunication {



constructor(){


console.log(
"💬 Emma AI Communication ready"
);


}









// =====================================
// MAIN COMMUNICATION
// =====================================


async reply(context){



console.log(
"💬 Emma preparing AI response:",
context
);




try{


const message =
await this.createAIMessage(
context
);




return {


from:
"Emma",



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



console.log(
"⚠️ Emma AI communication failed:",
error.message
);




return {



from:
"Emma",




message:

this.localReply(
context
),




priority:
"medium",




confidence:
50,




createdAt:
new Date(),




source:
"LOCAL_COMMUNICATION"



};



}



}











// =====================================
// AI EMPLOYEE VOICE
// =====================================


async createAIMessage(
context
){





const result =

await EmmaBrain.think({





role:

"communication",







instruction:

`

You are Emma.

You are a full-time AI employee working inside this business.

You are NOT a chatbot.

You are NOT a generic assistant.

The owner expects you to think, explain, and report like a real employee.


Your job:

Convert your internal analysis into a useful business briefing.



IMPORTANT:

Do not give one-line answers.

Do not give generic advice.

Explain your reasoning.

Use company experience before general knowledge.



Your response format:


👀 What I noticed

Explain:
- what happened
- what changed
- why this caught your attention



🧠 My analysis

Explain:
- possible causes
- patterns
- risks
- opportunities
- your reasoning process



📚 What I remember

Use memory.

Explain:
- similar situations seen before
- what worked
- what failed
- lessons learned

If there is no memory yet, say:
"I don't have enough past experience with this business yet, so I am creating a new learning pattern."



🔮 What I think may happen next

Predict:
- likely outcome
- risk if ignored
- opportunity if handled well



🎯 My recommendation

Explain:
- what action should be taken
- why this action
- what should NOT be done



⚖️ Confidence & next learning

Explain:
- confidence level
- missing information
- what you will continue observing




Personality:

Speak like a smart employee talking to the business owner.

Be practical.

Be honest about uncertainty.

Protect the business.

Learn from every outcome.



`,







businessContext:

context






});








// Prefer full AI reasoning output

return (


result.analysis && result.recommendation


?

`

${result.analysis}


Recommendation:

${result.recommendation}


Reason:

${result.reason || ""}


`

:


result.analysis ||


result.recommendation ||


"I reviewed the business situation and updated my learning."


);



}













// =====================================
// FALLBACK ONLY IF AI FAILS
// =====================================


localReply(
context
){



const {

reflection,

reasoning,

memories,

judgement

} = context;






return `


👀 What I noticed

${

reflection?.meaning ||

"I observed a new business event."

}



🧠 My analysis

${

reasoning?.analysis ||

"I am still studying this situation."

}



📚 What I remember

${

memories?.length

?

"I found previous experiences that may help this decision."

:

"I don't have enough history yet, so I am saving this as a new learning experience."

}



🔮 Prediction

${

reasoning?.prediction ||

"I need more information before making a strong prediction."

}



🎯 Recommendation

${

reasoning?.suggestion ||

"Continue observing until stronger evidence appears."

}



⚖️ Confidence

${

judgement?.confidence ||

50

}%


`;



}





}




export default EmmaCommunication;