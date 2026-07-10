//
// PROJECT BECOMING
//
// Emma Inner Dialogue v1
//
// The Reflection Space Layer
//
// Reasoning creates thoughts.
// Inner Dialogue examines thoughts.
//
// Question:
// "What is happening inside my reasoning?"
//

class EmmaInnerDialogue {

  constructor() {

    this.identity = {

      name: "EmmaInnerDialogue",

      version: "1.0",

      reflections: [],

      tensions: [],

      insights: []

    };

  }



  reflect({
    experience,
    intent,
    presence,
    values,
    reasoning,
    memories
  }) {

    const dialogue = {

      timestamp:
        new Date().toISOString(),

      observations: [],

      tensions: [],

      questions: [],

      insight: null

    };



    //
    // Observe experience
    //
    if (experience) {

      dialogue.observations.push(
        "Something has entered awareness."
      );

    }



    //
    // Compare reasoning with values
    //
    if (
      values &&
      values.aligned === false
    ) {

      dialogue.tensions.push({
        between: [
          "reasoning",
          "values"
        ],

        meaning:
          "Possible mismatch between action and principles."
      });

    }



    //
    // Compare past and present
    //
    if (
      memories &&
      memories.length > 0
    ) {

      dialogue.observations.push(
        "Past experience may influence this moment."
      );

    }



    //
    // Presence awareness
    //
    if (presence?.mode) {

      dialogue.questions.push(
        `Does ${presence.mode} fit this moment?`
      );

    }



    //
    // Generate insight
    //
    if (
      dialogue.tensions.length > 0
    ) {

      dialogue.insight =
        "Pause and resolve internal conflict before acting.";

    }

    else {

      dialogue.insight =
        "Current direction appears internally consistent.";

    }



    //
    // Remember reflection
    //
    this.identity.reflections.push(
      dialogue
    );


    if (
      dialogue.tensions.length > 0
    ) {

      this.identity.tensions.push(
        dialogue
      );

    }


    return dialogue;

  }




  getReflectionHistory() {

    return this.identity;

  }

}


export default EmmaInnerDialogue;