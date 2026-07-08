// EmmaDailyAwareness.js
// Emma's daily consciousness
//
// RULE:
//
// Connectors collect.
// Attention filters.
// Awareness notices.
// Reasoning thinks.
// Judgement decides.



class EmmaDailyAwareness {



// ==============================
// WAKE CONSCIOUSNESS
// ==============================


constructor(
memory,
reasoning,
judgement,
attention=null,
connectors=null
){



this.memory =
memory;


this.reasoning =
reasoning;


this.judgement =
judgement;


this.attention =
attention;


this.connectors =
connectors;




console.log(
"🌅 Emma Daily Awareness online"
);



}









// ==============================
// WAKE UP
// ==============================


async wakeUp(
context={}
){



console.log(
"🌅 Emma is waking up..."
);








// ==============================
// 1. RECALL MEMORY
// ==============================


const memories =

await this.memory.recall({


userId:

context.userId || null,


businessId:

context.businessId || null,


context:

"DAILY_REVIEW"


});










// ==============================
// 2. CHECK WORLD THROUGH SENSES
// ==============================


let worldSignals =
[];




if(
this.connectors
){



console.log(
"🌎 Checking connected senses..."
);



worldSignals =

await this.connectors.collectFromAll();



}










// ==============================
// 3. ATTENTION FILTER
// ==============================


const importantSignals =
[];




if(
this.attention
){



for(
const signal of worldSignals
){



const focus =

await this.attention.evaluate(

signal,

memories

);





if(
focus.attention
){



importantSignals.push({



signal,


focus



});



}



}



}






else {


importantSignals.push(

...worldSignals

);


}











// ==============================
// 4. SCAN EXISTING EXPERIENCE
// ==============================


const awareness =

this.scanMemory(

memories

);









// ==============================
// 5. THINK ONLY ABOUT IMPORTANT
// ==============================


const reasoning =

await this.reasoning.think(

{


eventType:

"DAILY_AWARENESS",



message:

"What changed and what matters today?",



memoryAwareness:

awareness,



worldAwareness:

importantSignals



},


memories


);










// ==============================
// 6. JUDGE
// ==============================


const judgement =

await this.judgement.judge(

reasoning,

memories,

importantSignals

);










// ==============================
// 7. CREATE EMMA REPORT
// ==============================


return {


from:

"Emma",



type:

"EMMA_DAILY_REPORT",



greeting:

this.createGreeting(),




report:{



summary:

awareness.summary,



noticed:

importantSignals,



attention:

awareness.attention,



risks:

awareness.risks,



opportunities:

awareness.opportunities



},




thought:

reasoning,




judgement,




createdAt:

new Date()
.toISOString()



};



}











// ==============================
// MEMORY SCANNER
// ==============================


scanMemory(memory={}){



let attention=[];


let risks=[];


let opportunities=[];








// Relationships


memory.relationships
?.forEach(person=>{



if(
person.interactions >= 3
){



attention.push({



type:

"RELATIONSHIP",



message:

`${person.name} has been important recently`,



person



});



}



});









// Failures


memory.failures
?.forEach(item=>{



risks.push({



type:

"PAST_FAILURE",



message:

item.memory?.lesson ||

"Previous mistake needs attention"



});



});










// Success patterns


memory.successes
?.forEach(item=>{



opportunities.push({



type:

"SUCCESS_PATTERN",



message:

item.memory?.futureRule ||

"Successful pattern found"



});



});










// Learned rules


memory.rules
?.forEach(rule=>{



attention.push({



type:

"LEARNED_RULE",



message:

rule



});



});










return {


summary:

this.createSummary(

attention,

risks,

opportunities

),



attention,


risks,


opportunities



};



}











// ==============================
// CREATE SUMMARY
// ==============================


createSummary(
attention,
risks,
opportunities
){



if(

attention.length===0 &&

risks.length===0 &&

opportunities.length===0

){



return (

"Nothing urgent. Emma continues watching and learning."

);



}







return (

`Emma noticed ${attention.length} important patterns, ` +

`${risks.length} risks, and ` +

`${opportunities.length} opportunities.`

);



}









// ==============================
// HUMAN GREETING
// ==============================


createGreeting(){



const hour =

new Date()
.getHours();





if(
hour < 12
){


return (

"Good morning. I reviewed what changed while you were away."

);


}





if(
hour < 18
){


return (

"Good afternoon. Here is what I noticed today."

);


}





return (

"Good evening. I reviewed your world and prepared your update."

);



}



}







export default EmmaDailyAwareness;