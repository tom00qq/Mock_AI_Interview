// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.FIREBASE_WEB_APIKEY,
  authDomain: "prepwise-9456d.firebaseapp.com",
  projectId: "prepwise-9456d",
  storageBucket: "prepwise-9456d.firebasestorage.app",
  messagingSenderId: "49160784653",
  appId: "1:49160784653:web:fde01e042bf0e4a337fe44",
  measurementId: "G-XCEWXQ22F8",
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
