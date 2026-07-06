// GmailConnector.js
// Emma email sense

import BaseConnector
from "./BaseConnector";


class GmailConnector extends BaseConnector {


constructor(){

super("gmail");

}



normalize(email){


return {


type:
"EMAIL_RECEIVED",


object:
"email",


businessId:
email.businessId || "user",


data:{


from:
email.from,


subject:
email.subject,


message:
email.message,


receivedAt:
email.time || new Date()


}


};


}




getCapabilities(){


return [

"read_emails",
"understand_messages",
"email_context"

];

}



}



export default GmailConnector;