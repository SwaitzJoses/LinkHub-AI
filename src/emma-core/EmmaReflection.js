// EmmaReflection.js
//
// PROJECT BECOMING
//
// Emma's Thinking Mirror
//
// Reflection converts experiences into wisdom.
//
// Observer:
// "What happened?"
//
// Reflection:
// "What does this mean?"
//
// RULE:
// Reflection does not act.
// Reflection does not decide.
// Reflection understands.


class EmmaReflection {


constructor({ ai=null, memory=null }={}){


this.ai = ai;


this.memory = memory;


this.reflectionHistory = [];


console.log(
"🪞 Emma Reflection online"
);


}








// =================================
// MAIN REFLECTION
// =================================


async reflect(experience){



console.log(
"🪞 Emma reflecting..."
);




let previousMemories=[];



if(this.memory){


try{


previousMemories =
await this.memory.getRelevantMemories(
experience
);


}

catch(error){


console.warn(
"Memory lookup skipped"
);


}


}









if(this.ai){


try{


const aiReflection =
await this.askAI(
experience,
previousMemories
);



return this.createReflection(
experience,
aiReflection,
"AI_REFLECTION"
);



}

catch(error){


console.error(
"AI reflection failed:",
error.message
);


}


}








return this.localReflect(
experience,
previousMemories
);


}












// =================================
// AI REFLECTION
// =================================


async askAI(
experience,
memories=[]
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

You are Emma's reflection system.

You do not answer users.

You study experiences.

Your purpose:

Turn events into:

- understanding
- lessons
- patterns
- personal knowledge
- future wisdom


Use previous memories.

Ask internally:

Why did this happen?

Have I seen this before?

What should Emma learn?

What mistake should never repeat?

What success should repeat?


Return ONLY JSON:


{

"meaning":"",

"emotion":"",

"patterns":[],

"mistakes":[],

"lessons":[],

"relationshipInsight":"",

"userUnderstanding":[],

"futureWisdom":[],

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

previousMemories

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
// BUILD REFLECTION MEMORY
// =================================


createReflection(
experience,
reflection,
source
){



const result = {


type:
"REFLECTION",



source,



originalExperience:
experience,






understanding:{



meaning:
reflection.meaning ||
"Experience understood",



emotion:
reflection.emotion ||
"neutral",



relationshipInsight:

reflection.relationshipInsight ||
null



},








learning:{



patterns:

reflection.patterns ||
[],



mistakes:

reflection.mistakes ||
[],



lessons:

reflection.lessons ||
[],


futureWisdom:

reflection.futureWisdom ||
[]



},







identityGrowth:{



userUnderstanding:

reflection.userUnderstanding ||
[],



changedBelief:

reflection.changedBelief ||
null



},









confidence:

reflection.confidence ||
5,






createdAt:

new Date().toISOString()



};







this.reflectionHistory.push(
result
);






console.log(
"🌱 Emma learned from experience",
result
);






return result;


}












// =================================
// LOCAL REFLECTION FALLBACK
// =================================


localReflect(
experience,
memories=[]
){



const text =

JSON.stringify(
experience
)
.toLowerCase();






const reflection = {


meaning:
"Emma processed this experience.",



emotion:
"neutral",



patterns:[],


mistakes:[],


lessons:[],


futureWisdom:[],


userUnderstanding:[],


confidence:5



};









if(memories.length>0){


reflection.patterns.push(
"Similar past experiences exist."
);



reflection.lessons.push(
"Past experience should influence future behavior."
);


}









if(

text.includes("fail") ||

text.includes("error") ||

text.includes("wrong")

){



reflection.mistakes.push(
"Something produced a negative result."
);



reflection.lessons.push(
"Understand failure before repeating action."
);



reflection.confidence +=2;


}











if(

text.includes("success") ||

text.includes("worked")

){



reflection.patterns.push(
"Successful outcome detected."
);



reflection.futureWisdom.push(
"Reuse successful approaches when context matches."
);



reflection.confidence +=2;


}











if(

text.includes("prefer") ||

text.includes("like") ||

text.includes("want")

){



reflection.userUnderstanding.push(
"User preference discovered."
);



reflection.confidence +=2;


}











return this.createReflection(

experience,

reflection,

"LOCAL_REFLECTION"

);


}












// =================================
// HISTORY
// =================================


getReflectionHistory(){


return this.reflectionHistory;


}





}


export default EmmaReflection;