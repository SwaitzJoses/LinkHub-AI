// EmmaDailyBrief.js
// Emma's morning intelligence system
//
// PURPOSE:
//
// Do not wait for questions.
//
// A real assistant arrives prepared.
//
// RULE:
// DailyBrief gathers.
// EmmaBrain understands.



import EmmaBrain from "../EmmaBrain";
import EmmaMemory from "../EmmaMemory";
import EmmaRelationshipMemory
from "../relationship/EmmaRelationshipMemory";



class EmmaDailyBrief {



constructor(){


console.log(
"🌅 Emma Daily Brief online"
);


this.lastBrief=null;


}









// ===============================
// CREATE DAILY BRIEF
// ===============================


async generate(){


console.log(
"🌅 Emma preparing daily brief..."
);





// ===============================
// LOAD CONTEXT
// ===============================


const memories =
await this.getMemories();




const relationship =

EmmaRelationshipMemory
.getReasoningContext();










let brief=null;







try{


brief =

await EmmaBrain.think({





role:

"daily_brief",






memory:{

recent:

memories

},







relationship,








instruction:

`

You are Emma preparing for the day.


Do not wait for the user.


Review:

- what changed
- what matters
- unfinished items
- risks
- opportunities


Speak like a trusted assistant.


Avoid:

"How can I help you today?"


Instead:

"I checked things. Here's what I noticed."



Be short.

Be useful.

`,








task:

`

Return:

{

"greeting":"",

"summary":"",

"importantChanges":[],

"recommendedFocus":"",

"confidence":0

}

`





});



}





catch(error){



console.warn(
"Daily brief fallback",
error.message
);



}









const finalBrief =

brief || {

greeting:
"Good morning.",


summary:
"I checked things. I am still learning your patterns.",


importantChanges:[],


recommendedFocus:
"Continue with your current priorities.",


confidence:50

};










this.lastBrief = {


...finalBrief,


createdAt:

new Date()


};








return this.lastBrief;



}












// ===============================
// MEMORY ACCESS
// ===============================


async getMemories(){



try{



if(
EmmaMemory.getRecent
){


return await EmmaMemory.getRecent();


}




if(
EmmaMemory.getAll
){


return await EmmaMemory.getAll();


}




return [];




}



catch(error){



return [];



}



}










// ===============================
// RETURN LAST BRIEF
// ===============================


getLastBrief(){


return this.lastBrief;


}









// ===============================
// SHOULD CREATE NEW BRIEF?
// ===============================


needsBrief(){



if(!this.lastBrief){

return true;

}



const last =

new Date(
this.lastBrief.createdAt
);



const now =
new Date();




return (

now.toDateString()

!==

last.toDateString()

);



}



}




export default new EmmaDailyBrief();