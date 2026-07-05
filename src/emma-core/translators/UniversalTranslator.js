// UniversalTranslator.js
// Converts outside world events into Emma's common language
// Makes all connectors speak the same format


class UniversalTranslator {


constructor(){


console.log(
"🌎 Universal Translator ready"
);


}









// ==============================
// Translate any platform event
// ==============================


async translate(
input
){



console.log(
"🌎 Translating:",
input
);





return {




// company identity
// never lose this


businessId:

input.businessId

||

input.data?.businessId

||

input.data?.raw?.businessId

||

input.raw?.businessId,









// where did this come from?


source:

input.source

||

"UNKNOWN",









// event category


eventType:

input.eventType

||

input.type

||

"BUSINESS_ACTIVITY",









type:

input.type

||

input.eventType

||

"BUSINESS_ACTIVITY",









// what changed?


object:

input.object

||

"general",









// keep original information


data:{



...(input.data || {}),



businessId:

input.businessId

||

input.data?.businessId



},







raw:

input,








// Emma understanding


meaning:

"Business event translated for Emma",








// timing


time:

input.time

||

input.createdAt

||

new Date(),








translatedAt:

new Date()



};



}





}




export default UniversalTranslator;