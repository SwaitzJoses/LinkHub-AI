import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD6z5g1l-OpskzYHm8aYnyVmFtA5m9TlY0",
  authDomain: "evoloz.firebaseapp.com",
  projectId: "evoloz",
  storageBucket: "evoloz.firebasestorage.app",
  messagingSenderId: "191930401350",
  appId: "1:191930401350:web:ab948ed42c1d9167bfc047"
};

export const app = initializeApp(firebaseConfig);