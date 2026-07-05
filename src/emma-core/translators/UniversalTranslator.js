// UniversalTranslator.js
// Converts outside systems into Emma's common language
// Preserves meaning so Emma never loses context


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





const message =

input.message ||

input.text ||

input.description ||

input.data?.message ||

input.data?.text ||

input.raw?.message ||

"";








const businessId =

input.businessId ||

input.business?.id ||

input.data?.businessId ||

input.data?.raw?.businessId ||

input.raw?.businessId ||

"unknown";








const eventType =

input.eventType ||

input.type ||

input.action ||

input.data?.type ||

"BUSINESS_ACTIVITY";









const translated = {




// ==============================
// Identity
// ==============================


businessId,




// ==============================
// Source system
// ==============================


source:

input.source ||

input.platform ||

"UNKNOWN",







// ==============================
// Event type
// ==============================


eventType,



type:

eventType,








// ==============================
// Natural meaning
// IMPORTANT FOR OBSERVER
// ==============================


message,



description:

input.description ||

message,








// ==============================
// Object affected
// ==============================


object:

input.object ||

input.entity ||

"general",








// ==============================
// Preserve ALL DATA
// ==============================


data:{



...(input.data || {}),



businessId,



message,



originalType:

input.type



},









raw:

input,









// ==============================
// Context for Emma
// ==============================


meaning:

message ||

"Business event translated for Emma",









// ==============================
// Time
// ==============================


time:

input.time ||

input.createdAt ||

new Date(),






translatedAt:

new Date()



};








console.log(
"🌎 Translation complete:",
translated
);





return translated;



}





}




export default UniversalTranslator;