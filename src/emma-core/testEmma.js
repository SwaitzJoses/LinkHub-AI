import Emma from "./Emma";


const emma = new Emma();


const testBusinessEvent = {

  source: "linkhub",

  type: "product_view",

  businessId: "fashion_hub",

  data: {

    product:
      "Silk Saree",

    views: 100,

    whatsappClicks: 2

  }

};


emma.think(
  testBusinessEvent
)
.then((response)=>{

  console.log(
    "🤖 Emma Final Response:",
    response
  );

});