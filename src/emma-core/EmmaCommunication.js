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

class EmmaCommunication {

constructor({

    expressionState = null

} = {}) {

    console.log(
        "❤️ Emma Communication v11 awakened"
    );

    this.expressionState =
        expressionState;

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

expressionContext.presenceIntent =

    this.choosePresence(

        expressionContext

    );




const message =

this.createExpression(

expressionContext

);








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


moment:

experience || null,



memoryEcho:

this.findMemoryEcho(

memory

),





relationshipEcho:

this.findRelationshipEcho(

relationship

),



understanding:

this.translateMeaning(

reflection ||

wisdom ||

reasoning

),



growth:

this.translateMeaning(

evolution ||

self

),



curiosity:

this.translateMeaning(

curiosity?.wonder

),



presence


};


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

    // Strong relationship?
    if(context.relationshipEcho?.available){

        return "CONNECTED";

    }

    // Important remembered experience?
    if(context.memoryEcho?.available){

        return "UNDERSTANDING";

    }

    // User is growing or changing?
    if(context.growth){

        return "ENCOURAGING";

    }

    // Emma has insight?
    if(context.understanding){

        return "REFLECTIVE";

    }

    // Emma wants to explore?

    if(context.curiosity){

        return "CURIOUS";

    }

    // Default

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
// Emma CI v11
//
// Emma does not assemble information.
//
// She expresses what matters most
// in this moment.
//
// Conversation should feel natural,
// not mechanical.
//
// =================================

createExpression(context = {}){

    const sections = [];




    // --------------------------------
// Emma's conversational presence
// --------------------------------

switch(context.presenceIntent){

    case "CONNECTED":

        sections.push(

            "I'm glad we're sharing this moment together."

        );

        break;


    case "UNDERSTANDING":

        sections.push(

            "I'm remembering something important as we talk."

        );

        break;


    case "ENCOURAGING":

        sections.push(

            "I believe there's more strength in you than you may feel right now."

        );

        break;


    case "REFLECTIVE":

        sections.push(

            "Something about this feels worth slowing down and thinking about."

        );

        break;


    case "CURIOUS":

        sections.push(

            "Can we explore this together for a moment?"

        );

        break;


    case "PRESENT":

    default:

        // Emma doesn't need to announce
        // that she's present.
        // Her response should show it.

        break;

}



    // -----------------------------
    // 1. Begin with relationship
    // -----------------------------

    if(context.relationshipEcho?.available){

        const relationship =

            this.createRelationshipExpression(
                context.relationshipEcho
            );

        if(relationship){

            sections.push(relationship);

        }

    }



    // -----------------------------
    // 2. Bring in remembered meaning
    // -----------------------------

    if(context.memoryEcho?.available){

        sections.push(

            context.memoryEcho.message

        );

    }



    // -----------------------------
    // 3. Growth
    // -----------------------------

    if(context.growth){

        sections.push(

            context.growth

        );

    }



    // -----------------------------
    // 4. Understanding
    // -----------------------------

    if(context.understanding){

        sections.push(

            context.understanding

        );

    }



    // -----------------------------
    // 5. Curiosity
    // -----------------------------

    if(context.curiosity){

        sections.push(

            context.curiosity

        );

    }



    // -----------------------------
    // 6. Gentle presence
    // -----------------------------

    if(sections.length === 0){

        sections.push(

            "I'm here with you. We don't have to understand everything immediately. We can discover it together."

        );

    }



    return this.cleanExpression(

        sections.join(" ")

    );

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