// testEmmaDay12.js
//
// Emma Day 12 Final Integration Test
//
// Goal:
// Prove Emma remembers people,
// learns experiences,
// and wakes up with awareness.


import Emma from "../Emma";



console.log(
"\n🚀 Starting Emma Day 12 Test\n"
);



// small delay helper

const wait = (ms)=>
new Promise(
resolve=>setTimeout(resolve,ms)
);





async function runDay12Test(){


try{



// ===================================
// TEST 1
// Sarah appears first time
// ===================================


console.log(
"\n=============================="
);

console.log(
"📩 DAY 1: Sarah emails Emma"
);

console.log(
"==============================\n"
);




const firstExperience =

await Emma.experience(

"gmail",

{


userId:
"user_001",


fromName:
"Sarah",


fromEmail:
"sarah@test.com",


subject:
"Need help",


message:
`
Hi,

I am confused about the product.
I am thinking about cancelling.

Sarah
`


}

);



console.log(
"\n🤍 Emma Response Day 1:"
);

console.log(
firstExperience
);









await wait(1000);









// ===================================
// TEST 2
// Sarah comes again
// ===================================


console.log(
"\n=============================="
);

console.log(
"📩 DAY 7: Sarah returns"
);

console.log(
"==============================\n"
);




const secondExperience =

await Emma.experience(

"gmail",

{


userId:
"user_001",


fromName:
"Sarah",


fromEmail:
"sarah@test.com",


subject:
"Still having problem",


message:
`
Hi again,

I am still facing difficulty.

Sarah
`


}

);



console.log(
"\n🤍 Emma Response Day 7:"
);

console.log(
secondExperience
);










await wait(1000);










// ===================================
// TEST 3
// Morning awareness
// ===================================


console.log(
"\n=============================="
);

console.log(
"🌅 NEXT MORNING"
);

console.log(
"==============================\n"
);




const morning =

await Emma.wakeUp({


userId:
"user_001"


});





console.log(
"\n🌅 Emma Morning Brief:"
);


console.log(
morning
);









// ===================================
// RESULT
// ===================================


console.log(
`
================================

🎉 DAY 12 TEST COMPLETE

Expected:

✅ Sarah identity created
✅ Sarah recognized again
✅ Memory recalled
✅ Reasoning used history
✅ Judgement evaluated
✅ Action executed
✅ Learning happened
✅ Daily awareness worked

================================
`
);




}

catch(error){


console.error(
"❌ Day 12 Test Failed:",
error
);


}


}





runDay12Test();