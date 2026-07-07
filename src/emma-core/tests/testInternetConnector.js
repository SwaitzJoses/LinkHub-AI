// testInternetConnector.js
// Testing Emma's Internet sense 🌎


import Emma from "../Emma";


async function test(){


console.log(
"🌎 Testing Internet signal..."
);




const response =
await Emma.experience(

"internet",

{


topic:
"AI employees are growing",



category:
"Artificial Intelligence",



summary:
"Founders and companies are exploring AI agents to improve productivity.",




people:[

{

name:"Example Founder",

company:"Future AI Startup",

need:"Looking for AI workflow automation"

}

],




companies:[

{

name:"Example Company",

interest:"AI productivity tools"

}

],




links:[

"https://example.com/article"

]


}

);






console.log(
"Emma response:",
response
);


}




test();