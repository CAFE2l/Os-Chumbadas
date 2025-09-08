// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkIkqapPkkTGc56APjdP58pjkaix8Sszg",
  authDomain: "oschumbadas.firebaseapp.com",
  projectId: "oschumbadas",
  storageBucket: "oschumbadas.firebasestorage.app",
  messagingSenderId: "656264343106",
  appId: "1:656264343106:web:a21b565be9dc54106a47db",
  measurementId: "G-RFSKPN7VY5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);