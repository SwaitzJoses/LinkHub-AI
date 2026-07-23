//
// PROJECT BECOMING
//
// Emma Orchestrator v13.2
//
// Compatibility Nervous System
//
// Old organs keep their identity.
// Orchestrator adapts.
//
// v13.2:
// Async signal flow fixed.
// Organs receive completed states,
// not Promise containers.
//
import { EmmaDB } from "./config/EmmaDatabase";

class EmmaOrchestrator {


  constructor(organs) {


    this.organs = organs;


    this.state = {

      version: "13.2",

      aliveSince:
        new Date().toISOString(),

      experiencesProcessed: 0,

      lastMoment: null

    };


  }


prepareConversationForCheckpoint(conversation, previousCheckpoint = null) {

    console.log("📦 Conversation entering checkpoint:", conversation);
    console.log("📨 Messages:", conversation?.messages);

    console.log("📍 Previous checkpoint:", previousCheckpoint);

    if (!conversation) {
        return null;
    }

    let messages = conversation.messages ?? [];


 const lastMessageId =
    previousCheckpoint?.checkpoint?.conversation?.lastMessageId;

    
    console.log(
    "Contains previous ID:",
    messages.some(
        m => m.id === lastMessageId
    )
);

if (lastMessageId) {

    console.log("✅ Previous lastMessageId:", lastMessageId);


    console.log("================================");
console.log("Saved lastMessageId:", lastMessageId);

messages.forEach((m, i) => {
    console.log(i, m.id);
});

console.log("================================");

    const index = messages.findIndex(
        m => m.id === lastMessageId
    );

    console.log("📍 Found previous message at index:", index);

    if (index >= 0) {
        messages = messages.slice(index + 1);
    }

} else {
    console.log("❌ No previous checkpoint supplied");
}

console.log("📊 Messages after delta:", messages.length);

// ✅ Don't create a checkpoint if nothing changed
if (messages.length === 0) {
    console.log("⏭️ No new messages. Skipping checkpoint.");
    return null;
}

return {
    ...conversation,
    firstMessageId: messages[0]?.id ?? null,
    lastMessageId: messages[messages.length - 1]?.id ?? null,
    messageCount: messages.length,
    messages
};
}


  //
  // universal safe caller
  //
  // Opens async organs before
  // passing signals forward.
  //

  async call(
    organ,
    methods = [],
    payload
  ) {


    if (!organ) {

      return null;

    }




    for (const method of methods) {


      if (

        typeof organ[method] === "function"

      ) {


        return await organ[method](payload);


      }


    }




    return null;


  }



// async conversationPhase(input) {

//     const memoryResult =
//         await this.organs.memory.recall(input);

//     const memories =
//         memoryResult?.relevantExperiences || [];

//     return {
//         memories
//     };

// }



  async experience(input) {


    console.log(

      "🌎 Emma experiences:",

      input

    );








    //
    // 1. Awareness 👁
    //

    const attention =

      await this.call(

        this.organs.attention,

        [

          "process",

          "observe",

          "evaluate",

          "focus",

          "notice"

        ],

       input

      );



const workspaceId =
    input.workspaceId ??
    input.conversation?.conversationId;

const currentState =
    await EmmaDB.getCurrentState(
        workspaceId
    );


const context = {

    currentState,

    experience: input,

    attention,

    state: this.state

};




    const initiative =

      await this.call(

        this.organs.initiative,

        [

          "evaluate",

          "decide",

          "observe"

        ],

        context

      );











//
// 2. Memory + Wisdom 🧠🌱
//

const memoryResult =

    await this.organs.memory.recall(input);

const memories =

    memoryResult?.relevantExperiences || [];





    const wisdom =

      await this.call(

        this.organs.wisdom,

        [

          "reflect",

          "learn",

          "evaluate",

          "extractWisdom"

        ],

        {

           ...context,

          memories

        }

      );











    //
    // 3. World Understanding 🌍
    //

   const temporal =

  await this.call(

    this.organs.temporalSense,

    [

      "experienceTime"

    ],

    memories

  );






    const world =

      await this.call(

        this.organs.worldModel,

        [

          "observe",

          "understand"

        ],

        {

          experience: input,

          memories

        }

      );








    const social =

      await this.call(

        this.organs.socialModel,

        [

          "observe",

          "understand"

        ],

        {

          experience: input

        }

      );

          //
    // 4. Identity 🧬❤️
    //

  //
// 4. Identity 🧬❤️
//

const self =

  await this.call(

    this.organs.selfModel,

    [

      "observe",

      "reflect",

      "understand",

      "update"

    ],

    input

  );

const relationship =

  await this.call(

    this.organs.relationshipModel,

    [

      "understand",

      "reflect",

      "update"

    ],

    {

      input,

      memories

    }

  );










    //
    // 5. Meaning 📖🌌
    //

    const narrative =

      await this.call(

        this.organs.narrativeIdentity,

        [

          "understand",

          "update",

          "reflect"

        ],

        {

          experience: input,

          memories,

          wisdom,

          temporal,

          self,

          relationship

        }

      );









    const belief =

      await this.call(

        this.organs.beliefSystem,

        [

          "formBelief",

          "update",

          "evaluate"

        ],

        {

          experience: input,

          wisdom,

          narrative

        }

      );









    const uncertainty =

      await this.call(

        this.organs.uncertaintyModel,

        [

          "evaluate",

          "measure"

        ],

        {

          beliefs:

            belief ? [belief] : [],


          memories,


          worldModel:

            world


        }

      );











    //
    // 6. Direction ⭐🧭✨
    //

    const purpose =

      await this.call(

        this.organs.purposeModel,

        [

          "evaluate"

        ],

        {}

      );









    const values =

      await this.call(

        this.organs.valueSystem,

        [

          "evaluate",

          "align"

        ],

        {

          purpose

        }

      );









    const desire =

      await this.call(

        this.organs.desireModel,

        [

          "update",

          "evaluate"

        ],

        {

          values,


          beliefs:

            belief


        }

      );












    //
    // 7. Moment Understanding 🧭🌕🪷
    //

    const intent =

      await this.call(

        this.organs.intentSense,

        [

          "understand",

          "evaluate"

        ],

        {

         ...context,


          memories,


          relationship,


          temporal


        }

      );










    const presence =

      await this.call(

        this.organs.presenceModel,

        [

          "choose",

          "evaluate"

        ],

   {

    ...context,

    intent,

    relationship,

    temporal,

    self

}

      );










    const awareness =

      await this.call(

        this.organs.awarenessGate,

        [

          "evaluate",

          "decide"

        ],

        {

          intent,


          presence,


          relationship,


          uncertainty


        }

      );





//
// 4.5 Curiosity 🌱
//

const curiosity =

  await this.call(

    this.organs.curiosity,

    [

      "explore"

    ],

    {

      experience: input,

      memories,

      self,

      temporal,

      relationship,

      reasoning: null

    }

  );





    //
    // 8. Thinking 💭
    //

    const reasoning =

      await (

        this.organs.reasoning
          ?.think?.({

            ...context,

    memories,

    beliefs: belief,

    values,

    intent,

    presence

          })

        ||

        this.organs.reasoning
          ?.reason?.({

             ...context,

    memories
          })

        ||

        this.organs.reasoning
          ?.process?.(input)

      );

          const reflection =

      await this.call(

        this.organs.innerDialogue,

        [

          "reflect",

          "think",

          "evaluate"

        ],

  {
    ...context,

    memories,

    intent,

    presence,

    values,

    reasoning
}

      );










    const meta =

      await this.call(

        this.organs.metaCognition,

        [

          "evaluate",

          "reflect"

        ],

        {

    ...context,

    reasoning,

    uncertainty,

    beliefs:
        belief
            ? [belief]
            : [],

    values

}

      );









    //
    // 9. Conscious Stream 🌊
    //

    const consciousState =

      await this.call(

        this.organs.consciousStream,

        [

          "update",

          "flow",

          "observe"

        ],

       {
    attention,

    memories,

    intent,

    presence,

    reasoning,

    reflection
}

      );










    //
    // 10. Imagination 🌌🎨
    //

    const imagination =

      await this.call(

        this.organs.imagination,

        [

          "imagine",

          "simulate",

          "explore"

        ],

        {

          ...context,

          situation:
            input,


          possibleActions:[

            "respond",

            "ask",

            "wait"

          ],


          memories,


          beliefs:

            belief
              ? [belief]
              : [],


          values

        }

      );











    //
    // 11. Judgement ⚖️
    //

    const judgement =

      await this.call(

        this.organs.judgement,

        [

          "decide",

          "judge",

          "evaluate"

        ],

        {

         ...context,

    reasoning,

    imagination,

    values,

    uncertainty

        }

      );











    //
    // 12. Agency 🕊
    //

    const agency =

      await this.call(

        this.organs.agencyModel,

        [

          "evaluate",

          "check"

        ],

        {


          ...context,


          intent,


          desire,


          judgement,


          relationship

        }

      );











    //
    // 13. Ethics 🛡
    //

    const ethics =

      await this.call(

        this.organs.ethicsModel,

        [

          "evaluate",

          "check"

        ],

        {
          ...context,

          judgement,


          agency,


          uncertainty,


          purpose

        }

      );

          //
    // 14. Action 🤲
    //

    let action = null;





    const actionAllowed =

      awareness?.allowAction !== false

      &&

      ethics?.approved !== false;








    if (

      actionAllowed

    ) {



      action =

        await (

          this.organs.action
            ?.execute?.(judgement)

          ||

          this.organs.action
            ?.act?.(judgement)

          ||

          this.organs.action
            ?.perform?.(judgement)

        );



    }












    //
    // 15. Outcome 🌎
    //

    const outcome =

      await this.call(

        this.organs.outcome,

        [

          "observe",

          "record",

          "evaluate"

        ],

        action

      );




//
// 15.5 Reflection 🪞
//

const reflectionResult =

    await this.organs.reflection.reflect(

        input,

        reasoning?.understanding ||

        this.organs.reasoning
            ?.getCurrentUnderstanding?.() ||

        null

    );







    //
    // 16. Learning 📚
    //

  const learning =

await this.call(

    this.organs.learning,

    [

        "learn",

        "update",

        "process"

    ],

    {
  ...context,
        outcome,

        reflection: reflectionResult

    }

);












    //
    // 17. Evolution 🌱
    //

    const evolution =

      await this.call(

        this.organs.evolution,

        [

          "evolve",

          "update"

        ],

        learning

      );












    //
    // 18. Attention Evolution 👁🌱
    //

    const attentionGrowth =

      await this.call(

        this.organs.attentionEvolution,

        [

          "evolve",

          "update",

          "learn"

        ],

        {

          memories,


          wisdom,


          outcomes:

            outcome
              ? [outcome]
              : [],


          relationships:

            relationship

        }

      );












    //
    // 19. Whole Experience Integration 🧩
    //

    const integration =

      await this.call(

        this.organs.integration,

        [

          "integrate",

          "merge",

          "update"

        ],

        {

          experience:

            input,


          memory:

            memories,


          wisdom,


          belief,


          relationship,


          self,


          values,


          evolution

        }

      );












    //
    // 20. Homeostasis ⚖️🌱
    //

    const balance =

      await this.call(

        this.organs.homeostasis,

        [

          "regulate",

          "balance",

          "update"

        ],

        {

    ...context,

    evolution,

    uncertainty,

    desire,

    learning

}

      );












    //
    // 21. Life Cycle 🔄
    //

    const lifecycle =

      await this.call(

        this.organs.lifeCycle,

        [

          "evaluate",

          "update"

        ],

        {

          memories,


          wisdom,


          beliefs:

            belief
              ? [belief]
              : [],


          evolution,


          uncertainty

        }

      );












    //
    // 22. Identity Continuity 🧬⏳
    //

    const continuity =

      await this.call(

        this.organs.identityContinuity,

        [

          "preserve",

          "maintain",

          "update"

        ],

        {

          selfModel:

            self,


          values,


          relationships:

            relationship,


          narratives:

            narrative,


          evolution

        }

      );

          //
    // 22.5 Communication 🗣❤️
    //
    // The final bridge:
    //
    // Experience
    //   ↓
    // Memory
    //   ↓
    // Relationship
    //   ↓
    // Presence
    //   ↓
    // Voice
    //


console.log(
  "🧪 RELATIONSHIP RAW",
  JSON.stringify(
    relationship,
    null,
    2
  )
);


console.log(
  "🧪 COMMUNICATION INPUT CHECK",
  {

    relationshipHistory:

      relationship
        ?.relationshipContext
        ?.sharedHistoryLength,


    phase:

      relationship
        ?.relationshipContext
        ?.phase,


    trust:

      relationship
        ?.relationshipContext
        ?.trust,


    presence

  }
);








    const communication =

      await (

        this.organs.communication
          ?.reply?.({


            ...context,


            memory:

              memories,


            wisdom,


            self,


            relationship:

  relationship,


            presence,


            reasoning,


            reflection,


            evolution,


            curiosity

          })

        ||

        null

      );



console.log("📍 CHECKPOINT INPUT", {
    memories,
    temporal,
    self,
    relationship,
    curiosity,
    reasoning,
    judgement
    
});



const previousCheckpoint =
    await EmmaDB.getLatestCheckpoint(
        input.conversation?.conversationId
    );
//
// 23. Checkpoint 📍
//

const conversation =
    this.prepareConversationForCheckpoint(
        input.conversation,
        previousCheckpoint
    );

if (!conversation) {

    console.log("⏭️ Checkpoint skipped. No new messages.");

    return {
        success: true,
        skipped: true,
        reason: "NO_NEW_MESSAGES"
    };

}

console.log(
    "🧠 Current State from DB:",
    currentState
);


const intelligenceState = {

    id: crypto.randomUUID(),

    version: "1.0",

    createdAt: new Date().toISOString(),

    // =====================================================
    // ENTITY
    // =====================================================

    entity: {

        id: input.workspaceId ?? input.id ?? "",

        name: input.workspaceName ?? "",

        type: "workspace",

        description: input.description ?? "",

        status: "ACTIVE",

        provider: conversation?.provider ?? "unknown",

        conversationId: conversation?.conversationId ?? "",

        createdAt: this.state.aliveSince,

        lastUpdated: new Date().toISOString()

    },

    // =====================================================
    // EXPERIENCE
    // =====================================================

    experience: {

        input,

        attention,

        memories,

        conversation

    },

    // =====================================================
    // SELF
    // =====================================================

    self: {

        self,

        relationship,

        narrative,

        belief,

        identityContinuity: continuity

    },

    // =====================================================
    // WORLD
    // =====================================================

    world: {

        temporal,

        world,

        social,

        uncertainty

    },

    // =====================================================
    // PURPOSE
    // =====================================================

    purpose: {

        purpose,

        values,

        desire,

        intent,

        presence,

        curiosity

    },

    // =====================================================
    // THINKING
    // =====================================================

    intelligence: {

        wisdom,

        reasoning,

        reflection,

        meta,

        consciousState,

        imagination

    },

    // =====================================================
    // DECISION MAKING
    // =====================================================

    decisions: {

        judgement,

        agency,

        ethics,

        awareness

    },

    // =====================================================
    // ACTION
    // =====================================================

    action: {

        action,

        outcome,

        communication

    },

    // =====================================================
    // EVOLUTION
    // =====================================================

    evolution: {

        learning,

        evolution,

        integration,

        attentionGrowth,

        balance,

        lifecycle

    },

    // =====================================================
    // INTERNAL STATE
    // =====================================================

    state: structuredClone(this.state),

    // =====================================================
    // METADATA
    // =====================================================

    metadata: {

        schemaVersion: "1.0",

        orchestratorVersion: this.state.version,

        checkpointType: "UPDATE",

        experiencesProcessed: this.state.experiencesProcessed,

        generatedBy: "EmmaOrchestrator"

    }

};






const checkpoint =

    await this.call(

        this.organs.checkpoint,

        [

            "create"

        ],

        
           intelligenceState
        

    );

if (checkpoint) {

  console.log("Workspace:", input.workspace);
console.log("WorkspaceId:", input.workspaceId);

   const workspaceId =
    input.workspaceId ??
    input.conversation?.conversationId;

await EmmaDB.saveCurrentState(
    workspaceId,
    intelligenceState

);

}



    //
    // EXPERIENCE COMPLETE 🌎
    //

    this.state.experiencesProcessed++;










    this.state.lastMoment = {


      input,


      attention,


      intent,


      presence,


      relationship,


      communication,

      checkpoint,


      reasoning,


      judgement,


      action,


      learning,


      evolution,


      continuity


    };












   return {

    currentState: intelligenceState,


  presence,


  response:

    communication || action,


  communication:

    communication,


  reply:

    communication?.message || null,







  internalState:{


    attention,


    intent,


    awareness,


    consciousState,


    belief,


    uncertainty,


    lifecycle,


    balance


  },







  state:

    this.state


};



  }













  //
  // Quiet reflection mode 🌙
  //

  async reflectQuietly(){



    const memories =


      await (

        this.organs.memory
          ?.getAll?.()

        ||

        this.organs.memory
          ?.all?.()

        ||

        []

      );









    const beliefs =


      this.organs
        .beliefSystem
        ?.getBeliefs?.()

      ||

      [];









    const story =

      this.organs
        .narrativeIdentity
        ?.getCurrentStory?.();







    const narratives =


      Array.isArray(story)

      ?

      story

      :

      story

        ?

        [story]

        :

        [];









    return await this.call(

      this.organs.dreamEngine,


      [

        "dream",

        "reflect",

        "process"

      ],


      {


        memories,


        wisdom:

          this.organs.wisdom,


        beliefs,


        narratives


      }


    );



  }



}




export default EmmaOrchestrator;