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

  if (user.plan !== "pro" && (user.evolvesRemaining ?? 0) <= 0) {
    throw new HttpsError("resource-exhausted", "No analyses remaining.");
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

  const completion = await client.chat.completions.create({
    model: "gpt-5-mini",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: "You are the Evoloz Intelligence Engine. Merge checkpoints into one intelligence state. Return ONLY valid JSON with evolvedIntelligence and report."
      },
      {
        role: "user",
        content: JSON.stringify(messages)
      }
    ]
  });

return completion;
});
