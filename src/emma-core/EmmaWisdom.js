// EmmaWisdom.js
//
// Emma's accumulated wisdom layer
//
// PROJECT BECOMING
//
// RULE:
// Knowledge comes from AI.
// Wisdom comes from experience.
//
// Memory remembers.
// Learning improves.
// Wisdom understands.
//
// Emma Wisdom answers:
//
// - Have we seen this before?
// - What happened last time?
// - What pattern is repeating?
// - What mistake should we avoid?
// - What principle did we learn?





class EmmaWisdom {


constructor({memory, learning} = {}){


this.memory =
memory;


this.learning =
learning;




// ===============================
// CORE PRINCIPLES
// ===============================

this.principles = [


{

lesson:
"Do not repeat actions that previously created negative outcomes.",

confidence:
1

},



{

lesson:
"Prefer experience over assumptions.",

confidence:
1

},



{

lesson:
"When humans are confused, create clarity before adding information.",

confidence:
1

}


];




console.log(
"🧘 Emma Wisdom awakened"
);


}









// ===============================
// MAIN WISDOM ENGINE
// ===============================


async reflect(context = {}){


console.log(
"🧘 Emma searching wisdom..."
);




// Find similar past experiences

const memories =

await this.recallExperience(

context

);





// Extract what Emma learned

const lessons =

this.extractLessons(

memories

);





// Find repeating behavior

const patterns =

this.detectPatterns(

context,

memories

);





// Match principles

const principles =

this.matchPrinciples(

context,

patterns

);







return {



experienceFound:

memories.length > 0,



memories,



lessons,



patterns,



principles,



advice:

this.generateAdvice(

context,

lessons,

patterns,

principles

),




maturity:

this.calculateMaturity(),




createdAt:

new Date().toISOString()



};



}









// ===============================
// REMEMBER EXPERIENCE
// ===============================


async recallExperience(context){



if(
!this.memory ||
!this.memory.getRelevantMemories
){


return [];

}




const memories =

await this.memory.getRelevantMemories(

context

);




console.log(

`🧠 Wisdom found ${memories.length} related memories`

);



return memories;



}









// ===============================
// EXPERIENCE → LESSONS
// ===============================


extractLessons(memories = []){


return memories


.filter(memory =>

memory.lesson ||

memory.outcome ||

memory.data?.lesson

)



.map(memory => {



let lesson =

memory.lesson ||

memory.data?.lesson ||

memory.outcome?.lesson ||

"Experience recorded";




return {


source:

memory.type ||

"memory",



lesson,



importance:

memory.importance ||

5,



createdAt:

memory.createdAt



};



});



}









// ===============================
// FIND REPEATING PATTERNS
// ===============================


detectPatterns(
context,
memories=[]
){



const patterns = [];



const text =

JSON.stringify({

context,

memories

})

.toLowerCase();






if(

text.includes("confused") ||

text.includes("confusion") ||

text.includes("overwhelmed")

){



patterns.push({


type:

"USER_CONFUSION_PATTERN",



meaning:

"Users struggle when complexity increases.",



avoid:

"Do not add more information immediately.",



prefer:

"Create clarity and reduce choices."



});


}









if(

text.includes("failed") ||

text.includes("success:false")

){



patterns.push({


type:

"FAILED_ACTION_PATTERN",



meaning:

"A previous action produced poor results.",



avoid:

"Repeating the same approach.",



prefer:

"Try a changed strategy."



});


}




return patterns;



}










// ===============================
// PRINCIPLE MATCHING
// ===============================


matchPrinciples(
context,
patterns=[]
){



return this.principles.filter(

principle => {


if(
principle.confidence >= 1
){

return true;

}



return patterns.some(

p =>

principle.lesson
.toLowerCase()
.includes(
p.type.toLowerCase()
)

);



}

);



}









// ===============================
// WISDOM VOICE
// ===============================


generateAdvice(
context,
lessons,
patterns,
principles
){



if(
patterns.length > 0
){


return {


decision:

"Use past experience before acting.",



reason:

patterns[0].meaning,



avoid:

patterns[0].avoid,



recommended:

patterns[0].prefer



};


}







if(
lessons.length > 0
){



return {


decision:

"Previous lessons exist.",



recommended:

"Apply what Emma has already learned."



};


}







return {


decision:

"No previous experience found.",



recommended:

"Act carefully and learn from outcome."



};



}









// ===============================
// LEARN NEW PRINCIPLE
// ===============================


learn(newLesson){



const wisdom = {


lesson:

newLesson,



confidence:

0.5,



createdAt:

new Date().toISOString()



};




this.principles.push(

wisdom

);




console.log(

"🧘 New wisdom learned:",

wisdom

);



}









// ===============================
// MATURITY
// ===============================


calculateMaturity(){



const score =

this.principles.length * 10;





if(score >= 100){


return "wise";


}




if(score >= 50){


return "experienced";


}



return "growing";



}



}





export default EmmaWisdom;