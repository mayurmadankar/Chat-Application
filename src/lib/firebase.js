// Import the functions you need from the Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-897de.firebaseapp.com",
  projectId: "reactchat-897de",
  storageBucket: "reactchat-897de.firebasestorage.app",
  messagingSenderId: "973055116514",
  appId: "1:973055116514:web:706ce23ec775879d1d8abb",
  measurementId: "G-X5EFFES7VR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase services export
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage();
