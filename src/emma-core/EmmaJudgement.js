// EmmaJudgement.js
// Emma's wisdom layer
//
// Reasoning
// + Memory
// + Identity
// → Personal Judgement
// → Right Action



class EmmaJudgement {


constructor(){

console.log(
"⚖️ Emma Personal Judgement online"
);

}






// ==============================
// Main judgement engine
// ==============================


async judge(
reasoning,
memory={},
capabilities=[]
){


console.log(
"⚖️ Emma judging with understanding",
{
reasoning,
memory
}
);





let confidence =

reasoning?.confidence || 50;



if(confidence <= 1){

confidence =
Math.round(confidence * 100);

}





const memories =

memory?.relevantExperiences ||

memory?.previousExperiences ||

[];




const identity =

memory?.identity ||

reasoning?.memoryInfluence?.identityUsed ||

{};






let judgementLog=[];



judgementLog.push(

`Confidence: ${confidence}%`

);






// ==============================
// Understand person first
// ==============================


const personalFit =

this.evaluatePersonalFit(

reasoning,

identity

);




judgementLog.push(

`Personal fit: ${personalFit.score}`

);






// ==============================
// Risk understanding
// ==============================


const risk =

this.detectRisk(

reasoning

);





judgementLog.push(

`Risk level: ${risk.level}`

);







// ==============================
// Decide action
// ==============================


const desiredAction =

this.chooseAction(

reasoning,

risk,

personalFit

);






judgementLog.push(

`Decision: ${desiredAction}`

);








const failures =

this.findFailures(memories);



const successes =

this.findSuccess(memories);









// ==============================
// Not enough understanding
// ==============================


if(

confidence < 45

){


return this.wait({


confidence,


priority:risk.priority,


reason:

"Emma needs to understand more before giving strong judgement.",


judgementLog


});


}









// ==============================
// Avoid old mistakes
// ==============================


if(

this.matchesPastFailure(

desiredAction,

failures

)

){



return this.wait({


confidence,


priority:"medium",


reason:

"Emma remembers a similar mistake and avoids repeating it.",



lesson:

failures.slice(0,3),



judgementLog


});


}











// ==============================
// Identity conflict check
// ==============================


if(

personalFit.warning

){


return {


shouldAct:false,


action:null,


mode:"advise",


confidence,


priority:"high",


needsApproval:false,


reason:

personalFit.warning,


judgementLog,


createdAt:new Date()


};


}











// ==============================
// Capability check
// ==============================


const skill =

capabilities.find(

c => c.name === desiredAction

);






if(!skill){


return {


shouldAct:false,


action:desiredAction,


mode:"recommend",


confidence,


priority:risk.priority,


needsApproval:false,


reason:

"Emma understands the situation and recommends this action.",



judgementLog,


createdAt:new Date()


};


}











// ==============================
// Execution risk
// ==============================


const actionRisk =

this.calculateRisk(

skill,

reasoning,

memories

);







if(

actionRisk > confidence

){


return this.wait({


confidence,


priority:risk.priority,


reason:

"Emma thinks action risk is higher than confidence.",



judgementLog


});


}









const needsHuman =

skill.requiresApproval ||

actionRisk > 60;








if(needsHuman){


return {


shouldAct:true,


action:desiredAction,


mode:"prepare",


needsApproval:true,


priority:risk.priority,


confidence,


reason:

"Emma prepared the action but wants confirmation.",



experienceUsed:

successes.slice(0,3),



judgementLog,


createdAt:new Date()


};


}









return {


shouldAct:true,


action:desiredAction,


mode:"execute",


needsApproval:false,


priority:risk.priority,


confidence,


reason:

"Emma approved using memory, identity and judgement.",



experienceUsed:

successes.slice(0,3),



judgementLog,


createdAt:new Date()


};



}









// ==============================
// Personal understanding
// ==============================


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



if(identity.workingStyle?.length){

score+=15;

}





// example:
 // fast builders adding too much

if(

text.includes("new") &&

JSON.stringify(identity)

.toLowerCase()

.includes("fast execution")

){


warning =

"Emma knows you move fast. Before starting something new, check if current priorities are complete.";


}




return {

score,

warning

};


}









// ==============================
// Risk detection
// ==============================


detectRisk(reasoning){


const text =

JSON.stringify(reasoning)
.toLowerCase();




if(

text.includes("risk") ||

text.includes("loss") ||

text.includes("problem") ||

text.includes("burnout")

){


return {

level:"high",

priority:"high"

};


}




if(

text.includes("opportunity") ||

text.includes("growth")

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









// ==============================
// Choose action
// ==============================


chooseAction(
reasoning,
risk,
personalFit
){



if(

reasoning?.recommendation?.action

){

return reasoning.recommendation.action;

}



if(personalFit.score>70){

return "PERSONAL_GUIDANCE";

}



if(risk.level==="high"){

return "ANALYZE_CAREFULLY";

}



return "CONTINUE_LEARNING";


}









findSuccess(memories){


return memories.filter(m=>

JSON.stringify(m)

.toLowerCase()

.includes("success")

);


}








findFailures(memories){


return memories.filter(m=>{


const text =

JSON.stringify(m)
.toLowerCase();



return (

text.includes("failed") ||

text.includes("mistake") ||

text.includes("avoid")

);


});


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