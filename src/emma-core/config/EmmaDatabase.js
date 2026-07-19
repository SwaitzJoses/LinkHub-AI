// EmmaDatabase.js
// Emma permanent experience database
//
// Human → Experience → Lesson → Wisdom


import { supabase } from "../../lib/supabase";



export const EmmaDB = {




// ======================================
// SAVE MEMORY
// ======================================


async saveMemory(experience){


console.log(
"🔥 EmmaDB.saveMemory CALLED"
);


console.log(
"📦 Incoming:",
experience
);



const memory =
experience.memory || {};




// ======================
// IDENTITY
// ======================


const userId =

experience.userId ||

experience.ownerId ||

experience.user_id ||

memory.userId ||

null;




const businessId =

experience.businessId ||

experience.business_id ||

memory.businessId ||

null;






if(!userId && !businessId){


console.warn(
"⚠️ Memory saved without owner identity"
);


}







const action =

memory.attemptedAction ||

experience.attemptedAction ||

experience.action ||

"UNKNOWN_ACTION";







const success =

memory.success ??

experience.success ??

false;









const payload={



// OWNER

owner_id:userId,


user_id:userId,


business_id:businessId,







// TYPE

experience_type:

experience.type ||

(
success

?

"POSITIVE_EXPERIENCE"

:

"LEARNING_EXPERIENCE"

),







// EVENT

problem:

memory.problem ||

experience.problem ||

experience.situation ||

null,







situation:

memory.context ||

experience.context ||

{},








// ACTION

attempted_action:

action,








reason:

memory.reasonForAction ||

experience.reason ||

null,









// RESULT

result:

memory.outcome?.result ||

experience.result ||

null,








success,








metrics:

memory.outcome?.metrics ||

experience.metrics ||

{},








// LEARNING

lesson:

memory.lesson ||

experience.lesson ||

null,








future_rule:

memory.futureRule ||

experience.futureRule ||

(

success

?

`Repeat successful strategy: ${action}`

:

`Improve before repeating: ${action}`

),







patterns:

memory.patterns ||

experience.patternsFound ||

[],








identity:

memory.identity ||

experience.identity ||

{},









tags:

memory.tags ||

experience.tags ||

[],








confidence:

memory.confidenceImpact ||

experience.confidence ||

0,








importance:

success

?

"normal"

:

"high",









evidence:{


fullExperience:

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
"❌ MEMORY SAVE ERROR:",
error
);


throw error;



}








console.log(
"💾 Permanent memory stored:",
data
);




return data;



},






// ======================================
// SAVE CHECKPOINT
// ======================================

async saveCheckpoint(checkpoint) {

    console.log("📍 Saving checkpoint");

    const payload = {

        id: checkpoint.id,

        created_at: checkpoint.createdAt,

        conversation_id:
            checkpoint.conversation?.conversationId,

        provider:
            checkpoint.experience?.provider,

        checkpoint: checkpoint,

        hash:
            checkpoint.hash ?? null

    };

    console.log("📦 Checkpoint Payload:", payload);

    const { data, error } = await supabase
        .from("emma_checkpoints")
        .insert(payload)
        .select()
        .single();

    if (error) {

        console.error(
            "❌ CHECKPOINT SAVE ERROR:",
            error
        );

        throw error;
    }

    console.log("✅ Checkpoint Saved");

    return data;

},


// ======================================
// GET LATEST CHECKPOINT
// ======================================

async getLatestCheckpoint(conversationId){

    if(!conversationId){

        return null;

    }

    const { data, error } = await supabase

        .from("emma_checkpoints")

        .select("*")

        .eq(
            "conversation_id",
            conversationId
        )

        .order(
            "created_at",
            {
                ascending:false
            }
        )

        .limit(1)
        .maybeSingle();

    if(error){

        console.error(
            "❌ GET CHECKPOINT ERROR:",
            error
        );

        throw error;

    }

    return data;

},

















// ======================================
// LOAD MEMORIES
// ======================================


// ======================================
// LOAD MEMORIES
//
// Day 15 Scaling Patch
//
// Database filters first.
// Emma thinks second.
// ======================================


async getMemories(context={}){



let userId = null;

let businessId = null;

let limit = 10;

let importantOnly = false;






// support old + new style


if(

typeof context === "object"

){


userId =

context.userId ||

null;



businessId =

context.businessId ||

null;



limit =

context.limit ||

10;



importantOnly =

context.importantOnly ||

false;



}


else{


businessId = context;


}








console.log(

"🔎 Loading focused Emma memories:",

{

userId,

businessId,

limit,

importantOnly

}

);









let query =

supabase

.from(

"emma_memory"

)

.select(

"*"

);









// ==========================
// OWNER FILTER FIRST
// ==========================


if(userId){



query =

query.eq(

"owner_id",

userId

);



}





if(businessId){



query =

query.eq(

"business_id",

businessId

);



}









// ==========================
// IMPORTANT FILTER
// ==========================


if(

importantOnly

){



query =

query.in(

"importance",

[

"high",

"critical"

]

);



}










// ==========================
// LIMIT BEFORE RETURN
// ==========================


const {

data,

error

}=

await query


.order(

"created_at",

{

ascending:false

}

)


.limit(

limit

);










if(error){



console.error(

"❌ Memory fetch failed:",

error

);



return [];



}










console.log(

"📚 Focused memories found:",

data?.length || 0

);








return (

data || []

)

.map(

row =>

this.convertMemory(row)

);



},












// ======================================
// DB ROW → EMMA FORMAT
// ======================================


convertMemory(row){



return {




id:

row.id,





userId:

row.owner_id,





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









identity:

row.identity || {},








tags:

row.tags || [],








confidenceImpact:

row.confidence,








createdAt:

row.created_at




}



};



},













// ======================================
// IMPORTANT MEMORIES
// ======================================


async getImportantMemories(userId){





const {data,error}=

await supabase

.from("emma_memory")

.select("*")

.eq(

"owner_id",

userId

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


console.error(error);


return [];


}







return (

data || []

)

.map(

row=>this.convertMemory(row)

);



},










// ======================================
// DELETE MEMORY
// ======================================


async forgetMemory(id){



const {error}=

await supabase

.from("emma_memory")

.delete()

.eq(

"id",

id

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