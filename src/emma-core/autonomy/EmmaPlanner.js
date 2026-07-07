// EmmaPlanner.js
// Emma's planning system
//
// RULE:
// Emma never jumps directly from thought to action.
//
// Thought
// ↓
// Judgement
// ↓
// Permission
// ↓
// PLAN
// ↓
// Action


class EmmaPlanner {


constructor(){


this.templates = {


CUSTOMER_HELP:[

"Review customer history",

"Understand current problem",

"Prepare helpful response",

"Request approval if needed",

"Execute action",

"Watch outcome"


],



GROWTH:[

"Study current performance",

"Find opportunity",

"Create improvement idea",

"Prepare action",

"Measure results"


],



LEARNING:[

"Review experience",

"Find pattern",

"Save lesson",

"Improve future behaviour"


],



GENERAL:[

"Understand goal",

"Prepare solution",

"Execute safely",

"Review result"

]


};



console.log(
"🗺️ Emma Planner online"
);


}









// ================================
// CREATE PLAN
// ================================


async create(request){



const {

goal,

decision,

context,

memories


}=request;





const category =

this.detectCategory(

goal,

context

);






const steps =

this.createSteps(

category,

decision

);






return {


goal:

goal ||

"Improve situation",



category,



steps,



canExecute:

decision.allowed,



requiresApproval:

decision.requiresApproval,



risk:

decision.riskLevel,



createdAt:

new Date()


};



}










// ================================
// CATEGORY DETECTION
// ================================


detectCategory(goal,context){



const text =

JSON.stringify({

goal,

context

}).toLowerCase();






if(

text.includes("customer") ||

text.includes("cancel") ||

text.includes("support")

){

return "CUSTOMER_HELP";

}







if(

text.includes("growth") ||

text.includes("sales") ||

text.includes("traffic") ||

text.includes("marketing")

){

return "GROWTH";

}








if(

text.includes("learn") ||

text.includes("pattern") ||

text.includes("mistake")

){

return "LEARNING";

}







return "GENERAL";



}










// ================================
// BUILD STEPS
// ================================


createSteps(category,decision){



let steps =

[...(this.templates[category] ||

this.templates.GENERAL)];







if(

decision.requiresApproval

){



steps.splice(

steps.length-1,

0,

"Wait for human approval"

);



}









return steps.map(

(step,index)=>{


return {


order:index+1,


task:step,


status:"PENDING"


};


}

);



}










// ================================
// STATUS
// ================================


status(){



return {


state:"ACTIVE",


role:

"Turns Emma decisions into executable plans",



templates:

Object.keys(this.templates)


};



}



}





export default EmmaPlanner;