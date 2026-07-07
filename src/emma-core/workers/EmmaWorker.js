// EmmaWorker.js
// Emma's background employee system
//
// PURPOSE:
//
// Keep Emma active without user interaction.
//
// Scheduler creates rhythm.
// Worker manages work.
// Brain thinks.
// Goals create direction.
//
// RULE:
//
// Worker does not reason.
// Worker does not judge.
// Worker only moves work through Emma.



import EmmaSignalQueue
from "../inbox/EmmaSignalQueue";



class EmmaWorker {


constructor(emma){


console.log(
"👻 Emma Background Worker created"
);



this.emma = emma;


this.running = false;


this.interval = null;


this.lastRun = null;


this.processing = false;


this.activityLog = [];


this.stats = {


processed:0,


failed:0,


heartbeats:0


};



}









// ===============================
// START WORKER
// ===============================


start(
delay = 60000
){



if(this.running){


console.log(
"👻 Worker already running"
);


return;


}





console.log(
"👻 Emma worker started"
);



this.running = true;



// first work cycle


this.work();





this.interval =

setInterval(()=>{


this.work();


},delay);



}









// ===============================
// STOP WORKER
// ===============================


stop(){



if(this.interval){


clearInterval(
this.interval
);


}



this.running=false;



console.log(
"👻 Emma worker stopped"
);



}









// ===============================
// WORK CYCLE
// ===============================


async work(){



if(this.processing){


console.log(
"👻 Emma already working"
);


return;


}




this.processing=true;




console.log(
"💓 Emma work cycle"
);




try{


this.lastRun =
new Date();




// process inbox


await this.processSignals();




this.stats.heartbeats++;




this.record({


type:"WORK_CYCLE",


status:"SUCCESS",


time:new Date()


});



}




catch(error){



console.error(
"Worker failed:",
error
);




this.record({


type:"ERROR",


error:error.message,


time:new Date()


});



}



finally{


this.processing=false;


}



}









// ===============================
// PROCESS SIGNAL QUEUE
// ===============================


async processSignals(){



console.log(
"📥 Checking Emma inbox"
);



let processed=0;





while(true){



const item =

EmmaSignalQueue.next();




if(!item){


break;


}





try{



console.log(

"👻 Processing:",

item.signal.type

);






const result =

await this.handleSignal(

item.signal

);







EmmaSignalQueue.complete(

item,

result

);





processed++;


this.stats.processed++;




this.record({


type:"SIGNAL_DONE",


signal:item.signal.type,


time:new Date()


});




}




catch(error){



EmmaSignalQueue.fail(

item,

error

);



this.stats.failed++;




this.record({



type:"SIGNAL_FAILED",


signal:item.signal.type,


error:error.message,


time:new Date()



});



}



}





if(processed){


console.log(

`📥 Emma completed ${processed} tasks`

);


}



}









// ===============================
// SIGNAL ROUTER ⭐
// ===============================


async handleSignal(signal){



switch(signal.type){





// -----------------------------
// AUTONOMY HEARTBEAT
// -----------------------------


case "FIND_GOALS":



console.log(

"🎯 Emma checking her goals"

);



return await this.emma.pursueGoals();








// -----------------------------
// DAILY BRIEF
// -----------------------------


case "DAILY_BRIEF_REQUEST":



console.log(

"📰 Emma preparing brief"

);



return await this.emma.getDailyBrief();








// -----------------------------
// DAILY REFLECTION
// -----------------------------


case "MEMORY_REFLECTION":



console.log(

"🧠 Emma reflecting"

);



return await this.emma.think({



source:"SELF",


type:"REFLECTION",


message:

"What have I learned recently?"



});









// -----------------------------
// AWARENESS CHECK
// -----------------------------


case "AWARENESS_CHECK":



console.log(

"👀 Emma looking around"

);



return await this.emma.wakeUp({



source:"AUTONOMY",


time:new Date()



});










// -----------------------------
// NORMAL WORLD EVENT
// -----------------------------


default:



return await this.emma.think(

signal

);



}



}









// ===============================
// ADD SIGNAL
// ===============================


addSignal(signal){



return EmmaSignalQueue.add({



...signal,


receivedAt:new Date()



});



}









// ===============================
// LOGGING
// ===============================


record(event){



this.activityLog.unshift(
event
);



this.activityLog =

this.activityLog.slice(

0,

100

);



}










// ===============================
// STATUS
// ===============================


status(){



return {



running:

this.running,



processing:

this.processing,



lastRun:

this.lastRun,



queue:

EmmaSignalQueue.status(),



stats:

this.stats,



recentActivity:

this.activityLog



};



}



}




export default EmmaWorker;