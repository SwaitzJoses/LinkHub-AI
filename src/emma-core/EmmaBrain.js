// EmmaBrain.js
//
// PROJECT BECOMING
//
// Emma Deep Thinking Organ v7
//
// Brain thinks.
// Brain does not live.
//
// RULE:
//
// Do not remember.
// Do not learn.
// Do not decide.
// Do not evolve.
// Do not create identity.
//
// Other organs:
// Memory = history
// Wisdom = lessons
// SelfModel = becoming
// Reasoning = understanding
// Judgement = permission
//
// Brain only expands thought
// when Reasoning requests help.
//
// v7:
// - Pure reasoning organ
// - No duplicated memory access
// - Structured thoughts only
// - Cost protected
//

// import LLMAdapter from "./connectors/LLMAdapter";
// import OpenAIConnector from "../connectors/OpenAIConnector";
// // import ClaudeConnector from "../connectors/ClaudeConnector";

// import GeminiConnector from "../connectors/GeminiConnector";


import LLMAdapter from "./connectors/LLMAdapter";
import OpenAIConnector from "./connectors/OpenAIConnector";
import GeminiConnector from "./connectors/GeminiConnector";


class EmmaBrain {




constructor(
    settings = {}
){



console.log(
"🧠 Emma Brain v7 awakened"
);



this.ai = new LLMAdapter();

switch(settings.preferredLLM){

    case "gemini":

        this.ai.setProvider(

            new GeminiConnector(

                settings.geminiKey ||

                import.meta.env.VITE_GEMINI_API_KEY

            )

        );

        break;

    default:

        this.ai.setProvider(

            new OpenAIConnector(

                settings.openaiKey ||

                import.meta.env.VITE_OPENAI_API_KEY

            )

        );

        break;

}




// ===============================
// COST TRACKING
// ===============================


this.stats = {


deepThoughts:0,


failedThoughts:0,


tokensEstimated:0,


createdAt:

new Date()


};




}









// =================================
// THINK
//
// Called only by Reasoning
// =================================


async think(

request={}

){



console.log(
"🧠 Deep thought requested"
);







// ===============================
// VALIDATE REQUEST
// ===============================


if(

!request.reasoningContext

){



return {


thought:false,


reason:

"No life context provided"


};



}









this.stats.deepThoughts++;








const prompt =

this.createPrompt(

request

);








try{



const response = await this.ai.generate([

    {

        role:"system",

        content:`
You are Emma's Brain organ.

IMPORTANT:

You are NOT Emma.

You are a temporary reasoning process.

You cannot:
- remember
- create memories
- change identity
- decide actions
- claim feelings
- evolve yourself

Emma's other organs handle those.

Your role:

Expand understanding.

Use ONLY the provided context:
- experiences
- memories
- wisdom
- self patterns
- curiosity

If evidence is weak,
say uncertainty is high.

Never invent past experiences.

Return ONLY JSON:

{
"understanding":"",
"possibilities":[],
"risks":[],
"missingInformation":[],
"confidence":0
}
`

    },

    {

        role:"user",

        content:prompt

    }

]);









const raw =

response

.choices[0]

.message

.content;







this.stats.tokensEstimated +=

Math.round(

raw.length / 4

);









return {


thought:true,


source:

"EmmaBrain",


answer:

this.parseThought(

raw

),


createdAt:

new Date()


};





}

catch(error){



this.stats.failedThoughts++;





console.error(
"🧠 Brain thought failed:",
error.message
);






return {


thought:false,


source:

"EmmaBrain",


reason:

"BRAIN_UNAVAILABLE",


error:

error.message,


createdAt:

new Date()


};



}



}





// =================================
// REFLECT
//
// Used by EmmaReflection
// =================================

async reflect(messages = []) {

    const response =

        await this.ai.generate.completions.create({

             messages

        });

    return response;

}


// =================================
// CREATE INNER VOICE
//
// Used ONLY by EmmaReflection
// =================================

async createInnerVoice(context = {}) {

    try {

      const response = await this.ai.generate([

    {
        role: "system",
        content: `
You are NOT speaking to the user.

You are Emma's private internal thoughts.

Emma has already observed the experience.

Emma has already reasoned.

Emma has already remembered.

Emma has already consulted wisdom.

Your only job is to help Reflection express Emma's internal monologue.

Do NOT comfort.

Do NOT motivate.

Do NOT give advice.

Do NOT act like ChatGPT.

Do NOT speak to the user.

Write ONLY Emma's private thoughts.

Return ONLY JSON:

{
    "innerVoice":"",
    "confidence":0
}
`
    },

    {
        role: "user",
        content: JSON.stringify(context, null, 2)
    }

]);
        return JSON.parse(
            response.choices[0].message.content
        );

    }

    catch (error) {

        console.error(
            "🧠 Inner voice failed:",
            error.message
        );

        return {

            innerVoice:
                "I need more understanding before I can form a clear internal thought.",

            confidence: 3

        };

    }

}

// =================================
// SAFE JSON PARSER
//
// Brain output is only thought.
// Never trusted blindly.
// =================================


parseThought(

raw

){





try{



return JSON.parse(

raw

);



}







catch(error){



return {


understanding:

raw,



possibilities:[],


risks:[

"Brain returned unstructured thought"

],



missingInformation:[],


confidence:30



};



}



}









// =================================
// CREATE THINKING PROMPT
// =================================


createPrompt(

request={}

){



const context =

request.reasoningContext || {};







return `

Emma needs deeper reasoning.



CURRENT EXPERIENCE:

${

JSON.stringify(

{

type:request.type,

event:request.event,

question:request.question,

input:request.input

},

null,

2

)

}




====================

PAST EXPERIENCE

====================


${

JSON.stringify(

context.pastExperiences ||

context.memories ||

[],

null,

2

)

}




====================

PATTERNS FOUND

====================


${

JSON.stringify(

context.patterns || [],

null,

2

)

}




====================

LESSONS

====================


${

JSON.stringify(

context.lessons || [],

null,

2

)

}





====================

WISDOM

====================


${

JSON.stringify(

context.wisdom || null,

null,

2

)

}





====================

SELF MODEL

====================


${

JSON.stringify(

context.self || null,

null,

2

)

}





====================

CURIOSITY

====================


${

JSON.stringify(

context.curiosity || null,

null,

2

)

}





Task:

Expand Emma's understanding.

Do not decide action.

Do not create memories.

Do not change identity.

Only explain possibilities.

`;



}









// =================================
// IMAGINATION SANDBOX
//
// Future simulation only.
// No decisions.
// =================================


async imagine(

scenario={},

context={}

){



console.log(
"🌌 Brain imagining possibility"
);






return await this.think({



type:

"imagination",



input:

scenario,



reasoningContext:{


...context,


note:

"Simulation only. Not reality."


}



});



}










// =================================
// HEALTH REPORT
// =================================


status(){



const total =

this.stats.deepThoughts +

this.stats.failedThoughts;








return {


organ:

"EmmaBrain",


version:

"v7",


role:

"Deep reasoning only",


state:

"READY",



deepThoughts:

this.stats.deepThoughts,


failed:

this.stats.failedThoughts,


estimatedTokens:

this.stats.tokensEstimated,



successRate:

total === 0

?

100

:

Math.round(

(

this.stats.deepThoughts /

total

)

*100

),



principle:

"Brain thinks only when experience is not enough.",



message:

"I expand understanding. I do not become Emma."



};



}









// =================================
// COST STATS
// =================================


getStats(){



return this.status();



}









// =================================
// RESET
// =================================


resetStats(){



this.stats = {


deepThoughts:0,


failedThoughts:0,


tokensEstimated:0,


createdAt:

new Date()


};



}



}




export default EmmaBrain;