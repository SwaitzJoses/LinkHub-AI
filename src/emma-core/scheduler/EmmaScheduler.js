// EmmaScheduler.js
// Emma's heartbeat system
//
// PURPOSE:
//
// Decide WHEN Emma should wake up.
//
// Scheduler = rhythm
// Worker    = execution
// Brain     = thinking
// Goals     = direction
//
// RULE:
//
// Scheduler does not think.
// Scheduler does not reason.
// Scheduler only creates moments.


class EmmaScheduler {


constructor(worker){


console.log(
"⏰ Emma Scheduler online"
);


this.worker = worker;


this.running = false;


this.jobs = [];


this.history = [];


this.startedAt = null;


}









// ===============================
// START HEARTBEAT
// ===============================


start(){



if(this.running){


console.log(
"⏰ Scheduler already running"
);


return;


}




this.running = true;


this.startedAt =
new Date();




console.log(
"🤍 Emma heartbeat started"
);




// create Emma rhythms


this.registerDefaults();



}









// ===============================
// DEFAULT LIFE RHYTHMS
// ===============================


registerDefaults(){



// ===========================
// MORNING INTELLIGENCE
// ===========================


this.addJob({


name:"Morning Brief",


type:"DAILY_BRIEF",


every:

24 * 60 * 60 * 1000,


runImmediately:false,



action:()=>{


this.worker.addSignal({


source:"EMMA_HEARTBEAT",


type:"DAILY_BRIEF_REQUEST",


message:

"Prepare today's intelligence brief.",


createdAt:new Date()


});


}


});









// ===========================
// AWARENESS LOOP
// ===========================


this.addJob({



name:"Awareness Check",


type:"AWARENESS",



every:

60 * 60 * 1000,



runImmediately:true,



action:()=>{



this.worker.addSignal({


source:"EMMA_HEARTBEAT",


type:"AWARENESS_CHECK",


message:

"Look around and understand what changed.",


createdAt:new Date()


});



}



});










// ===========================
// AUTONOMY GOAL LOOP ⭐
// ===========================


this.addJob({


name:"Goal Discovery",


type:"AUTONOMY_GOALS",



every:

3 * 60 * 60 * 1000,



runImmediately:true,



action:()=>{


this.worker.addSignal({


source:"EMMA_HEARTBEAT",


type:"FIND_GOALS",


message:

"Find what needs attention and create priorities.",


createdAt:new Date()


});



}



});











// ===========================
// MEMORY REFLECTION
// ===========================


this.addJob({



name:"Memory Reflection",



type:"REFLECTION",



every:

24 * 60 * 60 * 1000,



runImmediately:false,



action:()=>{


this.worker.addSignal({


source:"EMMA_HEARTBEAT",


type:"MEMORY_REFLECTION",


message:

"Review experiences and extract lessons.",


createdAt:new Date()


});


}



});









// ===========================
// WORKER HEALTH CHECK
// ===========================


this.addJob({


name:"Worker Pulse",


type:"HEALTH_CHECK",


every:

30 * 60 * 1000,



runImmediately:true,



action:()=>{


if(

this.worker.status &&

!this.worker.status().running

){



console.log(

"🤍 Emma noticed worker sleeping"

);



}



}


});




}











// ===============================
// ADD JOB
// ===============================


addJob(job){



// prevent duplicate rhythms


const exists =

this.jobs.find(

j=>j.name === job.name

);




if(exists){


return exists;


}





console.log(

"⏰ Added rhythm:",

job.name

);





const timer =

setInterval(()=>{


this.runJob(job);


},job.every);







const stored={


...job,


timer,


lastRun:null,


createdAt:new Date()


};





this.jobs.push(
stored
);






if(job.runImmediately){


this.runJob(stored);


}





return stored;



}












// ===============================
// RUN JOB
// ===============================


runJob(job){



console.log(

"🤍 Emma heartbeat:",

job.name

);




try{



job.action();




job.lastRun =
new Date();





this.history.unshift({



job:job.name,


type:job.type,


status:"SUCCESS",


time:new Date()



});



}



catch(error){



console.error(

"Heartbeat failed:",

error

);




this.history.unshift({



job:job.name,


type:job.type,


status:"FAILED",


error:error.message,


time:new Date()



});



}






this.history =

this.history.slice(

0,

100

);



}











// ===============================
// STOP HEARTBEAT
// ===============================


stop(){



this.jobs.forEach(job=>{


clearInterval(

job.timer

);


});





this.jobs=[];


this.running=false;





console.log(

"🤍 Emma heartbeat stopped"

);



}









// ===============================
// STATUS
// ===============================


status(){



return {



running:

this.running,



startedAt:

this.startedAt,



rhythms:

this.jobs.map(job=>({



name:job.name,


type:job.type,


lastRun:job.lastRun



})),




history:

this.history



};



}



}




export default EmmaScheduler;