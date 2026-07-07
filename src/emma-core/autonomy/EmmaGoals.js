// EmmaGoals.js
// Emma's self-direction system
//
// RULE:
// Emma should not wait forever.
//
// She periodically asks:
//
// What changed?
// What needs attention?
// What can I improve?
// Who needs help?


class EmmaGoals {


constructor(){


this.activeGoals = [];


this.defaultGoals = [


{
id:"protect_relationships",
priority:"HIGH",
description:
"Notice people who need attention"
},


{
id:"find_opportunities",
priority:"MEDIUM",
description:
"Find possible improvements"
},


{
id:"learn_patterns",
priority:"MEDIUM",
description:
"Learn from past outcomes"
}


];




console.log(
"🎯 Emma Goals online"
);


}










// =====================================
// GENERATE GOALS
// =====================================


async generate(context){



const {


memory,

skills


}=context;






let memories = [];




try{


memories =
await memory.recall({

type:"recent"

});


}

catch(error){


console.warn(

"Emma Goals memory unavailable",

error.message

);


}







const discovered =

this.discover(

memories,

skills

);






this.activeGoals = [

...this.defaultGoals,

...discovered

];







return {


createdAt:new Date(),


count:this.activeGoals.length,


goals:this.activeGoals


};



}












// =====================================
// DISCOVER NEW GOALS
// =====================================


discover(memories,skills){



const goals=[];





const text =

JSON.stringify(memories)

.toLowerCase();








// customer problems


if(

text.includes("cancel") ||

text.includes("unhappy") ||

text.includes("problem")

){



goals.push({


id:

"save_customer",


priority:"HIGH",


reason:

"Emma detected relationship risk",


createdAt:new Date()


});



}









// growth opportunity


if(

text.includes("growth") ||

text.includes("sales") ||

text.includes("traffic")

){



goals.push({


id:

"improve_growth",


priority:"MEDIUM",


reason:

"Emma detected growth opportunity",


createdAt:new Date()


});



}










// repeated failures


if(

text.includes("failed") ||

text.includes("mistake")

){



goals.push({


id:

"avoid_repeating_failure",


priority:"HIGH",


reason:

"Emma remembered previous failure",


createdAt:new Date()


});



}









return goals;



}










// =====================================
// PRIORITY
// =====================================


highestPriority(){



return this.activeGoals.sort(

(a,b)=>{


const level={

HIGH:3,

MEDIUM:2,

LOW:1

};



return (

level[b.priority] -

level[a.priority]

);


}

)[0];



}










// =====================================
// COMPLETE GOAL
// =====================================


complete(id,result){



this.activeGoals =

this.activeGoals.filter(

goal => goal.id !== id

);





return {


completed:id,


result,


finishedAt:new Date()


};



}










// =====================================
// STATUS
// =====================================


status(){



return {


state:"ACTIVE",


role:

"Creates Emma's independent priorities",



activeGoals:

this.activeGoals.length,


goals:this.activeGoals


};



}



}





export default EmmaGoals;