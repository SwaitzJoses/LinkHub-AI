// EmmaObserver.js
// Emma's eyes
//
// PURPOSE:
// Observe the user's world.
// Detect signals.
// Recognize identities.
//
// Observer does NOT think.
// Observer does NOT judge.
// Observer only notices.
//
// World
//   ↓
// Observer
//   ↓
// Identity Memory
//   ↓
// Reflection
//   ↓
// Reasoning


import EmmaIdentityMemory
from "./EmmaIdentityMemory";


class EmmaObserver {


constructor(){

console.log(
"👀 Emma Personal Observer online"
);

}



// ===================================
// Main observation
// ===================================

async observe({

user,

business,

source,

eventType,

person,

data,

message,

history=[]

}){


console.log(
"👀 Emma observing:",
{
source,
eventType,
person,
message
}
);




// -------------------------------
// WHO is involved?
// -------------------------------

let identity=null;


if(person){


identity =
EmmaIdentityMemory.remember(
person,
{
source,
eventType
}
);


console.log(
"🧑 Identity recognized:",
identity?.name
);


}





// -------------------------------
// WHAT happened?
// -------------------------------


const analysis =
analyzeSignals({

data:data || {},

message:
message ||
data?.message ||
data?.content?.message ||
"",

history

});





return {



// USER OWNER

userId:

user?.id ||

data?.userId ||

null,




// BUSINESS OWNER

businessId:

business?.id ||

business?.businessId ||

data?.businessId ||

null,




// WHERE

source:

source ||
"UNKNOWN",




// EVENT

eventType:

eventType ||

data?.event ||

data?.type ||

"LIFE_EVENT",





// WHO

identity,





// RAW OBSERVATION

raw:{

person,

data:data || {},

message:
message || ""

},




// WHAT EMMA NOTICED

signals:

analysis.signals,



importance:

analysis.importance,



summary:

analysis.summary,



createdAt:

new Date()


};


}



}










// ===================================
// Signal Analysis
// ===================================

function analyzeSignals({

data,

message,

history

}){


let signals=[];

let importance=3;



const text =

JSON.stringify({

data,

message

})
.toLowerCase();




// PERSONAL SIGNALS

detectGoals(
text,
signals
);


detectDecisions(
text,
signals
);


detectWorkStyle(
text,
signals
);


detectEmotions(
text,
signals
);


detectPriorities(
text,
signals
);


detectRelationships(
text,
signals
);



// BUSINESS SIGNALS

detectBusinessText(
text,
signals
);


detectGrowth(
data,
history,
signals
);


detectProblems(
data,
signals
);


detectOpportunities(
data,
signals
);




// importance calculation

importance +=
signals.length * 2;



if(
signals.some(
s=>s.type==="risk"
)
){

importance +=3;

}



importance =
Math.min(
importance,
10
);



return {

signals,

importance,

summary:
createSummary(signals)

};


}









// ===============================
// PERSONAL UNDERSTANDING
// ===============================


function detectGoals(text,signals){


if(

text.includes("goal") ||
text.includes("want to") ||
text.includes("trying to") ||
text.includes("dream")

){


signals.push({

type:"identity",
area:"goal",
message:
"Goal signal detected"

});


}


}




function detectDecisions(text,signals){


if(

text.includes("decided") ||
text.includes("should i") ||
text.includes("thinking about") ||
text.includes("choice")

){


signals.push({

type:"decision",

message:
"Decision moment detected"

});


}


}




function detectWorkStyle(text,signals){


if(

text.includes("build") ||
text.includes("ship") ||
text.includes("launch")

){


signals.push({

type:"pattern",

area:"execution",

message:
"Execution pattern detected"

});


}




if(

text.includes("tired") ||
text.includes("exhausted") ||
text.includes("burn")

){


signals.push({

type:"risk",

area:"energy",

message:
"Energy concern detected"

});


}


}






function detectEmotions(text,signals){


if(

text.includes("excited") ||
text.includes("happy") ||
text.includes("love")

){


signals.push({

type:"emotion",

message:
"Positive emotion detected"

});


}




if(

text.includes("confused") ||
text.includes("worried") ||
text.includes("stuck")

){


signals.push({

type:"emotion",

message:
"Uncertainty detected"

});


}


}






function detectPriorities(text,signals){


if(

text.includes("important") ||
text.includes("focus") ||
text.includes("priority")

){


signals.push({

type:"priority",

message:
"Priority detected"

});


}


}






function detectRelationships(text,signals){


if(

text.includes("client") ||
text.includes("customer") ||
text.includes("founder") ||
text.includes("team")

){


signals.push({

type:"relationship",

message:
"Relationship signal detected"

});


}


}










// ===============================
// BUSINESS SIGNALS
// ===============================


function detectBusinessText(text,signals){


if(

text.includes("sales dropped") ||
text.includes("revenue down") ||
text.includes("cancel")

){


signals.push({

type:"risk",

area:"business",

message:
"Business risk detected"

});


}




if(

text.includes("growth") ||
text.includes("increased") ||
text.includes("more orders")

){


signals.push({

type:"growth",

message:
"Growth detected"

});


}


}





function detectGrowth(data,history,signals){


if(!history.length){
return;
}


const previous =
history[history.length-1];


if(

data.views &&
previous.views &&
data.views > previous.views * 2

){


signals.push({

type:"growth",

message:
"Strong increase detected"

});


}


}






function detectProblems(data,signals){


if(

data.previousSales &&
data.currentSales &&
data.currentSales < data.previousSales

){


signals.push({

type:"risk",

message:
"Decline detected"

});


}


}






function detectOpportunities(data,signals){


if(data.productViews > 100){


signals.push({

type:"opportunity",

message:
"High interest detected"

});


}


}







// ===============================
// Summary
// ===============================


function createSummary(signals){


if(signals.length===0){

return (
"No strong signal yet. Emma continues observing."
);

}


return signals

.map(
s=>s.message
)

.join(". ");


}





export default EmmaObserver;