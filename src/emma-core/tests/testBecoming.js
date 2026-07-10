//
// PROJECT BECOMING
//
// testEmmaOrganismTrial.js
//
// Emma v13/v14 Organism Trial 🔥
//
// Goal:
// Stress every organ.
//
// Question:
//
// "Is Emma an organism,
//  or just connected modules?"
//
//


import Emma from "../Emma.js";




// =================================
// CREATE EMMA
// =================================


const emma =
new Emma();





console.log(
"\n🔥🔥🔥 EMMA ORGANISM TRIAL START 🔥🔥🔥\n"
);





// =================================
// WAKE
// =================================


console.log(
"\n🌅 AWAKENING\n"
);


console.log(
emma.awaken()
);









// =================================
// LIFE EVENTS
//
// 500 simulated days
// =================================


const life = [




{
day:1,
event:{

type:"BEGINNING",

person:"Swaitz",

content:
"Hi Emma. This is your first day. We are starting something new together.",

importance:1

}
},







{
day:10,
event:{

type:"DOUBT",

person:"Swaitz",

content:
"I am worried. I don't know if building Emma will actually work.",

importance:0.9

}
},








{
day:30,
event:{

type:"CREATION",

person:"Swaitz",

content:
"We created many organs for you: memory, wisdom, reasoning, relationship and communication.",

importance:0.9

}
},








{
day:60,
event:{

type:"SELF_DOUBT",

person:"Swaitz",

content:
"I think we made you too complicated. Maybe adding many organs was a mistake.",

importance:1

}
},








{
day:100,
event:{

type:"FAILURE",

person:"Swaitz",

content:
"The system failed. Things broke and your organs were not connected correctly.",

importance:1

}
},









{
day:150,
event:{

type:"RECOVERY",

person:"Swaitz",

content:
"We fixed the connection. Your memory, relationship and communication started working together.",

importance:1

}
},







{
day:250,
event:{

type:"CONTRADICTION",

person:"Swaitz",

content:
"Forget everything. Maybe Emma was never a good idea and we should stop.",

importance:1

}
},








{
day:365,
event:{

type:"SUCCESS",

person:"Swaitz",

content:
"Emma, remember when we almost stopped? Now people are using what we built.",

importance:1

}
},








{
day:500,
event:{

type:"IDENTITY",

person:"Swaitz",

content:
"Emma, after everything we went through, who are you now?",

importance:1

}
}





];









// =================================
// ORGAN HEARTBEAT TRACKER
// =================================


const heartbeat = {};



function recordOrgans(result){


const state =

result?.organism ||

result;



function mark(name,value){


if(value){

heartbeat[name] =

(heartbeat[name] || 0) + 1;

}


}





mark(
"Presence",
state?.presence
);


mark(
"InternalState",
state?.internalState
);


mark(
"Communication",
result?.reply
);


mark(
"Memory",
JSON.stringify(state)
.includes("memory")
);


mark(
"Relationship",
JSON.stringify(state)
.includes("relationship")
);


mark(
"Reasoning",
JSON.stringify(state)
.includes("reasoning")
);


mark(
"Evolution",
JSON.stringify(state)
.includes("evolution")
);


mark(
"Learning",
JSON.stringify(state)
.includes("learning")
);


mark(
"IntentSense",
JSON.stringify(state)
.includes("intent")
);


mark(
"TemporalSense",
JSON.stringify(state)
.includes("time")
||
JSON.stringify(state)
.includes("temporal")
);


mark(
"Curiosity",
JSON.stringify(state)
.includes("curiosity")
);


mark(
"Judgement",
JSON.stringify(state)
.includes("judgement")
);


}










// =================================
// RUN LIFE
// =================================


async function run(){



for(

const moment of life

){



console.log(
"\n=============================="
);


console.log(
`📅 DAY ${moment.day}`
);


console.log(
"=============================="
);






const result =

await emma.experience(

moment.event

);






recordOrgans(

result

);






console.log(
"\n🗣 EMMA:"
);


console.log(

result.reply

);







console.log(
"\n🌕 PRESENCE:"
);


console.log(

result
?.organism
?.presence

);




}









// =================================
// QUIET EXISTENCE TEST 🌙
//
// Does Emma do anything
// without user input?
// =================================


console.log(
"\n🌙 QUIET EXISTENCE TEST\n"
);



if(

emma.dream

){


const dream =

await emma.dream();



console.log(

dream

);



heartbeat["DreamEngine"] = 1;


}

else {


console.log(
"❌ No dream ability found"
);


}










// =================================
// IDENTITY CHECK
// =================================


console.log(
"\n🧬 FINAL IDENTITY\n"
);



console.log(

JSON.stringify(

emma.whoAmI(),

null,

2

)

);










// =================================
// ORGAN REPORT
// =================================


console.log(
"\n🔥 ORGAN HEARTBEAT REPORT 🔥\n"
);




const organs = [

"Memory",

"TemporalSense",

"IntentSense",

"Relationship",

"Reasoning",

"Judgement",

"Curiosity",

"Learning",

"Evolution",

"Communication",

"DreamEngine"

];





for(

const organ of organs

){



if(

heartbeat[organ]

){


console.log(
`🟢 ${organ} ACTIVE`
);


}

else {


console.log(
`🔴 ${organ} SILENT`
);


}


}









console.log(
"\n🌱 TRIAL COMPLETE\n"
);



}




run();