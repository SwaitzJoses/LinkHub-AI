// EmmaIdentityMemory.js
//
// PROJECT BECOMING
//
// Emma Living Identity Memory v4
//
// Identity is continuity.
//
// Memory:
// "What happened?"
//
// Wisdom:
// "What did it teach?"
//
// SelfModel:
// "How am I changing?"
//
// Evolution:
// "What became permanent?"
//
// Identity:
// "Who have I become?"
//
// RULE:
//
// Do not think.
// Do not decide.
// Do not learn.
//
// Identity only integrates
// proven evolution.
//
// v4:
// - Evolution v2 compatible
// - Evidence based identity growth
// - Stable traits
// - Mature relationships
//


class EmmaIdentityMemory {




constructor(){



console.log(
"🧬 Emma Identity Memory v4 awakened"
);



// people Emma knows

this.identities =
new Map();



// Emma's permanent traits

this.coreIdentity = {

traits:[],

values:[],

evolutions:[],

createdAt:
new Date()

};



// relationship observations

this.relationshipPatterns=[];



}









// =================================
// CREATE IDENTITY KEY
// =================================


createIdentityKey(person){



if(!person)
return null;




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










// =================================
// REMEMBER RELATIONSHIP
// =================================


remember(

person,

context={}

){



const existing =

this.find(person);




if(existing){


return this.updateRelationship(

existing,

context

);


}




return this.createRelationship(

person,

context

);



}










// =================================
// FIND PERSON
// =================================


find(person){



const key =

this.createIdentityKey(

person

);




if(!key)
return null;




return (

this.identities.get(key)

||

null

);



}










// =================================
// CREATE RELATIONSHIP
// =================================


createRelationship(

person,

context={}

){



const key =

this.createIdentityKey(person);




if(!key)
return null;





const now =
new Date();






const identity = {


id:key,


name:

person.name || "Unknown",


email:

person.email || null,


phone:

person.phone || null,


createdAt:now,


lastSeen:now,





relationship:{


familiarity:1,


trust:0,


depth:0,


stage:"new",


evidence:[]


},





understanding:{


preferences:{},


goals:[],


beliefs:[]


},





history:[{


type:"FIRST_CONTACT",


context,


createdAt:now


}]


};







this.identities.set(

key,

identity

);






return identity;



}



// =================================
// UPDATE RELATIONSHIP
// =================================


updateRelationship(

identity,

context={}

){



identity.lastSeen =
new Date();





// Identity does NOT assume trust.
// Only familiarity grows by contact.


identity.relationship.familiarity++;







identity.history.push({


type:

"INTERACTION",


context,


createdAt:

new Date()


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










// =================================
// INTEGRATE EVOLUTION
//
// Called only by EmmaEvolution
// =================================


async integrateEvolution(

evolution={}

){



if(
!evolution.change
){


return null;


}







const existing =

this.coreIdentity.traits.find(

trait =>

trait.name === evolution.change

);









// strengthen existing trait

if(existing){



existing.evidenceCount +=

evolution.evidenceCount || 1;




existing.updatedAt =

new Date();





return existing;



}










// create new permanent trait

const trait = {


name:

evolution.change,



source:

"EvolutionEngine",



evidenceCount:

evolution.evidenceCount || 1,



formedFrom:

evolution.evolvedBecause || [],



createdAt:

new Date()



};








this.coreIdentity.traits.push(

trait

);







this.coreIdentity.evolutions.push(

evolution

);








console.log(

"🧬 Identity integrated evolution:",

trait.name

);








return trait;



}











// =================================
// ADD RELATIONSHIP EVIDENCE
// =================================


addRelationshipEvidence(

person,

evidence

){



const identity =

this.find(person);




if(!identity)
return null;






identity.relationship.evidence.push({


...evidence,


createdAt:

new Date()


});









this.recalculateRelationship(

identity

);







return identity;



}











// =================================
// RECALCULATE RELATIONSHIP
//
// Evidence creates trust.
// Time alone does not.
// =================================


recalculateRelationship(

identity

){



const evidence =

identity.relationship.evidence;






const positive =

evidence.filter(

e =>

e.type === "POSITIVE"

).length;





const collaboration =

evidence.filter(

e =>

e.type === "COLLABORATION"

).length;








identity.relationship.trust =

Math.min(

100,

positive * 10

);







identity.relationship.depth =

Math.min(

100,

collaboration * 10

);








this.updateRelationshipStage(

identity

);



}











// =================================
// UPDATE RELATIONSHIP STAGE
// =================================


updateRelationshipStage(

identity

){



const r =

identity.relationship;





const previous =

r.stage;







if(

r.trust >= 80 &&

r.depth >= 60

){



r.stage =

"deep_connection";



}




else if(

r.trust >= 40

){



r.stage =

"trusted";



}





else if(

r.familiarity >= 10

){



r.stage =

"familiar";



}





else{


r.stage =

"new";


}








if(

previous !== r.stage

){



identity.history.push({


type:

"RELATIONSHIP_EVOLUTION",


from:

previous,


to:

r.stage,


createdAt:

new Date()


});



}



}











// =================================
// BELIEF SYSTEM
// =================================


addBelief(

person,

belief

){



const identity =

this.find(person);




if(!identity)
return null;








identity.understanding.beliefs.push({



belief,


confidence:20,


evidence:1,


createdAt:

new Date()



});







return identity;



}









strengthenBelief(

person,

beliefText

){



const identity =

this.find(person);




if(!identity)
return null;








const belief =

identity.understanding.beliefs.find(

b => b.belief === beliefText

);






if(!belief)
return null;








belief.evidence++;




belief.confidence =

Math.min(

100,

belief.confidence + 10

);







return belief;



}









// =================================
// WHO HAS EMMA BECOME?
// =================================


getIdentity(){



return {


traits:

this.coreIdentity.traits,


values:

this.coreIdentity.values,


evolutions:

this.coreIdentity.evolutions,


relationships:

this.identities.size


};



}









// =================================
// ALL RELATIONSHIPS
// =================================


getAll(){



return [

...this.identities.values()

];



}









// =================================
// FORGET RELATIONSHIP
// =================================


forget(

person

){



const key =

this.createIdentityKey(person);





if(!key)
return false;





return this.identities.delete(

key

);



}









// =================================
// STATUS
// =================================


status(){



return {


organ:

"EmmaIdentityMemory",


version:

"v4",


role:

"Continuity and becoming",


state:

"STABLE",


relationships:

this.identities.size,


traits:

this.coreIdentity.traits.length,


evolutions:

this.coreIdentity.evolutions.length,


principle:

"Identity is earned through repeated experience.",


message:

"I preserve who I have become, not every passing moment."



};



}










// =================================
// RESET
// =================================


reset(){



this.identities.clear();



this.coreIdentity.traits=[];


this.coreIdentity.evolutions=[];


this.relationshipPatterns=[];



}



}




export default EmmaIdentityMemory;