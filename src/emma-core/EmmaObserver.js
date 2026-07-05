// EmmaObserver.js
// Emma's eyes
// Understands business events and converts them into signals


class EmmaObserver {


constructor(){

console.log(
"👀 Emma Intelligent Observer ready"
);

}







// ===========================
// Main observation function
// ===========================


async observe({

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

data:
data || {},


message:
message || data?.message || "",


history


});






return {



businessId:

business?.id ||

business?.businessId ||

data?.businessId ||

"unknown",




source:

source ||

"UNKNOWN",





eventType:

eventType ||

data?.type ||

"BUSINESS_ACTIVITY",






raw:{


data:
data || {},


message:
message || ""


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
// Analyze everything Emma observes
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








detectTextMeaning(
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




detectCustomerSignals(
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

createSummary(
signals
)


};



}











// ==================================
// Understand human/business language
// ==================================


function detectTextMeaning(

text,

signals

){






// SALES PROBLEMS


if(

text.includes("sales are lower") ||

text.includes("sales dropped") ||

text.includes("sales down") ||

text.includes("less sales") ||

text.includes("revenue dropped") ||

text.includes("decrease")

){



signals.push({


type:
"risk",


area:
"sales",


message:
"Sales performance decreased compared to normal"


});



}










// CUSTOMER LOSS


if(

text.includes("customers reduced") ||

text.includes("less customers") ||

text.includes("no customers") ||

text.includes("customer drop")

){



signals.push({


type:
"risk",


area:
"customers",


message:
"Customer activity appears to be reducing"


});



}










// GROWTH


if(

text.includes("increased") ||

text.includes("more orders") ||

text.includes("growth") ||

text.includes("improved")

){



signals.push({


type:
"growth",


message:
"Positive business growth detected"


});



}










// OPPORTUNITY


if(

text.includes("interested") ||

text.includes("asking") ||

text.includes("many enquiries")

){



signals.push({


type:
"opportunity",


message:
"Customer interest opportunity detected"


});



}




}











// ==================================
// Numeric growth detection
// ==================================


function detectGrowth(

data,

history,

signals

){



if(

!history ||

history.length===0

){

return;

}




const previous =

history[
history.length-1
];





if(

data.views &&

previous.views &&

data.views >

previous.views * 2

){



signals.push({


type:
"growth",


message:
"Traffic increased significantly"


});



}



}











// ==================================
// Risk detection
// ==================================


function detectProblems(

data,

signals

){







if(

data.previousSales &&

data.currentSales &&

data.currentSales < data.previousSales

){



signals.push({


type:
"risk",


area:
"sales",


message:
`Sales reduced from ${data.previousSales} to ${data.currentSales}`


});



}









if(

data.views > 100 &&

data.orders === 0

){



signals.push({


type:
"risk",


message:
"Many people viewed but nobody purchased"


});



}









if(

data.messages > 20 &&

data.sales === 0

){



signals.push({


type:
"risk",


message:
"Customers show interest but purchases are missing"


});



}




}











// ==================================
// Customer patterns
// ==================================


function detectCustomerSignals(

data,

signals

){





if(

data.repeatCustomers > 5

){



signals.push({


type:
"pattern",


message:
"Returning customer pattern detected"


});



}








if(

data.searches

){



signals.push({


type:
"demand",


message:
"Customers are searching for products"


});



}




}











// ==================================
// Opportunities
// ==================================


function detectOpportunities(

data,

signals

){






if(

data.productViews > 100

){



signals.push({


type:
"opportunity",


message:
"A product is getting strong customer attention"


});



}







if(

data.engagementRate > 10

){



signals.push({


type:
"opportunity",


message:
"Marketing content is performing well"


});



}



}










// ==================================
// Summary
// ==================================


function createSummary(

signals

){



if(

signals.length===0

){


return (

"No strong pattern yet. Continue observing."

);


}







return signals

.map(

signal => signal.message

)

.join(". ");



}







export default EmmaObserver;