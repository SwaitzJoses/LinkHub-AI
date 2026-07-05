// EmmaJudgement.js
// Emma's wisdom layer
// Decides priority, risk, action and responsibility


class EmmaJudgement {


constructor(){

console.log(
"⚖️ Emma Intelligent Judgement ready"
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





let confidence =
reasoning?.confidence || 50;


// support AI decimal confidence

if(confidence <= 1){

confidence =
Math.round(
confidence * 100
);

}





const memories =

memory?.relevantExperiences ||

memory ||

[];





let judgementLog=[];



judgementLog.push(
`Confidence: ${confidence}%`
);





// understand business seriousness


const businessRisk =
this.detectBusinessRisk(
reasoning
);



judgementLog.push(
`Business risk: ${businessRisk.level}`
);






// choose action


const desiredAction =
this.chooseAction(
reasoning,
businessRisk
);



judgementLog.push(
`Suggested action: ${desiredAction}`
);






const failures =
this.findFailures(
memories
);



const successes =
this.findSuccess(
memories
);








// ==============================
// Low confidence
// ==============================


if(
confidence < 45
){


return this.wait({


confidence,


priority:
businessRisk.priority,


reason:
"Emma needs more evidence before acting.",


judgementLog


});


}










// ==============================
// Avoid repeated mistakes
// ==============================


if(

this.matchesPastFailure(
desiredAction,
failures
)

){


return this.wait({


confidence,


priority:
"medium",


reason:
"Similar action failed before. Emma will not repeat it blindly.",


lesson:
failures.slice(0,3),


judgementLog


});


}









// ==============================
// Prevent spam actions
// ==============================


if(

this.isRepeatedAction(
desiredAction,
memories
)

){


return this.wait({


confidence,


priority:
businessRisk.priority,


reason:
"This action was recently performed. Avoiding unnecessary repetition.",


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
"recommend",


confidence,


priority:
businessRisk.priority,


needsApproval:false,


reason:
"Emma understands the issue but does not have permission/tool capability to execute yet.",


judgementLog,


createdAt:
new Date()


};



}










// ==============================
// Calculate execution risk
// ==============================


const actionRisk =

this.calculateRisk(

skill,

reasoning,

memories

);




judgementLog.push(
`Action risk: ${actionRisk}`
);






if(

actionRisk > confidence

){



return this.wait({


confidence,


priority:
businessRisk.priority,


reason:
"Action risk is higher than confidence. Emma recommends caution.",


judgementLog


});



}









// ==============================
// Approval needed
// ==============================


const needsHuman =

skill.requiresApproval ||

actionRisk > 60;








if(needsHuman){



return {


shouldAct:true,


action:
desiredAction,


mode:
"prepare",


needsApproval:true,


priority:
businessRisk.priority,


confidence,


reason:
"Emma prepared the action but wants owner approval.",


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
businessRisk.priority,


confidence,


reason:
"Emma approved this using reasoning, memory and risk judgement.",


experienceUsed:
successes.slice(0,3),


judgementLog,


createdAt:
new Date()


};



}











// ==============================
// Understand business danger
// ==============================


detectBusinessRisk(
reasoning
){


const text =

JSON.stringify(
reasoning
)
.toLowerCase();





if(

text.includes("sales drop") ||

text.includes("sales have dropped") ||

text.includes("revenue") ||

text.includes("loss") ||

text.includes("customer decline") ||

text.includes("risk")

){


return {

level:
"high",

priority:
"high"

};


}







if(

text.includes("opportunity") ||

text.includes("growth") ||

text.includes("increase")

){


return {

level:
"medium",

priority:
"medium"

};


}







return {

level:
"low",

priority:
"low"

};



}









// ==============================
// Choose action intelligently
// ==============================


chooseAction(
reasoning,
risk
){



if(
reasoning?.recommendation?.action
){

return reasoning.recommendation.action;

}




if(
risk.level==="high"
){

return "ANALYZE_PROBLEM";

}




if(
reasoning.goal==="growth"
){

return "CREATE_CAMPAIGN";

}




return "CONTINUE_MONITORING";


}










findSuccess(memories){


return memories.filter(item=>{


const text =
JSON.stringify(item).toLowerCase();


return (

text.includes("success") ||

text.includes("worked") ||

text.includes("improved")

);


});


}








findFailures(memories){


return memories.filter(item=>{


const text =
JSON.stringify(item).toLowerCase();


return (

text.includes("failed") ||

text.includes("loss") ||

text.includes("mistake")

);


});


}










matchesPastFailure(
action,
failures
){


return failures.some(item=>

JSON.stringify(item)

.toLowerCase()

.includes(

action.toLowerCase()

)

);


}









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



if(reasoning.confidence>80)
risk-=20;



if(memories.length>5)
risk-=10;



return Math.max(
risk,
0
);



}









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

text.includes("today") ||

text.includes("recent")

)

);


});



}










// ==============================
// Wait but don't ignore
// ==============================


wait({
confidence,
priority,
reason,
lesson=[],
judgementLog=[]
}){


return {


shouldAct:false,


action:null,


mode:
"observe",


confidence,


priority,


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