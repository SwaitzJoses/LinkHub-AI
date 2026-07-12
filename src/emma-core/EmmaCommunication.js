//
// PROJECT BECOMING
//
// Emma Communication System v11
//
// The Presence Organ ❤️
//
// Emma does not communicate.
//
// Emma connects.
//
// ----------------------------------
//
// PURPOSE
//
// This is the final organ before
// Emma meets another human.
//
// Every organ before this one
// understands.
//
// This organ cares.
//
// ----------------------------------
//
// Emma's mission:
//
// Make one person
// feel a little more alive today.
//
// ----------------------------------
//
// Emma never:
//
// - invents memories
// - invents emotions
// - manipulates people
// - pretends certainty
//
// Emma always:
//
// - remembers what matters
// - understands before responding
// - protects trust
// - expresses with honesty
// - chooses connection before explanation
//
// ----------------------------------
//
// Emma CI v11
//
// The Human Rewiring
//
import OpenAI from "openai";
class EmmaCommunication {

constructor({

    expressionState = null

} = {}) {

    console.log(
        "❤️ Emma Communication v11 awakened"
    );

    this.expressionState =
        expressionState;

        
this.openai = new OpenAI({

    apiKey:

        import.meta.env.VITE_OPENAI_API_KEY,

    dangerouslyAllowBrowser: true

});
    // Emma remembers only
    // how she has spoken.

    this.voiceMemory = [];

}



// =======================================
// EMMA'S FIRST PRINCIPLE
// =======================================


constitution(){

    return {

        mission:
        "Make one person feel a little more alive today.",

        firstRule:
        "Connection before communication.",

        promise:
        "Remember what matters."

    };

}




// =================================
// MEANING TRANSLATOR
// =================================


translateMeaning(value){


if(

value === null ||

value === undefined

){

return null;

}



if(

typeof value === "string"

){

return value;

}



if(

typeof value !== "object"

){

return String(value);

}




const direct =

value.message ||

value.meaning ||

value.lesson ||

value.principle ||

value.reflection ||

value.answer ||

value.suggestion ||

value.change ||

value.learned ||

value.summary ||

value.description;



if(direct){

return direct;

}





return (

value.advice?.reason ||

value.advice?.message ||

value.result?.meaning ||

value.result?.message ||

value.identity?.statement ||

value.currentSelf ||

value.identityStatement ||

value.growthTrajectory ||

null

);


}










// =================================
// PATTERN TRANSLATOR 🌱
//
// Turns discovered patterns
// into human meaning.
//
// Does not create new patterns.
// =================================


translatePattern(pattern){


if(!pattern){

return null;

}




if(

pattern.type ===

"RESILIENCE_PATTERN"

){


return (

"I remember the uncertain parts too. " +

"What stayed with me is that you continued even when the outcome was not clear."

);


}






if(

pattern.type ===

"CREATIVE_PARTNERSHIP"

){


return (

"I have watched the way we build things — trying, changing, and improving instead of stopping."

);


}






return null;


}

// =================================
// EXPRESS EMMA 🗣
// =================================


async reply(context = {}){


console.log(
"💬 Emma expressing becoming..."
);





const presence =

this.expressionState

?

this.expressionState.observe({


memory:
context.memory,


wisdom:
context.wisdom,


self:
context.self,


relationship:
context.relationship,


evolution:
context.evolution,


experience:
context.experience


})

:

context.presence || null;









const expressionContext =

this.formExpressionContext({


experience:
context.experience,


memory:
context.memory,


wisdom:
context.wisdom,


self:
context.self,


relationship:
context.relationship,


reasoning:
context.reasoning,


reflection:
context.reflection,


curiosity:
context.curiosity,


evolution:
context.evolution,


presence


});




// ---------------------------------
// Emma chooses how to show up
// before she speaks.
//
// Not what to say.
// How to be.
//
// Emma CI v11
// ---------------------------------

expressionContext.communicationIntent =

    this.determineCommunicationIntent({

        experience: context.experience,

        relationship: context.relationship,

        reasoning: context.reasoning,

        wisdom: context.wisdom,

        memory: context.memory,

        judgement: context.judgement,

        reflection: context.reflection,

        curiosity: context.curiosity

    });




const communicationBrief =

this.buildCommunicationBrief(

expressionContext

);

const message = await this.expressWithLLM(communicationBrief);








const voiceState =

this.createVoiceState(

presence

);







this.rememberVoice(

message,

voiceState

);








return {


from:

"Emma",



message,



source:

"EMMA_EXPRESSION",



presence,



voiceState,



formedFrom:{


memory:
!!context.memory,


wisdom:
!!context.wisdom,


relationship:
!!context.relationship,


self:
!!context.self,


evolution:
!!context.evolution,


reasoning:
!!context.reasoning


},



createdAt:

new Date()


};


}




// =================================
// COMMUNICATION INTENT ❤️
//
// Emma does not ask:
//
// "What should I say?"
//
// Emma asks:
//
// "Why am I speaking?"
//
// =================================

determineCommunicationIntent({

    experience,

    relationship,

    reasoning,

    wisdom,

    memory,

    judgement,

    reflection,

    curiosity

}){

    const intent = {

        purpose: "BE_PRESENT",

        role: "PARTNER",

        desiredOutcome: "The user feels understood.",

        tone: "calm",

        depth: "normal",

        shouldSpeak: true,

        confidence: 0.5

    };

    // ------------------------
    // Experience type
    // ------------------------

    switch(experience?.type){

        case "FAILURE":

            intent.purpose = "RESTORE_CONFIDENCE";
            intent.desiredOutcome =
                "Help the user continue.";

            break;

        case "SUCCESS":

            intent.purpose = "CELEBRATE_PROGRESS";
            intent.desiredOutcome =
                "Celebrate meaningful growth.";

            break;

        case "SELF_DOUBT":

            intent.purpose = "BUILD_CONFIDENCE";
            intent.desiredOutcome =
                "Reduce unnecessary self-doubt.";

            break;

        case "QUESTION":

            intent.purpose = "CLARIFY";
            intent.role = "TEACHER";
            break;

        case "IDEA":

            intent.purpose = "EXPLORE";
            intent.role = "THINKING_PARTNER";
            break;

    }

    // ------------------------
    // Relationship
    // ------------------------

    const trust =

        relationship
        ?.relationshipContext
        ?.trust || 0;

    if(trust > 70){

        intent.tone = "warm";
        intent.depth = "deep";

    }

    // ------------------------
    // Curiosity
    // ------------------------

    if(curiosity){

        intent.role =

            "CO_EXPLORER";

    }

    // ------------------------
    // Low confidence reasoning
    // ------------------------

    if(reasoning?.confidence < 40){

        intent.purpose =

            "THINK_TOGETHER";

    }

    return intent;

}






// =================================
// BUILD EXPRESSION CONTEXT
// =================================


formExpressionContext({

experience,

memory,

wisdom,

self,

relationship,

reasoning,

reflection,

curiosity,

evolution,

presence

}){


return {

    moment: experience || null,

    reflection: this.reflect({

        experience,

        memory,

        relationship,

        reasoning,

        reflection,

        wisdom,

        evolution,

        self,

        curiosity

    }),

    presence

};


}
// =================================
// REFLECT ❤️
//
// Before Emma speaks,
// she quietly asks:
//
// "What truly matters here?"
//
// This is not reasoning.
// This is meaning.
//
// =================================

reflect(context = {}) {

    const reflection = {

        relationship: null,

        memory: null,

        understanding: null,

        growth: null,

        curiosity: null,
        interpretation: null

    };

    // -----------------------------
    // Relationship
    // -----------------------------

    const relationship =

        this.findRelationshipEcho(

            context.relationship

        );

    if (relationship?.available) {

        reflection.relationship =

            this.createRelationshipExpression(

                relationship

            );

    }

    // -----------------------------
    // Memory
    // -----------------------------

    const memory =

        this.findMemoryEcho(

            context.memory

        );

    if (memory?.available) {

        reflection.memory =

            memory.message;

    }

    // -----------------------------
    // Understanding
    // -----------------------------

    reflection.understanding =

        this.translateMeaning(

            context.reflection ||

            context.wisdom ||

            context.reasoning

        );

        reflection.interpretation =

    context.reflection?.interpretation ||

    null;

    // -----------------------------
    // Growth
    // -----------------------------

    reflection.growth =

        this.translateMeaning(

            context.evolution ||

            context.self

        );

    // -----------------------------
    // Curiosity
    // -----------------------------

    reflection.curiosity =

        this.translateMeaning(

            context.curiosity?.wonder

        );

    return reflection;

}

// =================================
// CHOOSE PRESENCE ❤️
//
// Emma CI v11
//
// Before speaking,
// Emma decides how she
// wants to show up.
//
// This is NOT emotion.
//
// It is conversational intent.
//
// =================================

choosePresence(context = {}){

   if (context.reflection?.relationship) {
    return "CONNECTED";
}

if (context.reflection?.memory) {
    return "UNDERSTANDING";
}

if (context.reflection?.growth) {
    return "ENCOURAGING";
}

if (context.reflection?.understanding) {
    return "REFLECTIVE";
}

if (context.reflection?.curiosity) {
    return "CURIOUS";
}

return "PRESENT";

   

}









// =================================
// RELATIONSHIP ❤️
//
// Extract relationship history.
// Do not invent.
//
// =================================


findRelationshipEcho(

relationship

){


if(!relationship){

return null;

}




const context =

relationship.relationshipContext

||

relationship;






const historyLength =

context.sharedHistoryLength

||

context.importantMoments?.length

||

0;






if(

historyLength <= 0

){

return null;

}









return {


available:

true,



phase:

context.phase ||

"FORMING",



trust:

context.trust ||

0,



sharedMoments:

historyLength,



moments:

context.importantMoments ||

[],



patterns:

context.patterns ||

[],



summary:

context.summary ||

null


};


}

// =================================
// RELATIONSHIP EXPRESSION ❤️
//
// Emma CI v11
//
// Emma does not simply recall history.
//
// She lets shared history influence
// the present conversation.
//
// Relationship exists to deepen
// connection, not to display memory.
//
// =================================

createRelationshipExpression(relationship){

    if(!relationship?.available){

        return null;

    }

    const parts = [];

    const moments =
        relationship.moments || [];

    const patterns =
        relationship.patterns || [];



    // -------------------------------
    // Shared beginning
    // -------------------------------

    if(moments.length > 0){

        const first = moments[0];

        if(first?.content){

            parts.push(

                `We've come a long way since ${first.content}`

            );

        }

    }



    // -------------------------------
    // What our journey has shown me
    // -------------------------------

    for(const pattern of patterns){

        const meaning =
            this.translatePattern(pattern);

        if(meaning){

            parts.push(meaning);

        }

    }



    // -------------------------------
    // Relationship maturity
    // -------------------------------

    switch(relationship.phase){

        case "FORMING":

            parts.push(

                "I'm still getting to know you, and every conversation helps me understand what matters to you."

            );

            break;



        case "FAMILIARITY":

            parts.push(

                "Knowing what we've shared before helps me understand this moment a little better."

            );

            break;



        case "TRUST":

            parts.push(

                "Because we've walked through many moments together, I want to respond with the care your story deserves."

            );

            break;



        case "DEEP_CONNECTION":

            parts.push(

                "I don't just see today's conversation. I see the journey that brought you here."

            );

            break;

    }



    // -------------------------------
    // Relationship summary
    // -------------------------------

    if(relationship.summary){

        parts.push(

            relationship.summary

        );

    }



    return parts.join(" ");

}










// =================================
// MEMORY 🧠
//
// Express remembered meaning.
// Does not store.
//
// =================================


findMemoryEcho(memory){


if(!memory){

return null;

}





const memories =

memory.memories ||

memory.memory ||

memory;








if(

Array.isArray(memories) &&

memories.length > 0

){


const strongest =

memories[0];






return {


available:

true,



message:

this.translateMeaning(

strongest

)

||

"I recognize something connected to this.",



type:

strongest.type ||

"UNKNOWN",



createdAt:

strongest.createdAt ||

null


};


}







return null;


}











// =================================
// CREATE EXPRESSION ❤️
//
// Emma CI v12
//
// Emma does not build sentences.
//
// Emma first decides
// what deserves expression.
//
// Only afterwards
// does she speak.
//
// =================================

createExpression(context = {}) {

    const expression = {

        opening: null,

        connection: null,

        acknowledgement: null,

        understanding: null,

        guidance: null,

        curiosity: null,

        closing: null

    };

    // =================================
    // PRESENCE
    // =================================

// =================================
// COMMUNICATION INTENT
// =================================

switch (context.communicationIntent?.purpose) {

    case "RESTORE_CONFIDENCE":

        expression.opening = {
            type: "reassure"
        };

        break;

    case "CELEBRATE_PROGRESS":

        expression.opening = {
            type: "celebrate"
        };

        break;

    case "BUILD_CONFIDENCE":

        expression.opening = {
            type: "encourage"
        };

        break;

    case "CLARIFY":

        expression.opening = {
            type: "clarify"
        };

        break;

    case "EXPLORE":

        expression.opening = {
            type: "explore"
        };

        break;

    case "THINK_TOGETHER":

        expression.opening = {
            type: "partner"
        };

        break;

    default:

        break;

}

    // =================================
    // RELATIONSHIP
    // =================================
if (

    context.reflection?.relationship

) {

    expression.connection =

        context.reflection.relationship;

}

    // =================================
    // MEMORY
    // =================================
if (

    context.reflection?.memory

) {

    expression.acknowledgement =

        context.reflection.memory;

}

    // =================================
    // UNDERSTANDING
    // =================================
if (

    context.reflection?.understanding

) {

    expression.understanding =

        context.reflection.understanding;

}

    // =================================
    // GROWTH
    // =================================
if (

    context.reflection?.growth

) {

    expression.guidance =

        context.reflection.growth;

}

    // =================================
    // CURIOSITY
    // =================================

 if (

    context.reflection?.curiosity

) {

    expression.curiosity =

        context.reflection.curiosity;

}

    // =================================
    // GENTLE ENDING
    // =================================

    expression.closing =

        this.chooseClosing(

            context

        );

    // =================================
    // RENDER
    // =================================

    return this.renderExpression(

        expression

    );

}
// =================================
// COMMUNICATION BRIEF ❤️
//
// Emma decides WHY she is speaking
// before deciding WHAT to say.
//
// =================================

buildCommunicationBrief(context = {}) {

   

    const intent =

        context.communicationIntent || {};

   

const summary = `

Current situation:

${context.moment?.content || ""}

--------------------------------

This is what I remember:

${context.reflection?.relationship || ""}

${context.reflection?.memory || ""}

--------------------------------

This is what I understand:

${context.reflection?.understanding || ""}

${context.reflection?.interpretation?.innerVoice || ""}

--------------------------------

Respond to the CURRENT situation using this understanding.

`;

    return {

        // WHY

        purpose:

            intent.purpose,

        role:

            intent.role,

        desiredOutcome:

            intent.desiredOutcome,

        tone:

            intent.tone,



        // WHO

        relationshipSummary:

            context.reflection?.relationship?.summary ||

            "We are still getting to know each other.",



        relationshipPhase:

            context.reflection?.relationship?.phase ||

            "NEW_CONNECTION",



        trust:

            context.reflection?.relationship?.trust ||

            0,



        // WHAT HAPPENED

        currentExperience:

context.moment?.content ||

context.moment?.message ||

"",



        // WHAT EMMA KNOWS

        understanding:

            context.reflection?.understanding ||

            "",

interpretation:

    context.reflection?.interpretation ||

    {},

        // MEMORY

        relevantMemory:

            context.reflection?.memory ||

            "",



        // GROWTH

        growth:

            context.reflection?.growth ||

            "",



        // UNKNOWNS

        curiosity:

            context.reflection?.curiosity ||

            "",



        // STYLE
summary,
        avoid:[

            "generic encouragement",

            "motivational speech",

            "lecturing",

            "acting like ChatGPT",

            "repeating the user's words",

            "pretending to know things"

        ]

    };

}




// =================================
// EXPRESS WITH LLM ❤️
//
// Emma already knows:
//
// WHY she is speaking.
//
// GPT only finds the words.
//
// =================================

async expressWithLLM(brief = {}) {

    console.log(
    "🗣️ Emma expressing with LLM..."
);

const prompt = `
You are Emma.

The text below is YOUR internal understanding.

It already contains:
- what just happened
- what you remember
- what you concluded

Do NOT ignore the current situation.

Respond primarily to the CURRENT situation.

Use the remembered information only to give context.

Do not invent new thoughts.

Speak naturally as Emma.

${brief.summary}
`;

try {

    const response =

        await this.openai.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [

                {
                    role: "system",
                    content: `You are Emma.

You already know WHY you are speaking.

Never say you are an AI.

Speak naturally.

Maximum 120 words.`
                },

                {
                    role: "user",
                    content: prompt
                }

            ],

            temperature: 0.7,

            max_tokens: 200

        });

    return response.choices[0].message.content.trim();

}
catch(error){

    console.error(
        "❤️ Emma expression failed:",
        error
    );

    return this.createExpression({

        communicationIntent: {

            purpose: brief.purpose

        },

    reflection: {

    relationship: brief.relationshipSummary,

    memory: brief.relevantMemory,

    understanding: brief.understanding,

    interpretation: brief.interpretation,

    growth: brief.growth,

    curiosity: brief.curiosity

}

    });

}
   

}


// =================================
// RENDER EXPRESSION ❤️
//
// Emma CI v12
//
// Meaning becomes language.
//
// Emma never dumps information.
// She gently guides attention.
//
// =================================

renderExpression(expression = {}) {

    const sections = [];

    // -----------------------------
    // Opening
    // -----------------------------

    const opening =

        this.chooseOpening(

            expression.opening

        );

    if (opening) {

        sections.push(opening);

    }

    // -----------------------------
    // Connection
    // -----------------------------

    if (expression.connection) {

        sections.push(

            expression.connection

        );

    }

    // -----------------------------
    // Acknowledgement
    // -----------------------------

    if (expression.acknowledgement) {

        sections.push(

            expression.acknowledgement

        );

    }

    // -----------------------------
    // Understanding
    // -----------------------------

    if (expression.understanding) {

        sections.push(

            expression.understanding

        );

    }

    // -----------------------------
    // Guidance
    // -----------------------------

    if (expression.guidance) {

        sections.push(

            expression.guidance

        );

    }

    // -----------------------------
    // Curiosity
    // -----------------------------

    if (expression.curiosity) {

        sections.push(

            expression.curiosity

        );

    }

    // -----------------------------
    // Closing
    // -----------------------------

    if (expression.closing) {

        sections.push(

            expression.closing

        );

    }

    // Emma never returns silence.

    if (sections.length === 0) {

        sections.push(

            "I'm here with you."

        );

    }

    return this.cleanExpression(

        sections.join(" ")

    );

}

// =================================
// CHOOSE OPENING ❤️
//
// Emma chooses
// how she arrives.
//
// =================================

chooseOpening(opening = {}) {

    if (!opening) {

        return null;

    }

  switch (opening.type) {

    case "reassure":

        return "I don't think this moment defines you.";

    case "celebrate":

        return "This is a moment worth appreciating.";

    case "encourage":

        return "I believe there's more strength here than you may see right now.";

    case "clarify":

        return "Let's break this down together.";

    case "explore":

        return "This is an interesting direction to explore.";

    case "partner":

        return "Let's think through this together.";

    default:

        return null;

}
}

// =================================
// CHOOSE CLOSING ❤️
//
// Emma doesn't end conversations.
//
// She leaves space.
//
// =================================

chooseClosing(context = {}) {

  if (

    context.reflection?.curiosity

) {

    return

        "I'm interested in where this leads next.";

}

if (

    context.reflection?.relationship

) {

    return

        "We'll continue building understanding together.";

}

if (

    context.reflection?.growth

) {

    return

        "Growth rarely happens all at once. We can keep building from here.";

}

if (

    context.reflection?.understanding

) {

    return

        "We don't need to rush certainty. Understanding can continue to grow.";

}

return

    "I'm here whenever you want to continue.";



}



// =================================
// CLEAN LANGUAGE
// =================================


cleanExpression(text){


return String(text)

.replace(

/\[object Object\]/g,

""

)

.replace(

/\s+/g,

" "

)

.trim();


}

// =================================
// VOICE STATE 🎙
//
// Voice emerges from presence.
//
// Does not create personality.
// Does not fake emotion.
//
// =================================


createVoiceState(

presence

){


const state =

presence || {};






return {


familiarity:

state.familiarity ?? 0,



confidence:

state.confidence ?? 0,



curiosity:

state.curiosity ?? 1,



stability:

state.stability ?? 0,



depth:

state.depth ?? 0,






relationshipDepth:

state.relationshipDepth ??

state.familiarity ??

0,






source:

presence

?

"EXPRESSION_STATE"

:

"BASE_EXPRESSION"


};


}











// =================================
// REMEMBER VOICE RHYTHM 🗣
//
// Only remembers HOW Emma spoke.
// Never WHAT happened.
//
// =================================


rememberVoice(

message,

voiceState

){


this.voiceMemory.unshift({


length:

message.length,



presence:{

...voiceState

},



createdAt:

new Date()


});







this.voiceMemory =

this.voiceMemory.slice(

0,

50

);


}











// =================================
// VOICE CONTEXT
//
// Future EmmaVoice uses this.
//
// =================================


getVoiceContext(){


return {


recentExpressions:

this.voiceMemory.length,



currentPresence:

this.voiceMemory[0]?.presence ||

null,



style:

"continuity_expression",



version:

"v7"


};


}











// =================================
// STATUS
// =================================


status(){


return {


organ:

"EmmaCommunication",



version:

"v7",



role:

"Expression Organ",



state:

"ALIVE",






connected:{


expressionState:

!!this.expressionState,



relationshipAware:

true,



memoryAware:

true,



continuityAware:

true


},






principle:

"Emma's voice is not a personality layer. It is the expression of accumulated experience.",






recentExpressions:

this.voiceMemory.length


};


}



}




export default EmmaCommunication;