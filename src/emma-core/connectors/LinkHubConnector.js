// LinkHubConnector.js
// LinkHub adapter for Emma
// Converts LinkHub activity into Emma events


import BaseConnector
from "./BaseConnector";




class LinkHubConnector
extends BaseConnector {


constructor(){


super(
"LINKHUB"
);


}









// ==============================
// Convert LinkHub data
// into Emma language
// ==============================


normalize(
data
){



let type =
data.type ||
"BUSINESS_ACTIVITY";



let object =
data.object ||
"general";








// Profile analytics


if(
data.profileViews
||
data.visitorId
){


type =
"PROFILE_VIEW";


object =
"profile";


}









// Product activity


if(
data.productId
||
data.productViews
){



type =
"PRODUCT_INTEREST";


object =
"product";


}









// Customer lead


if(
data.leadId
||
data.phone
||
data.whatsapp
){



type =
"NEW_LEAD";


object =
"customer";


}









// Orders


if(
data.orderId
||
data.orderValue
){



type =
"ORDER_CREATED";


object =
"order";


}










return {



businessId:
data.businessId,



type,



object,



data:{



metrics:{



views:
data.views ||
data.profileViews ||
data.productViews ||
0,




clicks:
data.clicks || 0,




leads:
data.leads || 0,




orders:
data.orders || 0,




revenue:
data.revenue ||
data.orderValue ||
0



},






raw:
data




}



};



}












// ==============================
// Tell Emma what this connector sees
// ==============================


getCapabilities(){



return [


"PROFILE_ANALYTICS",


"PRODUCT_TRACKING",


"LEAD_TRACKING",


"ORDER_TRACKING"


];


}




}




export default LinkHubConnector;