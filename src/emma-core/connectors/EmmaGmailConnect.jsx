// EmmaGmailConnect.jsx
// Opens Emma's Gmail eye
//
// RULE:
//
// Gmail login only gives permission.
// Emma owns the connector.
// Emma owns the brain.


import { useGoogleLogin }
from "@react-oauth/google";


import Emma
from "../Emma";








function EmmaGmailConnect(){





const login = useGoogleLogin({



scope:

"https://www.googleapis.com/auth/gmail.readonly",







onSuccess:

async(token)=>{



console.log(
"👁️ Gmail permission granted"
);




// ===========================
// GIVE TOKEN TO REAL EMMA
// ===========================


const gmail =

Emma.connectorManager
.connectors
.gmail;





gmail.connect({



access_token:

token.access_token,



connectedAt:

new Date()
.toISOString()



});







// ===========================
// START GMAIL WATCHING
// ===========================


gmail.startWatching(

async(signal)=>{



await Emma.think(

signal

);



}

);






console.log(

"🤍 Emma Gmail sense activated"

);







// ===========================
// OPTIONAL FIRST SYNC
// ===========================


const response =

await fetch(

"https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1",

{


headers:{



Authorization:

`Bearer ${token.access_token}`



}



}

);






const data =

await response.json();





if(
data.messages?.length
){



const id =

data.messages[0].id;







const mailResponse =

await fetch(

`https://gmail.googleapis.com/gmail/v1/users/me/messages/${id}`,

{


headers:{


Authorization:

`Bearer ${token.access_token}`


}



}

);






const email =

await mailResponse.json();







await Emma.experience(

"gmail",

email

);




console.log(

"🧠 First Gmail memory created"

);



}




},









onError:(error)=>{



console.error(

"❌ Gmail failed",

error

);



}



});









return(


<button

onClick={()=>login()}

>


🤍 Connect Gmail


</button>


);



}






export default EmmaGmailConnect;