// GmailConnector.js
// Emma's first real-world sense: Gmail
//
// RULE:
// Gmail does not think.
// Gmail does not judge.
// Gmail does not decide importance.
//
// Gmail only observes and reports clean signals.
//
// External World
//      ↓
// GmailConnector
//      ↓
// EmmaConnectorManager
//      ↓
// UniversalTranslator
//      ↓
// Emma Brain


import BaseConnector from "./BaseConnector";


class GmailConnector extends BaseConnector {


constructor(){

super("gmail");


console.log(
"📧 Gmail connector awake"
);

}



// --------------------------------------------------
// Extract WHO created the signal
// --------------------------------------------------

extractPerson(email){


return {

name:
email.fromName ||
email.name ||
"Unknown",


email:
email.fromEmail ||
email.from ||
"unknown",


source:
"gmail"

};


}



// --------------------------------------------------
// Extract message content only
// No understanding here
// --------------------------------------------------

extractContent(email){


return {


subject:
email.subject || "",


message:
email.message ||
email.body ||
"",


snippet:
email.snippet ||
null


};


}



// --------------------------------------------------
// Keep Gmail technical information
// --------------------------------------------------

extractMetadata(email){


return {


gmailId:
email.id || null,


threadId:
email.threadId || null,


labels:
email.labels || [],


attachments:
email.attachments || [],


receivedAt:
email.receivedAt ||
new Date()


};


}



// --------------------------------------------------
// Convert Gmail world → Emma signal
// --------------------------------------------------

async collect(email){



const signal = {


source:
"gmail",


event:
"email_received",


createdAt:
new Date(),


// WHO
person:
this.extractPerson(email),


// WHAT
content:
this.extractContent(email),


// RAW CONTEXT
metadata:
this.extractMetadata(email)



};



// BaseConnector normalization
return this.normalize(signal);



}



}


export default GmailConnector;