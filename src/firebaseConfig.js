// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjoqFEEXSEqF-LhUle1YmBjvNScsfEScg",
  authDomain: "fitness-app-b7c8b.firebaseapp.com",
  projectId: "fitness-app-b7c8b",
  storageBucket: "fitness-app-b7c8b.firebasestorage.app",
  messagingSenderId: "922125789105",
  appId: "1:922125789105:web:815277bfef5883fb5a3f90",
  measurementId: "G-4PVY49D1Q2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);