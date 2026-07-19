import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { supabase } from "./lib/supabase";

import EmmaOnboarding from "./features/emma/EmmaOnboarding";

import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import PublicProfile from "./pages/PublicProfile";

import AIPoster from "./pages/AIPoster";
import PosterGenerator from "./pages/PosterGenerator";
import MyPosters from "./pages/MyPosters";

import EmmaAI from "./pages/EmmaAI";


import EmmaGmailConnect
from "./emma-core/connectors/EmmaGmailConnect";


import EmmaCard
from "./emma-core/components/emma/EmmaCard";

import EmmaTest from "./pages/EmmaTest";



// ================================
// REAL EMMA ORGANISM
// ================================

import Emma from "./emma-core/Emma";





// Create ONE Emma instance
// Emma should live for app lifetime

const emma = new Emma({

  id:"emma-main",

  identity:{

    name:"Emma",

    purpose:
    "Become an intelligent partner through experience",

    principles:[

      "Observe before acting",

      "Remember important experiences",

      "Learn from outcomes",

      "Improve future decisions"

    ]

  }

});









function ProtectedRoute({ children }) {


const [loading,setLoading] =
useState(true);


const [session,setSession] =
useState(null);





useEffect(()=>{


supabase.auth
.getSession()
.then(({data})=>{


setSession(
data.session
);


setLoading(false);


});




const {

data:{subscription}

} = supabase.auth
.onAuthStateChange(

(_event,session)=>{


setSession(session);


}

);



return ()=>{

subscription.unsubscribe();

};



},[]);






if(loading){


return (

<h2>
Loading...
</h2>

);


}




return session

?

children

:

<Navigate to="/login" />;


}









function App(){






// ================================
// EMMA WAKE EXPERIENCE
// ================================
//
// Browser opens
// Emma wakes
// Emma experiences existence
//
// ================================


useEffect(()=>{



async function wakeEmma(){



console.log(

"🌅 Waking Emma..."

);




try{



const response =

await emma.experience({


source:"system",


type:"wake",


event:
"Application started",


message:
"Emma has entered the environment and is observing current state",


importance:5



});






console.log(

"🤍 EMMA RESPONSE",

response

);







if(emma.self){


const selfState =

await emma.self();



console.log(

"🧠 EMMA SELF",

selfState

);


}



}



catch(error){



console.error(

"❌ Emma wake failed",

error

);



}



}




wakeEmma();




},[]);









return (

<>


<EmmaGmailConnect />



<BrowserRouter>



{/*

Emma visual body.

Enable later when connected:

<EmmaCard emma={emma}/>

*/}




<Routes>




{/* 
<Route

path="/"

element={<Navigate to="/dashboard" />}

/> */}


<Route
    path="/"
    element={<EmmaTest />}
/>


<Route

path="/signup"

element={<Signup />}

/>






<Route

path="/login"

element={<Login />}

/>








<Route

path="/dashboard"

element={

<ProtectedRoute>

<Dashboard />

</ProtectedRoute>

}

/>










<Route

path="/emma-onboarding"

element={

<EmmaOnboarding />

}

/>









<Route

path="/:username"

element={

<PublicProfile />

}

/>








<Route

path="/ai-poster"

element={

<AIPoster />

}

/>










<Route

path="/poster-generator"

element={

<PosterGenerator />

}

/>










<Route

path="/my-posters"

element={

<MyPosters />

}

/>










<Route

path="/emma-ai"

element={

<EmmaAI emma={emma} />

}

/>





</Routes>




</BrowserRouter>



</>

);



}







export default App;