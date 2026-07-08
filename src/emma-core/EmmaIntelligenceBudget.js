// EmmaIntelligenceBudget.js
//
// Emma's mental energy manager
//
// RULE:
// Attention decides what matters.
// Budget decides what deserves intelligence.
//
// Emma should observe everything.
// Emma should NOT think deeply about everything.
//
// Protects:
// - OpenAI costs
// - rate limits
// - repeated signals
// - unnecessary reasoning


class EmmaIntelligenceBudget {


constructor(){


this.history =
new Map();



this.stats =
{

deepThoughts:0,

savedCalls:0,

memoryOnly:0,

blockedRepeats:0

};




// approximate daily limits during development

this.dailyLimit =
{

maxDeepThoughts:50,

maxPerConnector:20

};




this.connectorUsage =
{};


console.log(
"🧠 Emma Intelligence Budget online"
);


}








// =================================
// MAIN DECISION
// =================================


async evaluate({

input,

attention,

memory

}){


const source =
input.source ||
"unknown";



const type =
input.type ||
"UNKNOWN";



const signature =
this.createSignature(
input
);



console.log(
"💰 Emma evaluating thinking cost..."
);





// =================================
// USER TALKING ALWAYS MATTERS
// =================================


if(
source === "conversation" ||
type === "USER_MESSAGE"
){


return this.allow(

"User is directly talking to Emma"

);


}








// =================================
// DUPLICATE PROTECTION
// =================================


if(

this.isDuplicate(

signature

)

){


this.stats.blockedRepeats++;


return this.memoryOnly(

"Repeated signal"

);


}








// =================================
// ATTENTION SAID LOW
// =================================


if(

attention?.level === "LOW" ||

attention?.score < 40

){


return this.silent(

"Low importance"

);


}









// =================================
// CONNECTOR SPECIFIC RULES
// =================================


// Gmail polling / sync events


if(

source.includes("gmail") &&

[

"SYNC",

"CHECK",

"REFRESH",

"EMAIL_VIEWED"

].includes(type)

){


return this.memoryOnly(

"Gmail background activity"

);


}






// Analytics noise


if(

source.includes("analytics") ||

source.includes("website")

){



if(

type !== "CONVERSION" &&

type !== "DROP"

){


return this.memoryOnly(

"Normal analytics activity"

);


}



}










// =================================
// IMPORTANT EVENTS
// =================================


const importantTypes =
[

"USER_REQUEST",

"PAYMENT_FAILED",

"CUSTOMER_COMPLAINT",

"LEAD_CREATED",

"CANCELLATION",

"ERROR",

"OPPORTUNITY",

"GOAL_RISK"

];





if(

importantTypes.includes(type)

){


return this.allow(

"Important business event"

);


}










// =================================
// CHECK DAILY LIMIT
// =================================


if(

this.stats.deepThoughts >=

this.dailyLimit.maxDeepThoughts

){


return this.memoryOnly(

"Daily intelligence budget reached"

);


}










// =================================
// HIGH ATTENTION GETS AI
// =================================


if(

attention?.level === "HIGH"

){


return this.allow(

"High attention signal"

);


}









// =================================
// DEFAULT
// =================================


return this.memoryOnly(

"Not worth deep reasoning"

);



}










// =================================
// ALLOW AI
// =================================


allow(reason){



this.stats.deepThoughts++;



console.log(

"🧠 DEEP_AI approved:",

reason

);



return {


mode:"DEEP_AI",

allowAI:true,

reason


};



}









// =================================
// MEMORY ONLY
// =================================


memoryOnly(reason){



this.stats.savedCalls++;


this.stats.memoryOnly++;




console.log(

"💾 MEMORY_ONLY:",

reason

);




return {


mode:"MEMORY_ONLY",

allowAI:false,

reason


};



}









// =================================
// IGNORE
// =================================


silent(reason){



this.stats.savedCalls++;



console.log(

"😴 Ignored expensive thinking:",

reason

);




return {


mode:"SILENT",

allowAI:false,

reason


};


}










// =================================
// DUPLICATE CHECK
// =================================


isDuplicate(

signature

){



const now =
Date.now();



const previous =
this.history.get(

signature

);




this.history.set(

signature,

now

);




if(

!previous

)

return false;





const diff =

now - previous;





// 5 minute cooldown


return diff <

1000 * 60 * 5;



}









// =================================
// SIGNATURE
// =================================


createSignature(

input

){



return JSON.stringify({


source:

input.source,


type:

input.type,


id:

input.id ||

input.messageId ||

input.emailId


});


}










// =================================
// STATUS
// =================================


status(){



return {


stats:this.stats,


estimatedMoneySaved:

"$" +

(
this.stats.savedCalls * 0.002
)

.toFixed(3)


};



}



}





export default EmmaIntelligenceBudget;