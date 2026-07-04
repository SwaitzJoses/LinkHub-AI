// LinkHubConnector.js

import EmmaEvent
from "../EmmaEvent";


class LinkHubConnector {


 constructor(){

  console.log(
   "🔗 LinkHub Connector ready"
  );

 }



 createEvent(data){


  return EmmaEvent.create({


   source:
    "linkhub",


   businessId:
    data.businessId,


   type:
    data.type ||
    "business_activity",


   object:
    data.object,


   data:data


  });


 }


}


export default LinkHubConnector;