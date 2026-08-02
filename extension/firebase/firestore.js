import { app } from "./firebase.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    serverTimestamp
} from "firebase/firestore";

export const db = getFirestore(app);

export async function createUser(user) {

    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    // Existing user
    if (snapshot.exists()) {

        await setDoc(
            userRef,
            {
                lastLogin: serverTimestamp()
            },
            { merge: true }
        );

        return;

    }

    // New user
    await setDoc(userRef, {

        uid: user.uid,

        name: user.displayName,

        email: user.email,

        photoURL: user.photoURL,

        // -----------------------------
        // Plan
        // -----------------------------
        plan: "free",

        // -----------------------------
        // Usage Limits
        // -----------------------------
        capturesRemaining: 10,

        analysesRemaining: 5,

        // -----------------------------
        // Subscription
        // -----------------------------
        subscription: {
            status: "inactive",
            provider: null
        },

        // -----------------------------
        // Misc
        // -----------------------------
        status: "active",

        provider: "google",

        workspaceCount: 0,

        checkpointCount: 0,

        joinedAt: serverTimestamp(),

        lastLogin: serverTimestamp()

    });

}