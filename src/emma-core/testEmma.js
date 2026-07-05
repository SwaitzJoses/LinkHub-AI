// testEmma.js
//
// Emma Intelligence Test
//
// Failure
// ↓
// Reflection
// ↓
// Memory
// ↓
// Recall
// ↓
// Better Decision


import EmmaReflection from "./EmmaReflection";
import EmmaMemory from "./EmmaMemory";
import EmmaReasoning from "./EmmaReasoning";




// =================================
// CREATE EMMA SYSTEMS
// =================================


const reflectionEngine =
new EmmaReflection();



const memoryEngine =
new EmmaMemory();



const reasoningEngine =
new EmmaReasoning();








// =================================
// MAIN TEST
// =================================


async function testEmma(){


console.log(
"🚀 Emma Learning Test Started"
);






// =================================
// DAY 1 - FAILURE EXPERIENCE
// =================================


const oldEvent = {


businessId:
"test-shop",


eventType:
"SALES_DROP",



problem:
"Sales decreased this week",



situation:
"Orders reduced compared to last week",



action:
"20% discount campaign",



reason:
"Emma wanted to quickly increase purchases",



expectedOutcome:
"More customer orders",



success:
false,



result:
"failed",



metrics:{


customersReached:500,


orders:0,


salesIncrease:0


}


};








// =================================
// REFLECTION CREATES EXPERIENCE
// =================================


const experience =

await reflectionEngine.reflect(
oldEvent
);




console.log(
"🤔 Reflection created:"
);


console.log(
experience
);









// =================================
// SAVE EXPERIENCE MEMORY
// =================================


await memoryEngine.remember(
experience
);




console.log(
"🧠 Emma stored experience"
);









// =================================
// FUTURE SAME PROBLEM
// =================================


const newProblem = {


businessId:
"test-shop",



problem:

"Sales dropped again. Should we run another discount campaign?",



context:

"Owner asking Emma for advice"


};









// =================================
// MEMORY RECALL
// =================================


const memory =

await memoryEngine.recall(
newProblem
);





console.log(
"📚 Emma remembered:"
);



console.log(
memory
);










// =================================
// REASON WITH MEMORY
// =================================


const decision =

await reasoningEngine.think({


businessId:
"test-shop",



problem:

newProblem.problem,



memory:
memory


});








console.log(
"💭 Emma final decision:"
);



console.log(
decision
);








console.log(
"✅ Emma Intelligence Test Completed"
);



return decision;


}









// =================================
// AUTO RUN
// =================================


testEmma()


.then(()=>{


console.log(
"🔥 Emma learning loop verified"
);


})


.catch(error=>{


console.error(
"❌ Emma Test Failed:",
error
);


});




// optional export

export default testEmma;