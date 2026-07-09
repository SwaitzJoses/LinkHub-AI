//
// PROJECT BECOMING
//
// Emma Full Life Cycle Test
//
// Goal:
// Prove Emma learns before adding more organs
//


import Emma from "../Emma.js";


console.log(
`
🧪 =========================
   EMMA LIFE TEST START
=========================
`
);



const emma = new Emma();




// fake company life events

const events = [


{

    type:"business_event",

    title:"Summer campaign launched",

    description:
    "Business offered 20% discount",

    importance:80,

    outcome:"failed",

    result:
    "Many views but very few purchases"

},



{

    type:"business_event",

    title:"Premium bundle launched",

    description:
    "Business created higher value package",

    importance:85,

    outcome:"success",

    result:
    "Customers bought more expensive option"

},



{

    type:"question",

    question:
    "Should we run another 20% discount campaign?",

    importance:90,

    uncertainty:90

}


];





async function runLife(){



for(const event of events){


console.log(
`
🌍 NEW EXPERIENCE:
${event.title || event.question}
`
);



const response =
await emma.experience(
event
);



console.log(
"Emma response:",
response
);



console.log(
`
--------------------------
`
);


}




console.log(

`
🧠 FINAL BRAIN STATUS
`

);


console.log(
emma.brain.getStats()
);



console.log(

`
🧬 FINAL IDENTITY
`

);


if(emma.identity.snapshot){

console.log(
emma.identity.snapshot()
);

}



}



runLife();