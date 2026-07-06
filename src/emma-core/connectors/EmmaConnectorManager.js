// EmmaConnectorManager.js
// Emma's nervous system
//
// External Systems
//        ↓
// Connectors
//        ↓
// Clean Signals
//        ↓
// Emma
//
// RULE:
// Connectors collect.
// Manager routes.
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







class EmmaConnectorManager {



constructor(){


console.log(
"🔌 Emma Connector Manager ready"
);



this.connectors = {};




// ==============================
// REGISTER DEFAULT SENSES
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
// ADD CONNECTOR
// ==============================


register(connector){



if(!connector.source){


throw new Error(
"Connector must have a source name"
);


}




this.connectors[
connector.source
] = connector;




console.log(
`✅ Sense connected: ${connector.source}`
);



}










// ==============================
// REMOVE CONNECTOR
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
// RECEIVE EXTERNAL ACTIVITY
// ==============================


async receive(
source,
rawData
){



console.log(
"🌎 Signal received from:",
source
);





const connector =

this.connectors[
source
];





if(!connector){



throw new Error(
`No connector found for ${source}`
);



}







// Connector only cleans.
// No thinking here.


const signal =

connector.receive(
rawData
);







console.log(
"🔌 Clean signal created:",
signal
);






return signal;



}









// ==============================
// SYNC HISTORY
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





return connector.sync(
items
);



}










// ==============================
// LIST CONNECTORS
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
// EMMA SENSE ABILITIES
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
// HEALTH CHECK
// ==============================


healthCheck(){



return Object.values(
this.connectors
)
.map(

connector =>

connector.testConnection()

);



}









// ==============================
// STATUS
// ==============================


status(){



return {



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