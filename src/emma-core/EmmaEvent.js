// EmmaEvent.js
// Universal language of Emma


class EmmaEvent {


 static create({

  source,

  businessId,

  type,

  actor="system",

  object=null,

  data={}

 }){


  return {


   source,


   businessId,


   type,


   actor,


   object,


   context:data,


   happenedAt:
    new Date()


  };


 }


}


export default EmmaEvent;