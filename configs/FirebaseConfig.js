// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "anime-px.firebaseapp.com",
  projectId: "anime-px",
  storageBucket: "anime-px.appspot.com",
  messagingSenderId: "693612741676",
  appId: "1:693612741676:web:5fb52a39fede7e1ac7fd89",
  measurementId: "G-8MDGMYXPRF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);