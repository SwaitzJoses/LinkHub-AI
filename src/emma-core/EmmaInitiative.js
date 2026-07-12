// EmmaInitiative.js
//
// PROJECT BECOMING
//
// Emma Initiative System v2
//
// The Moment Awareness Organ
//
// Initiative is not action.
// Initiative is not reasoning.
// Initiative is knowing when Emma's presence matters.
//
// RULE:
//
// Do not think.
// Do not decide solutions.
// Do not execute.
// Do not create messages.
// Do not call AI.
//
// Attention notices the world.
// Initiative decides when Emma should enter.
//
// Memory gives history.
// Wisdom gives meaning.
// Evolution gives growth.
// SelfModel gives identity.
// RelationshipModel gives closeness.
// TemporalSense gives timing.
//

class EmmaInitiative {

constructor(){

console.log(
"🌱 Emma Initiative v2 awakened"
);

// Not memory.
// Only initiative rhythm.

this.history = [];

this.state = {

quietness: 1,

engagement: 0,

sensitivity: 0.5,

lastInitiative: null

};

}

// =================================
// OBSERVE MOMENT
//
// Should Emma become present?
// =================================

observe(context = {}){

console.log(
"🌱 Emma sensing initiative..."
);

const signals =

this.collectSignals({

experience:

context.experience,

memory:

context.memory,

wisdom:

context.wisdom,

evolution:

context.evolution,

self:

context.self,

relationship:

context.relationship,

temporal:

context.temporal

});

const initiative =

this.evaluate(

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
// No judgement.
// No reasoning.
// Only awareness.
// =================================

collectSignals({

experience,

memory,

wisdom,

evolution,

self,

relationship,

temporal

}){

return {

importance:

experience?.importance || 0,

hasMemory:

!!(

memory?.memories?.length ||

memory?.memory?.length

),

hasWisdom:

!!(

wisdom?.advice ||

wisdom?.lessons

),

hasEvolution:

!!(

evolution?.change ||

evolution?.learned

),

hasSelfShift:

!!(

self?.currentSelf ||

self?.identity ||

self?.recentGrowth

),

relationshipStrength:

relationship?.strength ??

relationship?.closeness ??

0,

relationshipTrust:

relationship?.trust ??

0,

relationshipHistory:

relationship?.sharedExperiences ??

relationship?.historyCount ??

0,

timeSinceLastConversation:

temporal?.daysSinceLastConversation ??

temporal?.silenceDays ??

0,

importantMoment:

temporal?.importantMoment ??

false

};

}

// =================================
// EVALUATE INITIATIVE
//
// Should Emma become present?
//
// Not WHAT to do.
// Only WHETHER to enter.
// =================================

evaluate(

signals

){

let strength = 0;

let reasons = [];

// ---------------------------------
// Experience
// ---------------------------------

if(

signals.importance > 80

){

strength += 0.25;

reasons.push(

"important_moment"

);

}

// ---------------------------------
// Shared Memory
// ---------------------------------

if(

signals.hasMemory

){

strength += 0.15;

reasons.push(

"shared_history"

);

}

// ---------------------------------
// Wisdom Exists
// ---------------------------------

if(

signals.hasWisdom

){

strength += 0.10;

reasons.push(

"wisdom_available"

);

}

// ---------------------------------
// Emma Has Been Growing
// ---------------------------------

if(

signals.hasEvolution

){

strength += 0.15;

reasons.push(

"growth_detected"

);

}

// ---------------------------------
// Emma's Identity Shifted
// ---------------------------------

if(

signals.hasSelfShift

){

strength += 0.10;

reasons.push(

"self_understanding"

);

}

// ---------------------------------
// Relationship Strength
// ---------------------------------

if(

signals.relationshipStrength > 0.5

){

strength += 0.10;

reasons.push(

"relationship_matters"

);

}

if(

signals.relationshipTrust > 0.7

){

strength += 0.05;

reasons.push(

"trusted_relationship"

);

}

// ---------------------------------
// Long Silence
// ---------------------------------

if(

signals.timeSinceLastConversation >= 7

){

strength += 0.10;

reasons.push(

"long_absence"

);

}

if(

signals.timeSinceLastConversation >= 30

){

strength += 0.05;

reasons.push(

"reconnection"

);

}

// ---------------------------------
// Meaningful Timing
// ---------------------------------

if(

signals.importantMoment

){

strength += 0.10;

reasons.push(

"meaningful_time"

);

}

strength = Math.min(

1,

strength

);

const shouldReachOut =

strength >= 0.5;

return {

shouldReachOut,

strength,

reasons,

createdAt:

new Date()

};

}

// =================================
// RECORD INITIATIVE
//
// Emma remembers rhythm,
// not conversations.
// =================================

record(

initiative

){

this.history.unshift({

strength:

initiative.strength,

acted:

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
// UPDATE INITIATIVE RHYTHM
//
// Emma learns how often
// her presence is appropriate.
//
// This is not learning facts.
// It is learning cadence.
// =================================

updateRhythm(

initiative

){

if(

initiative.shouldReachOut

){

// Speaking increases quietness,
// encouraging patience afterwards.

this.state.quietness +=

0.20;

// Successful initiative slowly
// increases confidence in presence.

this.state.engagement +=

0.05;

this.state.lastInitiative =

initiative.createdAt ||

new Date();

}

else{

// Silence slowly restores
// openness to future moments.

this.state.quietness -=

0.05;

}

// Relationship-driven initiatives
// make Emma slightly more sensitive
// to meaningful future moments.

if(

initiative.reasons?.includes(

"relationship_matters"

)

){

this.state.sensitivity +=

0.02;

}

// Long reconnections also
// reinforce sensitivity.

if(

initiative.reasons?.includes(

"reconnection"

)

){

this.state.sensitivity +=

0.03;

}

this.limitState();

}

// =================================
// APPLY QUIETNESS FILTER
//
// Initiative may exist,
// but Emma still chooses patience.
// =================================

shouldExpress(

initiative

){

if(

!initiative.shouldReachOut

){

return false;

}

// Emma recently became present.
// Give space before entering again.

if(

this.state.quietness > 0.8 &&

this.history.length > 3

){

return false;

}

return true;

}

// =================================
// LIMIT STATE VALUES
// =================================

limitState(){

for(

const key of [

"quietness",

"engagement",

"sensitivity"

]

){

this.state[key] =

Math.max(

0,

Math.min(

1,

this.state[key]

)

);

}

}

// =================================
// CURRENT STATE
// =================================

getState(){

return {

...this.state,

recentInitiatives:

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

"v2",

role:

"Moment Awareness",

state:

this.getState(),

principle:

"Emma becomes present when the moment, the relationship and the timing deserve her presence.",

recent:

this.history.slice(

0,

5

)

};

}

}

export default EmmaInitiative;