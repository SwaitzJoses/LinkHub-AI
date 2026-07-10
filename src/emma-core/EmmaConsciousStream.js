//
// PROJECT BECOMING
//
// Emma Conscious Stream v1
//
// The Runtime Awareness Layer
//
// Not human consciousness.
// A continuous internal state stream.
//
// Question:
// "What is active inside Emma right now?"
//


class EmmaConsciousStream {


  constructor() {


    this.identity = {


      name: "EmmaConsciousStream",

      version: "1.0",


      currentState: {

        focus: null,

        activeMemories: [],

        activeThoughts: [],

        activeIntentions: [],

        activeReflections: []

      },


      stream: []


    };


  }






  update({

    attention,

    memories,

    intent,

    presence,

    reasoning,

    reflection

  }) {



    const moment = {


      timestamp:
        new Date().toISOString(),


      awareness: {}


    };





    //
    // What has attention?
    //
    if (attention) {


      this.identity
        .currentState
        .focus =
          attention.focus ||
          attention;



      moment.awareness.focus =
        this.identity.currentState.focus;


    }






    //
    // Active memories
    //
    if (memories) {


      this.identity
        .currentState
        .activeMemories =
          memories;



      moment.awareness.memories =
        memories.length;


    }







    //
    // Current intention
    //
    if (intent) {


      this.identity
        .currentState
        .activeIntentions
        .push(intent);



      moment.awareness.intent =
        intent;


    }







    //
    // Presence state
    //
    if (presence) {


      moment.awareness.presence =
        presence;


    }







    //
    // Thoughts
    //
    if (reasoning) {


      this.identity
        .currentState
        .activeThoughts
        .push(reasoning);



      moment.awareness.thought =
        reasoning;


    }







    //
    // Reflection
    //
    if (reflection) {


      this.identity
        .currentState
        .activeReflections
        .push(reflection);



      moment.awareness.reflection =
        reflection;


    }








    this.identity
      .stream
      .push(moment);





    return this.identity.currentState;


  }







  getCurrentState() {


    return this.identity.currentState;


  }







  getStream() {


    return this.identity.stream;


  }


}




export default EmmaConsciousStream;