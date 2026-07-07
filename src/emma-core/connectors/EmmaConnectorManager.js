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
// Emma
//
// RULE:
//
// Connectors collect.
// Manager routes.
// Translator converts.
// Emma decides attention.
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


import InternetConnector
from "./InternetConnector";



import UniversalTranslator
from "../translators/UniversalTranslator";









class EmmaConnectorManager {




// ==============================
// INITIALIZE NERVOUS SYSTEM
// ==============================


constructor(){



console.log(
"🔌 Emma nervous system online"
);




this.connectors =
{};




this.translator =
new UniversalTranslator();







// ==============================
// CONNECT SENSES
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



this.register(
new InternetConnector()
);



}









// ==============================
// REGISTER NEW SENSE
// ==============================


register(
connector
){



const source =

connector.source ||

connector.name;





if(
!source
){



throw new Error(

"Sense must have a source name"

);



}







this.connectors[
source
] =
connector;







console.log(

`👁️ Sense connected: ${source}`

);



}









// ==============================
// REMOVE SENSE
// ==============================


disconnect(
source
){



delete this.connectors[
source
];




console.log(

`❌ Sense disconnected: ${source}`

);



}










// ==============================
// RECEIVE SIGNAL FROM WORLD
// ==============================
//
// IMPORTANT:
//
// This does NOT call EmmaBrain.
//
// Eyes don't think.
// Nerves don't think.
//
// Emma decides what deserves thought.
//
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






if(
!connector
){



throw new Error(

`Emma has no ${source} sense`

);



}









// ==============================
// 1. CONNECTOR STAGE
// ==============================


let cleanSignal;






if(
connector.receive
){



cleanSignal =

await connector.receive(
rawData
);



}




else if(
connector.collect
){



cleanSignal =

await connector.collect(
rawData
);



}




else {



throw new Error(

`${source} connector cannot receive`

);



}










const nerveSignal =
{



source:

cleanSignal.source ||
source,






type:

cleanSignal.type ||
"UNKNOWN_SIGNAL",







timestamp:

new Date()
.toISOString(),








payload:

cleanSignal.payload ||

cleanSignal.data ||

{},








meta:{



path:

`${source} → nervous_system → translator → Emma`,






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
// 3. RETURN TO EMMA
// ==============================
//
// STOP HERE.
//
// Emma.js continues:
//
// Attention
// Observer
// Reflection
// Memory
// Wisdom
//
// ==============================



console.log(

"📨 Signal delivered to Emma"

);







return emmaSignal;



}









// ==============================
// SYNC OLD DATA
// ==============================


async sync(
source,
items=[]
){



const connector =

this.connectors[
source
];





if(
!connector ||
!connector.sync
){



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
.map(connector => {




if(
connector.getInfo
){


return connector.getInfo();


}






return {



source:

connector.source ||
connector.name,





type:

connector.type,





active:true



};



});



}









// ==============================
// CAPABILITIES
// ==============================


getCapabilities(){



return Object.values(

this.connectors

)
.flatMap(connector=>{






if(
connector.getCapabilities
){



return connector.getCapabilities();



}





return [];



});



}










// ==============================
// HEALTH CHECK
// ==============================


async healthCheck(){



return await Promise.all(




Object.values(
this.connectors
)
.map(connector=>{






if(
connector.testConnection
){



return connector.testConnection();



}







return {



source:

connector.source ||
connector.name,




healthy:true




};



})



);



}









// ==============================
// STATUS
// ==============================


status(){



return {



state:

"Emma senses connected",






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