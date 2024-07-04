import { getApp, getApps, initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGESENDERID,
    appId: process.env.NEXT_FIREBASE_APPID,
    measurementId: process.env.NEXT_FIREBASE_MEASUREMENTID,
};
const firebaseapp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export default firebaseapp;
