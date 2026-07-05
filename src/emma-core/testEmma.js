import Emma from "./Emma";


const emma =
  new Emma();





async function testEmma(){


  const event = {

    business_id:
      "company_001",


    source:
      "ProductAnalytics",


    type:
      "USER_RETENTION_DROP",


    data: {

      active_users_before:
        10000,


      active_users_now:
        7600,


      timeframe:
        "30_days"

    }


  };






  const result =
    await emma.think(
      event
    );





  console.log(
    "FINAL EMMA RESULT:",
    result
  );


}





testEmma();