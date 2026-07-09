// EmmaExperienceStream.js
//
// PROJECT BECOMING
//
// Emma's short-term experience stream.
//
// This is NOT memory.
// This is Emma's "today".
//
// RULE:
//
// Everything Emma experiences flows here.
//
// Attention decides importance later.
// Memory stores meaning later.
//
// Do NOT save this directly to database.
//


class EmmaExperienceStream {



constructor(){


console.log(
"🌊 Emma Experience Stream awake"
);



// ===============================
// Short term life buffer
// ===============================

this.experiences = [];




// Maximum short term experiences
// before old ones fade

this.limit = 200;




this.createdAt =
new Date();


}










// =================================
// RECORD EXPERIENCE
//
// Life enters here first
// =================================


async record(
experience={}
){



const moment = {


id:

crypto.randomUUID
?
crypto.randomUUID()
:
Date.now(),



experience,



createdAt:

new Date(),



state:

"experienced"



};







this.experiences.push(
moment
);






// ===============================
// Natural forgetting
//
// Keep recent experiences only
// ===============================


if(
this.experiences.length
>
this.limit
){


this.experiences.shift();


}







console.log(
"🌊 Experience streamed:",
experience.type || "unknown"
);







return moment;



}









// =================================
// GET RECENT LIFE
// =================================


getRecent(
count=20
){



return this.experiences
.slice(
-count
);



}










// =================================
// GET ALL CURRENT EXPERIENCES
// =================================


getAll(){



return this.experiences;



}










// =================================
// FIND PATTERNS
//
// Simple short term awareness
// =================================


find(
filter={}
){





return this.experiences.filter(

item=>{



if(
filter.type &&
item.experience.type !== filter.type
){


return false;


}




if(
filter.source &&
item.experience.source !== filter.source
){


return false;


}




return true;



}

);



}









// =================================
// CLEAR AFTER SLEEP
//
// Later:
// after consolidation
// =================================


clear(){



const count =
this.experiences.length;





this.experiences =
[];






console.log(

"🌙 Experience stream cleared:",
count

);






return {


cleared:

count,


at:

new Date()


};



}









// =================================
// STREAM SUMMARY
//
// Emma awareness
// =================================


summary(){





const types = {};






for(
const item of this.experiences
){



const type =

item.experience.type

||

"unknown";






types[type] =

(types[type] || 0)

+

1;



}









return {


total:

this.experiences.length,



types,



oldest:

this.experiences[0]?.createdAt || null,



newest:

this.experiences[
this.experiences.length-1
]?.createdAt || null



};



}









// =================================
// STATUS
// =================================


status(){





return {



name:

"Emma Experience Stream",




purpose:

"Temporary lived experiences before memory formation",




stored:

this.experiences.length,




limit:

this.limit,




alive:

true,




createdAt:

this.createdAt




};



}



}




export default EmmaExperienceStream;