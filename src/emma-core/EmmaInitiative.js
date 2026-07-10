// EmmaInitiative.js
//
// PROJECT BECOMING
//
// Emma Initiative System v1
//
// The Moment Awareness Organ
//
// Initiative is not action.
// Initiative is knowing when presence matters.
//
// RULE:
//
// Do not think.
// Do not decide solutions.
// Do not execute.
// Do not create messages.
// Do not call AI.
//
// Attention notices the world.
// Initiative decides when Emma should reach out.
//
// Memory gives history.
// Wisdom gives meaning.
// Evolution gives change.
// SelfModel gives context.
//


class EmmaInitiative {


constructor(){


console.log(
"🌱 Emma Initiative v1 awakened"
);



// Not memory.
// Only recent initiative rhythm.

this.history = [];



this.state = {


quietness:

1,


engagement:

0,


sensitivity:

0.5,


lastInitiative:

null


};


}









// =================================
// OBSERVE MOMENT
//
// Should Emma enter?
// =================================


observe(context = {}){


console.log(
"🌱 Emma sensing initiative..."
);




const signals =

this.collectSignals({

experience:

context.experience,


memory:

context.memory,


wisdom:

context.wisdom,


evolution:

context.evolution,


self:

context.self


});







const initiative =

this.evaluate(

signals

);







this.record(

initiative

);






return initiative;


}










// =================================
// COLLECT SIGNALS
//
// No judgement.
// Only observation.
// =================================


collectSignals({

experience,

memory,

wisdom,

evolution,

self

}){


return {


importance:

experience?.importance || 0,





hasMemory:

!!(

memory?.memories?.length ||

memory?.memory?.length

),






hasWisdom:

!!(

wisdom?.advice ||

wisdom?.lessons

),






hasEvolution:

!!(

evolution?.change ||

evolution?.learned

),






hasSelfShift:

!!(

self?.currentSelf ||

self?.identity

)


};


}









// =================================
// EVALUATE INITIATIVE
//
// Should Emma speak?
//
// Not WHAT to say.
// =================================


evaluate(signals){


let strength = 0;

let reasons = [];







if(

signals.importance > 80

){


strength += 0.3;


reasons.push(

"important_moment"

);


}








if(

signals.hasMemory

){


strength += 0.2;


reasons.push(

"connected_history"

);


}








if(

signals.hasWisdom

){


strength += 0.2;


reasons.push(

"wisdom_available"

);


}








if(

signals.hasEvolution

){


strength += 0.3;


reasons.push(

"growth_detected"

);


}









const shouldReachOut =

strength >= 0.5;








return {


shouldReachOut,


strength:


Math.min(

1,

strength

),



reasons,


createdAt:

new Date()


};


}

// =================================
// RECORD INITIATIVE
//
// Emma remembers only rhythm,
// not facts.
// =================================


record(

initiative

){



this.history.unshift({


strength:

initiative.strength,


acted:

initiative.shouldReachOut,


reasons:

initiative.reasons,


createdAt:

new Date()


});







this.history =

this.history.slice(

0,

50

);







this.updateRhythm(

initiative

);


}









// =================================
// UPDATE INITIATIVE RHYTHM
//
// Prevents Emma from becoming noisy.
// =================================


updateRhythm(

initiative

){



if(

initiative.shouldReachOut

){



// Speaking reduces immediate urge
// to interrupt again.


this.state.quietness +=

0.2;



this.state.engagement +=

0.05;



this.state.lastInitiative =

new Date();



}

else{


// Silence slowly restores openness.


this.state.quietness -=

0.05;


}









this.limitState();


}









// =================================
// APPLY QUIETNESS FILTER
//
// "Should I really enter?"
// =================================


shouldExpress(

initiative

){



if(

!initiative.shouldReachOut

){


return false;


}







// Recently active Emma becomes patient.


if(

this.state.quietness > 0.8 &&

this.history.length > 3

){



return false;



}







return true;


}









// =================================
// LIMIT STATE VALUES
// =================================


limitState(){



for(

const key of [

"quietness",

"engagement",

"sensitivity"

]){



this.state[key] =

Math.max(

0,

Math.min(

1,

this.state[key]

)

);



}



}









// =================================
// CURRENT STATE
// =================================


getState(){



return {


...this.state,


recentInitiatives:

this.history.length


};



}










// =================================
// STATUS
// =================================


status(){



return {


organ:

"EmmaInitiative",


version:

"v1",


role:

"Moment Awareness",


state:

this.getState(),


principle:

"Emma learns when a moment deserves her presence.",


recent:

this.history.slice(

0,

5

)


};



}



}




export default EmmaInitiative;