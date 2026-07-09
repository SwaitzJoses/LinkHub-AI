// EmmaIdentityMemory.js
// Emma's Identity Memory
//
// PURPOSE:
// Remember WHO Emma has interacted with.
//
// This is NOT event memory.
// This is NOT reasoning.
// This is NOT judgement.
//
// EmmaMemory:
// "What happened?"
//
// EmmaIdentityMemory:
// "Who is this?"
//
// RULE:
// Identity remembers.
// Brain thinks.

class EmmaIdentityMemory {


constructor(){


this.identities = new Map();


console.log(
"🧑 Emma Identity Memory awake"
);


}



// ----------------------------------------------------
// Create stable identity key
// ----------------------------------------------------

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



// ----------------------------------------------------
// Check if Emma knows this person
// ----------------------------------------------------

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



// ----------------------------------------------------
// Create new identity
// ----------------------------------------------------

create(person, context = {}){


const key =
this.createIdentityKey(person);


if(!key){
return null;
}



const identity = {


id:
key,


name:
person.name ||
"Unknown",


email:
person.email ||
null,


phone:
person.phone ||
null,


sources:
[
person.source || "unknown"
],


// first time Emma met them

firstSeen:
new Date(),


// latest interaction

lastSeen:
new Date(),


// every touchpoint

interactions:[
{

time:
new Date(),

source:
person.source,

context

}

],


// facts learned over time
// Example:
// company, role, preferences

profile:{},


// Relationship history only.
// No judgement here.

history:[]


};



this.identities.set(
key,
identity
);


console.log(
"🆕 New identity learned:",
identity.name
);


return identity;


}



// ----------------------------------------------------
// Update existing person
// ----------------------------------------------------

update(identity, person, context = {}){


identity.lastSeen =
new Date();



// add new source

if(
person.source &&
!identity.sources.includes(person.source)
){

identity.sources.push(
person.source
);

}



// update latest info

identity.name =
person.name ||
identity.name;


identity.email =
person.email ||
identity.email;


identity.phone =
person.phone ||
identity.phone;



identity.interactions.push({

time:
new Date(),

source:
person.source,

context

});



this.identities.set(
identity.id,
identity
);



console.log(
"🔄 Identity updated:",
identity.name
);


return identity;


}



// ----------------------------------------------------
// Main entry point
// Emma calls this
// ----------------------------------------------------

remember(person, context = {}){


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



// ----------------------------------------------------
// Add learned facts about person
// ----------------------------------------------------

learnFact(person, key, value){


const identity =
this.find(person);


if(!identity){
return null;
}



identity.profile[key] =
value;


this.identities.set(
identity.id,
identity
);


return identity;


}



// ----------------------------------------------------
// Add relationship history
// ----------------------------------------------------

addHistory(person, event){


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


this.identities.set(
identity.id,
identity
);


return identity;


}



// ----------------------------------------------------
// Get all known people
// ----------------------------------------------------

getAll(){


return Array.from(
this.identities.values()
);


}



// ----------------------------------------------------
// Debug Emma's relationships
// ----------------------------------------------------

summary(){


return {

totalPeople:
this.identities.size,


people:
this.getAll()
.map(person=>({

name:
person.name,

email:
person.email,

interactions:
person.interactions.length,

knownSince:
person.firstSeen


}))


};


}



}



export default EmmaIdentityMemory;