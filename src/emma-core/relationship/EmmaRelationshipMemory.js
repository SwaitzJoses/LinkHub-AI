// EmmaRelationshipMemory.js
// Emma's relationship understanding layer
//
// PURPOSE:
// Learn the person Emma works with.
//
// Normal Memory:
// "What happened?"
//
// Relationship Memory:
// "What does this reveal about the person?"
//
// RULE:
// Do not store events.
// Store understanding.



class EmmaRelationshipMemory {


constructor(){


console.log(
"🤝 Emma Relationship Memory online"
);



this.profile = {


workingStyle:{},


preferences:{},


goals:[],


patterns:[],


strengths:[],


struggles:[],


decisionHistory:[],


communicationStyle:{},


trustLevel:0,


updatedAt:

new Date()


};


}









// ===============================
// LEARN FROM EXPERIENCE
// ===============================


learn(event){



console.log(
"🤝 Emma learning relationship",
event
);





// goals


if(event.goal){


this.addUnique(

this.profile.goals,

event.goal

);


}








// preferences


if(event.preference){


this.profile.preferences[

event.preference.type

]=

event.preference.value;


}









// patterns


if(event.pattern){


this.addUnique(

this.profile.patterns,

event.pattern

);


}










// struggles


if(event.struggle){



this.addUnique(

this.profile.struggles,

event.struggle

);


}










// strengths


if(event.strength){



this.addUnique(

this.profile.strengths,

event.strength

);


}










// decisions


if(event.decision){


this.profile
.decisionHistory
.push({


decision:event.decision,


result:

event.result || null,


date:

new Date()


});


}









// communication


if(event.communicationStyle){


this.profile.communicationStyle = {

...this.profile.communicationStyle,

...event.communicationStyle

};


}










this.profile.updatedAt =

new Date();




return this.profile;



}












// ===============================
// GET USER UNDERSTANDING
// ===============================


getRelationship(){


return this.profile;


}











// ===============================
// CONTEXT FOR REASONING
// ===============================


getReasoningContext(){



return {


knownGoals:

this.profile.goals,



knownPatterns:

this.profile.patterns,



preferences:

this.profile.preferences,



decisionHistory:

this.profile.decisionHistory,



communicationStyle:

this.profile.communicationStyle,



trustLevel:

this.profile.trustLevel



};



}












// ===============================
// TRUST GROWTH
// ===============================


increaseTrust(){



this.profile.trustLevel =

Math.min(

this.profile.trustLevel + 1,

100

);



return this.profile.trustLevel;



}











// ===============================
// HELPERS
// ===============================


addUnique(list,item){



if(

item &&

!list.includes(item)

){


list.push(item);


}



}



}




export default new EmmaRelationshipMemory();