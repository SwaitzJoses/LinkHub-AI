// EmmaObserver.js
// Emma's eyes
// Watches business events


class EmmaObserver {


  constructor() {

    console.log(
      "👀 Emma Observer ready"
    );

  }



  async observe(event) {


    console.log(
      "👀 Observing:",
      event
    );


    return {

      eventType:
        event.type,


      businessId:
        event.businessId,


      observation:
        this.understand(event),


      raw:
        event,


      observedAt:
        new Date()

    };


  }




  understand(event) {


    if (
      event.type === "product_view"
    ) {


      return (
        "Customer interest detected"
      );

    }


    if (
      event.type === "low_sales"
    ) {


      return (
        "Possible sales problem detected"
      );

    }


    return (
      "General business activity detected"
    );

  }


}



export default EmmaObserver;