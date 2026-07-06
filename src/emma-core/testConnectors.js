// testConnectors.js
// Emma Day 11 Integration Test
//
// Testing:
// External World → Emma → Connectors → Brain Loop


import Emma
from "./Emma";






async function testConnectors(){



console.log(
"🧪 Testing Emma full nervous system..."
);









// ==============================
// TEST 1
// Gmail Sense
// ==============================


const gmailResult =

await Emma.experience(
"gmail",
{


from:
"founder@test.com",


subject:
"Need AI assistant demo",


message:
"I saw Emma. Can you show me how she can help my company?",


time:
new Date()


}
);





console.log(
"📧 Gmail Emma Response:",
gmailResult
);










// ==============================
// TEST 2
// Calendar Sense
// ==============================


const calendarResult =

await Emma.experience(
"calendar",
{


title:
"Investor meeting",


description:
"Discuss Emma AI roadmap and growth plan",


start:
new Date(),


people:[
"investor@test.com"
]


}
);





console.log(
"📅 Calendar Emma Response:",
calendarResult
);












// ==============================
// TEST 3
// Drive Sense
// ==============================


const driveResult =

await Emma.experience(
"drive",
{


name:
"Emma Roadmap.pdf",


type:
"pdf",


content:
"Roadmap document covering connectors, memory and AI assistant vision",


createdAt:
new Date()


}
);






console.log(
"📁 Drive Emma Response:",
driveResult
);












// ==============================
// TEST 4
// Browser Sense
// ==============================


const browserResult =

await Emma.experience(
"browser",
{


url:
"https://example.com",


title:
"Researching AI personal assistants",


content:
"Studying AI agents, memory systems and automation workflows",


time:
new Date()


}
);






console.log(
"🌐 Browser Emma Response:",
browserResult
);











// ==============================
// FINAL STATUS
// ==============================


console.log(
"🤍 Emma Status:",
Emma.status()
);





console.log(
"🎉 DAY 11 CONNECTOR TEST COMPLETE"
);



}





testConnectors();