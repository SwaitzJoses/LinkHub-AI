// CalendarConnector.js
// Emma time awareness


import BaseConnector
from "./BaseConnector";


class CalendarConnector extends BaseConnector {


constructor(){

super("calendar");

}



normalize(event){


return {


type:
"CALENDAR_EVENT",


object:
"schedule",


businessId:
event.businessId || "user",


data:{


title:
event.title,


description:
event.description,


start:
event.start,


end:
event.end,


people:
event.people || []


}


};


}




getCapabilities(){


return [

"see_calendar",
"meeting_awareness",
"time_context"

];

}



}



export default CalendarConnector;