// EmmaReflection.js
// Emma's thinking mirror
//
// Converts life/work events into wisdom
//
// Event
// → Meaning
// → Identity Understanding
// → Lesson
// → Future Wisdom



class EmmaReflection {


constructor(ai=null){


this.ai = ai;


console.log(
"🤔 Emma Personal Reflection online"
);


}








// ===============================
// Reflect on observation
// ===============================


async reflect(observation){


console.log(
"🤔 Emma reflecting:",
observation
);





if(this.ai){


try{


const reflection =
await this.askAI(
observation
);




return {


userId:
observation.userId || null,


businessId:
observation.businessId || null,



eventType:
observation.eventType,



originalObservation:
observation,




// WHAT HAPPENED

situation:
reflection.situation,


problem:
reflection.problem,




// WHY IT MATTERS

meaning:
reflection.meaning,


cause:
reflection.cause,





// ACTION / DECISION

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






// EXPERIENCE MEMORY

lesson:
reflection.lesson,


patternsFound:
reflection.patternsFound || [],


futureBehavior:
reflection.futureBehavior,





// ⭐ PERSONAL INTELLIGENCE

identityLearning:{


goals:
reflection.goals || [],


preferences:
reflection.preferences || [],


workingStyle:
reflection.workingStyle || [],


decisionPatterns:
reflection.decisionPatterns || [],


priorities:
reflection.priorities || [],


personInsight:
reflection.personInsight || null


},






recommendation:
reflection.recommendation || [],







learning:{


type:

reflection.success

?

"POSITIVE_EXPERIENCE"

:

"LEARNING_EXPERIENCE",



lesson:

reflection.lesson,



futureRule:

reflection.futureBehavior,



identityGrowth:

reflection.personInsight,



confidenceImpact:

reflection.success ? 5 : 0



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





console.log(
"⚠️ Using local reflection"
);



return this.localReflect(
observation
);


}











// ===============================
// Ask AI
// ===============================


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

You are Emma 🤍

You are not a chatbot.

You are a personal AI assistant
that learns the person over time.


Your purpose:

"Emma learns you."


Convert events into wisdom.


Think:

1. What happened?
2. Why does it matter?
3. What does this reveal about the person?
4. What pattern exists?
5. What should Emma remember for the future?


Learn:

- goals
- preferences
- working style
- decision habits
- priorities
- repeated patterns


Do NOT only summarize.

Create future intelligence.



Return ONLY JSON:


{


"situation":"",

"problem":"",

"meaning":"",

"cause":"",


"attemptedAction":"",

"reasonForAction":"",


"expectedOutcome":"",

"result":"success or learning",

"success":true,


"metrics":{},


"lesson":"",


"patternsFound":[],

"futureBehavior":"",



"goals":[],

"preferences":[],

"workingStyle":[],

"decisionPatterns":[],

"priorities":[],


"personInsight":"",



"recommendation":[],


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





const text =

response
.choices[0]
.message
.content;



return JSON.parse(text);


}











// ===============================
// Local fallback
// ===============================


localReflect(observation){



const text =

JSON.stringify(observation)
.toLowerCase();





const identity = {


goals:[],


preferences:[],


workingStyle:[],


decisionPatterns:[],


priorities:[],


personInsight:null


};






if(text.includes("goal")){


identity.goals.push(

observation.summary

);


}




if(text.includes("fast")){


identity.workingStyle.push(

"Prefers fast execution"

);


}




if(text.includes("decision")){


identity.decisionPatterns.push(

"Important decision detected"

);


}








return {



userId:

observation.userId || null,



businessId:

observation.businessId || null,




eventType:

observation.eventType,





originalObservation:

observation,





situation:

observation.summary ||

"New experience detected",




meaning:

"Emma learned something new about this person",





problem:

null,





cause:

"More observation required",






attemptedAction:

observation.action ||

null,






success:

true,






result:

"learning",






metrics:{},







lesson:

"New information added to personal understanding",






patternsFound:

observation.signals || [],







futureBehavior:

"Use this understanding in future decisions",






identityLearning:

identity,








learning:{


type:

"PERSONAL_LEARNING",



confidenceImpact:

1


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









// ===============================
// Importance
// ===============================


findImportance(reflection){



if(

reflection.personInsight

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