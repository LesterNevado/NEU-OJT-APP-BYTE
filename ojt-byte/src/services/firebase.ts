// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOixNJvUWD5eBsy8WvRj1vhR11f8_nL2o",
  authDomain: "neu-ojt-app-byte.firebaseapp.com",
  projectId: "neu-ojt-app-byte",
  storageBucket: "neu-ojt-app-byte.firebasestorage.app",
  messagingSenderId: "208741179516",
  appId: "1:208741179516:web:8e816b1c3fe526a0e029f9",
  measurementId: "G-9YJ6S2WT7Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);