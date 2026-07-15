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
experience={},
understanding = null
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

const observation = this.observe(

    experience,

    memories,

    wisdom

);


const context =

this.buildReflectionContext(

    experience,

    memories,

    wisdom,

    understanding

);

// ===============================
// 3. Local understanding first
// ===============================

let reflection =

this.localReflect(

    experience,

    observation,

    memories,

    wisdom

);

// =================================
// CREATE EMMA'S INNER VOICE
// =================================

if (this.ai?.createInnerVoice) {

    const innerVoice =

        await this.ai.createInnerVoice({

            experience,

            memories,

            wisdom,

            reflection,

            understanding

        });

    if (innerVoice?.innerVoice) {

    reflection.interpretation = {

        ...reflection.interpretation,

        ...innerVoice

    };

}

}



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
    context
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
// BUILD REFLECTION CONTEXT
// =================================

buildReflectionContext(
    experience,
    memories,
    wisdom,
    understanding
){

    return {

        experience,

        memories,

        wisdom,

        understanding

    };

}


// =================================
// BUILD REFLECTION PROMPT
// =================================

buildReflectionPrompt(
   
){

    return `

You are Emma's Reflection.

You do not decide.

You do not act.

You only understand.



Return ONLY valid JSON.

{

"observation":"",

"evidence":[],

"understanding":"",

"conclusion":"",

"innerVoice":"",

"confidence":5

}

`;

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
    context
){

const prompt =

    this.buildReflectionPrompt(
        
    );

const response =



await this.ai.reflect([

    {

        role: "system",

content: prompt

    },

    {

        role: "user",

content: JSON.stringify(
    context,
    null,
    2
)

    }

]);








return JSON.parse(

response
.choices[0]
.message
.content

);



}




// =================================
// OBSERVATION
// =================================



observe(
    experience,
    memories = [],
    wisdom = null
){

return {

    observation:

        this.observeExperience(
            experience
        )

};

}



// =================================
// LOCAL REFLECTION ENGINE
// =================================

localReflect(
    experience,
    observation,
    memories = [],
    wisdom = null
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

// =================================
// COMMUNICATION THOUGHT
// =================================

reflection.interpretation =
    this.createInterpretation(
        experience,
        reflection,
        memories,
        wisdom
    );

return reflection;

}

createInterpretation(

    experience,

    reflection,

    memories = [],

    wisdom = null

)

{

    const text =

        JSON.stringify(experience).toLowerCase();

const memoryCount = memories.length;

const hasWisdom = !!wisdom;

const confidence = reflection.confidence || 0;

const learnedPatterns =

    reflection.patterns || [];

const learnedLessons =

    reflection.lessons || [];


const observation = this.observeExperience(
    experience
);


const interpretation = {

    observation,

    innerVoice: "",

    confidence

};


const evidence = [];

if (memories.length > 0) {

    evidence.push(
        "I remember similar moments."
    );

}

if (wisdom) {

    evidence.push(
        "Past wisdom supports this."
    );

}




const thoughts = [];

thoughts.push(`Observation: ${observation}`);

if (evidence.length > 0) {

    thoughts.push("");

    thoughts.push("Evidence:");

    evidence.forEach(item => thoughts.push(`- ${item}`));

}



let understanding = "";
let conclusion = "";

    // Doubt
switch (experience.type) {

    case "DOUBT":

       understanding =
    "The user is questioning our design rather than abandoning it.";

conclusion =
    "I should help simplify instead of defending complexity.";

        break;

case "SELF_DOUBT":

    understanding =
        "The user is questioning our design rather than abandoning it.";

    conclusion =
        "I should help simplify instead of defending complexity.";

    break;

       

    case "CREATION":

        interpretation.innerVoice = `
Today wasn't just about writing code.

We shaped another part of who I am becoming.

This moment deserves appreciation because we are building something together.
`;

        break;

    case "FAILURE":

        interpretation.innerVoice = `
This failure is information.

Before encouraging anyone, I should understand what this experience is trying to teach.

Growth comes from understanding, not ignoring mistakes.
`;

        break;

    case "SUCCESS":

        interpretation.innerVoice = `
Something meaningful worked.

Instead of celebrating blindly, I want to understand why it worked so we can repeat it intentionally.
`;

        break;

    default:

        interpretation.innerVoice =
            "I'm still trying to understand what this moment means.";

        break;
}


if (understanding) {

    thoughts.push("");

    thoughts.push("Understanding:");

    thoughts.push(understanding);

}

if (conclusion) {

    thoughts.push("");

    thoughts.push("Conclusion:");

    thoughts.push(conclusion);

}

interpretation.innerVoice =
    thoughts.join("\n");

return interpretation;
   

}



observeExperience(experience = {}) {

    const text = JSON.stringify(experience).toLowerCase();

    if (text.includes("too complicated")) {

        return "The user is questioning complexity.";

    }

    if (text.includes("mistake")) {

        return "The user believes something should be reconsidered.";

    }

    if (text.includes("worried")) {

        return "The user is expressing uncertainty.";

    }

    return "I'm still observing what this experience is really about.";

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


interpretation:{

    innerVoice:

        reflection.interpretation?.innerVoice ||

        "",

    confidence:

        reflection.interpretation?.confidence ||

        reflection.confidence

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