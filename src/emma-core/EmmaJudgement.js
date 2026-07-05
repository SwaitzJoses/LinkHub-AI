// EmmaJudgement.js
// Emma's wisdom layer
// Decides SHOULD we do this?
// Protects business before taking action


class EmmaJudgement {


constructor(){

console.log(
"⚖️ Emma Judgement ready"
);

}










async judge(
reasoning,
memory,
capabilities=[]
){


console.log(
"⚖️ Emma judging:",
{
reasoning,
memory,
capabilities
}
);






const confidence =
reasoning.confidence || 50;



const recommendation =
reasoning.recommendation || {};



const memories =
memory?.relevantExperiences || [];






let judgementLog=[];




judgementLog.push(
`Confidence checked: ${confidence}%`
);









// ===============================
// Confidence protection
// ===============================


if(confidence < 50){



return this.block({

confidence,

reason:
"Confidence too low. More learning required.",

judgementLog

});


}










// ===============================
// Check previous failures
// ===============================


const failures =
this.findFailures(
memories
);



if(
failures.length>0
){


judgementLog.push(
"Similar failures discovered"
);



return this.block({

confidence,


reason:
"Similar actions failed before. Avoiding repeated mistake.",


lesson:
failures.slice(0,3),


judgementLog


});


}











// ===============================
// Detect action
// ===============================


const desiredAction =
this.chooseAction(
reasoning
);




judgementLog.push(
`Desired action: ${desiredAction}`
);










// ===============================
// Capability check
// ===============================


const skill =

capabilities.find(

item=>
item.name===desiredAction

);







if(!skill){


return this.block({


confidence,


reason:
`Emma understands the solution but cannot perform ${desiredAction} yet.`,


judgementLog


});


}











// ===============================
// Risk evaluation
// ===============================


const riskScore =
this.calculateRisk(
skill,
reasoning
);



judgementLog.push(
`Risk score: ${riskScore}`
);








if(
riskScore > confidence
){



return this.block({


confidence,


reason:
"Risk is higher than confidence.",


judgementLog


});


}












// ===============================
// Repetition protection
// ===============================


if(
this.isRepeatedAction(
desiredAction,
memories
)
){



return this.block({


confidence,


reason:
"Action was done recently. Avoiding unnecessary repetition.",


judgementLog


});


}











// ===============================
// Human approval layer
// ===============================


if(
skill.requiresApproval
){



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
"Action prepared. Owner approval required.",


judgementLog,


createdAt:
new Date()


};


}











// ===============================
// Final approval
// ===============================


return {


shouldAct:true,


action:
desiredAction,


mode:
"execute",


needsApproval:false,


priority:
riskScore < 40
? "medium"
: "high",


confidence,


reason:
"Approved after checking memory, risk and capability.",


judgementLog,


createdAt:
new Date()


};




}













// ===============================
// Find failed experience
// ===============================


findFailures(
memories
){



return memories.filter(
item=>{


const text =
JSON.stringify(item)
.toLowerCase();



return (

text.includes("failed") ||

text.includes("loss") ||

text.includes("mistake") ||

text.includes("did not work")

);


});


}











// ===============================
// Select capability needed
// ===============================


chooseAction(
reasoning
){



if(
reasoning.recommendation?.action
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












// ===============================
// Risk calculation
// ===============================


calculateRisk(
skill,
reasoning
){



let risk=30;




if(
skill.risk==="medium"
){

risk+=20;

}



if(
skill.risk==="high"
){

risk+=50;

}





if(
reasoning.confidence>80
){

risk-=20;

}




if(risk<0){

risk=0;

}



return risk;



}












// ===============================
// Prevent spam/repetition
// ===============================


isRepeatedAction(
action,
memories
){



return memories.some(
item=>{


const text =
JSON.stringify(item)
.toLowerCase();



return (

text.includes(action.toLowerCase())

&&

text.includes("recent")

);


});


}











// ===============================
// Standard rejection
// ===============================


block({
confidence,
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


priority:
"low",


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