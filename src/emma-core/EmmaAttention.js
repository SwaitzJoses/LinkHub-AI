// EmmaAttention.js
// Emma's focus system
//
// RULE:
// Emma sees many things.
// Emma thinks deeply only about what matters.
//
// This protects:
// - API cost
// - Memory quality
// - Emma's focus
//
//
// Connectors collect.
// Attention filters.
// Brain thinks.



class EmmaAttention {



// ==============================
// WAKE ATTENTION
// ==============================


constructor(){


console.log(
"🎯 Emma Attention online"
);



this.thresholds = {


ignore:30,


experience:60,


deep:80


};



}









// ==============================
// MAIN ATTENTION CHECK
// ==============================


async evaluate(
signal,
memory = {}
){



console.log(
"🎯 Emma evaluating attention..."
);



let score = 0;


let reasons = [];








// ==============================
// BASE HUMAN ATTENTION
// ==============================


// 1. Human involved


if(
this.hasHumanSignal(signal)
){


score += 25;


reasons.push(
"Human interaction detected"
);


}









// 2. Commitment


if(
this.hasCommitment(signal)
){


score += 25;


reasons.push(
"Commitment or responsibility detected"
);


}









// 3. Opportunity


if(
this.hasOpportunity(signal)
){


score += 20;


reasons.push(
"Possible opportunity detected"
);


}










// 4. Problem


if(
this.hasProblem(signal)
){


score += 20;


reasons.push(
"Problem needing attention detected"
);


}










// 5. User effort


if(
signal.duration &&
signal.duration > 20
){


score += 15;


reasons.push(
"User invested significant time"
);


}










// ==============================
// PERSONAL ATTENTION
// Learns over time
// ==============================


if(
memory.interests
){



const match =

memory.interests.some(

interest =>

this.text(signal)
.includes(
interest.toLowerCase()
)

);



if(match){


score += 30;


reasons.push(
"Connected to user's journey"
);


}



}











// ==============================
// FINAL DECISION
// ==============================


let level =
"RAW";



if(
score >= this.thresholds.deep
){


level =
"DEEP_THINKING";


}



else if(
score >= this.thresholds.experience
){


level =
"EXPERIENCE";


}









const result = {


attention:

score >= this.thresholds.ignore,



score,


level,


reasons,



createdAt:

new Date()
.toISOString()



};






console.log(
"🎯 Attention result:",
result
);



return result;



}











// ==============================
// DETECT HUMAN
// ==============================


hasHumanSignal(signal){



const text =
this.text(signal);



return (


signal.person ||

signal.people ||

text.includes("founder") ||

text.includes("customer") ||

text.includes("client") ||

text.includes("user")


);



}











// ==============================
// DETECT COMMITMENT
// ==============================


hasCommitment(signal){



return this.contains(
signal,
[

"meeting",

"deadline",

"payment",

"contract",

"launch",

"appointment",

"interview"


]
);



}









// ==============================
// DETECT OPPORTUNITY
// ==============================


hasOpportunity(signal){



return this.contains(
signal,
[

"looking for",

"need help",

"hiring",

"recommend",

"interested",

"opportunity",

"partnership",

"growth"


]
);



}









// ==============================
// DETECT PROBLEM
// ==============================


hasProblem(signal){



return this.contains(
signal,
[

"problem",

"issue",

"stuck",

"struggling",

"frustrated",

"can't",

"need solution"


]
);



}









// ==============================
// TEXT NORMALIZER
// ==============================


text(signal){



return JSON.stringify(
signal || {}
)
.toLowerCase();



}









// ==============================
// KEYWORD CHECK
// ==============================


contains(
signal,
words=[]
){



const content =
this.text(signal);




return words.some(

word =>

content.includes(
word
)

);



}








}



export default EmmaAttention;