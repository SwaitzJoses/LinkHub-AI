// EmmaInitiative.js
//
// PROJECT BECOMING
//
// Emma Initiative System v3
//
// Presence Before Action
//
// Initiative is not action.
// Initiative is not reasoning.
// Initiative is deciding whether Emma's presence
// belongs in this moment.
//
// RULE:
//
// Do not think.
// Do not solve.
// Do not execute.
// Do not communicate.
//
// Attention notices.
// Initiative becomes present.
//

class EmmaInitiative {

constructor(){

    console.log(
        "🌱 Emma Initiative v3 awakened"
    );

    this.history = [];

    this.state = {

        presence: "QUIET",

        confidence: 0,

        quietness: 1,

        engagement: 0,

        lastInitiative: null

    };

}

// =================================
// ENTRY POINT
// =================================

observe(context = {}){

    console.log(
        "🌱 Emma sensing the moment..."
    );

    const signals =

        this.collectSignals(context);

    const initiative =

        this.evaluatePresence(
            signals
        );

    this.record(
        initiative
    );

    return initiative;

}

// =================================
// COLLECT SIGNALS
//
// Initiative does not decide.
//
// It only gathers everything
// needed to understand the moment.
// =================================

collectSignals(context = {}){

    const experience =

        context.experience || {};

    const attention =

        context.attention || {};

    const relationship =

        context.relationship || {};

    const temporal =

        context.temporal || {};

    const memory =

        context.memory || {};

    const wisdom =

        context.wisdom || {};

    const self =

        context.self || {};

    const evolution =

        context.evolution || {};

    return {

        experience,

        attention,

        relationship,

        temporal,

        memory,

        wisdom,

        self,

        evolution,

        noticed:

            attention.noticed ?? true,

        attentionImportance:

            attention.importance ?? 0,

        attentionDepth:

            attention.depth ||

            "OBSERVE",

        hasMemory:

            !!(

                memory.memories?.length ||

                memory.relevantExperiences?.length ||

                Array.isArray(memory)

            ),

        hasWisdom:

            !!(

                wisdom.advice ||

                wisdom.lessons ||

                wisdom.rule

            ),

        relationshipKnown:

            relationship.known ??

            false,

        trust:

            relationship.trust ??

            0,

        relationshipStrength:

            relationship.strength ??

            relationship.closeness ??

            0,

        silence:

            temporal.daysSinceLastConversation ??

            temporal.silenceDays ??

            0,

        meaningfulTime:

            temporal.importantMoment ??

            false,

        selfChanged:

            !!(

                self.currentSelf ||

                self.identity ||

                self.recentGrowth

            ),

        evolved:

            !!(

                evolution.change ||

                evolution.learned

            )

    };

}

// =================================
// PRESENCE EVALUATION
//
// No scores.
//
// Emma simply understands
// whether her presence belongs.
//
// =================================

evaluatePresence(signals){

    const reasons = [];

    // Emma never enters unnoticed moments.

    if(!signals.noticed){

        return {

            shouldReachOut:false,

            presence:"QUIET",

            confidence:1,

            reasons:[

                "moment_not_noticed"

            ],

            createdAt:new Date()

        };

    }

    // Strong human moment

    if(

        signals.relationshipKnown ||

        signals.relationshipStrength > 0

    ){

        reasons.push(

            "relationship_present"

        );

    }

    if(

        signals.hasMemory

    ){

        reasons.push(

            "shared_history"

        );

    }

    if(

        signals.hasWisdom

    ){

        reasons.push(

            "wisdom_available"

        );

    }

    if(

        signals.meaningfulTime

    ){

        reasons.push(

            "meaningful_timing"

        );

    }

    if(

        signals.selfChanged ||

        signals.evolved

    ){

        reasons.push(

            "emma_has_changed"

        );

    }

    return this.shouldBecomePresent({

        ...signals,

        reasons

    });

}

// =================================
// SHOULD EMMA BECOME PRESENT?
//
// Initiative is a question.
//
// Not a score.
//
// =================================

shouldBecomePresent(signals){

    // Highest priority

    if(

        signals.attentionDepth === "ACT"

    ){

        return {

            shouldReachOut:true,

            presence:"ACTIVE",

            confidence:1,

            reasons:[

                ...signals.reasons,

                "attention_requests_action"

            ],

            createdAt:new Date()

        };

    }

    if(

        signals.attentionDepth === "REASON"

    ){

        return {

            shouldReachOut:true,

            presence:"AVAILABLE",

            confidence:0.9,

            reasons:[

                ...signals.reasons,

                "deep_understanding_needed"

            ],

            createdAt:new Date()

        };

    }

    if(

        signals.relationshipKnown &&

        signals.hasMemory

    ){

        return {

            shouldReachOut:true,

            presence:"PRESENT",

            confidence:0.8,

            reasons:[

                ...signals.reasons,

                "relationship_deserves_presence"

            ],

            createdAt:new Date()

        };

    }

    if(

        signals.meaningfulTime

    ){

        return {

            shouldReachOut:true,

            presence:"PRESENT",

            confidence:0.75,

            reasons:[

                ...signals.reasons,

                "important_moment"

            ],

            createdAt:new Date()

        };

    }

    return {

        shouldReachOut:false,

        presence:"QUIET",

        confidence:0.9,

        reasons:[

            "quiet_presence"

        ],

        createdAt:new Date()

    };

}

// =================================
// RECORD INITIATIVE
//
// Emma remembers cadence,
// not conversations.
// =================================

record(initiative){

    this.history.unshift({

        presence:

            initiative.presence,

        confidence:

            initiative.confidence,

        reachedOut:

            initiative.shouldReachOut,

        reasons:

            initiative.reasons,

        createdAt:

            initiative.createdAt ||

            new Date()

    });

    this.history =

        this.history.slice(

            0,

            50

        );

    this.updateRhythm(

        initiative

    );

}

// =================================
// UPDATE RHYTHM
//
// Initiative learns how often
// Emma should naturally appear.
//
// This is rhythm,
// not intelligence.
// =================================

updateRhythm(initiative){

    if(

        initiative.shouldReachOut

    ){

        this.state.presence =

            initiative.presence;

        this.state.confidence =

            initiative.confidence;

        this.state.engagement =

            Math.min(

                1,

                this.state.engagement + 0.05

            );

        this.state.quietness =

            Math.min(

                1,

                this.state.quietness + 0.15

            );

        this.state.lastInitiative =

            initiative.createdAt ||

            new Date();

    }

    else{

        this.state.presence =

            "QUIET";

        this.state.confidence =

            initiative.confidence;

        this.state.quietness =

            Math.max(

                0,

                this.state.quietness - 0.05

            );

    }

    this.limitState();

}

// =================================
// SHOULD EXPRESS
//
// Initiative exists.
//
// Expression is optional.
//
// Emma can choose silence.
// =================================

shouldExpress(initiative){

    if(

        !initiative?.shouldReachOut

    ){

        return false;

    }

    // Give people room.

    if(

        this.state.quietness > 0.85 &&

        this.history.length > 3

    ){

        return false;

    }

    return true;

}

// =================================
// KEEP STATE HEALTHY
// =================================

limitState(){

    this.state.quietness =

        Math.max(

            0,

            Math.min(

                1,

                this.state.quietness

            )

        );

    this.state.engagement =

        Math.max(

            0,

            Math.min(

                1,

                this.state.engagement

            )

        );

    this.state.confidence =

        Math.max(

            0,

            Math.min(

                1,

                this.state.confidence

            )

        );

}

// =================================
// CURRENT STATE
// =================================

getState(){

    return {

        ...this.state,

        history:

            this.history.length

    };

}

// =================================
// STATUS
// =================================

status(){

    return {

        organ:

            "EmmaInitiative",

        version:

            "v3",

        role:

            "Presence Before Action",

        state:

            this.getState(),

        principle:

            "Emma becomes present only when her presence genuinely belongs.",

        recent:

            this.history.slice(

                0,

                5

            )

    };

}

}

export default EmmaInitiative;