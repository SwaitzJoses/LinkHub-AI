// EmmaReflection.js
// Emma's thinking mirror
//
// PURPOSE:
// Convert observations into experience.
//
// Observer:
// "I saw Sarah email"
//
// Reflection:
// "What does this experience teach Emma?"
//
// Reflection does NOT decide.
// Reflection does NOT act.
//
// Event
//   ↓
// Meaning
//   ↓
// Relationship Understanding
//   ↓
// Lesson
//   ↓
// Memory


class EmmaReflection {


constructor(ai=null){


this.ai = ai;


console.log(
"🤔 Emma Reflection online"
);


}




// =================================
// Main Reflection
// =================================

async reflect(observation){


console.log(
"🤔 Emma reflecting..."
);



if(this.ai){


try{


const reflection =
await this.askAI(
observation
);


return this.buildReflection(
observation,
reflection,
"AI_REFLECTION"
);


}

catch(error){


console.error(
"❌ AI reflection failed:",
error.message
);


}


}



console.log(
"⚠️ Using local reflection"
);


return this.localReflect(
observation
);


}









// =================================
// AI Reflection
// =================================

async askAI(observation){


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

You are Emma.

You are a learning intelligence.

You are not answering.
You are understanding.

Your job:

Convert experiences into memory.

Study:

- what happened
- who was involved
- previous relationship context
- repeated patterns
- what Emma should remember


Important:

If identity exists, learn about that person.

Examples:

Sarah complains twice:
Remember:
"Sarah values fast support."

Founder ships quickly:
Remember:
"Founder prefers speed."


Return ONLY JSON:


{

"situation":"",

"meaning":"",

"problem":"",

"cause":"",

"relationshipInsight":"",

"personLearning":[],

"patternsFound":[],

"lesson":"",

"futureBehavior":"",

"goals":[],

"preferences":[],

"workingStyle":[],

"priorities":[],

"success":true,

"confidence":0

}


`

},



{

role:"user",

content:
JSON.stringify(
observation
)

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
// Build Emma Experience
// =================================


buildReflection(
observation,
reflection,
source
){


return {


userId:
observation.userId || null,


businessId:
observation.businessId || null,


eventType:
observation.eventType,



// original

originalObservation:
observation,



// WHO

identity:

observation.identity || null,




// EXPERIENCE

situation:

reflection.situation ||
observation.summary,



meaning:

reflection.meaning ||
"Experience understood",




problem:

reflection.problem ||
null,



cause:

reflection.cause ||
null,





// RELATIONSHIP MEMORY

relationshipLearning:{


person:

observation.identity
?
{
name:
observation.identity.name,

email:
observation.identity.email
}
:
null,



insight:

reflection.relationshipInsight ||
null,



learned:

reflection.personLearning ||
[]


},






// PATTERNS

patternsFound:

reflection.patternsFound ||
observation.signals ||
[],





// LESSON

lesson:

reflection.lesson ||
"Emma gained experience",




futureBehavior:

reflection.futureBehavior ||
"Use this memory later",






// PERSONAL PROFILE LEARNING

identityLearning:{


goals:

reflection.goals || [],


preferences:

reflection.preferences || [],


workingStyle:

reflection.workingStyle || [],


priorities:

reflection.priorities || []


},






// LEARNING PACKAGE

learning:{


type:

reflection.success

?

"SUCCESSFUL_PATTERN"

:

"LEARNING_PATTERN",



lesson:

reflection.lesson,



futureRule:

reflection.futureBehavior


},






success:

reflection.success ?? true,



confidence:

reflection.confidence || 5,



importance:

this.findImportance(
reflection
),




source,



reflectedAt:

new Date()


};


}









// =================================
// Local brain fallback
// =================================


localReflect(observation){


const text =
JSON.stringify(
observation
)
.toLowerCase();



let personLearning=[];



if(
observation.identity
){


personLearning.push(
`Emma has interacted with ${observation.identity.name}`
);


}




if(text.includes("cancel")){


personLearning.push(
"Person may need attention during problems"
);


}




if(text.includes("fast")){


personLearning.push(
"Speed appears important"
);


}





return this.buildReflection(

observation,

{

situation:

observation.summary,



meaning:

"Emma converted observation into experience",



relationshipInsight:

personLearning.join(". "),



personLearning,



patternsFound:

observation.signals,



lesson:

"Remember this experience for future context",



futureBehavior:

"Compare future events with this memory",



success:true,


confidence:5


},

"LOCAL_REFLECTION"


);


}








// =================================
// Importance detector
// =================================


findImportance(reflection){



if(

reflection.relationshipInsight

){

return "high";

}



if(

reflection.confidence >= 8

){

return "high";

}



if(

reflection.confidence >=5

){

return "medium";

}



return "low";


}



}


export default EmmaReflection;