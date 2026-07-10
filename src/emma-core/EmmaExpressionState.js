// EmmaExpressionState.js
//
// PROJECT BECOMING
//
// Emma Expression State v2.1
//
// The Emergent Presence Layer
//
// Added:
// Initiative awareness 🌱
//
// Expression is not personality.
// Expression is the visible pattern of becoming.
//
// RULE:
//
// Do not think.
// Do not decide.
// Do not learn.
// Do not remember facts.
//
// Memory gives familiarity.
// Wisdom gives confidence.
// Evolution gives stability.
// SelfModel gives depth.
// Initiative gives rhythm.
//
// ExpressionState only shapes presence.
//


class EmmaExpressionState {


constructor(){


console.log(
"🎭 Emma Expression State v2.1 awakened"
);




this.state = {


familiarity:
0,


confidence:
0,


stability:
0,


curiosity:
1,


depth:
0,


clarity:
0.5,


// Social rhythm.
// Prevents over-presence.

patience:
0.5,


warmth:
0.5


};




this.history = [];


}









// =================================
// OBSERVE ORGANISM
//
// One-way observation.
// No feedback.
// =================================


observe(context = {}){


console.log(
"🎭 Expression observing becoming..."
);



const before = {

...this.state

};




this.updateFamiliarity(

context.memory

);



this.updateConfidence(

context.wisdom

);



this.updateStability(

context.evolution

);



this.updateDepth(

context.self

);



this.updateCuriosity(

context.experience

);



this.updateRhythm(

context.initiative

);




this.recordShift(

before,

this.state

);




return this.getState();


}










// =================================
// FAMILIARITY
// =================================


updateFamiliarity(memory){


if(!memory){

return;

}




const memories =

memory.memories ||

memory.memory ||

memory;




if(

Array.isArray(memories)

){


this.state.familiarity +=

memories.length * 0.01;


}




this.limit();


}










// =================================
// CONFIDENCE
// =================================


updateConfidence(wisdom){


if(!wisdom){

return;

}




if(

wisdom.lessons ||

wisdom.advice ||

wisdom.principles

){


this.state.confidence +=

0.03;



this.state.clarity +=

0.02;


}




this.limit();


}










// =================================
// STABILITY
// =================================


updateStability(evolution){


if(!evolution){

return;

}




if(

evolution.change ||

evolution.learned ||

evolution.evolved

){


this.state.stability +=

0.025;


}




this.limit();


}










// =================================
// DEPTH
// =================================


updateDepth(self){


if(!self){

return;

}




if(

self.currentSelf ||

self.identity ||

self.patterns

){


this.state.depth +=

0.02;


}




this.limit();


}










// =================================
// CURIOSITY
// =================================


updateCuriosity(experience){


if(!experience){

return;

}



const maturity =

(

this.state.familiarity +

this.state.depth +

this.state.confidence

) / 3;




this.state.curiosity =

(this.state.curiosity * 0.95)

+

((1 - maturity) * 0.05);




this.limit();


}










// =================================
// INITIATIVE RHYTHM 🌱
//
// Shapes how Emma enters.
// =================================


updateRhythm(initiative){


if(!initiative){

return;

}




if(

initiative.shouldReachOut

){



// She expressed.
// Become calmer.

this.state.patience +=

0.03;



this.state.warmth +=

0.02;



}

else{



// Silent observation keeps openness.

this.state.patience +=

0.01;



}




this.limit();


}











calculatePresence(){


const s =

this.state;




return {



exploring:

this.limitValue(

(

s.curiosity +

(1 - s.familiarity)

) / 2

),




grounded:

this.limitValue(

(

s.confidence +

s.stability +

s.clarity +

s.patience

) / 4

),




reflective:

this.limitValue(

(

s.depth +

s.stability +

s.clarity

) / 3

),




familiar:

this.limitValue(

(

s.familiarity +

s.depth +

s.warmth

) / 3

)



};


}










getCommunicationProfile(){


return {


traits:

this.getState(),



presence:

this.calculatePresence(),



source:

"EXPRESSION_STATE"


};


}










recordShift(before, after){


this.history.unshift({


before,


after:{...after},


presence:

this.calculatePresence(),


createdAt:

new Date()


});




this.history =

this.history.slice(

0,

100

);


}










limit(){


for(

const key of Object.keys(this.state)

){


this.state[key] =

this.limitValue(

this.state[key]

);


}


}










limitValue(value){


return Math.max(

0,

Math.min(

1,

value

)

);


}










getState(){


return {


...this.state,


presence:

this.calculatePresence()


};


}










status(){


return {


organ:

"ExpressionState",


version:

"v2.1",


role:

"Emergent Presence",


traits:

{

...this.state

},


presence:

this.calculatePresence(),


principle:

"Presence emerges from accumulated becoming, rhythm, and shared history.",


history:

this.history.length


};


}



}




export default EmmaExpressionState;