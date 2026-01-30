// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBR8qcgRU3cMMZukrVT8hbpJMz8wZr3LEc",
  authDomain: "waste-wise-backend-35f9f.firebaseapp.com",
  projectId: "waste-wise-backend-35f9f",
  storageBucket: "waste-wise-backend-35f9f.firebasestorage.app",
  messagingSenderId: "320522411617",
  appId: "1:320522411617:web:27558aef407e996ded1420",
  measurementId: "G-VHBE2FFNHN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);