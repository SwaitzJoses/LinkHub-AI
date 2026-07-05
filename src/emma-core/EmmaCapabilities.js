// EmmaCapabilities.js
// Emma's skill awareness layer
// Knows what Emma is capable of doing


class EmmaCapabilities {


  constructor(){


    console.log(
      "🖐️ Emma Capabilities ready"
    );



    this.skills = [

      {

        name:
        "CREATE_TASK",


        category:
        "operations",


        description:
        "Create and organize work that needs to be completed",


        risk:
        "low",


        requiresApproval:
        false,


        enabled:
        true

      },








      {

        name:
        "GENERATE_REPORT",


        category:
        "intelligence",


        description:
        "Analyze information and create useful reports",


        risk:
        "low",


        requiresApproval:
        false,


        enabled:
        true

      },








      {

        name:
        "CREATE_CAMPAIGN",


        category:
        "growth",


        description:
        "Create growth campaigns based on company goals",


        risk:
        "medium",


        requiresApproval:
        true,


        enabled:
        true

      }

    ];


  }










  // What can Emma do?


  getSkills(){


    return this.skills.filter(

      skill =>
      skill.enabled

    );


  }










  // Can Emma perform this action?


  canPerform(action){



    const skill =
      this.skills.find(

        item =>
        item.name === action

      );





    if(!skill){


      return {

        allowed:false,

        reason:
        "Emma does not have this capability yet"

      };


    }








    return {

      allowed:true,

      skill

    };



  }





}



export default new EmmaCapabilities();