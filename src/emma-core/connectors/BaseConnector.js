// BaseConnector.js
// Emma universal connector foundation
//
// Connectors are Emma's senses.
//
// RULE:
// Connectors do NOT think.
// Connectors do NOT decide.
// Connectors do NOT create Emma intelligence.
//
// Their only job:
// External World → Clean Signal → Emma Pipeline


class BaseConnector {


constructor(source){


if(!source){

throw new Error(
"Connector requires a source name"
);

}


this.source = source;



console.log(
`🔌 ${source} connector initialized`
);


}









// =================================
// RECEIVE EXTERNAL DATA
// =================================
//
// Example:
// Gmail API
// Calendar API
// Browser Activity
// Drive Files
//
// Output:
// Clean connector signal only
// =================================


receive(rawData){



console.log(
`🔌 ${this.source} received signal`,
rawData
);





const normalized =

this.normalize(
rawData
);





return {



source:
this.source,




// what happened

type:
normalized.type ||
"ACTIVITY",




// affected thing

object:
normalized.object ||
"general",





// owner/user/company

businessId:
normalized.businessId ||
"user",





// clean useful data

data:
normalized.data ||
normalized,





// preserve original

raw:
rawData,





// connector information

metadata:{


connector:
this.source,


receivedAt:
new Date(),


version:
"1.0"


}



};



}












// =================================
// NORMALIZE PLATFORM DATA
//
// Child connectors override this
//
// GmailConnector
// DriveConnector
// CalendarConnector
// BrowserConnector
//
// =================================


normalize(data){



return {


type:

data.type ||
"ACTIVITY",




object:

data.object ||
"general",





businessId:

data.businessId ||
"user",





data


};



}











// =================================
// BATCH SYNC
// =================================


sync(items=[]){



console.log(
`🔄 ${this.source} syncing ${items.length} items`
);




return items.map(

item =>

this.receive(item)

);



}











// =================================
// HEALTH CHECK
// =================================


testConnection(){



return {


source:
this.source,


connected:
true,


status:
"ONLINE",


checkedAt:
new Date()


};



}











// =================================
// CONNECTOR ABILITIES
//
// Each connector overrides
// =================================


getCapabilities(){


return [];


}











// =================================
// CONNECTOR INFO
// =================================


getInfo(){



return {


source:
this.source,


status:
"ACTIVE",


capabilities:
this.getCapabilities()


};



}



}




export default BaseConnector;