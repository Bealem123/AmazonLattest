import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq4mrpcTK895bkMkI_HSWt5CW0eoI7LX4",
  authDomain: "e-clone-37c24.firebaseapp.com",
  projectId: "e-clone-37c24",
  storageBucket: "e-clone-37c24.appspot.com",
  messagingSenderId: "56537755738",
  appId: "1:56537755738:web:74397e4addb240682ba863",
  measurementId: "G-SPKJNS70WD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Export authentication and Firestore services
export const auth = getAuth(app);
export const db = getFirestore(app);
