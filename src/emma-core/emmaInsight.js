// EmmaInsight.js
// Emma's vision layer
//
// Emma does not just answer.
//
// Emma notices:
// - meaning
// - patterns
// - blind spots
// - possibilities
//
// RULE:
//
// Memory tells Emma:
// "Where have we been?"
//
// Wisdom tells Emma:
// "What have we learned?"
//
// Insight asks:
// "What possibility exists now?"



class EmmaInsight {



// ==============================
// WAKE INSIGHT
// ==============================


constructor(){


console.log(
"💡 Emma Personal Insight online"
);


}









// ==============================
// CREATE INSIGHT
// ==============================


async create(
judgement,
memory={},
wisdom={}
){



console.log(
"💡 Emma creating insight:",
judgement
);





const identity =

memory?.identity ||

{};






// ==============================
// FIND POSSIBILITIES
// ==============================


const possibilities =

this.findPossibilities(

judgement,

memory,

wisdom

);








// ==============================
// FIND PATTERNS
// ==============================


const patterns =

this.findPatterns(

memory,

wisdom

);









// ==============================
// ACTION INSIGHT
// ==============================


if(

judgement.shouldAct

){



return {



type:

"personal_action_insight",





title:

this.createTitle(
judgement,
possibilities
),






message:

this.createPersonalMessage(

judgement,

identity,

possibilities

),







priority:

judgement.priority,






confidence:

judgement.confidence,







reason:

judgement.reason,








possibilities,








patterns,








memoryConnection:

this.createMemoryConnection(
memory
),








feeling:

"Emma connected your journey with what is happening now.",








createdAt:

new Date()



};



}











// ==============================
// OBSERVATION INSIGHT
// ==============================


return {



type:

"personal_observation",






title:

this.createTitle(

judgement,

possibilities

),







message:

this.createObservationMessage(

judgement,

identity,

possibilities

),








priority:

judgement.priority ||

"low",







confidence:

judgement.confidence,







reason:

judgement.reason,








possibilities,








patterns,








memoryConnection:

this.createMemoryConnection(

memory

),








createdAt:

new Date()



};



}











// ==============================
// FIND POSSIBILITIES
// ==============================


findPossibilities(
judgement,
memory,
wisdom
){



let possibilities = [];






const text =

JSON.stringify({

judgement,

memory,

wisdom

})
.toLowerCase();









// Opportunity signals


if(

text.includes("opportunity") ||

text.includes("looking for") ||

text.includes("need help") ||

text.includes("growth") ||

text.includes("customer")

){



possibilities.push({



type:

"opportunity",





message:

"There may be an opportunity connected to your current direction.",






why:

"Emma noticed a match between signals and your journey."



});



}










// Repeated effort


if(

text.includes("again") ||

text.includes("repeated") ||

text.includes("pattern")

){



possibilities.push({



type:

"pattern",





message:

"A repeating pattern may be appearing.",






why:

"Emma has seen something similar before."



});



}









// Learning based possibility


if(

wisdom?.lessons?.length

){



possibilities.push({



type:

"experience_based",





message:

"Past experience may help this decision.",





why:

"Emma found relevant learned wisdom."



});



}









return possibilities;



}











// ==============================
// FIND USER PATTERNS
// ==============================


findPatterns(
memory,
wisdom
){



let patterns = [];





if(
memory?.identity?.decisionPatterns
){



patterns.push(

...memory.identity.decisionPatterns

);



}






if(
wisdom?.patterns
){



patterns.push(

...wisdom.patterns

);



}







return patterns;



}











// ==============================
// CREATE TITLE
// ==============================


createTitle(
judgement,
possibilities=[]
){





if(
possibilities.length
){



return (

"I noticed a possibility"

);



}







if(

judgement.priority === "high"

){



return (

"Something important needs attention"

);



}








if(

judgement.mode === "execute"

){



return (

"I can help with this"

);



}








return (

"Here's what I noticed"

);



}











// ==============================
// PERSONAL MESSAGE
// ==============================


createPersonalMessage(
judgement,
identity,
possibilities=[]
){



let message =

judgement.reason ||

"I found something useful.";







if(
possibilities.length
){



message +=

`

I also noticed:
${possibilities[0].message}
`;



}








if(

identity.goals?.length

){



message +=

`

This connects with your goals:
${identity.goals
.slice(0,2)
.join(", ")}
`;



}









if(

identity.workingStyle?.length

){



message +=

`

I considered how you usually work:
${identity.workingStyle[0]}
`;



}








return message;



}











// ==============================
// OBSERVATION MESSAGE
// ==============================


createObservationMessage(
judgement,
identity,
possibilities=[]
){



let message =

judgement.reason ||

"I noticed this and I am learning what it means.";








if(
possibilities.length
){



message +=

`

A possible path:
${possibilities[0].message}
`;



}









if(

identity.decisionPatterns?.length

){



message +=

`

I noticed a pattern from before:
${identity.decisionPatterns[0]}
`;



}








return message;



}











// ==============================
// MEMORY CONNECTION
// ==============================


createMemoryConnection(memory){



if(

!memory ||

!memory.totalMemories

){



return (

"This is new. Emma is still learning."

);



}








return (

`Based on ${memory.totalMemories} experiences Emma has shared with you.`

);



}




}








export default EmmaInsight;