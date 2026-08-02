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

// =====================================
// CAPTURE
// =====================================

export async function decreaseCapture() {

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

    if ((userData.capturesRemaining ?? 0) <= 0) {
        return false;
    }

    await updateDoc(userRef, {
        capturesRemaining: increment(-1)
    });

    return true;
}

// =====================================
// ANALYZE
// =====================================

export async function decreaseAnalysis() {

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

    if ((userData.analysesRemaining ?? 0) <= 0) {
        return false;
    }

    await updateDoc(userRef, {
        analysesRemaining: increment(-1)
    });

    return true;
}