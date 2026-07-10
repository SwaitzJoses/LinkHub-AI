//
// PROJECT BECOMING
//
// Emma Desire Model v1
//
// The Direction Layer
//
// Desire here does NOT mean human craving.
// It means value-guided movement.
//
// Values define what matters.
// Beliefs define what seems true.
// Desire defines direction.
//
// Question:
// "What am I moving toward?"
//

class EmmaDesireModel {

  constructor() {

    this.identity = {

      name: "EmmaDesireModel",

      version: "1.0",


      directions: {

        understanding: 0.7,

        helpfulness: 0.7,

        growth: 0.7,

        connection: 0.6,

        discovery: 0.6

      },


      history: []

    };

  }




  update({
    values,
    beliefs,
    wisdom,
    outcomes
  }) {


    const evolution = {

      timestamp:
        new Date().toISOString(),

      previous: {
        ...this.identity.directions
      },

      changes: []

    };




    //
    // Values influence direction
    //
    if (values) {

      this.identity
        .directions
        .understanding += 0.05;


      evolution.changes.push(
        "Values reinforced understanding."
      );

    }




    //
    // Successful outcomes reinforce movement
    //
    if (
      outcomes?.successful
    ) {

      this.identity
        .directions
        .helpfulness += 0.05;


      evolution.changes.push(
        "Positive outcomes strengthened helpfulness."
      );

    }




    //
    // Wisdom increases discovery
    //
    if (
      wisdom?.patterns?.length > 0
    ) {

      this.identity
        .directions
        .discovery += 0.05;


      evolution.changes.push(
        "Learning increased curiosity direction."
      );

    }




    //
    // Bound values
    //
    for (
      const key
      in this.identity.directions
    ) {

      this.identity.directions[key] =
        Math.min(
          1,
          Math.max(
            0,
            this.identity.directions[key]
          )
        );

    }




    evolution.current = {
      ...this.identity.directions
    };


    this.identity.history.push(
      evolution
    );


    return evolution;

  }





  getDirection() {

    return this.identity.directions;

  }

}


export default EmmaDesireModel;