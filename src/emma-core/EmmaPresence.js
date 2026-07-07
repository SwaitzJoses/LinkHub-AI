// EmmaPresence.js
// Emma's visible presence layer
//
// PURPOSE:
// Let the user feel Emma is alive.
//
// It does NOT:
// - think
// - decide
// - remember
//
// It only answers:
//
// "What is Emma doing right now?"
//
// Brain → Presence → UI


class EmmaPresence {


constructor(){


console.log(
"🤍 Emma Presence online"
);



this.state = {

status:
"watching",


message:
"Emma is quietly watching and learning.",


mood:
"calm",


activity:null,


history:[],


lastUpdated:

new Date()


};


}









// ===============================
// CHANGE CURRENT STATE
// ===============================


setState(
status,
message,
details={}
){



const update={


status,


message,


details,


time:

new Date()


};





this.state.status =
status;



this.state.message =
message;



this.state.activity =
details;



this.state.lastUpdated =
new Date();





this.state.history.unshift(
update
);





// keep last 20 activities only

this.state.history =

this.state.history.slice(
0,
20
);






console.log(
"🤍 Emma:",
message
);




return this.state;


}










// ===============================
// QUICK STATES
// ===============================


listening(message){


return this.setState(

"listening",

message ||

"Emma is listening to new signals."

);


}







observing(message){


return this.setState(

"observing",

message ||

"Emma is understanding what happened."

);


}








thinking(message){


return this.setState(

"thinking",

message ||

"Emma is thinking using memory."

);


}









remembering(message){


return this.setState(

"remembering",

message ||

"Emma is checking past experiences."

);


}










working(message){


return this.setState(

"working",

message ||

"Emma is working on something."

);


}










learning(message){


return this.setState(

"learning",

message ||

"Emma is learning from the result."

);


}










watching(message){


return this.setState(

"watching",

message ||

"Emma is quietly watching."

);


}









// ===============================
// IMPORTANT MOMENTS
// ===============================


notify(notification){



return this.setState(


"attention",


notification.message ||


"Emma noticed something important.",


notification


);


}










// ===============================
// UI ACCESS
// ===============================


get(){



return {


...this.state,


isActive:

this.state.status !== "watching"



};


}










// ===============================
// ACTIVITY TIMELINE
// ===============================


getHistory(){


return this.state.history;


}










reset(){



this.state.status =
"watching";


this.state.message =
"Emma is quietly watching and learning.";


this.state.activity=null;


this.state.history=[];


this.state.lastUpdated =
new Date();


}



}



export default EmmaPresence;