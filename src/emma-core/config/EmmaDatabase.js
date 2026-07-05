// EmmaDatabase.js
// Emma permanent experience database
//
// Stores:
// Problem
// Action
// Outcome
// Lesson
// Future wisdom


import { supabase } from "../../lib/supabase";





export const EmmaDB = {



// ======================================
// SAVE EXPERIENCE MEMORY
// ======================================


async saveMemory(experience){


console.log(
"🔥 EmmaDB.saveMemory CALLED"
);


console.log(
"📦 Incoming memory:",
experience
);





const memory =
experience.memory || {};





// protect action names

const action =

memory.attemptedAction ||

experience.attemptedAction ||

experience.action ||

"UNKNOWN_ACTION";






const lesson =

memory.lesson ||

experience.lesson ||

null;






const futureRule =

memory.futureRule ||

(
memory.success === false

?

`Avoid repeating failed strategy: ${action}`

:

`Repeat successful strategy: ${action}`
);







const payload = {



// =======================
// OWNER
// =======================


business_id:

experience.businessId,






// =======================
// TYPE
// =======================


experience_type:

experience.type ||

(
memory.success === false

?

"NEGATIVE_EXPERIENCE"

:

"POSITIVE_EXPERIENCE"

),







// =======================
// SITUATION
// =======================


problem:

memory.problem ||

experience.problem ||

null,






situation:

memory.context ||

experience.situation ||

null,








// =======================
// ACTION
// =======================


attempted_action:

action,






reason:

memory.reasonForAction ||

experience.reason ||

null,








// =======================
// RESULT
// =======================


result:

memory.outcome?.result ||

experience.result ||

null,






success:

memory.success ??

experience.success ??

null,







metrics:

memory.outcome?.metrics ||

experience.metrics ||

{},








// =======================
// LEARNING
// =======================


lesson:

lesson,






future_rule:

futureRule,







patterns:

memory.patterns ||

experience.patternsFound ||

[],








// =======================
// SEARCH
// =======================


tags:

memory.tags ||

[],








confidence:

memory.confidenceImpact ||

experience.confidence ||

0,









importance:


(memory.success === false)

?

"high"

:

"normal",








// =======================
// RAW BACKUP
// =======================


evidence:{


fullMemory:

experience,


savedAt:

new Date()


}



};








console.log(
"🗄️ Supabase payload:",
payload
);









const {data,error}=


await supabase


.from("emma_memory")


.insert(payload)


.select();









if(error){



console.error(
"❌ SUPABASE MEMORY SAVE FAILED"
);



console.error(
"CODE:",
error.code
);



console.error(
"MESSAGE:",
error.message
);



console.error(
"DETAILS:",
error.details
);




throw error;


}









console.log(
"🧠 Permanent memory stored:",
data
);




return data;



},














// ======================================
// LOAD BUSINESS MEMORIES
// ======================================


async getMemories(businessId){



console.log(
"🧠 Loading permanent memories:",
businessId
);






const {data,error}=


await supabase


.from("emma_memory")


.select("*")


.eq(
"business_id",
businessId
)


.order(
"created_at",
{
ascending:false
}
);









if(error){



console.error(
"❌ Memory fetch failed:"
);



console.error(error);



return [];


}








console.log(
"📚 DB memories found:",
data?.length || 0
);










// Convert database rows
// back into Emma brain format


return (data || [])

.map(row=>({



id:

row.id,



businessId:

row.business_id,



type:

row.experience_type,





memory:{



problem:

row.problem,





context:

row.situation,






attemptedAction:

row.attempted_action,






reasonForAction:

row.reason,






outcome:{


result:

row.result,



metrics:

row.metrics || {}


},







success:

row.success,







lesson:

row.lesson,







futureRule:

row.future_rule,








patterns:

row.patterns || [],








tags:

row.tags || [],








confidenceImpact:

row.confidence,








createdAt:

row.created_at




}



}));



},















// ======================================
// IMPORTANT MEMORIES
// ======================================


async getImportantMemories(businessId){





const {data,error}=


await supabase


.from("emma_memory")


.select("*")


.eq(
"business_id",
businessId
)


.in(
"importance",
[
"high",
"critical"
]
)


.order(
"created_at",
{
ascending:false
}
);







if(error){


console.error(
"❌ Important memory error:",
error
);


return [];


}







return data || [];



},













// ======================================
// DELETE MEMORY
// ======================================


async forgetMemory(memoryId){






const {error}=


await supabase


.from("emma_memory")


.delete()


.eq(
"id",
memoryId
);







if(error){



console.error(
"❌ Forget failed:",
error
);



return false;



}








console.log(
"🗑️ Emma forgot memory"
);




return true;




}




};