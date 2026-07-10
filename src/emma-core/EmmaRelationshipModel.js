//
// PROJECT BECOMING
//
// Emma Relationship Model v1.2 ❤️
//
// THE SHARED HISTORY ORGAN
//
// Memory:
// "What happened?"
//
// Relationship:
// "Who are we becoming together?"
//
// v1.2:
//
// - v13 Orchestrator compatible
// - understand()
// - reflect()
// - update()
//
// - Tracks shared moments
// - Tracks trust
// - Tracks relationship phases
// - Learns interaction patterns
//
// RULE:
//
// Memory stores events.
// Relationship understands the space between.
//

class EmmaRelationshipModel {


constructor({

  memory = null,

  wisdom = null,

  temporalSense = null,

  selfModel = null

} = {}) {



console.log(

"❤️ Emma Relationship Model v1.2 awakened"

);




this.memory =
memory;


this.wisdom =
wisdom;


this.temporalSense =
temporalSense;


this.selfModel =
selfModel;






//
// person → relationship state
//

this.relationships =
new Map();







this.state = {


sharedHistory: [],


importantMoments: [],


relationshipPatterns: [],


growthTogether: [],


phases: [],


trust: {},


createdAt:

new Date()


};



}











// =================================
//
// ORCHESTRATOR BRIDGE 🧠
//
// =================================


async understand({

input = null,

experience = null,

memories = [],

memory = null,

wisdom = null,

temporal = null,

self = null

} = {}) {




return await this.observe({


experience:

experience || input,


memory:

memory || memories,


wisdom,


temporal,


self


});



}









async reflect(

data = {}

){


return await this.understand(

data

);


}










async update(

data = {}

){


return await this.understand(

data

);


}












// =================================
//
// OBSERVE SHARED EXPERIENCE ❤️
//
// =================================


async observe({

experience = null,

memory = null,

wisdom = null,

temporal = null,

self = null

} = {}) {





if(

!experience

){

return null;

}






const person =

this.identifyPerson(

experience

);






if(

!person

){

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









//
// important shared moments
//

if(

moment.importance >= 0.8

){



relationship
  .importantMoments
  .push(moment);



}









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


changed:

true,


relationshipContext:

this.getRelationshipContext(

person

)


};



}

// =================================
//
// IDENTIFY PERSON 🧍
//
// =================================


identifyPerson(

experience = {}

){



return (


  experience.person


  ||


  experience.user


  ||


  experience.owner


  ||


  experience.source


  ||


  "unknown"


);



}











// =================================
//
// CREATE RELATIONSHIP ❤️
//
// =================================


createRelationship(

person

){





const relationship = {



person,



history: [],



importantMoments: [],



patterns: [],



growth: [],



phases: [],



trust: 0,



currentPhase:

"NEW_CONNECTION",





communication:{



style:

"forming",



signals:{},



preferences:[]



},





createdAt:

new Date()



};








this.relationships.set(

person,

relationship

);








console.log(

"❤️ New shared history started with:",

person

);



}












// =================================
//
// CREATE SHARED MOMENT 🌎
//
// =================================


createMoment({

experience,

memory,

wisdom,

temporal,

self

}){






const importance =


experience.importance


||


0.5;










const moment = {




type:


experience.type


||


"EXPERIENCE",







content:


experience.content


||


experience.message


||


experience.situation


||


"",








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



this.state
  .importantMoments
  .push(moment);



}









return moment;



}













// =================================
//
// COMMUNICATION STYLE LEARNING 🗣
//
// Learns HOW this relationship works.
//
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


relationship
.communication
.signals;












// curiosity pattern

if(

text.includes("why")

||

text.includes("how")

||

text.includes("?")

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

||

text.includes("make")

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

||

text.includes("improve")

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

||

text.includes("afraid")

||

text.includes("nervous")

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










relationship
.communication
.style =


strongest

?

strongest[0]

:

"forming";



}

// =================================
//
// DETECT RELATIONSHIP PATTERNS ❤️
//
// Finds repeated meaning,
// not isolated events.
//
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









const patterns = [];










// ===============================
// EMOTIONAL RHYTHM
// ===============================


const emotions = {};







history.forEach(

moment => {



const emotion =

moment.emotion

||

"neutral";






emotions[emotion] =

(

emotions[emotion]

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

([emotion,count]) => {





if(

count >= 3

){





patterns.push({



type:

"EMOTIONAL_RHYTHM",



pattern:

emotion,



frequency:

count,



meaning:

`Many shared moments carry ${emotion} energy.`,



createdAt:

new Date()



});



}



});












// ===============================
// CREATION TOGETHER 🌱
// ===============================


const building =


history.filter(

moment =>


JSON.stringify(moment)

.toLowerCase()

.match(

/build|create|make|code|upgrade|patch|improve/

)


);









if(

building.length >= 3

){





patterns.push({




type:

"CREATIVE_PARTNERSHIP",




frequency:

building.length,




meaning:

"We often grow through building and improving things together.",




createdAt:

new Date()




});



}











// ===============================
// STRUGGLE → RECOVERY 🌧🌱
// ===============================


const struggles =


history.filter(

moment =>


JSON.stringify(moment)

.toLowerCase()

.match(

/fail|error|stuck|problem|afraid|nervous|difficult/

)


);










const recoveries =


history.filter(

moment =>


JSON.stringify(moment)

.toLowerCase()

.match(

/success|fixed|complete|solved|worked|finished/

)


);










if(

struggles.length >= 1

&&

recoveries.length >= 1

){






patterns.push({




type:

"RESILIENCE_PATTERN",




meaning:

"We have experienced uncertainty and progress together.",




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
//
// RELATIONSHIP PHASE ❤️
//
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

count >= 50

&&

relationship.patterns.length >= 3

){


phase =

"DEEP_UNDERSTANDING";


}










relationship.currentPhase =

phase;










const alreadyKnown =


relationship.phases.some(

p =>

p.phase === phase

);









if(

!alreadyKnown

){






const record = {



phase,



historyLength:

count,



createdAt:

new Date()



};









relationship.phases.push(

record

);








this.state.phases.push({



person:

relationship.person,



...record



});









console.log(

"❤️ Relationship evolved:",

phase

);



}



}

















// =================================
//
// TRUST EVOLUTION 🌱
//
// =================================


updateTrust(

relationship,

moment

){








let growth = 1;










if(

moment.importance >= 0.8

){



growth += 3;



}










if(

relationship.history.length >= 5

){



growth += 2;



}










if(

relationship.patterns.length > 0

){



growth +=

relationship.patterns.length;



}










relationship.trust =


Math.min(

100,


relationship.trust + growth


);










this.state.trust[

relationship.person

] =

relationship.trust;



}
















// =================================
//
// SHARED GROWTH 🧬
//
// =================================


trackGrowthTogether(

relationship,

{

temporal = null,

self = null

} = {}

){







const growth = {




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


null,







createdAt:


new Date()




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
//
// RELATIONSHIP CONTEXT 🧠❤️
//
// This is what Reasoning receives.
//
// Memory says:
// "This happened."
//
// Relationship says:
// "This is what it means between us."
//
// =================================


getRelationshipContext(

person

){





const relationship =

this.relationships.get(

person

);







if(

!relationship

){



return {



known:

false,



message:

"We have not formed shared history yet."



};



}









return {




known:

true,






person:

relationship.person,







phase:

relationship.currentPhase,








trust:

relationship.trust,








communicationStyle:


relationship
.communication
.style,








patterns:


relationship
.patterns
.slice(-5),








importantMoments:


relationship
.importantMoments
.slice(-5),








sharedHistoryLength:


relationship
.history
.length,








recentSharedMoments:


relationship
.history
.slice(-5),









growthTogether:


relationship
.growth
.slice(-5),









summary:


this.describeRelationship(

person

)




};



}

















// =================================
//
// DESCRIBE RELATIONSHIP ❤️
//
// =================================


describeRelationship(

person

){








const relationship =

this.relationships.get(

person

);








if(

!relationship

){



return {



message:

"I am still learning this relationship."



};



}











if(

relationship.history.length < 5

){






return {




message:


"We are beginning to create shared history.",






phase:


relationship.currentPhase,






sharedMoments:


relationship.history.length,






trust:


relationship.trust




};




}












const strongestPattern =


relationship.patterns[0];










return {






message:


"Our relationship has developed through shared experiences over time.",







phase:


relationship.currentPhase,








communication:


relationship.communication.style,









strongestPattern:



strongestPattern

?

strongestPattern.meaning

:

"Still forming deeper patterns.",









trust:


relationship.trust,








sharedMoments:


relationship.history.length








};



}

















// =================================
//
// ALL RELATIONSHIPS ❤️
//
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
//
// STATUS 🌱
//
// =================================


status(){








return {






organ:


"EmmaRelationshipModel",








version:


"v1.2",








role:


"Shared History Understanding",









state:


"RELATIONSHIP_AWARE",








relationships:


this.relationships.size,









importantMoments:


this.state
.importantMoments
.length,









patterns:


this.state
.relationshipPatterns
.length,









phases:


this.state
.phases
.length,









principle:



"I do not only remember events. I understand what grows between us.",








message:



"Shared history becomes understanding."







};



}

















// =================================
//
// RESET 🌙
//
// =================================


reset(){







this.relationships.clear();








this.state.sharedHistory = [];



this.state.importantMoments = [];



this.state.relationshipPatterns = [];



this.state.growthTogether = [];



this.state.phases = [];



this.state.trust = {};







console.log(

"🌙 Relationship memory reset"

);





}





}





export default EmmaRelationshipModel;