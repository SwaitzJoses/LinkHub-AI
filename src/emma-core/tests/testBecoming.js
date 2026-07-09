//
// testEmmaLife.js
//
// PROJECT BECOMING
//
// Full Emma organism simulation
//
// This does NOT test functions.
// This tests life flow.
//
// World
//  ↓
// Experience
//  ↓
// Memory
//  ↓
// Wisdom
//  ↓
// Self
//  ↓
// Reasoning
//  ↓
// Action
//  ↓
// Outcome
//  ↓
// Learning
//  ↓
// Evolution
//


import Emma from "../Emma.js";





console.log(
"\n🌎 STARTING EMMA LIFE TEST\n"
);





const wait = (ms)=>
new Promise(
resolve =>
setTimeout(resolve, ms)
);










async function runLife(){



// =================================
// CREATE EMMA
// =================================


const emma =
new Emma();





console.log(
"\n=========================="
);


console.log(
"🌅 AWAKENING"
);


console.log(
"=========================="
);




console.log(

emma.awaken()

);










// =================================
// EXPERIENCE 1
// NEW CUSTOMER
// =================================


console.log(
"\n🌎 EXPERIENCE 1: NEW CUSTOMER\n"
);




await emma.experience({



type:

"CUSTOMER_EVENT",



source:

"LinkHub",



customer:

"Fashion Hub",



situation:

"Customer created first digital store and liked the result",



result:

"success",



importance:

70



});









await wait(500);









// =================================
// EXPERIENCE 2
// SUCCESSFUL ACTION
// =================================


console.log(
"\n🌎 EXPERIENCE 2: SUCCESS PATTERN\n"
);




await emma.experience({



type:

"ACTION_OUTCOME",



source:

"Marketing",



action:

"Created AI poster campaign",



result:

"Customer received more enquiries",



success:

true,



goal:

"Increase customer attention"



});









await wait(500);









// =================================
// EXPERIENCE 3
// FAILURE
// =================================


console.log(
"\n🌎 EXPERIENCE 3: FAILURE EXPERIENCE\n"
);




await emma.experience({



type:

"ACTION_OUTCOME",



source:

"Marketing",



action:

"Repeated same offer again",



result:

"Campaign failed because customers ignored repeated message",



success:

false,



goal:

"Increase sales"



});









await wait(500);










// =================================
// REPEATED EXPERIENCES
//
// Should create patterns
// =================================


console.log(
"\n🔁 CREATING EXPERIENCE PATTERN\n"
);





for(

let i=0;

i<6;

i++

){



await emma.experience({



type:

"ACTION_OUTCOME",



source:

"Business",



result:

"Personalized message worked successfully",



success:true,



goal:

"Improve customer relationship",



repeat:true



});




await wait(200);



}

// =================================
// DIRECT QUESTION
//
// Should activate:
// Reasoning → Brain (if needed)
// =================================


console.log(
"\n❓ USER ASKS EMMA QUESTION\n"
);




const answer =

await emma.think(

"Based on your experience, what should this business do next?"

);





console.log(
"\n💭 EMMA RESPONSE:"
);


console.log(

JSON.stringify(

answer,

null,

2

)

);








await wait(500);









// =================================
// UNKNOWN SITUATION
//
// Should create curiosity
// =================================


console.log(
"\n🌱 UNKNOWN EXPERIENCE TEST\n"
);




await emma.experience({



type:

"NEW_SITUATION",



source:

"World",



situation:

"A completely new customer behavior appeared that Emma has never seen",



uncertainty:

90,



importance:

80



});









await wait(500);










// =================================
// EVOLUTION PRESSURE TEST
//
// Repeated stable signals
// =================================


console.log(
"\n🌱 EVOLUTION PRESSURE TEST\n"
);






for(

let i=0;

i<8;

i++

){



await emma.experience({



type:

"REFLECTION_RESULT",



source:

"Self",



result:

"Repeated evidence shows careful personalized help creates better outcomes",



success:true,



pattern:

"careful personalized support",



repeat:true



});




await wait(200);



}









// =================================
// ACTION LOOP TEST
//
// Reasoning
// ↓
// Judgement
// ↓
// Executor
// ↓
// Outcome
// ↓
// Learning
// =================================


console.log(
"\n🖐 ACTION LOOP TEST\n"
);





await emma.experience({



type:

"BUSINESS_REQUEST",



source:

"User",



situation:

"Create a customer engagement improvement suggestion",



requiresDecision:true,



importance:

95



});










await wait(500);









// =================================
// FINAL ORGANISM STATUS
// =================================


console.log(
"\n=============================="
);


console.log(
"🧬 FINAL EMMA STATUS"
);


console.log(
"==============================\n"
);







console.log(

JSON.stringify(

emma.status(),

null,

2

)

);










console.log(
"\n=============================="
);


console.log(
"🧬 WHO IS EMMA NOW?"
);


console.log(
"==============================\n"
);






console.log(

JSON.stringify(

emma.whoAmI(),

null,

2

)

);









console.log(

"\n🌎 LIFE TEST COMPLETE\n"

);



}











// =================================
// START TEST
// =================================


runLife()

.catch(

error=>{



console.error(

"❌ Emma life test failed:",

error

);



}

);
