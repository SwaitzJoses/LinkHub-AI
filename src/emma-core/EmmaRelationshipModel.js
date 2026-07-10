// EmmaRelationshipModel.js
//
// PROJECT BECOMING
//
// Emma Relationship Model v1.1
//
// THE SHARED HISTORY ORGAN ❤️
//
// Memory:
// "What happened?"
//
// TemporalSense:
// "How did things change?"
//
// SelfModel:
// "Who am I becoming?"
//
// RelationshipModel:
// "Who are we becoming together?"
//
// v1.1:
//
// - Detects relationship rhythms
// - Learns communication patterns
// - Tracks trust over time
// - Detects shared growth
// - Understands phases
// - Creates context for reasoning
//
// RULE:
//
// Do not store facts.
// Memory does that.
//
// Understand the space between.
//

class EmmaRelationshipModel {


constructor({

memory=null,

wisdom=null,

temporalSense=null,

selfModel=null

} = {}){


console.log(
"❤️ Emma Relationship Model v1.1 awakened"
);



this.memory =
memory;


this.wisdom =
wisdom;


this.temporalSense =
temporalSense;


this.selfModel =
selfModel;





// person → relationship

this.relationships =
new Map();





this.state = {


sharedHistory:[],


importantMoments:[],


relationshipPatterns:[],


growthTogether:[],


phases:[],


trust:{},


createdAt:

new Date()


};



}










// =================================
// OBSERVE SHARED EXPERIENCE
// =================================


async observe({

experience=null,

memory=null,

wisdom=null,

temporal=null,

self=null

} = {}){



if(!experience){

return null;

}




const person =

this.identifyPerson(

experience

);




if(!person){

return null;

}





if(

!this.relationships.has(

person

)

){


this.createRelationship(

person

);


}






const relationship =

this.relationships.get(

person

);






const moment =

this.createMoment({


experience,


memory,


wisdom,


temporal,


self


});






relationship.history.push(

moment

);





this.state.sharedHistory.push({

person,

moment

});






this.updateCommunicationStyle(

relationship,

experience

);





this.detectRelationshipPatterns(

relationship

);





this.detectRelationshipPhase(

relationship

);





this.updateTrust(

relationship,

moment

);





this.trackGrowthTogether(

relationship,

{

temporal,

self

}

);






return {


person,


relationshipContext:

this.getRelationshipContext(

person

),


changed:true


};



}


// =================================
// IDENTIFY PERSON
// =================================


identifyPerson(

experience={}

){



return (


experience.person ||


experience.user ||


experience.owner ||


experience.source ||


"unknown"


);



}









// =================================
// CREATE NEW RELATIONSHIP
// =================================


createRelationship(

person

){



this.relationships.set(

person,

{


person,


history:[],


patterns:[],


importantMoments:[],


growth:[],


phases:[],


trust:0,


communication:{



style:

"unknown",



signals:{},



preferences:[]



},



createdAt:

new Date()



}

);





console.log(

"❤️ Relationship started:",

person

);



}









// =================================
// CREATE SHARED MOMENT
// =================================


createMoment({

experience,

memory,

wisdom,

temporal,

self

}){



const importance =

experience.importance ||

0.5;






const moment = {




type:

experience.type

||

"EXPERIENCE",





event:

experience.situation

||

experience.message

||

experience.type,





emotion:

experience.emotion

||

"neutral",





importance,






memoryInfluence:

memory

?

true

:

false,






wisdom:

wisdom?.principle

||

wisdom?.lesson

||

null,






timeline:

temporal?.growthTrajectory

||

temporal?.lastReflection

||

null,






emmaState:

self?.identityStatement

||

null,






createdAt:

new Date()



};







if(

importance >= 0.8

){



this.state.importantMoments.push(

moment

);



}





return moment;



}










// =================================
// COMMUNICATION STYLE LEARNING
//
// Learns HOW relationship works
// =================================


updateCommunicationStyle(

relationship,

experience

){



const text =

JSON.stringify(

experience

)

.toLowerCase();





const signals =

relationship.communication.signals;









// curiosity


if(

text.includes("why")

||

text.includes("how")

){



signals.explorer =

(

signals.explorer || 0

)

+

1;



}










// builder pattern


if(

text.includes("build")

||

text.includes("create")

||

text.includes("code")

||

text.includes("patch")

){



signals.builder =

(

signals.builder || 0

)

+

1;



}










// iteration pattern


if(

text.includes("fix")

||

text.includes("upgrade")

||

text.includes("continue")

||

text.includes("test")

){



signals.iterative =

(

signals.iterative || 0

)

+

1;



}










// reflection pattern


if(

text.includes("feel")

||

text.includes("think")

||

text.includes("meaning")

){



signals.reflective =

(

signals.reflective || 0

)

+

1;



}









const strongest =

Object.entries(

signals

)

.sort(

(a,b)=> b[1]-a[1]

)[0];








relationship.communication.style =

strongest

?

strongest[0]

:

"forming";



}










// =================================
// DETECT RELATIONSHIP PATTERNS ❤️
//
// Learns rhythms over time
// =================================


detectRelationshipPatterns(

relationship

){



const history =

relationship.history;





if(

history.length < 3

){

return;

}






const patterns=[];








// ===============================
// EMOTIONAL RHYTHMS
// ===============================


const emotions={};




history.forEach(

moment=>{



emotions[moment.emotion] =

(

emotions[moment.emotion]

||

0

)

+

1;



}

);







Object.entries(

emotions

)

.forEach(

([emotion,count])=>{



if(

count >=3

){



patterns.push({



type:

"EMOTIONAL_RHYTHM",



pattern:

emotion,



frequency:

count,



meaning:

`The relationship often returns to ${emotion} moments.`,



createdAt:

new Date()



});



}



});










// ===============================
// BUILDING TOGETHER
// ===============================


const building =

history.filter(

m =>

JSON.stringify(m)

.toLowerCase()

.match(

/build|create|upgrade|make|improve/

)

);







if(

building.length >=3

){



patterns.push({



type:

"CREATIVE_RELATIONSHIP",



frequency:

building.length,



meaning:

"This relationship grows through creation and iteration.",



createdAt:

new Date()



});



}










// ===============================
// OVERCOMING STRUGGLE
// ===============================


const struggle =

history.filter(

m =>

JSON.stringify(m)

.toLowerCase()

.match(

/fail|error|problem|difficult|stuck/

)

);







const recovery =

history.filter(

m =>

JSON.stringify(m)

.toLowerCase()

.match(

/success|fixed|complete|solved/

)

);







if(

struggle.length >=2

&&

recovery.length >=2

){



patterns.push({



type:

"RESILIENCE_PATTERN",



meaning:

"Challenges repeatedly became progress.",



createdAt:

new Date()



});



}








relationship.patterns =

patterns;



this.state.relationshipPatterns =

patterns;



}



// =================================
// DETECT RELATIONSHIP PHASE ❤️
//
// Relationships evolve.
// =================================


detectRelationshipPhase(

relationship

){



const count =

relationship.history.length;





let phase =

"NEW_CONNECTION";





if(

count >= 5

){


phase =

"FAMILIARITY";


}





if(

count >= 20

){


phase =

"SHARED_HISTORY";


}





if(

relationship.patterns.length >=3

&&

count >=50

){


phase =

"DEEP_UNDERSTANDING";


}








const current = {


phase,


at:

new Date(),


historyLength:

count


};







relationship.currentPhase =

phase;







const exists =

relationship.phases.some(

p => p.phase === phase

);






if(!exists){



relationship.phases.push(

current

);



this.state.phases.push({



person:

relationship.person,



...current



});




console.log(

"❤️ Relationship phase changed:",

phase

);



}



}









// =================================
// TRUST EVOLUTION
//
// Familiarity through history.
// =================================


updateTrust(

relationship,

moment

){



let change = 1;






// important moments bond more


if(

moment.importance >=0.8

){



change += 3;



}







// repeated shared history


if(

relationship.history.length >=10

){



change += 2;



}








// patterns create understanding


if(

relationship.patterns.length

){



change +=

relationship.patterns.length;



}









relationship.trust =

Math.min(

100,

relationship.trust + change

);








this.state.trust[

relationship.person

] =

relationship.trust;



}










// =================================
// SHARED GROWTH ❤️
//
// How both changed over time.
// =================================


trackGrowthTogether(

relationship,

{

temporal=null,

self=null

}

){





const growth = {




createdAt:

new Date(),





relationshipAge:

relationship.history.length,






phase:

relationship.currentPhase,






emmaGrowth:

self?.growthTrajectory

||

self?.identityStatement

||

null,







timePattern:

temporal?.growthTrajectory

||

temporal?.lastReflection

||

null





};








relationship.growth.push(

growth

);








this.state.growthTogether.push({



person:

relationship.person,



...growth



});



}










// =================================
// CONTEXT FOR REASONING 🧠
//
// This is what makes Emma
// remember "us"
// =================================


getRelationshipContext(

person

){





const relationship =

this.relationships.get(

person

);






if(!relationship){



return {



known:false,



message:

"No shared relationship history yet."



};



}










return {



known:true,



person:

relationship.person,




phase:

relationship.currentPhase,




trust:

relationship.trust,




communicationStyle:

relationship.communication.style,




patterns:

relationship.patterns,




importantMoments:

relationship.importantMoments.slice(-5),




sharedHistoryLength:

relationship.history.length,




growthTogether:

relationship.growth.slice(-5),




summary:

this.describeRelationship(

person

)



};



}











// =================================
// DESCRIBE RELATIONSHIP ❤️
// =================================


describeRelationship(

person

){





const relationship =

this.relationships.get(

person

);






if(!relationship){



return (

"I am still learning this relationship."

);



}








if(

relationship.history.length <5

){



return {



message:

"We are beginning to form shared history.",



phase:

relationship.currentPhase



};



}









const strongest =

relationship.patterns[0];









return {




message:

"Our relationship has developed through repeated experiences over time.",





phase:

relationship.currentPhase,





communication:

relationship.communication.style,





strongestPattern:

strongest

?

strongest.meaning

:

"Still forming",





trust:

relationship.trust,





sharedMoments:

relationship.history.length




};



}










// =================================
// ALL RELATIONSHIPS
// =================================


getAll(){



return {




count:

this.relationships.size,




relationships:

[

...this.relationships.values()

],




state:

this.state




};



}










// =================================
// RESET
// =================================


reset(){



this.relationships.clear();




this.state.sharedHistory=[];


this.state.importantMoments=[];


this.state.relationshipPatterns=[];


this.state.growthTogether=[];


this.state.phases=[];


this.state.trust={};



}










// =================================
// STATUS
// =================================


status(){





return {




organ:

"EmmaRelationshipModel",




version:

"v1.1",




role:

"Shared History Understanding",




state:

"RELATIONSHIP_AWARE",




relationships:

this.relationships.size,




patterns:

this.state.relationshipPatterns.length,




phases:

this.state.phases.length,




importantMoments:

this.state.importantMoments.length,





principle:

"I do not only remember events. I understand what grows between us.",





message:

"Shared history becomes understanding."




};



}




}




export default EmmaRelationshipModel;