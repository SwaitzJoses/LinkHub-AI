// BaseConnector.js
// Emma universal connector foundation
// Every external system must speak Emma's language


import EmmaEvent
from "../EmmaEvent";



class BaseConnector {


constructor(
source
){


if(
!source
){

throw new Error(
"Connector requires a source name"
);

}



this.source =
source;



console.log(
`🔌 ${source} connector initialized`
);


}









// ==============================
// Receive external data
// ==============================


createEvent(
rawData
){



console.log(
`🔌 ${this.source} received data`,
rawData
);







const normalized =

this.normalize(
rawData
);








return EmmaEvent.create({



source:
this.source,




businessId:
normalized.businessId,





type:
normalized.type,





object:
normalized.object,






data:
normalized.data || normalized,






metadata:{



receivedAt:
new Date(),




connector:
this.source



}



});



}












// ==============================
// Convert platform language
// into Emma language
//
// Every connector overrides this
// ==============================


normalize(
data
){


return {

businessId:
data.businessId,



type:
data.type ||
"BUSINESS_ACTIVITY",



object:
data.object ||
"general",



data


};


}













// ==============================
// Batch import
// ==============================


sync(
items=[]
){



console.log(
`🔄 ${this.source} syncing ${items.length} events`
);






return items.map(

item=>

this.createEvent(
item
)

);



}












// ==============================
// Health check
// ==============================


testConnection(){



return {


source:
this.source,


connected:
true,


checkedAt:
new Date()


};



}











// ==============================
// Connector abilities
// ==============================


getCapabilities(){



return [];


}











// ==============================
// Connector information
// ==============================


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