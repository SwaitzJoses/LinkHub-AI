// EmmaObserver.js
// Emma's eyes
// Watches business activity and converts raw data into meaningful events


class EmmaObserver {


constructor(){

console.log(
"👀 Emma Observer ready"
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
history = []
}) {



console.log(
"👀 Observing event:",
{
source,
eventType,
data
}
);





const analysis =
analyzeSignals({
data:data || {},
history
});






const event = {


businessId:

business?.id

||

business?.businessId

||

data?.businessId,





source:

source ||

"UNKNOWN",






eventType:

eventType ||

data?.type ||

"BUSINESS_ACTIVITY",






raw:{

data:data || {}

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







return event;



}





}












// ===========================
// Signal analysis
// ===========================


function analyzeSignals({
data,
history
}) {


let signals=[];


let importance=3;






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
importance > 10
){

importance=10;

}






return {


signals,


importance,


summary:

createSummary(
signals
)


};



}












// ===========================
// Growth detection
// ===========================


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











// ===========================
// Risk detection
// ===========================


function detectProblems(
data,
signals
){





if(

data.views > 100

&&

data.orders === 0

){



signals.push({


type:
"risk",


message:
"High attention but low conversion"


});



}








if(

data.messages > 20

&&

data.sales === 0

){



signals.push({



type:
"risk",



message:
"Customers asking but not purchasing"



});



}




}











// ===========================
// Customer patterns
// ===========================


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
"Returning customer behavior detected"


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












// ===========================
// Opportunity detection
// ===========================


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
"Product receiving strong attention"



});



}








if(
data.engagementRate > 10
){



signals.push({


type:
"opportunity",


message:
"Marketing content performing well"



});



}




}












// ===========================
// Summary creator
// ===========================


function createSummary(
signals
){



if(
signals.length===0
){


return (
"Normal business activity observed"
);


}






return signals

.map(
signal=>signal.message
)

.join(". ");



}









export default EmmaObserver;