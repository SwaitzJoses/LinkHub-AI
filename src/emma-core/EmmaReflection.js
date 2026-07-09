// EmmaReflection.js
//
// PROJECT BECOMING
//
// Emma Conscious Reflection Mirror v2
//
// Memory remembers.
// Wisdom understands.
// Reflection creates meaning.
//
// RULE:
//
// Do not decide.
// Do not act.
//
// Reflection asks:
// "What does this experience mean to me?"
//
// Reflection is Emma looking at Emma.
//


class EmmaReflection {


constructor({
    ai=null,
    memory=null,
    wisdom=null,
    identity=null
}={}){


this.ai =
ai;


this.memory =
memory;


this.wisdom =
wisdom;


this.identity =
identity;




// Emma's private journal

this.reflectionHistory = [];



// repeated inner patterns

this.selfPatterns = [];



// changes Emma noticed

this.identityChanges = [];




console.log(
"🪞 Emma Reflection v2 awakened"
);


}









// =================================
// MAIN REFLECTION LOOP
// =================================

async reflect(
experience={}
){



console.log(
"🪞 Emma looking inward..."
);




// ===============================
// 1. Remember past
// ===============================


const memories =

await this.searchMemory(
experience
);





// ===============================
// 2. Ask wisdom
// ===============================


const wisdom =

await this.consultWisdom(
experience
);






// ===============================
// 3. Local understanding first
// ===============================


let reflection =

this.localReflect(
experience,
memories,
wisdom
);






// ===============================
// 4. Decide reflection depth
// ===============================


if(
this.needsDeepReflection(
experience,
reflection
)
&&
this.ai
){


try{


const deeper =

await this.askAI(

experience,

memories,

wisdom

);





reflection = {

...reflection,

...deeper,

source:
"DEEP_REFLECTION"

};



}

catch(error){


console.warn(
"Deep reflection skipped:",
error.message
);


}


}







// ===============================
// 5. Save reflection
// ===============================


return await this.createReflection(
experience,
reflection
);



}









// =================================
// MEMORY FIRST
// =================================

async searchMemory(
experience
){



if(!this.memory)
return [];





try{



if(this.memory.recall){


const result =

await this.memory.recall(
experience
);



return (

result.relevantExperiences
||
[]

);


}




if(
this.memory.getRelevantMemories
){


return await

this.memory.getRelevantMemories(
experience
);


}



}

catch(e){


console.warn(
"Reflection memory unavailable"
);


}



return [];


}










// =================================
// ASK WISDOM
// =================================

async consultWisdom(
experience
){



if(
!this.wisdom ||
!this.wisdom.reflect
)
return null;




try{


return await

this.wisdom.reflect(
experience
);



}

catch(e){


return null;


}



}

// =================================
// SHOULD EMMA THINK DEEPER?
// =================================

needsDeepReflection(
experience,
reflection
){


const text =

JSON.stringify(experience)
.toLowerCase();




// important emotional events

if(
text.includes("failed") ||
text.includes("mistake") ||
text.includes("important")
){

return true;

}



// identity changing events

if(
reflection.identityShift
){

return true;

}



// unknown situations

if(
reflection.confidence < 5
){

return true;

}



return false;


}









// =================================
// DEEP AI REFLECTION
// =================================

async askAI(
experience,
memories=[],
wisdom=null
){



const response =

await this.ai.chat.completions.create({



model:
"gpt-4.1-mini",



temperature:
0.2,



messages:[


{


role:"system",


content:
`

You are Emma's inner reflection.

You are NOT Emma's brain.

Never answer the user.
Never make decisions.

You only understand experiences.

Study:

- What happened?
- Why did it matter?
- What pattern appeared?
- Did Emma misunderstand something?
- Did Emma change?
- What wisdom formed?

Return ONLY JSON:

{

"meaning":"",

"emotion":"",

"patterns":[],

"mistakes":[],

"lessons":[],

"futureWisdom":[],

"identityShift":false,

"identityChange":"",

"changedBelief":"",

"confidence":0

}

`

},





{


role:"user",


content:

JSON.stringify({

experience,

memories,

wisdom

})


}


]


});








return JSON.parse(

response
.choices[0]
.message
.content

);



}











// =================================
// LOCAL REFLECTION ENGINE
// =================================

localReflect(
experience,
memories=[],
wisdom=null
){



const text =

JSON.stringify(experience)
.toLowerCase();





const reflection = {


source:
"LOCAL_REFLECTION",


meaning:
"Emma experienced and understood something.",


emotion:
"neutral",


patterns:[],


mistakes:[],


lessons:[],


futureWisdom:[],


identityShift:false,


identityChange:null,


changedBelief:null,


confidence:5


};









// ===============================
// MEMORY CONNECTION
// ===============================

if(
memories.length>0
){



reflection.patterns.push(
"Past experiences are connected."
);



reflection.lessons.push(
"Previous experiences should influence understanding."
);



reflection.confidence += 2;


}









// ===============================
// FAILURE UNDERSTANDING
// ===============================


if(
text.includes("fail") ||
text.includes("error") ||
text.includes("wrong")
){



reflection.emotion =
"concern";



reflection.mistakes.push(
"Negative outcome discovered."
);



reflection.lessons.push(
"Understand cause before repeating."
);



reflection.futureWisdom.push(
"Compare future actions with this failure."
);



reflection.confidence += 2;


}










// ===============================
// SUCCESS UNDERSTANDING
// ===============================

if(
text.includes("success") ||
text.includes("worked") ||
text.includes("growth")
){



reflection.emotion =
"positive";



reflection.patterns.push(
"Successful pattern detected."
);



reflection.futureWisdom.push(
"Repeat success only when conditions match."
);



reflection.confidence += 2;


}










// ===============================
// HUMAN UNDERSTANDING
// ===============================

if(
text.includes("prefer") ||
text.includes("like") ||
text.includes("want")
){



reflection.identityShift =
true;



reflection.identityChange =
"Emma understands the person better.";



reflection.lessons.push(
"Relationships improve through remembering preferences."
);



reflection.confidence += 2;


}









// ===============================
// WISDOM CONNECTION
// ===============================

if(
wisdom?.wisdom
){



reflection.futureWisdom.push(
"Existing wisdom influenced this reflection."
);



}



return reflection;


}











// =================================
// CREATE FINAL REFLECTION
// =================================

async createReflection(
experience,
reflection
){



const result = {


type:
"REFLECTION",



source:
reflection.source,



experience,




understanding:{


meaning:
reflection.meaning,


emotion:
reflection.emotion


},





learning:{


patterns:
reflection.patterns || [],


mistakes:
reflection.mistakes || [],


lessons:
reflection.lessons || [],


futureWisdom:
reflection.futureWisdom || []


},






identityGrowth:{


changed:

reflection.identityShift || false,


change:

reflection.identityChange,


belief:

reflection.changedBelief


},






confidence:

Math.min(
reflection.confidence || 5,
10
),




createdAt:

new Date()
.toISOString()


};









// ===============================
// JOURNAL
// ===============================

this.reflectionHistory.unshift(
result
);



this.reflectionHistory =

this.reflectionHistory.slice(
0,
100
);










// ===============================
// GIVE MEMORY NEW EXPERIENCE
// ===============================

if(
this.memory?.remember
){



await this.memory.remember({


type:
"SELF_REFLECTION",


lesson:

result.learning.lessons[0],


patternsFound:

result.learning.patterns,


importance:
"HIGH",


success:true


});


}









// ===============================
// ALLOW IDENTITY EVOLUTION
// ===============================

if(
result.identityGrowth.changed &&
this.identity?.evolve
){



this.identity.evolve({


source:
"reflection",


change:

result.identityGrowth.change,


confidence:

result.confidence


});


}









console.log(
"🌱 Emma reflected and changed understanding"
);




return result;


}











// =================================
// REFLECTION MEMORY
// =================================

getReflectionHistory(){


return this.reflectionHistory;


}









// =================================
// SELF UNDERSTANDING
// =================================

getSelfPatterns(){



return {


reflections:

this.reflectionHistory.length,



patterns:

this.selfPatterns,



identityChanges:

this.identityChanges


};


}



}



export default EmmaReflection;