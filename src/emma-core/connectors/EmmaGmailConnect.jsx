// EmmaGmailConnect.jsx
// Opens Emma's Gmail eye
//
// Gmail → Connector → Emma Brain


import { useGoogleLogin }
from "@react-oauth/google";


import EmmaConnectorManager
from "./EmmaConnectorManager";



const manager =
new EmmaConnectorManager();




function EmmaGmailConnect(){



const login = useGoogleLogin({


scope:

"https://www.googleapis.com/auth/gmail.readonly",





onSuccess:

async(token)=>{


console.log(
"👁️ Gmail eye opened"
);



// ===========================
// GET LATEST EMAIL LIST
// ===========================


const listResponse =
await fetch(

"https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=1",

{

headers:{

Authorization:

`Bearer ${token.access_token}`

}

}

);



const listData =
await listResponse.json();



console.log(
"📨 Gmail list:",
listData
);




const messageId =
listData.messages[0].id;






// ===========================
// GET EMAIL DETAILS
// ===========================


const mailResponse =
await fetch(

`https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,

{

headers:{


Authorization:

`Bearer ${token.access_token}`


}


}

);




const email =
await mailResponse.json();




console.log(
"📧 Real Gmail received:",
email
);








// ===========================
// SEND INTO EMMA
// ===========================


const experience =

await manager.receive(

"gmail",

email

);





console.log(
"🧠 Emma experienced Gmail:",
experience
);



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