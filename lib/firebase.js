import { initializeApp, getApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore/lite";

const firebaseConfig = {
    apiKey: process.env.NEXT_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_FIREBASE_PROJECTID,
    storageBucket: process.env.NEXT_FIREBASE_STORAGEBUCKET,
    messagingSenderId: process.env.NEXT_FIREBASE_MESSAGESENDERID,
    appId: process.env.NEXT_FIREBASE_APPID,
    measurementId: process.env.NEXT_FIREBASE_MEASUREMENTID,
};

let firebaseApp;

try {
    firebaseApp = getApp();
} catch (e) {
    firebaseApp = initializeApp(firebaseConfig);
}

const firestore = getFirestore(firebaseApp);

export default firestore;
