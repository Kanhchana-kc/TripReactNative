// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBGJgtKO8kRwdkC9kM9gwcORKZGSW_2kn4",
  authDomain: "tripplanning-7aa5f.firebaseapp.com",
  projectId: "tripplanning-7aa5f",
  storageBucket: "tripplanning-7aa5f.firebasestorage.app",
  messagingSenderId: "387521866583",
  appId: "1:387521866583:web:3fa6aee552369466b66c12",
  measurementId: "G-2Q5W3V2486"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };