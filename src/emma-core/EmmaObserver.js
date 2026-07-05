import { createMemory } from "./EmmaMemory";


// Emma Observer
// Watches business activity and converts raw data into meaningful events


export async function observe({
  business,
  source,
  eventType,
  data,
  history = []
}) {

  const analysis = analyzeSignals({
    data,
    history
  });


  const event = {
    businessId: business.id,

    source,          // LinkHub, Shopify, WhatsApp
    type: eventType, // sale, visitor, message

    rawData: data,

    signals: analysis.signals,

    importance: analysis.importance,

    summary: analysis.summary,

    createdAt: new Date()
  };



  // Emma only remembers meaningful experiences

  if (event.importance >= 7) {

    await createMemory({

      businessId: business.id,

      type: "observation",

      content: event,

      lesson:
        "Important business signal detected"

    });

  }


  return event;
}





function analyzeSignals({ data, history }) {


  let signals = [];

  let importance = 3;



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



  // importance calculation

  importance += signals.length * 2;


  if (importance > 10) {
    importance = 10;
  }


  return {

    signals,

    importance,

    summary:
      createSummary(signals)

  };

}





function detectGrowth(
data,
history,
signals
){

if(!history.length) return;


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
"Traffic increased significantly"

});

}


}





function detectProblems(
data,
signals
){


// people interested but not buying

if(
data.views > 100 &&
data.orders === 0
){

signals.push({

type:"risk",

message:
"High attention but low conversion"

});

}



// many messages no sales

if(
data.messages > 20 &&
data.sales === 0
){

signals.push({

type:"risk",

message:
"Customers asking but not purchasing"

});

}


}





function detectCustomerSignals(
data,
signals
){



if(data.repeatCustomers > 5){

signals.push({

type:"pattern",

message:
"Returning customer interest detected"

});

}



if(data.searches){

signals.push({

type:"demand",

message:
"Customers are searching for products"

});

}



}





function detectOpportunities(
data,
signals
){



if(data.productViews > 100){

signals.push({

type:"opportunity",

message:
"Product receiving strong attention"

});

}



if(data.engagementRate > 10){

signals.push({

type:"opportunity",

message:
"Marketing content performing well"

});

}



}






function createSummary(signals){


if(signals.length === 0){

return "Normal business activity observed";

}


return signals
.map(s => s.message)
.join(". ");

}