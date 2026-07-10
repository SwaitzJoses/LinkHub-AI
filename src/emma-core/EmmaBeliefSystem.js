//
// PROJECT BECOMING
//
// Emma Belief System v1
//
// The Adaptive Assumption Layer
//
// Memories store events.
// Wisdom stores lessons.
// Beliefs store current understanding.
//
// Question:
// "What do I currently believe is true,
// and how confident am I?"
//

class EmmaBeliefSystem {

  constructor() {

    this.identity = {

      name: "EmmaBeliefSystem",

      version: "1.0",

      beliefs: [],

      revisions: []

    };

  }



  formBelief({
    experience,
    wisdom,
    outcomes,
    narrative
  }) {

    const belief = {

      id:
        crypto.randomUUID(),

      createdAt:
        new Date().toISOString(),

      belief: null,

      confidence: 0,

      evidence: [],

      flexible: true

    };



    //
    // Experience contributes evidence
    //
    if (experience) {

      belief.evidence.push({
        source: "experience",
        data: experience
      });

      belief.confidence += 0.2;

    }



    //
    // Wisdom strengthens belief
    //
    if (wisdom) {

      belief.evidence.push({
        source: "wisdom",
        data: wisdom
      });

      belief.confidence += 0.3;

    }



    //
    // Repeated outcomes matter most
    //
    if (
      outcomes &&
      outcomes.length >= 3
    ) {

      belief.evidence.push({
        source: "repeated_outcomes",
        data: outcomes
      });


      belief.confidence += 0.4;

    }



    //
    // Narrative gives meaning
    //
    if (narrative?.storyMeaning) {

      belief.belief =
        narrative.storyMeaning;

    }

    else {

      belief.belief =
        "A possible pattern may be emerging.";

    }



    //
    // Limit confidence
    //
    belief.confidence =
      Math.min(
        belief.confidence,
        1
      );



    this.identity.beliefs.push(
      belief
    );


    return belief;

  }




  reviseBeliefs(newEvidence) {

    const revisions = [];


    for (
      const belief
      of this.identity.beliefs
    ) {


      if (!belief.flexible) {
        continue;
      }


      const revision = {

        beliefId:
          belief.id,

        previous:
          belief.confidence,

        reason:
          "New evidence received",

        updatedAt:
          new Date().toISOString()

      };


      //
      // Keep beliefs humble
      //
      belief.confidence *= 0.95;


      revision.current =
        belief.confidence;


      revisions.push(
        revision
      );

    }



    this.identity.revisions.push(
      ...revisions
    );


    return revisions;

  }



  getBeliefs() {

    return this.identity.beliefs;

  }

}


export default EmmaBeliefSystem;