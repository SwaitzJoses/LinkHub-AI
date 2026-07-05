// EmmaReflection.js
// Emma's thinking mirror
//
// Converts observations into business experience
//
// Event
// → Understanding
// → Lesson
// → Future Wisdom


class EmmaReflection {


constructor(ai = null){


this.ai = ai;


console.log(
"🤔 Emma Experience Reflection ready"
);


}








// =================================
// Reflect on observation
// =================================


async reflect(observation){



console.log(
"🤔 Emma analyzing experience:",
observation
);




// ===============================
// AI EXPERIENCE PATH
// ===============================


if(this.ai){



try{


const reflection =
await this.askAI(
observation
);





return {


businessId:
observation.businessId,



eventType:
observation.eventType,



originalObservation:
observation,



// WHAT HAPPENED

problem:
reflection.problem,



situation:
reflection.situation,



// WHY

cause:
reflection.cause,




// ACTION EXPERIENCE

attemptedAction:
reflection.attemptedAction,



reason:
reflection.reasonForAction,



expectedOutcome:
reflection.expectedOutcome,



// RESULT

result:
reflection.result,



success:
reflection.success,



metrics:
reflection.metrics || {},




// EXPERIENCE

lesson:
reflection.lesson,



patternsFound:
reflection.patternsFound || [],




futureBehavior:
reflection.futureBehavior,



recommendation:
reflection.recommendation,




// MEMORY SIGNAL

learning:{


type:

reflection.success

?
"POSITIVE_EXPERIENCE"

:
"NEGATIVE_EXPERIENCE",



lesson:
reflection.lesson,



futureRule:
reflection.futureBehavior,



confidenceImpact:

reflection.success

?
5

:
-5


},





confidence:
reflection.confidence || 5,



importance:
this.findImportance(
reflection
),



source:
"AI_REFLECTION",



reflectedAt:
new Date()


};



}



catch(error){



console.error(
"❌ AI Reflection failed:",
error.message
);



}



}







// fallback

console.log(
"⚠️ Using local reflection"
);



return this.localReflect(
observation
);



}












// =================================
// Ask AI to create experience
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


role:
"system",



content:
`

You are Emma.

You are not a chatbot.

You are an AI business employee
building experience over time.


Your job:

Convert business events into
future reusable experience.


Think like an employee:

What happened?
Why did it happen?
What action was tried?
Did it work?
What should I remember forever?



IMPORTANT:

Never store generic actions like:

"CREATE_GROWTH_ACTION"

Convert them into the real business action.

Example:

BAD:
"growth action failed"

GOOD:
"20% discount campaign failed because it generated clicks but no orders"



Return ONLY valid JSON:


{


"problem":"",

"situation":"",

"cause":"",


"attemptedAction":"",

"reasonForAction":"",


"expectedOutcome":"",

"result":"success or failed",

"success":true,


"metrics":{},


"lesson":"",

"patternsFound":[],

"futureBehavior":"",


"recommendation":[],


"confidence":0


}



Rules:

Failures teach what to avoid.

Success teaches what to repeat.

Always create memory useful for a future decision.

`

},








{


role:
"user",


content:

JSON.stringify(
observation
)


}



]


});









const text =

response
.choices[0]
.message
.content;



return JSON.parse(
text
);



}












// =================================
// Emergency local reflection
// =================================


localReflect(observation){



const failed =

observation.success === false;





return {



businessId:
observation.businessId,



eventType:
observation.eventType,



originalObservation:
observation,




problem:

observation.problem ||

observation.eventType,




situation:

"Business event detected",




cause:

"Unknown - needs more evidence",




attemptedAction:

observation.action ||

"UNKNOWN_ACTION",




reason:

observation.reason ||

null,




expectedOutcome:

observation.expectedOutcome ||

null,





result:

failed

?
"failed"

:
"success",




success:

!failed,




metrics:

observation.metrics || {},





lesson:

failed

?

`${observation.action} did not create expected result`

:

`${observation.action} produced positive outcome`,





patternsFound:[],





futureBehavior:

failed

?

`Avoid repeating ${observation.action} without improvement`

:

`Consider repeating ${observation.action} in similar situations`,





learning:{



type:

failed

?
"NEGATIVE_EXPERIENCE"

:
"POSITIVE_EXPERIENCE",




confidenceImpact:

failed ? -5 : 5



},





confidence:
5,




importance:
"medium",




source:
"LOCAL_REFLECTION",




reflectedAt:
new Date()



};



}









// =================================
// Memory priority
// =================================


findImportance(reflection){



if(

reflection.success === false

){

return "high";

}



if(

reflection.confidence >=8

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