import { app } from "./firebase.js";
import { createUser } from "./firestore.js";

import {
    getAuth,
    GoogleAuthProvider,
    signInWithCredential,
    signOut,
    onAuthStateChanged
} from "firebase/auth";

export const auth = getAuth(app);

export async function signInWithGoogle() {

    console.log("Step 3 reached.");

    return new Promise((resolve, reject) => {

        chrome.identity.getAuthToken(
            { interactive: true },
            async (token) => {

                if (chrome.runtime.lastError) {

                    reject(chrome.runtime.lastError);
                    return;

                }

                console.log("Google Token:", token);

                try {

                    const credential =
                        GoogleAuthProvider.credential(null, token);

                   const userCredential =
    await signInWithCredential(auth, credential);

console.log("Creating Firestore user...");

await createUser(userCredential.user);

console.log("Firestore user created.");

resolve(userCredential.user);

                } catch (err) {

                    reject(err);

                }

            }
        );

    });

}

export async function logout() {

    await signOut(auth);

}

export function observeUser(callback) {

    return onAuthStateChanged(auth, callback);

}