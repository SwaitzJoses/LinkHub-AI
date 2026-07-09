// EmmaIdentityMemory.js
//
// PROJECT BECOMING
//
// Emma Living Identity Memory v4.1
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
// PATCH v4.1:
// - Evolution v3 bridge fixed
// - Stable trait merging
// - Prevents duplicate identity growth
// - Adds Brain snapshot support
// - No organ behavior changes
//


class EmmaIdentityMemory {


constructor(){


console.log(
"🧬 Emma Identity Memory v4.1 awakened"
);



this.identities =
new Map();




this.coreIdentity = {


traits:[],


values:[],


evolutions:[],


createdAt:

new Date()


};




this.relationshipPatterns=[];


}









// =================================
// CREATE IDENTITY KEY
// =================================


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



if(!key){

return null;

}



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
this.createIdentityKey(
person
);



if(!key){

return null;

}



const now =
new Date();





const identity={



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




// familiarity only.
// trust needs evidence.

identity.relationship.familiarity++;






identity.history.push({


type:"INTERACTION",


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
// Called ONLY by Evolution organ
// =================================


async integrateEvolution(
evolution={}
){



const change =

evolution.change ||

evolution.trait ||

evolution.name;





if(!change){


return null;


}






// prevent duplicate traits

const existing =

this.coreIdentity.traits.find(

trait =>

trait.name === change

);








if(existing){



existing.evidenceCount +=

evolution.evidenceCount || 1;




existing.lastStrengthened =

new Date();




existing.history.push({


reason:

evolution.evolvedBecause || null,


createdAt:

new Date()


});




console.log(
"🧬 Identity strengthened:",
change
);




return existing;


}









// create permanent identity trait

const trait={



id:

this.createId(),



name:

change,



source:

"EvolutionEngine",



strength:

"STABLE",



evidenceCount:

evolution.evidenceCount || 1,



formedFrom:

evolution.evolvedBecause || [],



history:[{


reason:

evolution.evolvedBecause || null,


createdAt:

new Date()


}],



createdAt:

new Date()



};








this.coreIdentity.traits.push(
trait
);





this.coreIdentity.evolutions.push({

...evolution,


acceptedAt:

new Date()


});






console.log(

"🧬 Identity accepted evolution:",

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

this.find(

person

);




if(!identity){

return null;

}







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
// Trust is earned.
// =================================


recalculateRelationship(

identity

){





const evidence =

identity.relationship.evidence;






const positive =

evidence.filter(

e => e.type === "POSITIVE"

).length;





const collaboration =

evidence.filter(

e => e.type === "COLLABORATION"

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


r.stage="new";


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




if(!identity){

return null;

}








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





if(!identity){

return null;

}







const belief =

identity.understanding.beliefs.find(

b => b.belief === beliefText

);






if(!belief){

return null;

}







belief.evidence++;





belief.confidence =

Math.min(

100,

belief.confidence + 10

);






return belief;



}









// =================================
// SNAPSHOT
//
// Read-only context for Brain
// =================================


snapshot(){





return {



traits:

this.coreIdentity.traits.map(

t => ({


name:t.name,


evidence:t.evidenceCount,


createdAt:t.createdAt


})

),





values:

this.coreIdentity.values,





evolutions:

this.coreIdentity.evolutions.length,





relationships:

this.identities.size





};



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

this.createIdentityKey(

person

);





if(!key){

return false;

}





return this.identities.delete(

key

);



}










// =================================
// HELPERS
// =================================


createId(){





if(

typeof crypto !== "undefined"

&&

crypto.randomUUID

){



return crypto.randomUUID();



}






return (

Date.now()

+

"-"

+

Math.random()

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

"v4.1",



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

"Only proven evolution becomes identity.",



message:

"I preserve stable changes, not temporary experiences."



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