// EmmaJudgement.js
// Emma's wisdom layer
// Protects business decisions
// Reasoning → Ethics → Risk → Experience → Approval


class EmmaJudgement {


constructor(){

console.log(
"⚖️ Emma Judgement ready"
);

}




// ==============================
// Main judgement engine
// ==============================

async judge(
reasoning,
memory,
capabilities=[]
){


console.log(
"⚖️ Emma applying business judgement",
{
reasoning,
memory,
capabilities
}
);



const confidence =
reasoning?.confidence || 50;


const recommendation =
reasoning?.recommendation || {};


const memories =
memory?.relevantExperiences || [];


let judgementLog=[];


judgementLog.push(
`Confidence: ${confidence}%`
);



// ==============================
// Understand action
// ==============================

const desiredAction =
this.chooseAction(
reasoning
);


judgementLog.push(
`Requested action: ${desiredAction}`
);



// ==============================
// Extract past knowledge
// ==============================


const failures =
this.findFailures(
memories
);


const successes =
this.findSuccess(
memories
);




// ==============================
// Low confidence protection
// ==============================


if(confidence < 45){

return this.block({

confidence,

reason:
"Emma is not confident enough. More observation required.",

judgementLog

});

}



// ==============================
// Never repeat known failures
// ==============================


const repeatedFailure =
this.matchesPastFailure(
desiredAction,
failures
);



if(repeatedFailure){


judgementLog.push(
"Previous failure detected"
);


return this.block({

confidence,

reason:
"Emma rejected this because similar action failed before.",

lesson:
failures.slice(0,3),

judgementLog

});


}




// ==============================
// Repetition protection
// ==============================


if(
this.isRepeatedAction(
desiredAction,
memories
)
){

return this.block({

confidence,

reason:
"Emma already performed this recently. Avoiding spam.",

judgementLog

});

}




// ==============================
// Capability check
// ==============================


const skill =
capabilities.find(

item =>
item.name === desiredAction

);



if(!skill){


return {

shouldAct:false,

action:
desiredAction,

mode:
"learn",

confidence,

priority:
"medium",

needsApproval:false,

reason:
`Emma knows this may help, but she has not learned the ${desiredAction} capability yet.`,

judgementLog,

createdAt:
new Date()

};


}






// ==============================
// Risk intelligence
// ==============================


const risk =
this.calculateRisk(
skill,
reasoning,
memories
);



judgementLog.push(
`Risk calculated: ${risk}`
);





if(
risk > confidence
){

return this.block({

confidence,

reason:
"Business risk is higher than confidence.",

judgementLog

});

}






// ==============================
// Previous success bonus
// ==============================


if(
successes.length>0
){

judgementLog.push(
"Past success increases trust"
);

}





// ==============================
// Approval decision
// ==============================


const needsHuman =

skill.requiresApproval ||

risk>60;




if(needsHuman){


return {


shouldAct:true,

action:
desiredAction,

mode:
"prepare",

needsApproval:true,

priority:
"medium",

confidence,

reason:
"Emma prepared the action but requests owner approval.",

experienceUsed:
successes.slice(0,3),

judgementLog,

createdAt:
new Date()

};


}







// ==============================
// Execute
// ==============================


return {


shouldAct:true,

action:
desiredAction,

mode:
"execute",

needsApproval:false,

priority:
confidence>80
? "high"
: "medium",

confidence,

reason:
"Approved using memory, capability and risk judgement.",

experienceUsed:
successes.slice(0,3),

judgementLog,

createdAt:
new Date()

};


}








// ==============================
// Successful memories
// ==============================


findSuccess(memories){


return memories.filter(item=>{


const text =
JSON.stringify(item)
.toLowerCase();


return (

text.includes("success") ||
text.includes("worked") ||
text.includes("improved") ||
text.includes("increase")

);


});


}








// ==============================
// Failure memories
// ==============================


findFailures(memories){


return memories.filter(item=>{


const text =
JSON.stringify(item)
.toLowerCase();


return (

text.includes("failed") ||
text.includes("loss") ||
text.includes("mistake") ||
text.includes("ignored") ||
text.includes("did not work")

);


});


}








// ==============================
// Match old mistakes
// ==============================


matchesPastFailure(
action,
failures
){


return failures.some(item=>{


const text =
JSON.stringify(item)
.toLowerCase();


return text.includes(
action.toLowerCase()
);


});


}









// ==============================
// Pick action
// ==============================


chooseAction(reasoning){


if(
reasoning?.recommendation?.action
){

return reasoning.recommendation.action;

}


if(
reasoning.goal==="growth"
){

return "CREATE_CAMPAIGN";

}


if(
reasoning.goal==="analysis"
){

return "GENERATE_REPORT";

}


return "CREATE_TASK";


}









// ==============================
// Risk calculation
// ==============================


calculateRisk(
skill,
reasoning,
memories
){


let risk=30;



if(skill.risk==="medium")
risk+=20;



if(skill.risk==="high")
risk+=50;



if(
reasoning.confidence>80
)
risk-=20;



if(
memories.length>5
)
risk-=10;



return Math.max(
risk,
0
);


}










// ==============================
// Stop duplicate actions
// ==============================


isRepeatedAction(
action,
memories
){


return memories.some(item=>{


const text =
JSON.stringify(item)
.toLowerCase();


return (

text.includes(
action.toLowerCase()
)

&&

(
text.includes("recent") ||
text.includes("today")
)

);


});


}










// ==============================
// Reject safely
// ==============================


block({
confidence,
reason,
lesson=[],
judgementLog=[]
}){


return {


shouldAct:false,

action:null,

mode:"observe",

confidence,

priority:"low",

needsApproval:false,

reason,

lesson,

judgementLog,

createdAt:
new Date()


};


}



}


export default EmmaJudgement;