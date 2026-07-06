// GmailConnector.js
// Emma's first real-world sense: Gmail
//
// RULE:
// Gmail does not think.
// Gmail only reports what it sees.

import BaseConnector from "./BaseConnector";


class GmailConnector extends BaseConnector {


constructor(){

super("gmail");


console.log(
"📧 Gmail connector awake"
);

}



// Emma receives mail signals here
async collect(email){


return this.normalize({

source:"gmail",

event:"email_received",

createdAt:
new Date(),


payload:{


from:
email.from,


subject:
email.subject,


message:
email.message


}


});


}



}


export default GmailConnector;