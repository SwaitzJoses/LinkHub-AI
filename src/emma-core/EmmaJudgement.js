// EmmaJudgement.js
// Emma's wisdom layer
//
// PURPOSE:
// Decide if a thought should become action.
//
// Reasoning thinks.
// Judgement chooses.
// ActionExecutor acts.
//
// RULE:
// Never act only because AI suggested.
// Use:
// - memory
// - confidence
// - relationships
// - risk


class EmmaJudgement {


constructor(){


console.log(
"⚖️ Emma Judgement Engine online"
);


}






// =================================
// MAIN JUDGEMENT
// =================================


async judge(
reasoning,
memory={},
capabilities=[]
){


console.log(
"⚖️ Emma judging...",
reasoning
);




// -------------------------------
// Load context
// -------------------------------


let confidence =
reasoning?.confidence || 50;



if(confidence <= 1){

confidence =
Math.round(confidence * 100);

}




const memories =

memory.relevantExperiences ||

memory.previousExperiences ||

[];




const relationships =

memory.relationships ||

reasoning.memoryInfluence?.relationshipsUsed ||

[];





const identity =

memory.identity ||

reasoning.memoryInfluence?.identityUsed ||

{};







let judgementLog=[];


judgementLog.push(
`Confidence ${confidence}%`
);







// -------------------------------
// Understand relationship
// -------------------------------

const relationshipRisk =
this.evaluateRelationship(
relationships
);



judgementLog.push(

`Relationship importance: ${relationshipRisk.level}`

);







// -------------------------------
// Personal alignment
// -------------------------------


const personalFit =
this.evaluatePersonalFit(
reasoning,
identity
);



judgementLog.push(

`Personal fit ${personalFit.score}`

);








// -------------------------------
// Situation risk
// -------------------------------


const risk =
this.detectRisk(
reasoning
);



judgementLog.push(

`Risk ${risk.level}`

);








// -------------------------------
// Choose possible action
// -------------------------------


const action =
this.chooseAction(
reasoning,
risk,
personalFit
);



judgementLog.push(

`Chosen action ${action}`

);







const failures =
this.findFailures(
memories
);


const successes =
this.findSuccess(
memories
);









// =================================
// NOT ENOUGH KNOWLEDGE
// =================================


if(

confidence < 50 &&
memories.length < 3

){


return this.wait({

confidence,

priority:"medium",

reason:
"Emma needs more experience before acting.",

judgementLog

});


}










// =================================
// PREVENT OLD MISTAKES
// =================================


if(

this.matchesPastFailure(
action,
failures
)

){


return this.wait({

confidence,

priority:"high",

reason:
"Emma remembers this approach failed before.",

lesson:
failures.slice(0,3),

judgementLog


});


}









// =================================
// PERSONAL CONFLICT
// =================================


if(personalFit.warning){


return {


shouldAct:false,

action,

mode:"advise",

confidence,

priority:"medium",

needsApproval:false,

reason:
personalFit.warning,

judgementLog,

createdAt:
new Date()


};


}










// =================================
// IMPORTANT PERSON SAFETY
// =================================


if(

relationshipRisk.important &&
risk.level==="high"

){


return {


shouldAct:true,

action,

mode:"prepare",

needsApproval:true,

confidence,

priority:"high",

reason:
"Important relationship detected. Emma prepared action but wants confirmation.",

judgementLog,

createdAt:new Date()


};


}









// =================================
// CAPABILITY CHECK
// =================================


const capability =
capabilities.find(

c=>c.name===action

);




if(!capability){


return {


shouldAct:false,


action,


mode:"recommend",


confidence,


priority:
risk.priority,


needsApproval:false,


reason:
"Emma recommends this action but has no executor.",


judgementLog,


createdAt:new Date()


};


}










// =================================
// ACTION RISK
// =================================


const actionRisk =
this.calculateRisk(

capability,

reasoning,

memories

);





if(actionRisk > confidence){


return this.wait({

confidence,

priority:risk.priority,

reason:
"Action risk is higher than Emma confidence.",

judgementLog

});


}









const needsApproval =

capability.requiresApproval ||

actionRisk > 60;









return {


shouldAct:true,


action,


mode:

needsApproval

?

"prepare"

:

"execute",



needsApproval,


confidence,


priority:
risk.priority,


reason:

needsApproval

?

"Emma prepared action and requests approval."

:

"Emma approved action using memory and judgement.",




experienceUsed:
successes.slice(0,3),



judgementLog,



createdAt:

new Date()


};



}










// =================================
// RELATIONSHIP UNDERSTANDING
// =================================


evaluateRelationship(
relationships=[]
){



if(relationships.length===0){


return {

level:"unknown",

important:false

};

}



const interactions =

relationships.reduce(

(total,p)=>

total +

(p.interactions || 0),

0

);





return {


level:

interactions>5

?

"strong"

:

"known",



important:

interactions>=3


};


}










// =================================
// PERSONAL FIT
// =================================


evaluatePersonalFit(
reasoning,
identity
){


let score=50;

let warning=null;



const text =
JSON.stringify(reasoning)
.toLowerCase();




if(identity.goals?.length){

score+=20;

}



if(identity.preferences?.length){

score+=15;

}




if(identity.workingStyle?.length){

score+=15;

}





if(

text.includes("start new") &&

JSON.stringify(identity)
.toLowerCase()
.includes("fast")

){


warning =

"Emma knows speed matters, but suggests checking existing priorities first.";


}





return {

score,

warning

};


}









// =================================
// RISK DETECTION
// =================================


detectRisk(reasoning){


const text =
JSON.stringify(reasoning)
.toLowerCase();




if(

text.includes("cancel") ||

text.includes("loss") ||

text.includes("problem") ||

text.includes("risk")

){


return {

level:"high",

priority:"high"

};


}






if(

text.includes("growth") ||

text.includes("opportunity")

){


return {

level:"medium",

priority:"medium"

};


}





return {

level:"low",

priority:"low"

};


}









// =================================
// ACTION CHOICE
// =================================


chooseAction(
reasoning,
risk,
personalFit
){



if(
reasoning.recommendation?.action
){

return reasoning.recommendation.action;

}




if(personalFit.score>=80){

return "PERSONAL_GUIDANCE";

}




if(risk.level==="high"){

return "PROTECT";

}




return "CONTINUE_LEARNING";


}










findSuccess(memories){


return memories.filter(

m=>m.memory?.success===true

);


}




findFailures(memories){


return memories.filter(

m=>m.memory?.success===false

);


}







matchesPastFailure(
action,
failures
){


return failures.some(f=>


JSON.stringify(f)

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



if(skill.risk==="medium"){

risk+=20;

}



if(skill.risk==="high"){

risk+=50;

}



if(reasoning.confidence>80){

risk-=20;

}



if(memories.length>5){

risk-=10;

}




return Math.max(
risk,
0
);


}










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


mode:"observe",


confidence,


priority,


needsApproval:false,


reason,


lesson,


judgementLog,


createdAt:new Date()


};


}



}



export default EmmaJudgement;