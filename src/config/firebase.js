// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBW3ER5OoyaAVBVBcHILgkwjRbX6IRAjIM",
  authDomain: "gallery-bcaba.firebaseapp.com",
  projectId: "gallery-bcaba",
  storageBucket: "gallery-bcaba.appspot.com",
  messagingSenderId: "371839996594",
  appId: "1:371839996594:web:23a4ac2a667a58df5b6fab",
  measurementId: "G-3NX4KH28MD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
