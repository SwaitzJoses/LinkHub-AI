// EmmaObserver.js
// Emma's eyes
//
// Observes user's world
// Converts events into signals
//
// World
// → Signals
// → Reflection
// → Memory
// → Reasoning



class EmmaObserver {


constructor(){

console.log(
"👀 Emma Personal Observer online"
);

}







// ===========================
// Main observation function
// ===========================


async observe({

user,

business,

source,

eventType,

data,

message,

history=[]

}){


console.log(
"👀 Emma observing:",
{
source,
eventType,
data,
message
}
);




const analysis =

analyzeSignals({

data:data || {},

message:
message ||
data?.message ||
"",

history

});





return {



// new Emma identity

userId:

user?.id ||

data?.userId ||

null,




// keep old support

businessId:

business?.id ||

business?.businessId ||

data?.businessId ||

null,





source:

source ||

"UNKNOWN",




eventType:

eventType ||

data?.type ||

"LIFE_EVENT",





raw:{

data:data || {},

message:message || ""

},





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









// ==================================
// Analyze everything Emma sees
// ==================================


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





// PERSONAL INTELLIGENCE

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




// BUSINESS INTELLIGENCE

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





importance +=

signals.length * 2;



if(

signals.some(

s =>

s.type==="risk"

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
"User goal detected"

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
"Important decision moment detected"

});


}


}








function detectWorkStyle(text,signals){


if(

text.includes("fast") ||

text.includes("quick") ||

text.includes("build") ||

text.includes("ship")

){


signals.push({

type:"pattern",

area:"working_style",

message:
"User execution style pattern detected"

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
"Energy or workload concern detected"

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
"Positive emotional signal detected"

});


}




if(

text.includes("confused") ||

text.includes("stuck") ||

text.includes("worried")

){


signals.push({

type:"emotion",

message:
"Challenge or uncertainty detected"

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
"Priority signal detected"

});


}



}









function detectRelationships(text,signals){


if(

text.includes("client") ||

text.includes("customer") ||

text.includes("team") ||

text.includes("founder")

){


signals.push({

type:"relationship",

message:
"Important person or relationship detected"

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

text.includes("less sales")

){


signals.push({

type:"risk",

area:"sales",

message:
"Business performance issue detected"

});


}





if(

text.includes("growth") ||

text.includes("more orders") ||

text.includes("increased")

){


signals.push({

type:"growth",

message:
"Growth signal detected"

});


}



if(

text.includes("interested") ||

text.includes("enquiry")

){


signals.push({

type:"opportunity",

message:
"Opportunity detected"

});


}



}









function detectGrowth(data,history,signals){


if(

!history ||

history.length===0

){

return;

}



const previous =

history[history.length-1];




if(

data.views &&

previous.views &&

data.views >

previous.views * 2

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
"Numbers show decline"

});


}




if(

data.views > 100 &&

data.orders===0

){


signals.push({

type:"risk",

message:
"Attention exists but conversion missing"

});


}


}










function detectOpportunities(data,signals){



if(

data.productViews > 100

){


signals.push({

type:"opportunity",

message:
"High interest area detected"

});


}




if(

data.engagementRate > 10

){


signals.push({

type:"opportunity",

message:
"Strong engagement detected"

});


}



}









// ===============================
// Summary
// ===============================


function createSummary(signals){


if(signals.length===0){


return (

"No strong signal yet. Emma continues learning."

);


}



return signals

.map(

s=>s.message

)

.join(". ");


}





export default EmmaObserver;