const { setGlobalOptions } = require("firebase-functions/v2");
const { onCall, HttpsError } = require("firebase-functions/v2/https");
const { defineSecret } = require("firebase-functions/params");

const admin = require("firebase-admin");
const OpenAI = require("openai");

admin.initializeApp();
const db = admin.firestore();

setGlobalOptions({ maxInstances: 10 });

const OPENAI_API_KEY = defineSecret("OPENAI_API_KEY");

exports.test = onCall(async (request) => {
  return {
    success: true,
    message: "Firebase Functions is working!",
    uid: request.auth?.uid || null,
  };
});

exports.analyze = onCall({ secrets: [OPENAI_API_KEY] }, async (request) => {
  if (!request.auth) {
    throw new HttpsError("unauthenticated", "Please sign in.");
  }

  const uid = request.auth.uid;
  const userRef = db.collection("users").doc(uid);
  const snap = await userRef.get();

  if (!snap.exists) {
    throw new HttpsError("not-found", "User not found.");
  }

  const user = snap.data();
console.log("UID:", uid);
console.log("Firestore user:", user);
console.log("analysesRemaining:", user.analysesRemaining);
 if ((user.analysesRemaining ?? 0) <= 0) {
    throw new HttpsError(
        "resource-exhausted",
        "No analyses remaining."
    );
}

  const messages = request.data?.messages;

if (!messages || !Array.isArray(messages)) {
  throw new HttpsError(
    "invalid-argument",
    "Messages are required."
  );
}

  const client = new OpenAI({
    apiKey: OPENAI_API_KEY.value(),
  });
const payload = JSON.stringify(messages);

console.log("================================");
console.log("Messages:", messages.length);
console.log("Payload characters:", payload.length);
console.log("Payload KB:", (payload.length / 1024).toFixed(2));
console.log("================================");

console.log("FIRST MESSAGE");
console.log(messages[0]);

console.log("LAST MESSAGE");
console.log(messages[messages.length - 1]);

let biggest = "";

for (const m of messages) {
    if ((m.content || "").length > biggest.length) {
        biggest = m.content;
    }
}

console.log("Largest message chars:", biggest.length);
console.log(biggest.substring(0, 1000));


// function buildTranscript(messages) {

//     let transcript = "";

//     for (const checkpoint of messages) {

//         const msgs = checkpoint.conversation?.messages || [];

//         for (const m of msgs) {

//             const role =
//                 m.role === "user"
//                     ? "USER"
//                     : "ASSISTANT";

//             let text = m.content || "";

//             // Compress whitespace
//             text = text.replace(/\s+/g, " ").trim();

//             transcript += `${role}: ${text}\n\n`;

//         }

//     }

//     return transcript;

// }

// console.log(messages);

// const transcript = buildTranscript(messages);

// console.log("================================");
// console.log("Transcript characters:", transcript.length);
// console.log("Transcript KB:", (transcript.length / 1024).toFixed(2));
// console.log("================================");

  const completion = await client.chat.completions.create({
    model: "gpt-5-nano",
    
    response_format: { type: "json_object" },
    // messages: [
    //   {
    //     role: "system",
    //     content: "You are the Evoloz Intelligence Engine. Merge checkpoints into one intelligence state. Return ONLY valid JSON with evolvedIntelligence and report."
    //   },
    //   {
    //     role: "user",
    //     content: transcript
    //   }
    // ]
    messages
  });



// 👇 Put these AFTER the API call
console.log("Model used:", completion.model);
console.log("Usage:", completion.usage);

console.log({
    promptTokens: completion.usage.prompt_tokens,
    completionTokens: completion.usage.completion_tokens,
    totalTokens: completion.usage.total_tokens
});

return {
    choices: completion.choices
};
});
