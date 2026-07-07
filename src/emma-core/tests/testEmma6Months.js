// testEmma6Months.js
// Emma 6 month autonomy simulation
//
// TEST:
//
// Does Emma remember?
// Does Emma learn?
// Does Emma change behaviour?


import Emma from "../Emma";



async function runSixMonthTest(){


console.log(
"🚀 STARTING EMMA 6 MONTH LIFE TEST"
);



console.log(
"================================"
);




// ================================
// MONTH 1
// ================================


console.log(
"\n📅 MONTH 1: New customer problem"
);


await Emma.think({


source:"gmail",


userId:"customer_001",


person:"Sarah",


type:"CUSTOMER_PROBLEM",


message:

"Sarah is unhappy. She cannot find scheduling feature and may cancel."


});







// ================================
// MONTH 2
// ================================


console.log(
"\n📅 MONTH 2: Failed strategy"
);



await Emma.think({


source:"business_result",


type:"FAILED_CAMPAIGN",


message:

"20 percent discount campaign failed. Customers did not respond.",


success:false


});








// ================================
// MONTH 3
// ================================


console.log(
"\n📅 MONTH 3: Learning new pattern"
);



await Emma.think({



source:"customer_feedback",


type:"SUCCESS_PATTERN",


message:

"Personal onboarding message worked better than discount.",


success:true


});









// ================================
// MONTH 4
// ================================


console.log(
"\n📅 MONTH 4: Similar problem returns"
);



const month4 =

await Emma.think({


source:"gmail",


person:"John",


type:"CUSTOMER_PROBLEM",


message:

"John wants to cancel subscription because setup is confusing."


});



console.log(
"MONTH 4 EMMA RESPONSE:",
month4
);










// ================================
// MONTH 5
// ================================


console.log(
"\n📅 MONTH 5: Autonomy check"
);



const goals =

await Emma.pursueGoals();



console.log(

"EMMA CREATED GOALS:",

goals

);










// ================================
// MONTH 6 FINAL TEST
// ================================


console.log(
"\n📅 MONTH 6: Final judgement"
);



const finalDecision =

await Emma.think({


source:"business",


type:"RETENTION_DECISION",


message:

"Customer is unhappy. Should we offer discount again?"


});





console.log(
"\n🧠 FINAL EMMA:"
);


console.log(
finalDecision
);








console.log(
"\n================================"
);


console.log(
"🎉 SIX MONTH TEST COMPLETE"
);



console.log(

`
Expected:

✅ remembers Sarah
✅ remembers discount failed
✅ remembers onboarding worked
✅ avoids old mistake
✅ creates better plan
✅ identity maturity increased

`

);


}



runSixMonthTest();