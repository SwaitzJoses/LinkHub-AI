// EmmaJudgement.js
// Emma's wisdom layer
//
// PURPOSE:
// Decide if a thought should become action.
//
// RULE:
//
// Reasoning thinks.
// Judgement decides.
// Executor acts.
//
// Judgement must be calm.
// Never crash because one organ gives different format.


class EmmaJudgement {



// ==============================
// WAKE
// ==============================


constructor(){


console.log(
"⚖️ Emma Judgement Engine online"
);


}









// ==============================
// NORMALIZE CAPABILITIES
// ==============================


normalizeCapabilities(
capabilities
){



if(
Array.isArray(capabilities)
){


return capabilities;


}





if(
typeof capabilities === "object" &&
capabilities !== null
){



return Object.keys(
capabilities
)
.map(name=>{


const value =
capabilities[name];



if(
typeof value === "object"
){


return {


name,

...value


};


}




return {


name,

available:

!!value,


risk:

"low",


requiresApproval:

false


};



});


}




return [];


}









// =================================
// MAIN JUDGEMENT
// =================================


async judge(
reasoning={},
memory={},
capabilities=[]
){



console.log(
"⚖️ Emma judging...",
reasoning
);




// make sure capabilities are usable

capabilities =

this.normalizeCapabilities(
capabilities
);







let confidence =

reasoning?.confidence ||

50;





if(
confidence <= 1
){


confidence =

Math.round(
confidence * 100
);


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









let judgementLog =
[];




judgementLog.push(

`Confidence ${confidence}%`

);









// ==============================
// RELATIONSHIP
// ==============================


const relationshipRisk =

this.evaluateRelationship(

relationships

);





judgementLog.push(

`Relationship importance: ${relationshipRisk.level}`

);










// ==============================
// PERSONAL FIT
// ==============================


const personalFit =

this.evaluatePersonalFit(

reasoning,

identity

);






judgementLog.push(

`Personal fit ${personalFit.score}`

);










// ==============================
// RISK
// ==============================


const risk =

this.detectRisk(

reasoning

);





judgementLog.push(

`Risk ${risk.level}`

);










// ==============================
// ACTION
// ==============================


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










// ==============================
// NEED EXPERIENCE
// ==============================


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










// ==============================
// AVOID FAILED PATTERNS
// ==============================


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

"Emma remembers this failed before.",


lesson:

failures.slice(0,3),


judgementLog



});



}










// ==============================
// PERSONAL CONFLICT
// ==============================


if(
personalFit.warning
){



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










// ==============================
// IMPORTANT + RISKY
// ==============================


if(

relationshipRisk.important &&

risk.level === "high"

){



return {



shouldAct:true,


action,


mode:"prepare",


needsApproval:true,


confidence,


priority:"high",


reason:

"Important relationship detected. Approval needed.",


judgementLog,


createdAt:

new Date()



};



}










// ==============================
// CAPABILITY CHECK
// ==============================


const capability =

capabilities.find(

c =>

c.name === action

);







if(
!capability
){



return {



shouldAct:false,


action,


mode:"recommend",


confidence,


priority:

risk.priority,


needsApproval:false,


reason:

"Emma understands but has no executor for this action.",


judgementLog,


createdAt:

new Date()



};



}

// ==============================
// ACTION RISK
// ==============================


const actionRisk =

this.calculateRisk(

capability,

reasoning,

memories

);






if(

actionRisk > confidence

){



return this.wait({



confidence,


priority:

risk.priority,


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

successes.slice(

0,

3

),




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



if(

!relationships ||

relationships.length === 0

){



return {



level:

"unknown",



important:

false



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


interactions > 5


?


"strong"


:


"known",






important:


interactions >= 3



};



}











// =================================
// PERSONAL FIT
// =================================


evaluatePersonalFit(
reasoning={},
identity={}
){



let score =
50;



let warning =
null;






const text =

JSON.stringify(

reasoning

)

.toLowerCase();








if(

identity.goals?.length

){


score += 20;


}







if(

identity.preferences?.length

){


score += 15;


}







if(

identity.workingStyle?.length

){


score += 15;


}









if(


text.includes(

"start new"

) &&


JSON.stringify(

identity

)

.toLowerCase()

.includes(

"fast"

)


){



warning =

"Emma knows speed matters, but suggests checking priorities first.";



}








return {


score,


warning


};



}











// =================================
// RISK DETECTION
// =================================


detectRisk(
reasoning={}
){





const text =

JSON.stringify(

reasoning

)

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
reasoning={},
risk,
personalFit
){





if(

reasoning.recommendation?.action

){



return reasoning.recommendation.action;



}








if(

personalFit.score >= 80

){



return "PERSONAL_GUIDANCE";



}








if(

risk.level === "high"

){



return "PROTECT";



}








return "CONTINUE_LEARNING";



}











// =================================
// FIND SUCCESS
// =================================


findSuccess(
memories=[]
){



return memories.filter(

m =>


m.memory?.success === true


);



}











// =================================
// FIND FAILURES
// =================================


findFailures(
memories=[]
){



return memories.filter(

m =>


m.memory?.success === false


);



}











// =================================
// PAST FAILURE CHECK
// =================================


matchesPastFailure(
action,
failures=[]
){





if(

!action

){


return false;


}








return failures.some(

failure =>



JSON.stringify(

failure

)

.toLowerCase()

.includes(

action.toLowerCase()

)



);



}











// =================================
// CALCULATE ACTION RISK
// =================================


calculateRisk(
skill={},
reasoning={},
memories=[]
){



let risk =
30;






if(

skill.risk === "medium"

){


risk += 20;


}







if(

skill.risk === "high"

){


risk += 50;


}








if(

reasoning.confidence > 80

){


risk -= 20;


}








if(

memories.length > 5

){


risk -= 10;


}








return Math.max(

risk,

0

);



}











// =================================
// WAIT / OBSERVE
// =================================


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



createdAt:

new Date()



};



}




}








export default EmmaJudgement;