// EmmaSignalQueue.js
// Emma's internal inbox
//
// PURPOSE:
//
// Collect signals before Emma processes them.
//
// Gmail
// Calendar
// Apps
//
// ↓
//
// Queue
//
// ↓
//
// Worker
//
// ↓
//
// Brain
//
//
// RULE:
// Queue does not think.
// Queue only organizes.



class EmmaSignalQueue {


constructor(){


console.log(
"📥 Emma Signal Queue online"
);


this.queue=[];


this.history=[];


}








// ===============================
// ADD SIGNAL
// ===============================


add(signal){



const item={


id:
crypto.randomUUID(),



signal,



status:"WAITING",



receivedAt:

new Date()



};





this.queue.push(
item
);





console.log(
"📥 Signal received:",
item
);





return item;



}










// ===============================
// GET NEXT SIGNAL
// ===============================


next(){



if(
!this.queue.length
){


return null;


}






const item =

this.queue.shift();





item.status =
"PROCESSING";





return item;



}











// ===============================
// COMPLETE SIGNAL
// ===============================


complete(item,result){



const finished={


...item,



status:"DONE",



result,



finishedAt:

new Date()



};





this.history.unshift(
finished
);





this.history =

this.history.slice(
0,
100
);




return finished;



}









// ===============================
// FAILED SIGNAL
// ===============================


fail(item,error){



const failed={



...item,



status:"FAILED",



error:

error.message,



finishedAt:

new Date()



};






this.history.unshift(
failed
);




return failed;



}









// ===============================
// STATUS
// ===============================


status(){



return {


waiting:

this.queue.length,



processed:

this.history.length,



recent:

this.history.slice(
0,
5
)



};



}







}



export default new EmmaSignalQueue();