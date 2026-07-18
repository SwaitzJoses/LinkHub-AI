// EmmaMemory.js
//
// PROJECT BECOMING
//
// Emma Living Experience Memory v5.2
//
// TEMPORAL MEMORY PATCH 🕰
//
// Memory is not storage.
// Memory is Emma's life.
//
// v5.2:
//
// - TemporalSense support
// - Safe timeline recall
// - No full lifetime scans
// - Cache-first memory
// - Important history retrieval
//
// RULE:
//
// Remember a lifetime.
// Recall what matters.
//

import { EmmaDB }
from "./config/EmmaDatabase";


import EmmaIdentityMemory
from "./EmmaIdentityMemory";





class EmmaMemory {




constructor(){



console.log(
"🧠 Emma Living Memory v5.2 awake"
);




// =============================
// ACTIVE CONSCIOUS MEMORY
// =============================


this.activeMemory = [];




// =============================
// LONG TERM CACHE
// =============================


this.memoryCache = [];




// =============================
// CORE LIFE MEMORIES
// =============================


this.coreMemories = [];




// =============================
// ASSOCIATION GRAPH
// =============================


this.associations =
new Map();

// =============================
// SEMANTIC ASSOCIATIONS
// =============================

this.semanticAssociations = {

    people: new Map(),

    projects: new Map(),

    goals: new Map(),

    topics: new Map(),

    lessons: new Map(),

    patterns: new Map(),

    relationships: new Map(),

    organizations: new Map(),

    locations: new Map()

};


// =============================
// FALLBACK MEMORY
// =============================


this.localMemories = [];





this.lastSync = null;



this.cacheLife =

1000 * 60 * 5;





// =============================
// LIMITS
// =============================


this.memoryLimit = 50;


this.recallLimit = 15;


// NEW 🕰

this.timelineLimit = 50;






this.identityMemory =

new EmmaIdentityMemory();


// =================================
// DAY 15 ORGAN REFERENCES
// =================================

this.selfModel = null;

this.relationshipModel = null;





this.defaultOwner = {


userId:

"owner",


businessId:

null


};



}

// =================================
// CONNECT ORGANISM
// =================================

connect({

selfModel = null,

relationshipModel = null

} = {}){

this.selfModel = selfModel;

this.relationshipModel = relationshipModel;

return this;

}

// =================================
// EXPERIENCE ENTRY POINT
// =================================

async store(

experience={}

){


console.log(
"🌊 Experience entered Emma memory"
);



return await this.remember(

experience

);


}










// =================================
// OWNER RESOLUTION
// =================================


resolveOwner(

experience={}

){



const userId =

experience.userId ||

experience.ownerId ||

experience.signal?.userId ||

"owner";




const businessId =

experience.businessId ||

experience.signal?.businessId ||

null;




return {


userId,


businessId,


ownerId:

businessId || userId


};



}









// =================================
// CREATE MEMORY
// =================================


async remember(

experience={}

){



if(!experience){

return null;

}

// =================================
// Shared Context Support
// =================================

if (experience.experience) {

    experience = experience.experience;

}



const owner =

this.resolveOwner(

experience

);




const knowledge =

this.createKnowledge(

experience

);



// =============================
// MEMORY STATE
//
// Store first.
// Retrieval decides importance.
//
// =============================

const memoryState = {

    recallCount:0,

    lastRecalled:null,

    firstSeen:new Date().toISOString(),

    lastUpdated:new Date().toISOString()

};






// =============================
// IDENTITY MEMORY
// =============================


let personMemory = null;




const person =

experience.person ||

experience.identity ||

experience.signal?.person;




if(person){



personMemory =

await this.identityMemory.remember(

person,

{


event:

experience.type,


lesson:

knowledge.lesson,


emotion:

knowledge.emotion,


date:

new Date()


}

);


}








// =============================
// MEMORY OBJECT
// =============================


const memory = {


id:

crypto.randomUUID?.()

||

Date.now(),



ownerId:

owner.ownerId,


userId:

owner.userId,


businessId:

owner.businessId,



type:

knowledge.type,


memoryWeight:

knowledge.memoryWeight,


state: memoryState,

age:0,


createdAt:

Date.now(),




memory:{


person:

personMemory,



situation:

experience.situation ||

experience.type ||

"UNKNOWN",



context:

experience,



outcome:{


success:

knowledge.success,


result:

experience.outcome || null


},



lesson:

knowledge.lesson,


futureRule:

knowledge.futureRule,


patterns:

knowledge.patterns,


emotion:

knowledge.emotion,


tags:

knowledge.tags,


reinforced:0,


associations:[],


createdAt:

new Date()

.toISOString()


}


};








// =============================
// ACTIVE MEMORY
// =============================


this.activeMemory.unshift(

memory

);



this.activeMemory =

this.activeMemory.slice(

0,

50

);





this.localMemories.unshift(

memory

);



this.memoryCache.unshift(

memory

);




this.buildAssociations(
memory
);

if(

this.isCoreMemory(

memory

)

){

this.coreMemories.unshift(

memory

);

console.log(

"🔥 Core memory created"

);

}

// =============================
// DAY 15
// Notify organism
// =============================

await this.notifySelfModel(
memory
);

await this.notifyRelationshipModel(
memory
);








// =============================
// LONG TERM STORAGE
// =============================


{


// =================================
// STORE EVERYTHING
// Emma never decides whether an
// experience deserves to exist.
// Retrieval decides what matters.
// =================================

// =============================
// LONG TERM STORAGE
//
// Store Everything.
// Emma never decides whether
// an experience deserves
// to exist.
//
// Retrieval decides what
// matters later.
// =============================

try{

    await EmmaDB.saveMemory(memory);

    console.log(
        "💾 Experience stored"
    );

}

catch(error){

    console.warn(

        "⚠️ Database unavailable. Stored locally.",

        error.message

    );

}


}


return memory;



}


// =================================
// NOTIFY SELF MODEL
// =================================

async notifySelfModel(memory){

if(!this.selfModel){

return;

}

try{

if(typeof this.selfModel.observeMemory === "function"){

await this.selfModel.observeMemory(memory);

}

}catch(error){

console.warn(

"⚠️ SelfModel notification failed",

error.message

);

}

}

// =================================
// NOTIFY RELATIONSHIP MODEL
// =================================

async notifyRelationshipModel(memory){

if(!this.relationshipModel){

return;

}

try{

if(typeof this.relationshipModel.observeMemory === "function"){

await this.relationshipModel.observeMemory(memory);

}

}catch(error){

console.warn(

"⚠️ Relationship notification failed",

error.message

);

}

}

// =================================
// EXPERIENCE → KNOWLEDGE
// =================================


createKnowledge(

experience={}

){



let type =

"OBSERVED_EXPERIENCE";



let success = null;



let memoryWeight =

experience.memoryWeight ||

"NORMAL";



let emotion =

"neutral";






if(

experience.success === true

){



type =

"POSITIVE_EXPERIENCE";



success = true;



emotion =

"positive";



}






if(

experience.success === false

){



type =

"FAILED_EXPERIENCE";



success = false;



memoryWeight =

"HIGH";



emotion =

"negative";



}






return {



type,


success,


memoryWeight,


emotion,



lesson:

experience.lesson

||

this.extractLesson(

experience,

type

),




futureRule:

experience.futureBehavior

||

this.createFutureRule(

success

),




patterns:

experience.patternsFound

||

[],


tags:

this.createTags(

experience,

type

)



};



}


















// =================================
// CORE MEMORY DETECTION
// =================================


isCoreMemory(

memory

){



return (

    memory.memoryWeight === "CORE" ||

    memory.type === "FOUNDATIONAL_EXPERIENCE"

);



}



















// =================================
// ASSOCIATION GRAPH
//
// Stores:
// 1. Word associations
// 2. Semantic associations
//
// Store Everything.
// Retrieve Wisely.
//
// =================================

buildAssociations(memory){

    // ---------------------------------
    // WORD ASSOCIATIONS (existing)
    // ---------------------------------

    const words =

        JSON.stringify(memory)

        .toLowerCase()

        .split(/\W+/)

        .filter(word => word.length > 4);

    memory.memory.associations =

        [...new Set(words)];

    for(const word of words){

        if(!this.associations.has(word)){

            this.associations.set(

                word,

                []

            );

        }

        this.associations

            .get(word)

            .push(memory.id);

    }

    // ---------------------------------
    // SEMANTIC ASSOCIATIONS
    // ---------------------------------

    const context =

        memory.memory?.context || {};

    this.indexSemantic(

        "people",

        context.people

    );

    this.indexSemantic(

        "projects",

        context.projects

    );

    this.indexSemantic(

        "goals",

        context.goals

    );

    this.indexSemantic(

        "topics",

        context.topics

    );

    this.indexSemantic(

        "patterns",

        context.patternsFound

    );

    this.indexSemantic(

        "organizations",

        context.organizations

    );

    this.indexSemantic(

        "locations",

        context.locations

    );

    // single values

    if(context.person){

        this.indexSemantic(

            "people",

            [context.person]

        );

    }

    if(context.relationship){

        this.indexSemantic(

            "relationships",

            [context.relationship]

        );

    }

    if(context.lesson){

        this.indexSemantic(

            "lessons",

            [context.lesson]

        );

    }

}



// =================================
// BUILD EVIDENCE
//
// Memory never decides.
//
// Memory only explains WHY
// a memory may be relevant.
//
// =================================

buildEvidence(memory, context = {}) {

    return {

        people:
            this.matchPeople(memory, context),

        projects:
            this.matchProjects(memory, context),

        goals:
            this.matchGoals(memory, context),

        topics:
            this.matchTopics(memory, context),

        relationships:
            this.matchRelationships(memory, context),

        timeline:
            this.matchTimeline(memory),

        patterns:
            this.matchPatterns(memory),

        recall:
            this.matchRecallHistory(memory)

    };

}




// =================================
// MATCH PEOPLE
// =================================

matchPeople(memory, context = {}) {

    const memoryPeople = [

        ...(memory.memory?.context?.people || []),

        memory.memory?.context?.person

    ].filter(Boolean);

    const currentPeople = [

        ...(context.people || []),

        context.person

    ].filter(Boolean);

   const matched = [

    ...new Set(

        memoryPeople.filter(person =>

            currentPeople.includes(person)

        )

    )

];
    return {

        matched: matched.length > 0,

        values: matched,

        count: matched.length

    };

}

// =================================
// MATCH PROJECTS
// =================================

matchProjects(memory, context = {}) {

    const memoryProjects =

        memory.memory?.context?.projects || [];

    const currentProjects =

        context.projects || [];

    const matched = memoryProjects.filter(project =>

        currentProjects.includes(project)

    );

    return {

        matched: matched.length > 0,

        values: matched,

        count: matched.length

    };

}

// =================================
// MATCH GOALS
// =================================

matchGoals(memory, context = {}) {

    const memoryGoals =

        memory.memory?.context?.goals || [];

    const currentGoals =

        context.goals || [];

    const matched = memoryGoals.filter(goal =>

        currentGoals.includes(goal)

    );

    return {

        matched: matched.length > 0,

        values: matched,

        count: matched.length

    };

}

// =================================
// MATCH TOPICS
// =================================

matchTopics(memory, context = {}) {

    const memoryTopics =

        memory.memory?.context?.topics || [];

    const currentTopics =

        context.topics || [];

    const matched = memoryTopics.filter(topic =>

        currentTopics.includes(topic)

    );

    return {

        matched: matched.length > 0,

        values: matched,

        count: matched.length

    };

}


// =================================
// MATCH RELATIONSHIPS
// =================================

matchRelationships(memory, context = {}) {

    const memoryRelationship =

        memory.memory?.context?.relationship;

    const currentRelationship =

        context.relationship;

    if(

        !memoryRelationship ||

        !currentRelationship

    ){

        return {

            matched:false,

            values:[],

            count:0

        };

    }

    const matched =

        memoryRelationship === currentRelationship;

    return {

        matched,

        values:

            matched

            ? [memoryRelationship]

            : [],

        count:

            matched ? 1 : 0

    };

}

// =================================
// MATCH TIMELINE
// =================================

matchTimeline(memory) {

    return {

        createdAt:

            memory.createdAt ||

            memory.time ||

            null,

        lastRecalled:

            memory.state?.lastRecalled ||

            null,

        recallCount:

            memory.state?.recallCount ||

            0

    };

}

// =================================
// MATCH PATTERNS
// =================================

matchPatterns(memory) {

    return {

        patterns:

            memory.memory?.context?.patternsFound ||

            []

    };

}


// =================================
// MATCH RECALL HISTORY
// =================================

matchRecallHistory(memory) {

    return {

        recallCount:

            memory.state?.recallCount ||

            0,

        lastRecalled:

            memory.state?.lastRecalled ||

            null

    };

}

// =================================
// SEMANTIC INDEXER
// =================================

indexSemantic(type, values = []){

    if(!values){

        return;

    }

    if(!Array.isArray(values)){

        values = [values];

    }

    const graph =

        this.semanticAssociations[type];

    if(!graph){

        return;

    }

    for(const value of values){

        if(!value){

            continue;

        }

        const key =

            String(value)

            .trim()

            .toLowerCase();

        if(!graph.has(key)){

            graph.set(

                key,

                []

            );

        }

        // Store only the semantic value for now.
        // Later we'll evolve this to store memory IDs.

        graph

            .get(key)

            .push(

                value

            );

    }

}





// =================================
// RECALL
// =================================


async recall(

context={}

){



console.log(

"🔎 Emma focused remembering"

);





const memories =

await this.getMemoryCandidates(

context

);





const relevant =

this.getRelevantMemories(

context,

memories

);

// =================================
// MEMORY WAS USEFUL
// =================================

relevant.forEach(memory=>{

    this.reinforce(memory);

});




return {



relevantExperiences:

relevant,



coreMemories:

this.coreMemories.slice(

0,

5

),




wisdom:

this.extractWisdom(

relevant

),




rules:

this.extractRules(

relevant

),




patterns:

this.extractPatterns(

relevant

),




searchedMemories:

memories.length,



returnedMemories:

relevant.length



};



}










// =================================
// MEMORY CANDIDATES
//
// Fast thinking recall
// =================================


async getMemoryCandidates(

context={}

){



let candidates = [


...this.activeMemory,


...this.coreMemories


];






if(

candidates.length >=

this.recallLimit

){



return candidates.slice(

0,

this.memoryLimit

);



}







try{



const stored =

await EmmaDB.getMemories({



userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



 limit:10



});






return this.removeDuplicates([


...candidates,


...stored


]);




}



catch(error){



console.warn(

"⚠️ Memory fallback mode"

);




return this.localMemories.slice(

0,

this.memoryLimit

);



}



}










// =================================
// RECENT IMPORTANT MEMORIES 🕰
//
// Used by TemporalSense
//
// Prevents Supabase timeout
// =================================


async getRecentImportant(

limit = 50

){



console.log(

"🕰 Loading timeline memories"

);





let memories = [


...this.activeMemory,


...this.coreMemories


];







// cache first


if(

this.memoryCache.length

){



memories.push(

...this.memoryCache

);



}






memories =

this.removeDuplicates(

memories

);







if(

memories.length >= limit

){



return memories


.sort(

(a,b)=>

(b.createdAt || 0)

-

(a.createdAt || 0)

)


.slice(

0,

limit

);



}










// Database only if needed


try{



const stored =

await EmmaDB.getMemories({



userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



limit,


importantOnly:false



});







return this.removeDuplicates([


...memories,


...stored


])

.slice(

0,

limit

);




}



catch(error){



console.warn(

"⚠️ Temporal memory fallback",

error.message

);




return this.localMemories.slice(

0,

limit

);



}



}










// =================================
// SAFE GET ALL
//
// Compatibility for old organs
// =================================


async getAll(){



console.log(

"🛡 Safe getAll redirected"

);




return await this.getRecentImportant(

this.timelineLimit

);



}










// =================================
// REMOVE DUPLICATES
// =================================


removeDuplicates(

memories=[]

){



const seen =

new Set();





return memories.filter(

memory=>{



const id =

memory.id ||

JSON.stringify(memory);





if(

seen.has(id)

){

return false;

}




seen.add(id);



return true;



});



}


// =================================
// MEANING BASED RECALL
// =================================

getRelevantMemories(
    context = {},
    memories = []
) {

    const scoredMemories = memories.map(memory => {

        this.reinforce(memory);

        const evidence = this.buildEvidence(
            memory,
            context
        );

        console.log("🧪 MEMORY EVIDENCE", {
            id: memory.id,
            type: memory.type,
            people: evidence.people,
            projects: evidence.projects,
            goals: evidence.goals,
            topics: evidence.topics,
            relationships: evidence.relationships
        });

        return {

            ...memory,

            evidence

        };

    });

    const countMatches = (memory) => {

        let total = 0;

        if (memory.evidence.people.matched) total++;
        if (memory.evidence.projects.matched) total++;
        if (memory.evidence.goals.matched) total++;
        if (memory.evidence.topics.matched) total++;
        if (memory.evidence.relationships.matched) total++;

        return total;

    };

    const relevant = scoredMemories

        .filter(memory => {

            const e = memory.evidence;

            return (

                e.people.matched ||

                e.projects.matched ||

                e.goals.matched ||

                e.topics.matched ||

                e.relationships.matched

            );

        })

        .sort((a, b) => countMatches(b) - countMatches(a));

    console.log("🧠 MEMORY RETRIEVAL", {

        candidates: memories.length,

        relevant: relevant.length,

        returnedIds: relevant.map(m => m.id)

    });

    // =====================================
    // FALLBACK: Return recent memories
    // if nothing matched.
    // =====================================

    if (relevant.length === 0) {

        console.log("🧠 No direct matches. Returning recent memories.");

        return scoredMemories
            .slice(0, 10);

    }

    return relevant.slice(0, 10);

}


// =================================
// MEMORY REINFORCEMENT
// =================================


reinforce(memory){

    if(!memory.memory){

        return memory;

    }

    memory.memory.reinforced++;

    memory.state = {

        ...memory.state,

        recallCount:

            (memory.state?.recallCount || 0) + 1,

        lastRecalled:

            new Date().toISOString(),

        lastUpdated:

            new Date().toISOString()

    };

    return memory;

}









// =================================
// SLEEP CONSOLIDATION
//
// Deep reflection happens here.
// =================================


async sleep(){



console.log(

"💤 Emma sleeping"

);




this.ageMemories();




const wisdom =

this.formWisdom();




console.log(

"🌙 Emma woke with wisdom"

);




return wisdom;



}










// =================================
// MEMORY AGING
// =================================


ageMemories(){



this.memoryCache =

this.memoryCache.filter(memory=>{

    memory.age++;

    if(

        this.isCoreMemory(memory)

    ){

        return true;

    }

    return true;

});


}










// =================================
// FORM WISDOM
// =================================


formWisdom() {

    return this.memoryCache

        .filter(memory =>

            memory.memory?.lesson ||

            memory.memory?.futureRule

        )

        .map(memory => ({

            lesson:

                memory.memory.lesson,

            rule:

                memory.memory.futureRule,

            formedFrom:

                memory.type,

            evidence:

                memory.state

        }));

}










// =================================
// EXTRACT WISDOM
// =================================


extractWisdom(

memories=[]

){



return memories



.filter(memory =>

    memory.memory?.lesson ||

    memory.memory?.futureRule

)



.map(

memory => ({



lesson:

memory.memory?.lesson,



rule:

memory.memory?.futureRule,



source:

memory.type



}));



}










// =================================
// EXPLAIN RECALL
// =================================

explainRecall(memories = []) {

    return memories.map(memory => ({

        because:

            memory.memory?.lesson ||

            "Retrieved because related evidence was found.",

        evidence:

            memory.evidence ||

            {},

        recallHistory:

            memory.state ||

            {},

        emotion:

            memory.memory?.emotion ||

            "neutral"

    }));

}









// =================================
// DEEP MEMORY LOAD
//
// Sleep only.
// Not active thinking.
// =================================


async getAllMemories(){



console.log(

"🌙 Deep memory scan"

);




if(

this.isCacheValid()

){


return this.memoryCache;


}






try{



const memories =

await EmmaDB.getMemories({



userId:

this.defaultOwner.userId,



businessId:

this.defaultOwner.businessId,



limit:

this.memoryLimit



});






this.memoryCache =

memories;



this.lastSync =

Date.now();




return memories;



}




catch(error){



console.warn(

"DB unavailable, local memory used"

);




return this.localMemories;



}



}










// =================================
// CACHE CHECK
// =================================


isCacheValid(){



return (


this.lastSync


&&


Date.now()

-

this.lastSync

<

this.cacheLife


);



}










// =================================
// BASIC WISDOM HELPERS
// =================================


extractLesson(

experience,

type

){



if(

type === "FAILED_EXPERIENCE"

){


return (

"Avoid repeating this mistake"

);


}




type:

experience.type ||

"EXPERIENCE";{


return (

"Repeat when conditions match"

);


}





return (

"Observe before deciding"

);



}










createFutureRule(

success

){



if(success === false){


return (

"Check memories before action"

);


}





if(success === true){


return (

"Reuse proven patterns"

);


}





return (

"Learn from experience"

);



}










extractRules(

memories=[]

){



return memories



.map(

memory =>

memory.memory?.futureRule

)



.filter(Boolean);



}










extractPatterns(

memories=[]

){



return [


...new Set(


memories.flatMap(

memory =>

memory.memory?.patterns || []

)


)


];



}










createTags(

experience={},

type

){



return [



type,



experience.type,



experience.situation



]



.filter(Boolean)



.map(

item =>

String(item)

.toLowerCase()

);



}



// =================================
// MEASURE NOVELTY
// =================================

measureNovelty(context = {}) {

    const memories = context.memories || [];

    if (memories.length === 0) {

        return 1;

    }

    if (memories.length <= 2) {

        return 0.7;

    }

    if (memories.length <= 5) {

        return 0.4;

    }

    return 0.1;

}








// =================================
// STATUS
// =================================


status(){



return {



organ:

"EmmaMemory",



version:

"v5.2",



state:

"LIVING_TEMPORAL_MEMORY",



active:

this.activeMemory.length,



cached:

this.memoryCache.length,



core:

this.coreMemories.length,



recallLimit:

this.recallLimit,



timelineLimit:

this.timelineLimit,


supports:[
"Experience Memory",
"Meaning Recall",
"TemporalSense Timeline",
"Safe History Retrieval",
"SelfModel Updates",
"Relationship Updates"
],




principle:

"Store Everything. Retrieve Wisely.",




message:

"My past is large, but my attention is focused."



};



}



}




export default EmmaMemory;