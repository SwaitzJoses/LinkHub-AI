// EmmaDailyAwareness.js
// Emma's daily consciousness
//
// PURPOSE:
// Emma works even when nobody asks.
//
// It does NOT observe the world directly.
// It studies memory.
//
// Memory
//   ↓
// Awareness
//   ↓
// Reasoning
//   ↓
// Judgement
//   ↓
// Daily Brief
//
// RULE:
// Awareness notices.
// Reasoning thinks.
// Judgement decides.



class EmmaDailyAwareness {


constructor(
memory,
reasoning,
judgement
){


this.memory =
memory;


this.reasoning =
reasoning;


this.judgement =
judgement;



console.log(
"🌅 Emma Daily Awareness online"
);


}









// =================================
// WAKE UP
// =================================


async wakeUp(context={}){


console.log(
"🌅 Emma is reviewing the day..."
);




// 1. Recall everything Emma knows

const memories =

await this.memory.recall({



userId:

context.userId || null,



businessId:

context.businessId || null,



context:

"DAILY_REVIEW"



});








// 2. Find what deserves attention

const awareness =

this.scanMemory(
memories
);








// 3. Think about today


const reasoning =

await this.reasoning.think(
{


eventType:
"DAILY_AWARENESS",



message:
"Review my world and tell me what matters today",



awareness



},

memories

);








// 4. Judge importance


const judgement =

await this.judgement.judge(

reasoning,

memories,

[]

);









return {


from:
"Emma",



type:
"DAILY_AWARENESS",



greeting:

this.createGreeting(),




summary:

awareness.summary,




attention:

awareness.attention,




opportunities:

awareness.opportunities,




risks:

awareness.risks,




thought:

reasoning,




judgement,




createdAt:

new Date()



};


}









// =================================
// MEMORY SCANNER
// =================================


scanMemory(memory){



let attention=[];

let risks=[];

let opportunities=[];







// Relationships


memory.relationships
?.forEach(person=>{


if(

person.interactions >=3

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










// Success


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










// Rules Emma learned


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









// =================================
// SUMMARY
// =================================


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

`Emma found ${attention.length} things needing attention, ` +

`${risks.length} risks, and ` +

`${opportunities.length} opportunities.`

);


}









// =================================
// GREETING
// =================================


createGreeting(){



const hour =
new Date()
.getHours();




if(hour < 12){


return "Good morning. I reviewed what happened while you were away.";


}




if(hour < 18){


return "Good afternoon. Here is what I noticed.";


}




return (

"Good evening. I reviewed your important updates."

);


}



}



export default EmmaDailyAwareness;