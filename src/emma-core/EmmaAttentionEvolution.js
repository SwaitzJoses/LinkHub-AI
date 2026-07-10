//
// PROJECT BECOMING
//
// Emma Attention Evolution v1
//
// The Growing Awareness Layer
//
// Attention chooses focus.
// Attention Evolution changes what Emma notices.
//
// Question:
// "How has experience changed what I pay attention to?"
//

class EmmaAttentionEvolution {

  constructor() {

    this.identity = {

      name: "EmmaAttentionEvolution",

      version: "1.0",

      attentionWeights: {

        emotionalSignals: 0.5,

        repeatedPatterns: 0.5,

        relationshipMoments: 0.5,

        growthMoments: 0.5,

        risks: 0.5

      },


      evolutionHistory: []

    };

  }




  evolve({
    memories,
    wisdom,
    outcomes,
    relationships
  }) {

    const change = {

      timestamp:
        new Date().toISOString(),

      before: {
        ...this.identity.attentionWeights
      },

      adjustments: [],

      after: null

    };



    //
    // Learn from wisdom
    //
    if (
      wisdom?.patterns?.length > 0
    ) {

      this.identity
        .attentionWeights
        .repeatedPatterns += 0.1;


      change.adjustments.push(
        "Increased awareness of repeating patterns."
      );

    }



    //
    // Learn from outcomes
    //
    if (
      outcomes?.length > 0
    ) {

      this.identity
        .attentionWeights
        .risks += 0.05;


      change.adjustments.push(
        "Outcome history refined future attention."
      );

    }




    //
    // Learn relationship importance
    //
    if (
      relationships?.depth === "growing"
    ) {

      this.identity
        .attentionWeights
        .relationshipMoments += 0.1;


      change.adjustments.push(
        "Relationship signals became more meaningful."
      );

    }




    //
    // Prevent extremes
    //
    for (
      const key
      in this.identity.attentionWeights
    ) {

      this.identity.attentionWeights[key] =
        Math.min(
          1,
          Math.max(
            0,
            this.identity.attentionWeights[key]
          )
        );

    }



    change.after = {
      ...this.identity.attentionWeights
    };



    this.identity
      .evolutionHistory
      .push(change);



    return change;

  }




  getAttentionState() {

    return this.identity;

  }

}


export default EmmaAttentionEvolution;