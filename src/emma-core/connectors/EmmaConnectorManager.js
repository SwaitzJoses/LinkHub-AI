// EmmaConnectorManager.js
// Emma's nervous system
// Manages all external senses
// Platforms → Connectors → Emma Events


import LinkHubConnector
from "./LinkHubConnector";



class EmmaConnectorManager {


constructor(){


console.log(
"🔌 Emma Connector Manager ready"
);



this.connectors = {};



// Register default connectors

this.register(
new LinkHubConnector()
);



}









// ==============================
// Add a connector
// ==============================


register(
connector
){



if(
!connector.source
){

throw new Error(
"Connector must have a source name"
);

}




this.connectors[
connector.source
] = connector;




console.log(

`✅ Connector added: ${connector.source}`

);



}












// ==============================
// Remove connector
// ==============================


disconnect(
source
){



delete this.connectors[
source
];



console.log(

`❌ Connector removed: ${source}`

);



}












// ==============================
// Receive activity
// from any platform
// ==============================


receive(
source,
data
){



const connector =

this.connectors[
source
];






if(!connector){



throw new Error(

`No connector found for ${source}`

);



}








const event =

connector.createEvent(
data
);






console.log(
"📡 Emma received event:",
event
);






return event;



}











// ==============================
// Sync many events
// ==============================


sync(
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
// Get all active connectors
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
// What can Emma see?
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
// Health check
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




}




export default EmmaConnectorManager;