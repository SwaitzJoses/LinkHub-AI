// EmmaMemory.js
//
// PROJECT BECOMING
//
// Emma Living Experience Memory v4
//
// Memory is not a database.
// Memory is Emma's lived experience.
//
// RULE:
// Store events.
// Preserve meaning.
// Forget noise.
// Strengthen wisdom.


import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";





class EmmaMemory {



constructor(){


    // Short term consciousness
    this.activeMemory = [];


    // Offline fallback
    this.localMemories = [];


    // Long memory cache
    this.memoryCache = [];


    this.lastSync = null;


    // 5 minute cache
    this.cacheLife =
    1000 * 60 * 5;


    // Never wake entire life
    this.memoryLimit = 100;



    this.identityMemory =
    new EmmaIdentityMemory();




    this.defaultOwner = {

        userId:"owner",

        businessId:null

    };




    console.log(
        "🧠 Emma Living Memory v4 awake"
    );

}





// =================================
// RECEIVE EXPERIENCE
// =================================


async store(experience={}){


    console.log(
        "🧠 Emma experienced something"
    );


    return await this.remember(
        experience
    );

}






// =================================
// OWNER RESOLUTION
// =================================


resolveOwner(experience={}){


    const userId =

    experience.userId ||

    experience.ownerId ||

    experience.signal?.userId ||

    "owner";




    const businessId =

    experience.businessId ||

    experience.signal?.businessId ||

    null;




    return {


        userId,


        businessId,


        ownerId:

        businessId || userId


    };


}









// =================================
// CREATE MEMORY
// =================================


async remember(experience={}){


if(!experience){

    return null;

}




const owner =
this.resolveOwner(
experience
);





const knowledge =
this.createKnowledge(
experience
);





// calculate emotional weight

const strength =
this.calculateStrength(
knowledge,
experience
);







// ===============================
// IDENTITY MEMORY
// ===============================


let personMemory = null;



const person =

experience.person ||

experience.identity ||

experience.signal?.person ||

null;





if(person){


personMemory =

await this.identityMemory.remember(

person,

{

event:
experience.type,


lesson:
knowledge.lesson,


emotion:
knowledge.emotion,


date:
new Date()

}


);


}









// ===============================
// MEMORY OBJECT
// ===============================


const memory = {


id:

crypto.randomUUID?.()
||
Date.now(),



ownerId:
owner.ownerId,


userId:
owner.userId,


businessId:
owner.businessId,



type:
knowledge.type,


importance:
knowledge.importance,


strength,


createdAt:
Date.now(),



memory:{



person:
personMemory,



situation:

experience.situation ||

experience.type ||

"UNKNOWN",




context:
experience,





outcome:{


success:
knowledge.success,


result:
experience.outcome || null


},





lesson:
knowledge.lesson,



futureRule:
knowledge.futureRule,



patterns:
knowledge.patterns,



emotion:
knowledge.emotion,



tags:
knowledge.tags,



reinforced:
0,



createdAt:
new Date()
.toISOString()


}


};









// ===============================
// WORKING MEMORY
// ===============================


this.activeMemory.unshift(
memory
);



// Emma consciousness limit

this.activeMemory =
this.activeMemory.slice(
0,
50
);





this.localMemories.unshift(
memory
);



this.memoryCache.unshift(
memory
);







// ===============================
// SAVE ONLY WORTHY MEMORY
// ===============================


if(
this.shouldPersist(memory)
){


try{


await EmmaDB.saveMemory(
memory
);



console.log(
"💾 Long term memory formed"
);



}

catch(error){



console.warn(
"⚠️ Memory stored locally:",
error.message
);


}


}

else{


console.log(
"🍃 Small experience kept short-term"
);


}







return memory;


}

// =================================
// EXPERIENCE → KNOWLEDGE
// =================================


createKnowledge(experience={}){


let type =
"OBSERVED_EXPERIENCE";


let success =
null;


let importance =
experience.importance ||
"NORMAL";


let emotion =
"neutral";






// SUCCESS EXPERIENCE

if(
experience.success === true
){


type =
"POSITIVE_EXPERIENCE";


success =
true;


emotion =
"positive";


}





// FAILURE EXPERIENCE

if(
experience.success === false
){


type =
"FAILED_EXPERIENCE";


success =
false;


importance =
"HIGH";


emotion =
"negative";


}








return {


type,


success,


importance,


emotion,



lesson:

experience.lesson ||

this.extractLesson(
experience,
type
),




futureRule:

experience.futureBehavior ||

this.createFutureRule(
experience,
success
),




patterns:

experience.patternsFound || [],





tags:

this.createTags(
experience,
type
)


};



}











// =================================
// MEMORY VALUE SCORE
// =================================


calculateStrength(
knowledge,
experience
){


let score = 10;




if(
knowledge.importance === "HIGH"
){

score += 40;

}




if(
knowledge.success !== null
){

score += 20;

}




if(
experience.person
){

score += 15;

}




if(
knowledge.patterns.length > 0
){

score += 15;

}




return Math.min(
score,
100
);


}











// =================================
// SHOULD ENTER LONG MEMORY?
// =================================


shouldPersist(memory){



return (

memory.strength >= 30 ||

memory.importance === "HIGH"

);



}











// =================================
// RECALL MEMORY
// =================================


async recall(context={}){


console.log(
"🔎 Emma searching past experiences"
);



const memories =

await this.getAllMemories();




const relevant =

this.getRelevantMemories(
context,
memories
);




return {


previousExperiences:
memories,


relevantExperiences:
relevant,


successes:

this.findByType(
memories,
"POSITIVE_EXPERIENCE"
),



failures:

this.findByType(
memories,
"FAILED_EXPERIENCE"
),




wisdom:

this.extractWisdom(
memories
),



patterns:

this.extractPatterns(
memories
),




rules:

this.extractRules(
memories
),



totalMemories:
memories.length


};


}










// =================================
// MEANING BASED MEMORY SEARCH
// =================================


getRelevantMemories(
context={},
memories=[]
){



console.log(
"🧠 Searching meaningful memories"
);




const contextText =

JSON.stringify(context)
.toLowerCase();







return memories



.map(memory=>{



const text =

JSON.stringify(memory)
.toLowerCase();



let score =

memory.strength || 0;








// word connection


contextText

.split(/\W+/)

.filter(
w=>w.length>3
)

.forEach(word=>{


if(
text.includes(word)
){

score += 5;

}


});







// emotional similarity


if(
contextText.includes("problem")
&&
text.includes("failed")
){

score += 30;

}




if(
contextText.includes("growth")
&&
text.includes("success")
){

score += 30;

}






// repeated lessons become stronger


score +=

(memory.memory?.reinforced || 0)
*
10;







return {

...memory,

_relevanceScore:
score

};


})





.filter(
m => m._relevanceScore > 20
)




.sort(
(a,b)=>

b._relevanceScore -
a._relevanceScore

)




.slice(
0,
10
);



}











// =================================
// REINFORCE MEMORY
// =================================


reinforce(memory){


if(
!memory.memory
)
return;




memory.memory.reinforced += 1;


memory.strength =

Math.min(

(memory.strength || 0)
+ 10,

100

);



console.log(
"🌱 Memory reinforced"
);



return memory;


}










// =================================
// MEMORY CONSOLIDATION
// experience → wisdom
// =================================


extractWisdom(memories=[]){



return memories


.filter(
m => m.strength >= 60
)



.map(m=>({


lesson:

m.memory?.lesson,



rule:

m.memory?.futureRule,



source:

m.type


}));



}









// =================================
// LOAD MEMORIES
// =================================


async getAllMemories(){



if(
this.isCacheValid()
){

return this.memoryCache;

}





let memories=[];




try{


memories =

await EmmaDB.getMemories({


userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



limit:

this.memoryLimit


});





this.memoryCache =
memories;



this.lastSync =
Date.now();



}

catch(error){



console.warn(
"Memory DB sleeping:",
error.message
);



memories =
this.activeMemory;


}




return memories;


}











// =================================
// CACHE
// =================================


isCacheValid(){



return (

this.lastSync &&

(Date.now()-this.lastSync)
<
this.cacheLife

);



}










// =================================
// AUTO LESSON CREATION
// =================================


extractLesson(
experience,
type
){



if(
type === "FAILED_EXPERIENCE"
){

return "Avoid repeating similar failure";

}



if(
type === "POSITIVE_EXPERIENCE"
){

return "Repeat strategy when conditions match";

}



return "Experience observed";


}









createFutureRule(
experience,
success
){



if(success === false){

return "Check past failures before acting";

}




if(success === true){

return "Reuse successful pattern";

}




return "Use memory for context";


}









// =================================
// HELPERS
// =================================


findByType(memories=[],type){


return memories.filter(
m=>m.type===type
);


}





extractRules(memories=[]){


return memories

.map(
m=>m.memory?.futureRule
)

.filter(Boolean);


}







extractPatterns(memories=[]){



return [


...new Set(


memories.flatMap(

m=>m.memory?.patterns || []

)


)


];


}








createTags(
experience={},
type
){



return [

type,

experience.type,

experience.eventType,

experience.situation


]


.filter(Boolean)

.map(
x=>String(x).toLowerCase()
);


}










emptyMemory(){


return {


previousExperiences:[],


relevantExperiences:[],


successes:[],


failures:[],


wisdom:[],


patterns:[],


rules:[],


totalMemories:0


};


}



}


export default EmmaMemory;