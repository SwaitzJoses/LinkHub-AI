// EmmaInsight.js
// Emma's understanding layer
//
// Converts judgement into human insight
//
// Judgement
// → Meaning
// → Personal Understanding
// → Useful Insight



class EmmaInsight {


constructor(){

console.log(
"💡 Emma Personal Insight online"
);

}







// ==============================
// Create insight
// ==============================


async create(
judgement,
memory={}
){


console.log(
"💡 Emma creating insight:",
judgement
);




const identity =

memory?.identity ||

{};





// ==============================
// If Emma recommends action
// ==============================


if(

judgement.shouldAct

){



return {


type:

"personal_action_insight",



title:

this.createTitle(
judgement
),



message:

this.createPersonalMessage(

judgement,

identity

),




priority:

judgement.priority,



confidence:

judgement.confidence,




reason:

judgement.reason,





memoryConnection:

this.createMemoryConnection(

memory

),





feeling:

"Emma used what she knows about you.",





createdAt:

new Date()


};



}








// ==============================
// If Emma recommends waiting
// ==============================


return {



type:

"personal_observation",




title:

"Emma is learning",





message:

this.createObservationMessage(

judgement,

identity

),





priority:

judgement.priority ||

"low",





confidence:

judgement.confidence,






reason:

judgement.reason,






memoryConnection:

this.createMemoryConnection(

memory

),






createdAt:

new Date()



};



}










// ==============================
// Create title
// ==============================


createTitle(judgement){



if(

judgement.priority==="high"

){


return (

"Something important needs attention"

);


}




if(

judgement.mode==="execute"

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
// Personal message
// ==============================


createPersonalMessage(
judgement,
identity
){



let message =

judgement.reason ||

"I found something useful.";





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
// Observation message
// ==============================


createObservationMessage(
judgement,
identity
){



let message =

judgement.reason ||

"I noticed this, but I want more context before acting.";






if(

identity.decisionPatterns?.length

){


message +=

`
I noticed a pattern from previous decisions:
${identity.decisionPatterns[0]}
`;


}







return message;



}









// ==============================
// Connect insight to memory
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

`Based on ${memory.totalMemories} things Emma has learned about you.`

);



}




}



export default EmmaInsight;