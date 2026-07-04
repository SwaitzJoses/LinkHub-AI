// EmmaReflection.js
// Emma's thinking mirror
// Understands WHY something happened


class EmmaReflection {


  constructor(){

    console.log(
      "🤔 Emma Reflection ready"
    );

  }



  async reflect(observation){


    console.log(
      "🤔 Reflecting:",
      observation
    );


    return {

      summary:
        observation.observation,


        businessId:
 observation.businessId,


      meaning:
        this.findMeaning(
          observation
        ),


      importance:
        this.findImportance(
          observation
        ),


      reflectedAt:
        new Date()

    };

  }




  findMeaning(observation){


    if(
      observation.eventType
      === "product_view"
    ){

      return (
        "People are showing interest in this product"
      );

    }


    return (
      "Business activity needs understanding"
    );

  }




  findImportance(observation){


    if(
      observation.eventType
      === "product_view"
    ){

      return "medium";

    }


    return "low";

  }


}



export default EmmaReflection;