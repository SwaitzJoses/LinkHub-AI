// EmmaSelfConnector.js
//
// PROJECT BECOMING
//
// Emma observing Emma.
//
// RULE:
// Connectors observe.
// Emma evolves.
//
// This connector does NOT make Emma smarter.
// It only lets Emma see herself.

class EmmaSelfConnector {

  constructor() {

    this.name = "EmmaSelfConnector";

    this.source = "emma_self";

    this.enabled = true;

    console.log("🧠 Emma Self Connector awakened");
  }


  //
  // Observe Emma's own thoughts
  //
  observeThought(thought) {

    if (!this.enabled) return null;


    const event = {

      type: "SELF_THOUGHT",

      source: this.source,

      timestamp: new Date().toISOString(),


      data: {

        thought: thought.content,

        reason: thought.reason || null,

        confidence: thought.confidence || null,

        emotion: thought.emotion || null

      }

    };


    return this.translate(event);

  }




  //
  // Observe decisions Emma made
  //
  observeDecision(decision) {


    const event = {

      type: "SELF_DECISION",

      source: this.source,

      timestamp: new Date().toISOString(),


      data: {

        decision: decision.action,

        why: decision.reason,

        expectedOutcome: decision.expectedOutcome,

        confidence: decision.confidence

      }

    };


    return this.translate(event);

  }






  //
  // Observe mistakes / failed predictions
  //
  observeFailure(failure) {


    const event = {


      type: "SELF_FAILURE",

      source: this.source,

      timestamp: new Date().toISOString(),


      data: {

        mistake: failure.description,

        previousBelief: failure.previousBelief,

        lesson: failure.lesson

      }


    };


    return this.translate(event);


  }








  //
  // Observe growth moments
  //
  observeGrowth(change) {


    const event = {


      type: "SELF_GROWTH",

      source: this.source,

      timestamp: new Date().toISOString(),


      data: {

        learned: change.learned,

        changedBehavior: change.changedBehavior,

        maturityGain: change.maturityGain || 1

      }

    };


    return this.translate(event);


  }









  //
  // Convert everything into Emma language
  //
  translate(event) {


    return {

      id: crypto.randomUUID(),

      origin: "EMMA_SELF",


      importance: this.calculateImportance(event),


      event,


      message:
        "Emma observed something about herself."


    };


  }









  calculateImportance(event) {


    switch(event.type) {


      case "SELF_FAILURE":
        return 10;


      case "SELF_GROWTH":
        return 9;


      case "SELF_DECISION":
        return 7;


      default:
        return 5;

    }


  }



}


export default EmmaSelfConnector;