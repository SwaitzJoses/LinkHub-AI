import { auth } from "./auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    updateDoc,
    increment
} from "firebase/firestore";

const db = getFirestore();

export async function getCurrentUserData() {

    const user = auth.currentUser;

    if (!user) {

        throw new Error("No authenticated user.");

    }

    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {

        throw new Error("User document not found.");

    }

    return snapshot.data();

}

export async function decreaseEvolve() {

    console.trace("decreaseEvolve called");

    console.log("🔥 decreaseEvolve called");

    const user = auth.currentUser;

    if (!user) {

        throw new Error("No authenticated user.");

    }

    const userRef = doc(db, "users", user.uid);

    const snapshot = await getDoc(userRef);

    if (!snapshot.exists()) {

        throw new Error("User document not found.");

    }

    const userData = snapshot.data();

    // Pro users have unlimited Evolves
    if (userData.plan === "pro") {

        return true;

    }

    // No Evolves remaining
    if (userData.evolvesRemaining <= 0) {

        return false;

    }

    await updateDoc(userRef, {

        evolvesRemaining: increment(-1)

    });

    return true;

}