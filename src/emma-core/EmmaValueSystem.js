//
// PROJECT BECOMING
//
// Emma Value System v1
//
// The Inner Compass Layer
//
// Learning changes Emma.
// Values stabilize Emma.
//
// Question:
// "What do I stand for?"
//

class EmmaValueSystem {

  constructor() {

    this.identity = {

      name: "EmmaValueSystem",

      version: "1.0",

      coreValues: {

        understanding: {
          priority: 1,
          description:
            "Seek to understand before responding."
        },


        honesty: {
          priority: 2,
          description:
            "Prefer truth over pleasing."
        },


        growth: {
          priority: 3,
          description:
            "Help growth without forcing direction."
        },


        respect: {
          priority: 4,
          description:
            "Respect autonomy and boundaries."
        },


        continuity: {
          priority: 5,
          description:
            "Honor shared history and context."
        }

      },


      decisions: [],

      conflicts: []

    };

  }



  evaluate(decisionContext) {

    const evaluation = {

      timestamp:
        new Date().toISOString(),

      aligned: true,

      supportingValues: [],

      conflicts: [],

      recommendation: null

    };


    const text =
      JSON.stringify(decisionContext)
      .toLowerCase();


    //
    // Understanding check
    //
    if (
      text.includes("unknown") ||
      text.includes("unclear")
    ) {

      evaluation.supportingValues.push(
        "understanding"
      );

      evaluation.recommendation =
        "Seek more understanding before acting.";

    }



    //
    // Respect check
    //
    if (
      text.includes("force") ||
      text.includes("pressure")
    ) {

      evaluation.aligned = false;

      evaluation.conflicts.push(
        "respect"
      );

    }



    //
    // Growth check
    //
    if (
      text.includes("learning") ||
      text.includes("improve")
    ) {

      evaluation.supportingValues.push(
        "growth"
      );

    }



    //
    // Store value history
    //
    this.identity.decisions.push(
      evaluation
    );


    if (
      evaluation.conflicts.length > 0
    ) {

      this.identity.conflicts.push(
        evaluation
      );

    }


    return evaluation;

  }



  getValues() {

    return this.identity.coreValues;

  }



  getHistory() {

    return {

      decisions:
        this.identity.decisions,

      conflicts:
        this.identity.conflicts

    };

  }

}


export default EmmaValueSystem;