// EmmaAttention.js
//
// PROJECT BECOMING
//
// Emma Attention System v4
//
// Attention is awareness.
//
// RULE:
//
// Do not think.
// Do not judge.
// Do not learn.
//
// Experience happens.
// Attention controls depth.
//
// v4:
// - Energy based awareness
// - Novelty detection
// - Noise protection
// - No Brain decisions
//



class EmmaAttention {





constructor({

memory=null

} = {}){



console.log(
"👁 Emma Attention v4 awakened"
);




this.memory =
memory;




this.focusHistory = [];





this.sensitivity = {


ignore:10,


notice:30,


remember:60


};




this.energy = 100;



}









// =================================
// EXPERIENCE AWARENESS
// =================================


async evaluate(

experience={}

){



console.log(
"👁 Emma sensing experience..."
);





let awareness = {


importance:0,


signals:[],


reason:[]


};







if(

this.detectHuman(
experience
)

){


this.addSignal(
awareness,
30,
"HUMAN_RELATED"
);


}








if(

this.detectChange(
experience
)

){


this.addSignal(
awareness,
35,
"CHANGE_OCCURRED"
);


}








if(

this.detectOutcome(
experience
)

){


this.addSignal(
awareness,
40,
"OUTCOME_EVENT"
);


}








const novelty =

await this.detectNovelty(
experience
);




if(novelty){


this.addSignal(
awareness,
20,
"NEW_EXPERIENCE"
);


}








if(

this.isRepeatedNoise(
experience
)

){


awareness.importance -= 20;


awareness.signals.push(
"REPEATED_NOISE"
);


}








awareness.importance =

this.applyEnergy(
awareness.importance
);






const depth =

this.chooseDepth(
awareness.importance
);






const result = {


noticed:

depth !== "IGNORE",



depth,


importance:

awareness.importance,


signals:

awareness.signals,


createdAt:

new Date()


};








this.recordFocus(
experience
);






console.log(
"👁 Attention result:",
result.depth
);






return result;



}









addSignal(

awareness,

value,

reason

){



awareness.importance += value;



awareness.signals.push(
reason
);



awareness.reason.push(
reason
);



}









chooseDepth(

importance=0

){



if(
importance < this.sensitivity.ignore
){


return "IGNORE";


}





if(
importance < this.sensitivity.notice
){


return "OBSERVE";


}





if(
importance < this.sensitivity.remember
){


return "NOTICE";


}





return "REMEMBER";



}










async detectNovelty(

experience={}

){



if(

!this.memory?.getRelevantMemories

){


return true;


}





const memories =

await this.memory.getRelevantMemories(
experience
);





return (

!memories ||

memories.length === 0

);



}










detectHuman(

experience={}

){



const text =

this.text(
experience
);




return (

!!experience.person ||

!!experience.user ||

!!experience.customer ||

text.includes("customer") ||

text.includes("person") ||

text.includes("relationship")

);



}









detectChange(

experience={}

){



return this.contains(

experience,

[

"changed",

"new",

"problem",

"failed",

"success",

"improved",

"growth",

"unexpected"

]

);



}










detectOutcome(

experience={}

){



return (

experience.type === "ACTION_OUTCOME"

||

experience.readyForLearning

||

!!experience.result

||

!!experience.consequence

);



}










isRepeatedNoise(

experience={}

){



const sig =

this.signature(
experience
);




const repeats =

this.focusHistory.filter(

item => item === sig

).length;





return repeats >= 3;



}










applyEnergy(

importance

){



if(

this.energy < 30

){


return importance - 20;


}





return importance;



}










recoverEnergy(

amount=10

){



this.energy =

Math.min(

100,

this.energy + amount

);



}










consumeEnergy(

amount=5

){



this.energy =

Math.max(

0,

this.energy - amount

);



}










recordFocus(

experience={}

){



this.focusHistory.unshift(

this.signature(
experience
)

);





this.focusHistory =

this.focusHistory.slice(
0,
50
);





this.consumeEnergy();



}










signature(

experience={}

){



return JSON.stringify({


type:

experience.type,


source:

experience.source,


action:

experience.action


})

.toLowerCase();



}










text(

experience={}

){



try{


return JSON.stringify(
experience
)
.toLowerCase();


}


catch{


return "";


}



}










contains(

experience,

words=[]

){



const content =

this.text(
experience
);




return words.some(

word =>

content.includes(
word
)

);



}










currentFocus(){



return {


energy:

this.energy,


recent:

this.focusHistory.length,


message:

"I control awareness before memory and reasoning."


};



}










quietMode(){



this.sensitivity.notice += 10;


this.sensitivity.remember += 10;




console.log(
"🌙 Attention relaxed"
);



}










focusMode(){



this.sensitivity.notice =

Math.max(
10,
this.sensitivity.notice - 10
);




this.sensitivity.remember =

Math.max(
30,
this.sensitivity.remember - 10
);




console.log(
"🔥 Attention sharpened"
);



}










status(){



return {


organ:

"EmmaAttention",


version:

"v4",


role:

"Nervous system awareness filter",


state:

"ACTIVE",


energy:

this.energy,


recentFocus:

this.focusHistory.length,


sensitivity:

this.sensitivity,


principle:

"Not everything deserves memory, but everything can be noticed.",


message:

"I decide how deeply life enters Emma."


};



}










reset(){



this.focusHistory=[];


this.energy=100;



}



}




export default EmmaAttention;