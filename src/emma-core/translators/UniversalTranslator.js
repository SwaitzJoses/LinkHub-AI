// UniversalTranslator.js
// Converts outside systems into Emma's common language
//
// RULE:
//
// Translator understands structure.
// Emma creates intelligence.
//
// Connector sees.
// Translator converts.
// Emma thinks.



class UniversalTranslator {



constructor(){


console.log(
"🌎 Universal Translator ready"
);


}









// ==============================
// TRANSLATE ANY WORLD SIGNAL
// ==============================


async translate(input = {}){



console.log(
"🌎 Translating:",
input
);





// ==============================
// RAW PAYLOAD
// ==============================


const payload =

input.payload ||

input.data ||

input.raw ||

{};










// ==============================
// EXTRACT MESSAGE
// ==============================
//
// DO NOT judge.
// Only collect human words.
//
// ==============================


const message =

[


// direct

input.message,

input.text,

input.description,



// GmailConnector format ⭐

payload.content?.subject,

payload.content?.message,

payload.content?.snippet,



// old Gmail formats

payload.subject,

payload.body,

payload.snippet,



// generic formats

payload.message,

payload.text,


// nested

payload.data?.message,

payload.data?.text,

payload.data?.summary


]

.filter(Boolean)

.join(" ");










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
// LIGHT STRUCTURAL LABEL
//
// Not thinking.
// Only routing.
//
// ==============================


let intent =

"GENERAL_ACTIVITY";



let importance =

"normal";




const lowerMessage =

message.toLowerCase();







if(

lowerMessage.includes("price") ||

lowerMessage.includes("pricing") ||

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


}










// ==============================
// SOURCE NORMALIZATION
// ==============================


if(

source === "gmail"

){


eventType =

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


type:

eventType,



intent,



importance,








// human readable signal

message,



description:

message ||

"External activity detected",








// people

person:

payload.person ||

null,



people:

payload.people ||

[],









// original object

object:

input.object ||

input.entity ||

source,









// keep everything

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









// structural hint only

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

new Date()
.toISOString(),







translatedAt:


new Date()
.toISOString()



};









console.log(
"🌎 Translation complete:",
translated
);




return translated;



}




}





export default UniversalTranslator;