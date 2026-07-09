// EmmaAwareness.js
//
// PROJECT BECOMING
//
// Emma knowing Emma.
//
// Awareness is not intelligence.
// Awareness is self-understanding.
//
// RULE:
// Do not decide here.
// Only know current state.
//
// Memory = what happened
// Reflection = what it means
// Wisdom = what patterns exist
// Evolution = how Emma changed
// Awareness = who Emma is now


class EmmaAwareness {


constructor({

memory,

identityMemory,

selfReflection,

evolution,

wisdom

}){


this.memory =
memory;


this.identityMemory =
identityMemory;


this.selfReflection =
selfReflection;


this.evolution =
evolution;


this.wisdom =
wisdom;



this.currentState = {


createdAt:
new Date().toISOString(),


knowledgeLevel:
"NEW",


confidence:
0,


knownThings:
[],


unknownThings:
[],


identity:
null,


lastUpdated:
null


};



console.log(
"👁️ Emma Awareness awakened"
);


}












// =================================
// UPDATE SELF AWARENESS
// =================================


async update(){


console.log(
"👁️ Emma is checking herself..."
);





let memories =
[];


let identity =
null;


let reflections =
null;


let evolution =
null;






// -------------------------------
// MEMORY AWARENESS
// -------------------------------

if(
this.memory &&
this.memory.getAllMemories
){


memories =

await this.memory.getAllMemories();


}









// -------------------------------
// IDENTITY AWARENESS
// -------------------------------


if(
this.identityMemory &&
this.identityMemory.getIdentity
){


identity =

await this.identityMemory.getIdentity();


}









// -------------------------------
// REFLECTION AWARENESS
// -------------------------------


if(
this.selfReflection &&
this.selfReflection.reflect
){


reflections =

await this.selfReflection.reflect();


}











// -------------------------------
// EVOLUTION AWARENESS
// -------------------------------


if(
this.evolution &&
this.evolution.getEvolutionHistory
){


evolution =

this.evolution.getEvolutionHistory();


}









this.currentState = {


createdAt:
this.currentState.createdAt,



lastUpdated:
new Date().toISOString(),



knowledgeLevel:

this.calculateKnowledgeLevel(
memories
),




confidence:

this.calculateConfidence(
memories,
evolution
),





knownThings:

this.findKnownThings(
memories
),





unknownThings:

this.findUnknownThings(
memories
),





identity,



reflection:
reflections,



evolution



};







return this.currentState;



}












// =================================
// KNOWLEDGE LEVEL
// =================================


calculateKnowledgeLevel(memories){



const count =
memories.length;





if(count < 10){


return "LEARNING";


}




if(count < 100){


return "EXPERIENCED";


}




return "MATURE";



}











// =================================
// CONFIDENCE SYSTEM
// =================================


calculateConfidence(
memories,
evolution
){



let confidence =
0;




confidence +=

Math.min(
memories.length,
50
);




if(
evolution &&
evolution.totalEvolutions
){


confidence +=

evolution.totalEvolutions * 10;


}





return Math.min(
confidence,
100
);



}











// =================================
// WHAT EMMA KNOWS
// =================================


findKnownThings(memories){



let known =
[];




memories.forEach(memory=>{


if(memory.type){


known.push(
memory.type
);


}


});





return [

...new Set(known)

];



}











// =================================
// WHAT EMMA DOES NOT KNOW
// =================================


findUnknownThings(memories){



let unknown =
[];




if(
memories.length === 0
){


unknown.push(
"I need more experiences"
);


}





if(
memories.length < 10
){


unknown.push(
"I need more patterns before becoming confident"
);


}




return unknown;



}











// =================================
// ASK CURRENT SELF STATE
// =================================


whoAmI(){



return {


message:

"I am the result of my memories, experiences, reflections and evolution.",



state:

this.currentState



};



}











// =================================
// SIMPLE STATUS
// =================================


status(){


return {


awareness:true,


confidence:

this.currentState.confidence,


knowledge:

this.currentState.knowledgeLevel,


lastUpdated:

this.currentState.lastUpdated



};


}



}



export default EmmaAwareness;