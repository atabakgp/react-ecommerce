// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKX8laUUmx1DYSUFfazMN8wO7vTzOpAsc",
  authDomain: "atabak-project.firebaseapp.com",
  projectId: "atabak-project",
  storageBucket: "atabak-project.firebasestorage.app",
  messagingSenderId: "619012749564",
  appId: "1:619012749564:web:c896f98f6b01533891ff79",
  measurementId: "G-6BZ4SRCVPL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);