// GmailConnector.js
// Emma's Gmail sense
//
// RULE:
//
// Gmail does not think.
// Gmail does not judge.
// Gmail does not decide.
//
// Gmail only observes changes.
//
// Cheap watching.
// Expensive thinking belongs to Emma.


import BaseConnector
from "./BaseConnector";





class GmailConnector extends BaseConnector {



// ==============================
// WAKE GMAIL SENSE
// ==============================


constructor(){


super(
"gmail"
);



this.type =
"COMMUNICATION";


this.active =
true;





// ==============================
// CONNECTION MEMORY
// ==============================


this.connected =
false;


this.connection =
null;





// ==============================
// WATCH STATE
// ==============================


this.lastSeenIds =
new Set();



this.watchTimer =
null;



this.isChecking =
false;



this.firstScan =
true;




// adaptive polling


this.watchInterval =
120000; // 2 minutes



this.maxInterval =
900000; // 15 minutes



this.emptyChecks =
0;





console.log(
"📧 Gmail connector awake"
);




this.restoreConnection();



}









// ==============================
// RESTORE AFTER REFRESH
// ==============================


restoreConnection(){



const saved =

localStorage.getItem(

"emma_gmail_connection"

);




if(!saved){

return false;

}




try{



this.connection =

JSON.parse(

saved

);




this.connected =
true;




console.log(

"👁️ Gmail eye restored"

);




return true;



}




catch(error){



console.error(

"❌ Gmail restore failed",

error

);



return false;



}



}









// ==============================
// CONNECT
// ==============================


connect(
config={}
){



this.connection =
config;



this.connected =
true;





localStorage.setItem(


"emma_gmail_connection",


JSON.stringify(

config

)


);





console.log(

"👁️ Gmail eye connected"

);




return true;



}










// ==============================
// DISCONNECT
// ==============================


disconnect(){



this.stopWatching();




this.connection =
null;



this.connected =
false;





localStorage.removeItem(

"emma_gmail_connection"

);





console.log(

"🙈 Gmail eye closed"

);



}









// ==============================
// CONNECTION CHECK
// ==============================


isConnected(){



return (


this.connected === true &&


!!this.connection?.access_token


);



}









// ==============================
// START WATCHING
// ==============================


startWatching(
callback
){



if(
this.watchTimer
){


console.log(

"👂 Gmail already watching"

);


return;


}




if(
!this.isConnected()
){


console.log(

"📧 Gmail permission missing"

);


return;


}






console.log(

"👂 Gmail smart watcher started"

);





const loop = async()=>{



const emails =

await this.observe();






for(

const email of emails

){



const signal =

await this.collect(

email

);




callback?.(

signal

);



}





// adaptive delay


this.watchTimer =

setTimeout(

loop,

this.watchInterval

);



};





loop();



}










// ==============================
// STOP WATCHING
// ==============================


stopWatching(){



if(

this.watchTimer

){



clearTimeout(

this.watchTimer

);



this.watchTimer =
null;



}




console.log(

"😴 Gmail watcher stopped"

);



}










// ==============================
// OBSERVE GMAIL
//
// Cheap:
// list ids only
//
// Expensive:
// fetch body only when new
// ==============================


async observe(){



if(

this.isChecking

){


return [];


}




if(

!this.isConnected()

){


return [];


}





this.isChecking =
true;





try{



console.log(

"👁️ Gmail checking changes"

);




const token =

this.connection.access_token;







// ==============================
// CHEAP CHECK
// ==============================


const listResponse =

await fetch(


"https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=5",


{


headers:{


Authorization:

`Bearer ${token}`


}


}


);





const listData =

await listResponse.json();





if(

!listData.messages

){


return [];


}






const fresh =
[];







for(

const msg of listData.messages

){



if(

this.lastSeenIds.has(

msg.id

)

){


continue;


}





this.lastSeenIds.add(

msg.id

);






// first load remembers inbox only


if(

this.firstScan

){


continue;


}





// ==============================
// REAL NEW EMAIL FOUND
// Fetch details now
// ==============================


const mailResponse =

await fetch(


`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}`,


{


headers:{



Authorization:

`Bearer ${token}`



}



}


);







const email =

await mailResponse.json();






console.log(

"📧 New Gmail detected:",

email.id

);






fresh.push(

email

);



}









// first scan complete


this.firstScan =
false;










// ==============================
// ADAPTIVE SLEEP
// ==============================


if(

fresh.length === 0

){



this.emptyChecks++;





if(

this.emptyChecks > 5

){



this.watchInterval =

Math.min(


this.watchInterval * 2,


this.maxInterval


);



}



}




else{



// activity happened,
// become alert again


this.emptyChecks =
0;



this.watchInterval =
120000;



}









return fresh;






}




catch(error){



console.error(

"❌ Gmail observe failed",

error

);




return [];



}




finally{



this.isChecking =
false;



}



}











// ==============================
// RECEIVE ENTRY POINT
// ==============================


async receive(
data={}
){



return await this.collect(

data

);



}









// ==============================
// READ HEADER
// ==============================


getHeader(
email={},
name
){



return (


email.payload
?.headers
?.find(

header =>

header.name.toLowerCase()

===

name.toLowerCase()

)

?.value

||

null


);



}










// ==============================
// PERSON
// ==============================


extractPerson(
email={}
){



const sender =

this.getHeader(

email,

"From"

);





return {



name:


email.fromName ||

email.name ||

email.sender ||

sender ||

"Unknown",






email:


email.fromEmail ||

email.from ||

email.email ||

sender ||

"unknown",






source:


"gmail"



};



}










extractPeople(email={}){



return {



from:

this.extractPerson(email),




to:

email.to ||

this.getHeader(email,"To")

||

[],




cc:

email.cc ||

this.getHeader(email,"Cc")

||

[],




bcc:

email.bcc || []



};



}










extractContent(email={}){



return {



subject:


email.subject ||

this.getHeader(

email,

"Subject"

)

||

"",





message:


email.message ||

email.body ||

email.text ||

"",





html:


email.html ||

null,





snippet:


email.snippet ||

null



};



}










extractThread(email={}){



return {



threadId:


email.threadId ||

null,




conversation:


email.thread ||

[],




messageCount:


email.thread?.length ||

1



};



}










extractAttachments(email={}){



return (

email.attachments ||

[]

)

.map(

file=>({



name:

file.name ||

file.filename,




type:

file.type ||

file.mimeType,




size:

file.size ||

null



})

);



}










extractMetadata(email={}){



return {



gmailId:


email.id ||

null,




labels:


email.labels ||

email.labelIds ||

[],




unread:


email.unread ||

false,




starred:


email.starred ||

false,





receivedAt:


email.receivedAt ||

email.date ||

this.getHeader(

email,

"Date"

)

||

new Date()
.toISOString()



};



}









// ==============================
// CREATE SIGNAL
// ==============================


async collect(
email={}
){



const signal =
{



source:

"gmail",



type:

"EMAIL_SIGNAL",



event:

"email_received",




createdAt:

new Date()
.toISOString(),




person:

this.extractPerson(

email

),




people:

this.extractPeople(

email

),




content:

this.extractContent(

email

),




thread:

this.extractThread(

email

),




attachments:

this.extractAttachments(

email

),




metadata:

this.extractMetadata(

email

),




connection:{


connected:

this.connected


},




raw:

email



};






return this.normalize(

signal

);



}









// ==============================
// COLLECT MANY
// ==============================


async collectMany(
emails=[]
){



const results =
[];




for(

const email of emails

){



results.push(

await this.collect(

email

)

);



}




return results;



}









// ==============================
// CAPABILITIES
// ==============================


getCapabilities(){



return [


"connect_gmail",


"restore_gmail",


"smart_watch",


"detect_new_email",


"collect_email_context"


];



}










// ==============================
// INFO
// ==============================


getInfo(){



return {



source:

this.source,



type:

this.type,



active:

this.active,



connected:

this.connected,



watching:

!!this.watchTimer,



interval:

this.watchInterval,



role:

"Emma Gmail sense"



};



}









// ==============================
// HEALTH
// ==============================


async testConnection(){



return {



source:

"gmail",



status:

this.connected

?

"connected"

:

"waiting_for_permission",




watching:

!!this.watchTimer,



message:

this.connected

?

"Gmail eye open"

:

"Gmail permission needed"



};



}




}








export default GmailConnector;