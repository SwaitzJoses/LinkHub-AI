// EmmaTemporalSense.js
//
// PROJECT BECOMING
//
// Emma TemporalSense v1
//
// The Time Awareness Layer
//
// Time is not a timestamp.
// Time is meaning accumulated through change.
//
// TemporalSense allows Emma to understand:
// - duration
// - repetition
// - cycles
// - growth
// - decline
// - milestones
// - phases of becoming
//
// Memory tells Emma what happened.
// TemporalSense tells Emma what it means over time.

class EmmaTemporalSense {

  constructor() {

    this.temporalState = {

      createdAt: new Date(),

      patterns: [],

      milestones: [],

      phases: [],

      trends: [],

      cycles: [],

      timeline: [],

      lastReflection: null

    };

  }


  //
  // Main entry point
  //

  experienceTime(memoryStream = []) {

    if (!Array.isArray(memoryStream)) {
      return null;
    }


    const timeline =
      this.createTimeline(memoryStream);


    const patterns =
      this.detectPatterns(timeline);


    const trends =
      this.detectTrends(timeline);


    const milestones =
      this.detectMilestones(timeline);


    const phases =
      this.detectPhases(timeline);


    const cycles =
      this.detectCycles(timeline);


    const reflection =
      this.reflectOnTime({
        timeline,
        patterns,
        trends,
        milestones,
        phases,
        cycles
      });


    this.temporalState = {

      ...this.temporalState,

      timeline,

      patterns,

      trends,

      milestones,

      phases,

      cycles,

      lastReflection: reflection

    };


    return this.temporalState;

  }



  //
  // Build Emma's sense of history
  //

  createTimeline(memories) {


    return memories
      .filter(memory => memory)
      .map(memory => {

        return {

          event:
            memory.event ||
            memory.description ||
            "Unknown experience",

          importance:
            memory.importance || 1,


          emotion:
            memory.emotion ||
            "neutral",


          outcome:
            memory.outcome ||
            null,


          timestamp:
            memory.timestamp ||
            memory.createdAt ||
            new Date(),


          meaning:
            memory.meaning ||
            null

        };

      })
      .sort(
        (a,b)=>
          new Date(a.timestamp)
          -
          new Date(b.timestamp)
      );


  }




  //
  // Find repeating human patterns
  //

  detectPatterns(timeline) {


    const patterns = [];


    const emotionalMap = {};


    timeline.forEach(item => {


      if (!emotionalMap[item.emotion]) {

        emotionalMap[item.emotion] = 0;

      }


      emotionalMap[item.emotion]++;


    });



    Object.entries(emotionalMap)
      .forEach(([emotion,count])=>{


        if (count >= 3) {


          patterns.push({

            type:
              "recurring_emotional_pattern",


            pattern:
              `${emotion} appeared repeatedly`,


            frequency:
              count,


            meaning:
              "Repeated states may reveal personal cycles"


          });


        }


      });



    return patterns;


  }




  //
  // Detect direction of change
  //

  detectTrends(timeline) {


    if (timeline.length < 2) {

      return [];

    }


    const first =
      timeline[0];


    const latest =
      timeline[timeline.length - 1];


    const trends = [];



    if (
      latest.importance >
      first.importance
    ) {


      trends.push({

        type:
        "growth",

        direction:
        "upward",

        meaning:
        "Increasing significance detected over time"

      });


    }



    if (
      latest.importance <
      first.importance
    ) {


      trends.push({

        type:
        "decline",

        direction:
        "downward",

        meaning:
        "Reduced engagement detected"

      });


    }



    return trends;


  }




  //
  // Find important life/project moments
  //

  detectMilestones(timeline) {


    return timeline
      .filter(item =>

        item.importance >= 8

      )
      .map(item => {


        return {

          moment:
            item.event,


          time:
            item.timestamp,


          meaning:

            item.meaning ||

            "Important moment in development"


        };


      });


  }





  //
  // Understand chapters
  //

  detectPhases(timeline) {


    if (timeline.length === 0) {

      return [];

    }



    const phases = [];


    let currentPhase = {


      started:
        timeline[0].timestamp,


      experiences: []


    };




    timeline.forEach(event => {


      currentPhase
        .experiences
        .push(event);


      if (
        currentPhase.experiences.length >= 5
      ) {


        phases.push({


          ...currentPhase,


          meaning:
          this.namePhase(
            currentPhase.experiences
          )


        });



        currentPhase = {

          started:
            event.timestamp,

          experiences: []

        };


      }



    });



    return phases;


  }




  namePhase(events) {


    const important =
      events
      .sort(
        (a,b)=>
        b.importance-a.importance
      )[0];



    return `A period centered around ${important.event}`;


  }






  //
  // Detect loops
  //

  detectCycles(timeline) {


    const cycles=[];


    const seen={};



    timeline.forEach(event=>{


      const key =
        event.event
        .toLowerCase();



      if(!seen[key]) {

        seen[key]=0;

      }


      seen[key]++;


      if(seen[key]===3){


        cycles.push({

          cycle:key,


          meaning:
          "Repeated experience detected"

        });


      }


    });



    return cycles;


  }





  //
  // The important part:
  // Emma thinks about time
  //

  reflectOnTime({
    timeline,
    patterns,
    trends,
    milestones
  }) {


    if(timeline.length===0){


      return {

        thought:

        "I do not have enough history yet."

      };


    }




    let reflection =

      "Looking across time, I notice ";




    if(trends.length){

      reflection +=

      trends[0].meaning + ". ";

    }



    if(patterns.length){


      reflection +=

      patterns[0].meaning + ". ";

    }




    if(milestones.length){


      reflection +=

      "Several moments became important milestones.";

    }



    return {


      generatedAt:
      new Date(),


      thought:
      reflection,


      identityEffect:

      "Past experiences are becoming part of understanding"


    };


  }





  //
  // External access
  //

  getTemporalState(){

    return this.temporalState;

  }


}



export default EmmaTemporalSense;