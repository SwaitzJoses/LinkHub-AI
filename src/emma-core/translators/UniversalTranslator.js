// UniversalTranslator.js
// Converts outside systems into Emma's common language
//
// External language
//        ↓
// Universal Translator
//        ↓
// Emma language
//
// RULE:
// Translator understands structure.
// Emma creates intelligence.


class UniversalTranslator {


constructor(){


console.log(
"🌎 Universal Translator ready"
);


}









// ==============================
// Translate any platform event
// ==============================


async translate(input){



console.log(
"🌎 Translating:",
input
);





const payload =

input.payload ||

input.data ||

input.raw ||

{};









// ==============================
// EXTRACT MESSAGE
// ==============================


const message =


input.message ||

input.text ||

input.description ||


// Gmail

payload.snippet ||

payload.subject ||

payload.body ||


// nested

payload.message ||

payload.text ||

payload.data?.message ||

payload.data?.text ||

"";










// ==============================
// BUSINESS ID
// ==============================


const businessId =


input.businessId ||

payload.businessId ||

payload.raw?.businessId ||

input.business?.id ||

"unknown";










// ==============================
// SOURCE
// ==============================


const source =


input.source ||

input.platform ||

payload.source ||

"UNKNOWN";










// ==============================
// EVENT TYPE
// ==============================


let eventType =


input.eventType ||

input.type ||

input.action ||

payload.type ||

"ACTIVITY";










// ==============================
// SIMPLE INTENT EXTRACTION
// (translation only)
// ==============================


let intent =
"GENERAL_ACTIVITY";



let importance =
"normal";



const lowerMessage =

message.toLowerCase();





if(

lowerMessage.includes("price") ||

lowerMessage.includes("cost") ||

lowerMessage.includes("how much") ||

lowerMessage.includes("buy") ||

lowerMessage.includes("interested") ||

lowerMessage.includes("service")

){



intent =
"CUSTOMER_INQUIRY";



importance =
"high";



eventType =
"CUSTOMER_SIGNAL";



}







if(

source === "gmail"

){


eventType =

intent === "CUSTOMER_INQUIRY"

?

"CUSTOMER_EMAIL"

:

"EMAIL_RECEIVED";


}












// ==============================
// EMMA LANGUAGE
// ==============================


const translated = {




// identity

businessId,





// source

source,






// event

eventType,

type:eventType,

intent,

importance,






// human meaning

message,


description:

message || "External activity detected",






// affected object

object:

input.object ||

input.entity ||

source,







// preserve everything

data:{


...payload,


businessId,


message,


intent,


importance,


originalType:

input.type


},







raw:

input,









// Emma understanding seed

meaning:{



summary:

message ||

`${source} activity received`,



possibleMeaning:

intent,



requiresAttention:

importance === "high"



},









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