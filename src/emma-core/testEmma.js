// testEmma.js
// Emma Day 11 Test 2
//
// Goal:
// Can Emma remember after restart?

import Emma from "./Emma";


async function testEmma(){


console.log(
"🤍 EMMA TEST 2 - MEMORY RESURRECTION"
);



const response = await Emma.think({


userId:"alex_001",


source:"gmail",


message:`

Email from Mike:

Hi Alex,

Your AI creator tool creates amazing captions.

But I cannot find where to schedule my posts.

I was thinking about cancelling because of this.

Mike

`


});



console.log(
"🤍 EMMA RESPONSE:"
);


console.log(
response
);


}



testEmma();