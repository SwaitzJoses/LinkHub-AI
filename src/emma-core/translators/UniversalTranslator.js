import EmmaEvent from "../EmmaEvent";

class UniversalTranslator {

  translate(source, rawEvent) {

    // LinkHub Connector
    if (source === "LINKHUB") {

      if (rawEvent.action === "PRODUCT_ADDED") {

        return new EmmaEvent({
          source: "LINKHUB",

          type: "PRODUCT_CREATED",

          rawData: rawEvent,

          meaning:
          "Business added a new product",

          importance: 5
        });

      }


      if (rawEvent.action === "WHATSAPP_CLICK") {

        return new EmmaEvent({
          source: "LINKHUB",

          type: "CUSTOMER_BUYING_INTENT",

          rawData: rawEvent,

          meaning:
          "Customer showed interest in buying",

          importance: 9
        });

      }

    }


    // Unknown events
    return new EmmaEvent({
      source,

      type:"UNKNOWN_EVENT",

      rawData: rawEvent,

      meaning:
      "Something happened in the business",

      importance:1
    });

  }

}


export default new UniversalTranslator();