import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCU4Yum_bBNx6CsobS3Yn6qg6rNsc-t72U",
  authDomain: "smartstudentdashboard.firebaseapp.com",
  projectId: "smartstudentdashboard",
  storageBucket: "smartstudentdashboard.firebasestorage.app",
  messagingSenderId: "481102166112",
  appId: "1:481102166112:web:2da4b2ab904c44f61aab05"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// Auto anonymous login with proper error handling
signInAnonymously(auth).catch((error) => {
  console.error("Anonymous sign-in failed:", error);
});

// Export auth state observer
export const authStateObserver = (callback) => {
  return onAuthStateChanged(auth, callback);
};
