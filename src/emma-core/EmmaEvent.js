// EmmaEvent.js
// Universal Emma event language

class EmmaEvent {

  constructor({

    source,

    type,

    rawData,

    meaning,

    businessId = null,

    customerId = null,

    importance = 1

  }) {


    this.id = crypto.randomUUID();


    this.source = source;


    this.type = type;


    this.meaning = meaning;


    this.rawData = rawData;


    this.businessId = businessId;


    this.customerId = customerId;


    this.importance = importance;


    this.createdAt = new Date();

  }

}


export default EmmaEvent;