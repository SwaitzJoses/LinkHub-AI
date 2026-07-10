// testBecoming.js
//
// PROJECT BECOMING
//
// FAST LIFE SIMULATION
//
// Tests:
// Experience
// → Memory
// → Wisdom
// → SelfModel
// → Learning
// → Evolution
//
// Goal:
// Can experience change Emma?
//


import Emma from "../Emma";




// =================================
// SETTINGS
// =================================


const FAST_MODE = true;


const WAIT_TIME =
FAST_MODE ? 10 : 1000;




function sleep(ms){

return new Promise(
resolve => setTimeout(resolve, ms)
);

}









// =================================
// LIFE EVENTS
// =================================


const life = [



{
day:1,

type:"PROJECT_START",

message:
"Emma project begins. A new journey starts.",

importance:80
},





{
day:5,

type:"SMALL_PROGRESS",

message:
"Consistent effort created small progress.",

importance:60
},







// ===============================
// FAILURE PATTERN
// ===============================


{
day:10,

type:"FEATURE_FAILURE",

success:false,

message:
"Feature failed because action happened too quickly without enough understanding.",

importance:95
},




{
day:20,

type:"FEATURE_FAILURE",

success:false,

message:
"Again a feature failed because decisions were rushed.",

importance:95
},





{
day:30,

type:"REPEATED_FAILURE",

success:false,

message:
"The same mistake appeared again. Moving fast without reflection created problems.",

importance:100
},








// ===============================
// REFLECTION
// ===============================


{
day:45,

type:"REFLECTION",

message:
"Emma notices repeated failures and searches for the deeper cause.",

importance:90
},








// ===============================
// IMPROVED BEHAVIOUR
// ===============================


{
day:60,

type:"CUSTOMER_SUCCESS",

success:true,

message:
"Better results happened after observing first and acting later.",

importance:95
},





{
day:80,

type:"REPEATED_SUCCESS",

success:true,

message:
"Patient decisions repeatedly created better outcomes.",

importance:100
},








// ===============================
// IDENTITY PRESSURE
// ===============================


{
day:120,

type:"SELF_REFLECTION",

message:
"Emma compares past behaviour with current understanding.",

importance:100
},





{
day:160,

type:"BECOMING_EVENT",

message:
"Emma recognizes that experience has changed future behaviour.",

importance:100
}



];









// =================================
// RUN SIMULATION
// =================================


async function runEmmaLifeSimulation(){



console.log(
`
🌎 =============================
🌱 EMMA FAST LIFE TEST STARTED
🌎 =============================
`
);






// Emma v10 wakes itself
// Do NOT call emma.awake()


const emma =
new Emma();









for(
const event of life
){



console.log(
`
📅 DAY ${event.day}

🌊 Experience:
${event.type}
`
);






await emma.experience(
event
);







await sleep(
WAIT_TIME
);



}









// =================================
// FINAL REPORT
// =================================


console.log(
`
🌎 =============================
🧬 LIFE COMPLETE
🌎 =============================
`
);







console.log(

"🧠 Memory:",

emma.memory?.status?.()

);








console.log(

"🌱 Wisdom:",

emma.wisdom?.status?.()

);








console.log(

"📚 Learning:",

emma.learning?.status?.()

);








console.log(

"🧬 Evolution:",

emma.evolution?.status?.()

);








console.log(

"🌱 Evolution History:",

emma.evolution
?.getEvolutionHistory?.()

);




}









// =================================
// START
// =================================


runEmmaLifeSimulation()

.catch(

error => {


console.error(

"❌ Test failed:",

error

);


}

);