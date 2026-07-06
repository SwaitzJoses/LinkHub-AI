// EmmaConnectorManager.js
// Emma's nervous system
//
// External World
//        ↓
// Connectors (senses)
//        ↓
// Nervous System
//        ↓
// Universal Translator
//        ↓
// Emma Brain
//
// RULE:
// Connectors collect.
// Manager routes.
// Translator converts.
// Emma thinks.



import LinkHubConnector
from "./LinkHubConnector";


import GmailConnector
from "./GmailConnector";


import DriveConnector
from "./DriveConnector";


import CalendarConnector
from "./CalendarConnector";


import BrowserConnector
from "./BrowserConnector";



import UniversalTranslator
from "../translators/UniversalTranslator";


import EmmaBrain
from "../EmmaBrain";









class EmmaConnectorManager {




constructor(){



console.log(
"🔌 Emma nervous system online"
);



this.connectors = {};



this.translator =
new UniversalTranslator();







// ==============================
// REGISTER EMMA SENSES
// ==============================


this.register(
new LinkHubConnector()
);



this.register(
new GmailConnector()
);



this.register(
new DriveConnector()
);



this.register(
new CalendarConnector()
);



this.register(
new BrowserConnector()
);



}












// ==============================
// ADD NEW SENSE
// ==============================


register(connector){



if(!connector.source){


throw new Error(
"Sense must have a source name"
);


}




this.connectors[
connector.source
] = connector;





console.log(
`👁️ Sense connected: ${connector.source}`
);



}












// ==============================
// REMOVE SENSE
// ==============================


disconnect(source){



delete this.connectors[
source
];




console.log(
`❌ Sense disconnected: ${source}`
);



}












// ==============================
// RECEIVE WORLD SIGNAL
// ==============================


async receive(
source,
rawData
){



console.log(
"🌎 World signal detected:",
source
);






const connector =

this.connectors[
source
];







if(!connector){



throw new Error(
`Emma has no ${source} sense`
);



}









// ==============================
// 1. CONNECTOR STAGE
// ==============================
// Sense only.
// No thinking.


const cleanSignal =

await connector.receive(
rawData
);









const nerveSignal = {



source:

cleanSignal.source,




type:

cleanSignal.type,




timestamp:

new Date()
.toISOString(),




payload:

cleanSignal.payload ||
cleanSignal.data,






meta:{



path:

`${source} → nervous_system → translator → brain`,




processedBy:

"EmmaConnectorManager"




}



};









console.log(
"🧬 Signal travelling:",
nerveSignal
);









// ==============================
// 2. TRANSLATION STAGE
// ==============================


const emmaSignal =

await this.translator.translate(
nerveSignal
);









console.log(
"🌎 Emma language created:",
emmaSignal
);










// ==============================
// 3. CONSCIOUSNESS STAGE
// ==============================


const experience =

await EmmaBrain.experience(
emmaSignal
);










console.log(
"🧠 Emma experienced reality:",
experience
);








return experience;



}











// ==============================
// SYNC PAST EXPERIENCE
// ==============================


async sync(
source,
items=[]
){



const connector =

this.connectors[
source
];




if(!connector){


return [];


}





return await connector.sync(
items
);



}












// ==============================
// AVAILABLE SENSES
// ==============================


getConnectors(){



return Object.values(
this.connectors
)
.map(

connector =>

connector.getInfo()

);



}











// ==============================
// WHAT CAN EMMA SEE?
// ==============================


getCapabilities(){



return Object.values(
this.connectors
)
.flatMap(

connector =>

connector.getCapabilities()

);



}











// ==============================
// BODY HEALTH CHECK
// ==============================


async healthCheck(){



return await Promise.all(


Object.values(
this.connectors
)
.map(

connector =>

connector.testConnection()

)


);



}












// ==============================
// STATUS
// ==============================


status(){



return {



state:

"Emma senses connected to brain",




connected:

Object.keys(
this.connectors
),




count:

Object.keys(
this.connectors
).length,




capabilities:

this.getCapabilities()




};



}



}









export default EmmaConnectorManager;