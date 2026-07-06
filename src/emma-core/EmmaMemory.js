// EmmaMemory.js
// Emma's long-term intelligence system
//
// Observation
// → Experience
// → Memory
// → Identity Understanding
// → Better Future Decisions
//
// RULE:
// Success = repeat
// Failure = improve
// Observation = wisdom
// Waiting = patience


import { EmmaDB } from "./config/EmmaDatabase";



class EmmaMemory {


constructor(){


this.localMemories=[];


console.log(
"🧠 Emma Personal Experience Memory online"
);


}








// =================================
// STORE EXPERIENCE
// =================================


async remember(experience){


console.log(
"💾 Emma analyzing experience:",
experience
);



const userId =
experience.userId || null;



const businessId =
experience.businessId || null;



const ownerId =
userId ||
businessId;



if(!ownerId){


console.log(
"⚠️ Memory rejected: missing identity"
);


return null;


}






const knowledge =
this.createKnowledge(
experience
);






const memory={



ownerId,


userId,


businessId,



type:
knowledge.type,





memory:{



problem:

experience.problem ||

experience.situation ||

"UNKNOWN_CONTEXT",





context:

experience.context ||

null,





attemptedAction:

experience.action ||

"NO_ACTION",






outcome:{


result:

experience.result ||

knowledge.type,



metrics:

experience.metrics || {},



impact:

experience.impact || null


},






lesson:

knowledge.lesson,





futureRule:

knowledge.futureRule,





patterns:

knowledge.patterns,





success:

knowledge.success,





confidenceImpact:

knowledge.confidenceImpact,





tags:

knowledge.tags,





identity:

knowledge.identityLearning,





createdAt:

new Date()



}



};







this.localMemories.push(
memory
);





console.log(
"🧠 Stored active experience"
);








try{


await EmmaDB.saveMemory(
memory
);



console.log(
"💾 Permanent memory saved"
);



}

catch(error){


console.warn(
"⚠️ Permanent memory failed",
error
);


}




return memory;


}









// =================================
// EXPERIENCE → KNOWLEDGE
// =================================


createKnowledge(experience){





let type =
"LEARNING_EXPERIENCE";



let success =
null;



let confidenceImpact =
0;



let futureRule =
"Keep learning from this pattern";








// SUCCESSFUL ACTION

if(
experience.success === true
){


type =
"POSITIVE_EXPERIENCE";


success =
true;


confidenceImpact =
5;


futureRule =
"Repeat when similar conditions appear";


}








// FAILED ACTION ONLY

else if(
experience.type === "ACTION_RESULT" &&
experience.success === false
){


type =
"FAILED_EXPERIENCE";


success =
false;


confidenceImpact =
-5;


futureRule =
"Change strategy before repeating";


}








// OBSERVATION

else if(

experience.type === "OBSERVED_PATTERN" ||

experience.type === "OBSERVATION_LESSON"

){


type =
"OBSERVATION_EXPERIENCE";


success =
null;


confidenceImpact =
2;


futureRule =
"Watch this pattern and compare future signals";


}








// WAITING

else if(
experience.type === "MONITORING"
){



type =
"MONITORING_EXPERIENCE";


success =
null;



futureRule =
"Continue observing until enough evidence exists";


}








const lesson =

experience.lesson ||

`${type} recorded by Emma`;








return {


type,


lesson,


success,


confidenceImpact,



patterns:

experience.patternsFound ||

experience.patterns ||

[],


futureRule,



tags:

this.createTags(
experience,
type
),



identityLearning:

this.extractIdentityLearning(
experience
)


};



}











// =================================
// IDENTITY LEARNING
// =================================


extractIdentityLearning(experience){



const text =

JSON.stringify(experience)

.toLowerCase();




const identity={


goals:[],


preferences:[],


workingStyle:[],


decisionPatterns:[],


observations:[]


};






if(
text.includes("goal") ||
text.includes("want")
){


identity.goals.push(
experience.situation
);


}






if(
text.includes("prefer") ||
text.includes("like")
){


identity.preferences.push(
experience.situation
);


}






if(
text.includes("fast") ||
text.includes("build")
){


identity.workingStyle.push(
"Fast builder"
);


}







if(
text.includes("decide") ||
text.includes("thinking")
){


identity.decisionPatterns.push(
experience.situation
);


}







identity.observations.push(

"Emma learned more context"

);




return identity;


}









// =================================
// RECALL
// =================================


async recall(context){



console.log(
"🔎 Emma recalling memories..."
);




const userId =
context.userId || null;



const businessId =
context.businessId || null;






if(
!userId &&
!businessId
){


return this.emptyMemory();


}






let memories=[];





try{


memories =

await EmmaDB.getMemories({

userId,

businessId

});


}

catch(error){


console.warn(
"⚠️ Database recall failed"
);


}








if(
!memories ||
memories.length===0
){



memories =
this.localMemories.filter(

m=>

m.userId===userId ||

m.businessId===businessId

);


}








return {



previousExperiences:
memories,



relevantExperiences:

this.getRelevantMemories(
context,
memories
),




identity:

this.extractIdentity(
memories
),




successes:

this.findSuccess(
memories
),




failures:

this.findFailures(
memories
),




observations:

this.findObservations(
memories
),




learnings:

this.findLearnings(
memories
),




rules:

this.extractRules(
memories
),




patterns:

this.extractPatterns(
memories
),




totalMemories:

memories.length,




lastExperience:

memories[0] || null



};


}










// =================================
// MEMORY CATEGORIES
// =================================


findSuccess(memories){


return memories.filter(

m =>

m.type === "POSITIVE_EXPERIENCE"

);


}





findFailures(memories){


return memories.filter(

m =>

m.type === "FAILED_EXPERIENCE"

);


}





findObservations(memories){


return memories.filter(

m =>

m.type === "OBSERVATION_EXPERIENCE"

);


}





findLearnings(memories){


return memories.filter(

m =>

m.type === "LEARNING_EXPERIENCE"

);


}










// =================================
// IDENTITY SUMMARY
// =================================


extractIdentity(memories){


return {


goals:

memories.flatMap(
m=>m.memory?.identity?.goals || []
),



preferences:

memories.flatMap(
m=>m.memory?.identity?.preferences || []
),



workingStyle:

memories.flatMap(
m=>m.memory?.identity?.workingStyle || []
),



decisionPatterns:

memories.flatMap(
m=>m.memory?.identity?.decisionPatterns || []
)


};


}










getRelevantMemories(
context,
memories=[]
){



const search =

JSON.stringify(context)

.toLowerCase();




return memories.filter(memory=>{


const text =

JSON.stringify(memory)

.toLowerCase();




return search

.split(" ")

.some(word =>

word.length>4 &&

text.includes(word)

);


})

.slice(0,10);



}










extractRules(memories){


return memories

.map(
m=>m.memory?.futureRule
)

.filter(Boolean);


}






extractPatterns(memories){



return [

...new Set(

memories.flatMap(

m=>m.memory?.patterns || []

)

)

];


}










createTags(
experience,
type
){


return [


type,


experience.situation,


experience.action


]

.filter(Boolean)

.map(x=>String(x).toLowerCase());


}









emptyMemory(){


return {


previousExperiences:[],


relevantExperiences:[],


identity:{},


successes:[],


failures:[],


observations:[],


learnings:[],


rules:[],


patterns:[],


totalMemories:0


};


}



}




export default EmmaMemory;