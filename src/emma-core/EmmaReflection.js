// EmmaReflection.js
// Emma's thinking mirror
// Converts observations into experience and lessons


class EmmaReflection {


  constructor(){

    console.log(
      "🤔 Emma Reflection ready"
    );

  }





  async reflect(
    observation
  ){


    console.log(
      "🤔 Reflecting:",
      observation
    );



    const meaning =
      this.findMeaning(
        observation
      );



    const impact =
      this.findImpact(
        observation
      );



    const lesson =
      this.extractLesson(
        observation
      );



    const recommendation =
      this.createRecommendation(
        observation
      );



    const confidence =
      this.calculateConfidence(
        observation
      );




    return {


      businessId:
      observation.businessId,



      eventType:
      observation.eventType,



      originalObservation:
      observation,



      meaning,



      impact,



      lesson,



      recommendation,



      confidence,



      importance:
      this.findImportance(
        observation,
        impact,
        confidence
      ),



      reflectedAt:
      new Date()



    };


  }










  // ===========================
  // Understand what happened
  // ===========================


  findMeaning(
    observation
  ){


    const event =
      observation.eventType;


    const data =
      observation.raw?.data || {};




    if(
      event === "product_view"
    ){

      return (
        "Customers are showing interest in a product"
      );

    }






    if(
      event === "USER_RETENTION_DROP"
    ){


      const before =
      data.active_users_before;


      const now =
      data.active_users_now;



      if(before && now){


        const drop =
        Math.round(

          ((before-now)/before)
          *100

        );



        return (

          `Customer retention dropped by ${drop}%. ` +

          "This may show reduced customer satisfaction."

        );

      }



      return (
        "Customer retention decreased"
      );


    }








    if(
      event === "SALES_DROP"
    ){


      return (
        "Sales decreased. Revenue may be affected."
      );


    }







    if(
      event === "NEW_LEAD"
    ){


      return (
        "A potential customer showed buying interest"
      );


    }








    return (
      "Business activity detected"
    );


  }












  // ===========================
  // Business impact
  // ===========================


  findImpact(
    observation
  ){



    const event =
    observation.eventType;




    if(
      event.includes("DROP")
    ){


      return {

        area:
        "business_health",


        severity:
        "high",


        requiresAttention:
        true

      };


    }








    if(
      event.includes("VIEW")
      ||
      event.includes("LEAD")
    ){


      return {

        area:
        "growth",


        severity:
        "medium",


        requiresAttention:
        false

      };


    }








    return {

      area:
      "general",


      severity:
      "low",


      requiresAttention:
      false

    };


  }













  // ===========================
  // Convert event into learning
  // ===========================


  extractLesson(
    observation
  ){



    const signals =
    observation.signals || [];





    if(
      signals.length === 0
    ){


      return (
        "No strong pattern discovered yet"
      );


    }





    const lessons =
    signals.map(
      signal=>{


        if(
          signal.type==="risk"
        ){


          return (

            "Risk discovered: " +

            signal.message

          );


        }





        if(
          signal.type==="opportunity"
        ){


          return (

            "Opportunity discovered: " +

            signal.message

          );


        }





        if(
          signal.type==="pattern"
        ){


          return (

            "Customer behavior learned: " +

            signal.message

          );


        }






        return signal.message;


      }
    );





    return lessons.join(". ");



  }













  // ===========================
  // Suggest next thinking
  // ===========================



  createRecommendation(
    observation
  ){


    const signals =
    observation.signals || [];



    let recommendations=[];





    signals.forEach(
      signal=>{



        if(
          signal.type==="risk"
        ){


          recommendations.push(

            "Investigate this problem before increasing marketing"

          );


        }






        if(
          signal.type==="opportunity"
        ){


          recommendations.push(

            "Repeat and scale this successful activity"

          );


        }






        if(
          signal.type==="pattern"
        ){


          recommendations.push(

            "Use this customer behavior for future decisions"

          );


        }



      }
    );






    if(
      recommendations.length===0
    ){

      recommendations.push(

        "Continue observing before taking action"

      );

    }



    return recommendations;


  }













  // ===========================
  // Confidence score
  // ===========================


  calculateConfidence(
    observation
  ){


    let score=5;




    if(
      observation.signals?.length
    ){


      score +=
      observation.signals.length * 2;


    }






    if(
      observation.raw?.data
    ){

      score++;

    }






    if(score>10){

      score=10;

    }




    return score;


  }












  // ===========================
  // Memory importance
  // ===========================


  findImportance(
    observation,
    impact,
    confidence
  ){



    if(

      impact.requiresAttention

      ||

      confidence>=8

    ){


      return "high";


    }








    if(
      confidence>=6
    ){


      return "medium";


    }







    return "low";


  }




}





export default EmmaReflection;