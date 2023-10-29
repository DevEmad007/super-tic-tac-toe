// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCcJsYFtAxZqA91c7prReozi0-z6vPVnAo",
    authDomain: "super-tic-tac-toe-f7b62.firebaseapp.com",
    projectId: "super-tic-tac-toe-f7b62",
    storageBucket: "super-tic-tac-toe-f7b62.appspot.com",
    messagingSenderId: "907014278823",
    appId: "1:907014278823:web:3f3eef84ee1fbb04d65582",
    measurementId: "G-JH0E5E1J4K",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);