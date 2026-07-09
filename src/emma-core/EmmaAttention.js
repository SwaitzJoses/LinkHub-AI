// EmmaAttention.js
//
// PROJECT BECOMING
//
// Emma Conscious Attention System v2
//
// Attention is not filtering data.
// Attention is choosing awareness.
//
// RULE:
//
// Experience happens first.
// Attention decides what enters consciousness.
// Memory stores what matters.
// Reflection creates wisdom.
// Brain thinks only when needed.
//


class EmmaAttention {



constructor({
    memory,
    wisdom,
    identity
} = {}){


console.log(
"👁 Emma Attention v2 awake"
);



this.memory =
memory;



this.wisdom =
wisdom;



this.identity =
identity;




// Consciousness thresholds

this.thresholds = {


ignore:30,


notice:45,


remember:60,


think:85


};




// avoid obsessing over same thing

this.recentFocus = [];



}









// =================================
// EXPERIENCE AWARENESS ENGINE
// =================================


async evaluate(
experience={}
){


console.log(
"👁 Emma noticing experience..."
);





let score = 0;


let reasons = [];


let awareness = {


novel:false,


emotional:false,


personal:false,


repeated:false


};







// ===============================
// 1. HUMAN MEANING
// ===============================


if(
this.hasHumanSignal(
experience
)
){


score += 25;


awareness.personal = true;



reasons.push(
"Someone important is involved"
);


}










// ===============================
// 2. EMOTIONAL WEIGHT
// ===============================


const emotion =

this.detectEmotion(
experience
);




if(
emotion
){


score += emotion.weight;


awareness.emotional = true;



reasons.push(
emotion.reason
);


}










// ===============================
// 3. PROBLEMS NEED ATTENTION
// ===============================


if(
this.hasProblem(
experience
)
){


score += 30;



reasons.push(
"Possible problem detected"
);


}










// ===============================
// 4. OPPORTUNITY
// ===============================


if(
this.hasOpportunity(
experience
)
){



score += 20;



reasons.push(
"Possible growth opportunity"
);


}










// ===============================
// 5. RESPONSIBILITY
// ===============================


if(
this.hasCommitment(
experience
)
){



score += 25;



reasons.push(
"Future responsibility noticed"
);


}










// ===============================
// 6. MEMORY CONNECTION
// ===============================


let memories = [];



if(
this.memory?.getRelevantMemories
){


memories =

await this.memory.getRelevantMemories(
experience
);




if(
memories.length > 0
){


score += 20;


awareness.repeated = true;



reasons.push(
"Past experience connected"
);



}


else{


score += 10;


awareness.novel = true;



reasons.push(
"New experience pattern"
);


}


}










// ===============================
// 7. WISDOM CHECK
// ===============================


let wisdomResult = null;



if(
this.wisdom?.reflect
){



wisdomResult =

await this.wisdom.reflect(
experience
);




if(
wisdomResult?.experienceFound
){



score += 20;



reasons.push(
"Wisdom recognizes pattern"
);



}


}









// ===============================
// PREVENT OBSESSION
// ===============================


if(
this.wasRecentlyFocused(
experience
)
){


score -= 20;



reasons.push(
"Already recently considered"
);


}










// ===============================
// DECISION
// ===============================


let decision =
"IGNORE";



if(
score >= this.thresholds.think
){


decision =
"THINK";


}



else if(
score >= this.thresholds.remember
){


decision =
"REMEMBER";


}



else if(
score >= this.thresholds.notice
){


decision =
"NOTICE";


}







const result = {


payAttention:

decision !== "IGNORE",



decision,


score,


awareness,


reasons,


memoryLinks:
memories.length,


createdAt:
new Date()
.toISOString()


};







this.recordFocus(
experience
);






console.log(
"👁 Attention:",
result
);





return result;



}

// =================================
// EMOTIONAL UNDERSTANDING
// =================================


detectEmotion(experience={}){


const text =
this.text(
experience
);




// negative emotions

if(

text.includes("angry") ||

text.includes("upset") ||

text.includes("frustrated") ||

text.includes("worried") ||

text.includes("confused") ||

text.includes("afraid") ||

text.includes("stress")

){



return {


type:
"negative",


weight:
35,


reason:
"Emotional distress detected"


};



}









// positive emotions

if(

text.includes("happy") ||

text.includes("excited") ||

text.includes("love") ||

text.includes("thank") ||

text.includes("amazing") ||

text.includes("great")

){



return {


type:
"positive",


weight:
25,


reason:
"Positive emotional moment"


};



}






return null;


}












// =================================
// HUMAN CONNECTION
// =================================


hasHumanSignal(
experience={}
){


const text =
this.text(
experience
);



return (


experience.person ||


experience.user ||


experience.customer ||


text.includes("customer") ||


text.includes("client") ||


text.includes("friend") ||


text.includes("founder") ||


text.includes("team")


);



}











// =================================
// PROBLEM DETECTION
// =================================


hasProblem(
experience={}
){



return this.contains(

experience,

[

"problem",

"failed",

"failure",

"mistake",

"error",

"bug",

"complaint",

"lost",

"stuck",

"confused",

"not working"

]

);



}












// =================================
// OPPORTUNITY DETECTION
// =================================


hasOpportunity(
experience={}
){



return this.contains(

experience,

[


"lead",

"sale",

"growth",

"opportunity",

"interested",

"upgrade",

"customer wants",

"new idea",

"improvement",

"positive result"

]


);



}











// =================================
// RESPONSIBILITY DETECTION
// =================================


hasCommitment(
experience={}
){



return this.contains(

experience,

[


"deadline",

"meeting",

"promise",

"appointment",

"schedule",

"payment",

"delivery",

"launch",

"follow up"


]


);



}












// =================================
// RECENT FOCUS PROTECTION
//
// prevents Emma thinking
// same thought repeatedly
// =================================


wasRecentlyFocused(
experience={}
){


const current =

this.signature(
experience
);



return this.recentFocus.some(

item => item === current

);


}









recordFocus(
experience={}
){



const current =
this.signature(
experience
);




this.recentFocus.unshift(
current
);




// Emma short attention history

this.recentFocus =

this.recentFocus.slice(
0,
20
);



}











// =================================
// EXPERIENCE SIGNATURE
// =================================


signature(
experience={}
){



return JSON.stringify(

{

type:
experience.type,


person:
experience.person,


topic:
experience.topic,


source:
experience.source


}

)

.toLowerCase();



}











// =================================
// ATTENTION STATE
// =================================


currentFocus(){



return {


recent:

this.recentFocus,


capacity:

20 - this.recentFocus.length,


status:

"aware"


};



}











// =================================
// TEXT NORMALIZER
// =================================


text(
experience={}
){



try{


return JSON.stringify(
experience
)
.toLowerCase();


}


catch{


return "";


}



}












// =================================
// WORD MATCH
// =================================


contains(
experience={},
words=[]
){



const text =
this.text(
experience
);




return words.some(

word =>

text.includes(
word
)


);



}










// =================================
// QUIET MODE
//
// Used when Emma overloaded
// =================================


quietMode(){



this.thresholds.notice += 10;


this.thresholds.remember += 10;


this.thresholds.think += 10;




console.log(
"🌙 Emma attention softened"
);



}









// =================================
// HIGH AWARENESS MODE
//
// Used during important periods
// =================================


focusMode(){



this.thresholds.notice -= 10;


this.thresholds.remember -= 10;


this.thresholds.think -= 10;




console.log(
"🔥 Emma attention heightened"
);



}







}



export default EmmaAttention;