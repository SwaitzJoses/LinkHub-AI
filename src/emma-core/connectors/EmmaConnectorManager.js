// EmmaConnectorManager.js
// Emma's nervous system
//
// RULE:
//
// Connectors collect.
// Manager routes.
// Translator converts.
// Emma decides.
// Emma thinks.
//
// Manager is NOT the brain.
// Manager only keeps senses alive.


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



// Emma callback

this.emmaReceiver =
null;




this.loadDefaultConnectors();


}









// ==============================
// CONNECT TO EMMA CORE
// ==============================


attachEmma(callback){


this.emmaReceiver =
callback;


console.log(
"🧠 Nervous system connected to Emma brain"
);


}









// ==============================
// LOAD DEFAULT CONNECTORS
// ==============================


loadDefaultConnectors(){



const senses =
[

new LinkHubConnector(),

new GmailConnector(),

new DriveConnector(),

new CalendarConnector(),

new BrowserConnector(),

new InternetConnector()

];



senses.forEach(

sense =>

this.register(sense)

);



}









// ==============================
// REGISTER SENSE
// ==============================


register(connector){



const source =

connector.source ||

connector.name;




if(!source){


throw new Error(
"Connector needs a source"
);


}




this.connectors[source] =
connector;




console.log(

`👁️ Sense connected: ${source}`

);



}










// ==============================
// START ALL LIVING SENSES
// ==============================


startSenses(){



console.log(
"🌎 Emma opening senses..."
);




Object.values(
this.connectors
)
.forEach(connector=>{





// heartbeat based connectors

if(
connector.startWatching
){



connector.startWatching(

async(signal)=>{



console.log(

`⚡ ${connector.source} detected change`

);





const emmaSignal =

await this.receive(

connector.source,

signal

);





if(
this.emmaReceiver
){


await this.emmaReceiver(

emmaSignal

);


}




}



);



}



});




console.log(
"✅ All available senses running"
);



}









// ==============================
// STOP SENSE
// ==============================


disconnect(source){



const connector =
this.connectors[source];




if(
connector?.stopWatching
){


connector.stopWatching();


}




if(connector){


delete this.connectors[source];


}



console.log(

`❌ Sense removed: ${source}`

);



}









// ==============================
// RECEIVE WORLD SIGNAL
// ==============================


async receive(
source,
rawData={}
){



console.log(

"🌎 Signal arrived:",

source

);



const connector =
this.connectors[source];




if(!connector){


throw new Error(

`Emma does not have ${source} sense`

);


}






try{



let collected;




if(connector.receive){



collected =

await connector.receive(

rawData

);



}



else if(connector.collect){



collected =

await connector.collect(

rawData

);



}



else{


throw new Error(

`${source} cannot collect`

);


}









const nerveSignal =
{


source:

collected.source ||

source,



type:

collected.type ||

"UNKNOWN_SIGNAL",



createdAt:

new Date()
.toISOString(),



payload:

collected.data ||

collected.payload ||

collected,




meta:{


route:

`${source} → manager → translator → Emma`,


connector:

connector.name || source,


processedBy:

"EmmaConnectorManager"


}



};






console.log(
"⚡ Nerve signal created"
);






const emmaSignal =

await this.translator.translate(

nerveSignal

);






console.log(
"📨 Delivered to Emma"
);




return emmaSignal;



}




catch(error){



console.error(

"❌ Connector error:",

error

);




return {


source,


type:

"CONNECTOR_ERROR",


error:

error.message,


createdAt:

new Date()
.toISOString()


};



}



}










// ==============================
// ASK ALL SENSES
// ==============================


async collectFromAll(){



const signals =
[];




for(
const source in this.connectors
){



const connector =
this.connectors[source];




if(
connector.active === false
){

continue;

}




try{



if(connector.collect){



const signal =

await this.receive(

source,

{}

);



signals.push(
signal
);



}



}


catch(error){


console.warn(

`${source} skipped`

);


}



}




return signals;



}










// ==============================
// SYNC HISTORY
// ==============================


async sync(
source,
items=[]
){



const connector =
this.connectors[source];



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
// GET CONNECTORS
// ==============================


getConnectors(){



return Object.values(

this.connectors

)
.map(connector=>{



return connector.getInfo

?

connector.getInfo()

:

{


source:

connector.source,


type:

connector.type,


active:

true


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


return connector.getCapabilities

?

connector.getCapabilities()

:

[];


});



}










// ==============================
// HEALTH CHECK
// ==============================


async healthCheck(){



return Promise.all(



Object.values(

this.connectors

)
.map(connector=>{



return connector.testConnection

?

connector.testConnection()

:

{


source:

connector.source,


status:

"unknown"


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

"Emma nervous system active",



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