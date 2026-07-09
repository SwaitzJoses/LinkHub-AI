// EmmaIdentityMemory.js
//
// PROJECT BECOMING
//
// Identity Memory v2
//
// EmmaMemory:
// "What happened?"
//
// MemoryConsolidation:
// "What did I learn?"
//
// IdentityMemory:
// "Who are we becoming together?"
//
// RULE:
// Store identity.
// Do not reason here.



class EmmaIdentityMemory {


constructor(){


this.identities =
new Map();



console.log(
"🧑 Emma Identity Memory v2 awake"
);


}









// =====================================
// CREATE STABLE IDENTITY KEY
// =====================================


createIdentityKey(person){


if(!person){

return null;

}



if(person.email){

return person.email
.toLowerCase()
.trim();

}



if(person.phone){

return person.phone
.toString()
.trim();

}



if(person.name){

return person.name
.toLowerCase()
.trim();

}



return null;


}









// =====================================
// FIND PERSON
// =====================================


find(person){


const key =
this.createIdentityKey(person);



if(!key){

return null;

}



return (

this.identities.get(key)

||

null

);


}









// =====================================
// CREATE IDENTITY
// =====================================


create(person, context={}){


const key =
this.createIdentityKey(person);



if(!key){

return null;

}






const identity = {



id:
key,



name:
person.name || "Unknown",



email:
person.email || null,



phone:
person.phone || null,



createdAt:
new Date(),



firstSeen:
new Date(),



lastSeen:
new Date(),







// ----------------------
// where Emma met them
// ----------------------

sources:[

person.source ||
"unknown"

],








// ----------------------
// relationship state
// ----------------------

relationship:{



familiarity:
1,



trust:
0,



interactions:
0,



stage:
"new"



},








// ----------------------
// learned profile
// ----------------------

profile:{



preferences:{},



communication:{



style:null,



pace:null,



detailLevel:null



},



interests:[]



},









//
// Beliefs Emma formed
// about this relationship
//

beliefs:[],










//
// Timeline
//

history:[



{

type:
"FIRST_CONTACT",


time:
new Date(),


context


}



]



};







this.identities.set(
key,
identity
);




console.log(
"🆕 New relationship formed:",
identity.name
);




return identity;


}









// =====================================
// UPDATE IDENTITY
// =====================================


update(identity, person, context={}){


identity.lastSeen =
new Date();




identity.relationship.interactions++;




identity.relationship.familiarity =

Math.min(

identity.relationship.familiarity + 1,

100

);






if(person.source &&

!identity.sources.includes(
person.source
)

){


identity.sources.push(
person.source
);


}






identity.name =
person.name ||
identity.name;



identity.email =
person.email ||
identity.email;



identity.phone =
person.phone ||
identity.phone;







identity.history.push({



type:
"INTERACTION",



time:
new Date(),



source:
person.source,



context



});







this.updateRelationshipStage(
identity
);







this.identities.set(
identity.id,
identity
);




return identity;


}









// =====================================
// RELATIONSHIP EVOLUTION
// =====================================


updateRelationshipStage(identity){



const count =
identity.relationship.interactions;





if(count > 50){


identity.relationship.stage =
"deep";


}



else if(count > 10){


identity.relationship.stage =
"familiar";


}



else {


identity.relationship.stage =
"learning";


}




}









// =====================================
// MAIN ENTRY
// =====================================


remember(person, context={}){



if(!person){

return null;

}



const existing =
this.find(person);




if(existing){


return this.update(
existing,
person,
context
);


}





return this.create(
person,
context
);


}









// =====================================
// LEARN USER FACT
// =====================================


learnFact(person, category, key, value){



const identity =
this.find(person);



if(!identity){

return null;

}





if(

!identity.profile[category]

){


identity.profile[category] = {};


}




identity.profile
[category]
[key] =
value;






identity.history.push({


type:
"FACT_LEARNED",


category,


key,


time:
new Date()


});






return identity;


}









// =====================================
// ADD RELATIONSHIP BELIEF
// =====================================


addBelief(person, belief){



const identity =
this.find(person);



if(!identity){

return null;

}




identity.beliefs.push({



belief,



confidence:
50,



createdAt:
new Date()



});






return identity;


}









// =====================================
// STRENGTHEN TRUST
// =====================================


increaseTrust(person, amount=5){



const identity =
this.find(person);



if(!identity){

return null;

}




identity.relationship.trust =

Math.min(

identity.relationship.trust + amount,

100

);





return identity;


}









// =====================================
// HISTORY
// =====================================


addHistory(person,event){



const identity =
this.find(person);



if(!identity){

return null;

}




identity.history.push({



time:
new Date(),



event



});




return identity;


}









// =====================================
// PRIVACY SAFE FORGET
// =====================================


forget(person){



const key =
this.createIdentityKey(person);




if(key){


this.identities.delete(
key
);


return true;


}




return false;


}










// =====================================
// GETTERS
// =====================================


getAll(){


return Array.from(

this.identities.values()

);


}






summary(){



return {



totalPeople:

this.identities.size,




relationships:



this.getAll()

.map(person=>({



name:
person.name,



stage:
person.relationship.stage,



trust:
person.relationship.trust,



interactions:
person.relationship.interactions,



knownSince:
person.firstSeen



}))



};



}



}





export default EmmaIdentityMemory;