// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCcJsYFtAxZqA91c7prReozi0-z6vPVnAo",
    authDomain: "super-tic-tac-toe-f7b62.firebaseapp.com",
    projectId: "super-tic-tac-toe-f7b62",
    storageBucket: "super-tic-tac-toe-f7b62.appspot.com",
    messagingSenderId: "907014278823",
    appId: "1:907014278823:web:3f3eef84ee1fbb04d65582",
    measurementId: "G-JH0E5E1J4K"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);