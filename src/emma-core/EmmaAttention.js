// EmmaAttention.js
//
// PROJECT BECOMING
//
// Emma's focus system
//
// RULE:
//
// Emma sees many things.
// Emma does not give everything equal attention.
//
// Connectors collect.
// Attention filters.
// Memory remembers.
// Wisdom learns.
// Brain thinks.
//
// Purpose:
// - protect API cost
// - protect memory quality
// - prevent noise
// - decide what deserves Emma


class EmmaAttention {



constructor({memory,wisdom} = {}){


console.log(
"🎯 Emma Attention online"
);



this.memory =
memory;



this.wisdom =
wisdom;



this.thresholds = {


ignore:

30,



remember:

60,



deep:

85


};




}









// =================================
// MAIN ATTENTION ENGINE
// =================================


async evaluate(
signal={}
){



console.log(
"🎯 Emma evaluating importance..."
);





let score = 0;


let reasons = [];









// ===============================
// HUMAN IMPORTANCE
// ===============================


if(
this.hasHumanSignal(signal)
){


score += 25;



reasons.push(
"Human experience detected"
);


}









// ===============================
// EMOTION
// ===============================


const emotion =

this.detectEmotion(

signal

);




if(
emotion
){



score += emotion.weight;



reasons.push(

emotion.reason

);



}









// ===============================
// PROBLEM
// ===============================


if(
this.hasProblem(signal)
){



score += 25;



reasons.push(

"Problem or friction detected"

);



}










// ===============================
// OPPORTUNITY
// ===============================


if(
this.hasOpportunity(signal)
){



score += 20;



reasons.push(

"Possible opportunity"

);



}










// ===============================
// COMMITMENT
// ===============================


if(
this.hasCommitment(signal)
){



score += 25;



reasons.push(

"Future responsibility detected"

);



}









// ===============================
// CHECK PAST EXPERIENCE
// ===============================


let relatedMemories = [];





if(
this.memory &&
this.memory.getRelevantMemories
){



relatedMemories =


await this.memory.getRelevantMemories(

signal

);





if(
relatedMemories.length > 0
){



score += 20;



reasons.push(

"Connected to past experience"

);



}



}









// ===============================
// ASK WISDOM
// ===============================


let wisdom = null;





if(
this.wisdom
){



wisdom =


await this.wisdom.reflect(

signal

);






if(
wisdom.experienceFound
){



score += 20;



reasons.push(

"Wisdom pattern detected"

);



}



}











// ===============================
// DECISION
// ===============================


let decision =

"IGNORE";




if(
score >= this.thresholds.deep
){



decision =

"DEEP_THINK";



}



else if(
score >= this.thresholds.remember
){



decision =

"REMEMBER";



}











const result = {



payAttention:


decision !== "IGNORE",




decision,



score,



reasons,



relatedMemories:


relatedMemories.length,



wisdomFound:


!!wisdom?.experienceFound,




createdAt:


new Date().toISOString()



};








console.log(

"🎯 Attention result:",

result

);






return result;



}









// =================================
// EMOTIONAL SIGNAL
// =================================


detectEmotion(signal){



const text =

this.text(signal);





if(

text.includes("angry") ||

text.includes("frustrated") ||

text.includes("confused") ||

text.includes("worried")

){



return {


weight:30,


reason:

"Strong negative emotion detected"


};



}









if(

text.includes("happy") ||

text.includes("excited") ||

text.includes("love")

){



return {


weight:20,


reason:

"Positive emotional signal detected"


};



}








return null;



}









// =================================
// HUMAN SIGNAL
// =================================


hasHumanSignal(signal){



const text =

this.text(signal);





return (



signal.person ||


signal.user ||


text.includes("customer") ||


text.includes("client") ||


text.includes("user") ||


text.includes("founder")



);



}










// =================================
// PROBLEM DETECTION
// =================================


hasProblem(signal){



return this.contains(

signal,

[


"problem",


"issue",


"stuck",


"failed",


"confused",


"struggling",


"mistake",


"complaint"


]


);



}










// =================================
// OPPORTUNITY DETECTION
// =================================


hasOpportunity(signal){



return this.contains(

signal,

[


"interested",


"growth",


"opportunity",


"partnership",


"lead",


"sale",


"upgrade"


]


);



}










// =================================
// COMMITMENT DETECTION
// =================================


hasCommitment(signal){



return this.contains(

signal,

[


"meeting",


"deadline",


"promise",


"appointment",


"payment",


"launch"


]


);



}










// =================================
// TEXT NORMALIZER
// =================================


text(signal){



return JSON.stringify(

signal || {}

)

.toLowerCase();



}










// =================================
// KEYWORD CHECK
// =================================


contains(
signal,
words=[]
){



const text =

this.text(signal);




return words.some(

word =>

text.includes(word)

);



}





}





export default EmmaAttention;