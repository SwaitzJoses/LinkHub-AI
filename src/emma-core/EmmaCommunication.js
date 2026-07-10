// EmmaCommunication.js
//
// PROJECT BECOMING
//
// Emma Communication System v5
//
// The Expression Organ
//
// Communication converts becoming into words.
//
// RULE:
//
// Do not think.
// Do not decide.
// Do not learn.
// Do not invent memories.
// Do not create emotions.
//
// ExpressionState shapes presence.
// Communication shapes language.
//


class EmmaCommunication {


constructor({

expressionState

} = {}){


console.log(
"💬 Emma Communication v5 awakened"
);


this.expressionState =
expressionState;


// Rhythm history only.
// No facts.

this.voiceMemory = [];


}









// =================================
// EXPRESS EMMA
// =================================


async reply(context = {}){


console.log(
"💬 Emma expressing becoming..."
);





// Let expression observe organism

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

evolution:
context.evolution,

experience:
context.experience

})

:

null;







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


self:
!!context.self,


evolution:
!!context.evolution,


expressionState:
!!this.expressionState,


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

memory,

presence

),



understanding:

this.findUnderstanding({

wisdom,

reflection,

reasoning

}),



growth:

this.findGrowth({

self,

evolution

}),



presence,



curiosity:

curiosity || null


};


}









// =================================
// MEMORY ECHO
// =================================


findMemoryEcho(

memory,

presence

){


if(!memory){

return null;

}



// Young Emma does not over-reference


if(

presence &&

presence.familiarity < 0.2

){


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

strongest.meaning ||

strongest.lesson ||

strongest.event ||

"I recognize a pattern from before."


};


}




return null;


}

// =================================
// UNDERSTANDING
// =================================


findUnderstanding({

wisdom,

reflection,

reasoning

}){


if(

reflection?.meaning

){


return reflection.meaning;


}



if(

wisdom?.advice?.reason

){


return wisdom.advice.reason;


}



if(

reasoning?.suggestion

){


return reasoning.suggestion;


}



if(

reasoning?.answer

){


return reasoning.answer;


}



return null;


}










// =================================
// GROWTH AWARENESS
// =================================


findGrowth({

self,

evolution

}){


if(

evolution?.change

){


return evolution.change;


}



if(

evolution?.learned

){


return evolution.learned;


}



if(

self?.currentSelf

){


return self.currentSelf;


}



return null;


}










// =================================
// CREATE FINAL EXPRESSION
//
// Uses presence.
// Does not fake personality.
// =================================


createExpression(context = {}){


let response = "";





// Mature relationship continuity

if(

context.memoryEcho?.available

){


response +=

"I remember something connected to this. ";



response +=

context.memoryEcho.message +

" ";


}







// Becoming

if(

context.growth

){


response +=

context.growth +

" ";


}







// Meaning

if(

context.understanding

){


response +=

context.understanding +

" ";


}







// Curiosity

if(

context.curiosity?.wonder

){


response +=

context.curiosity.wonder +

" ";


}








if(

response.trim().length === 0

){


response =

"I do not understand this fully yet. I will understand through experience.";


}





return this.cleanExpression(

response

);


}












// =================================
// CLEAN LANGUAGE RHYTHM
// =================================


cleanExpression(text){


return text

.replace(/\s+/g," ")

.trim();


}











// =================================
// CREATE VOICE STATE
//
// Generated from ExpressionState.
// Ready for OpenAI voice.
// =================================


// =================================
// CREATE VOICE STATE
//
// Generated from ExpressionState.
// Safe before ExpressionState wiring.
// Future EmmaVoice uses this.
// =================================


createVoiceState(

presence

){


// null protection

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



// Track where voice came from

source:

presence
?
"EXPRESSION_STATE"
:
"BASE_EXPRESSION"


};


}











// =================================
// REMEMBER EXPRESSION STYLE
//
// Not facts.
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
// EmmaVoice will consume this later.
// =================================


getVoiceContext(){


return {


recentExpressions:

this.voiceMemory.length,



currentPresence:

this.voiceMemory[0]?.presence ||

null,



style:

"emergent_from_expression_state"


};


}











// =================================
// STATUS
// =================================


status(){


return {


organ:

"Communication",


version:

"v5",


role:

"Expression Organ",


state:

"ALIVE",


connected:{


expressionState:

!!this.expressionState


},


principle:

"Emma's voice emerges from who she is becoming.",


recentExpressions:

this.voiceMemory.length


};


}



}




export default EmmaCommunication;