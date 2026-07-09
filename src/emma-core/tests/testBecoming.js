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
