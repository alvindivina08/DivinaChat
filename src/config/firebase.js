import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDkERNuXGi3L1pwH-W-Bkk8YuJLQrNMUaA",
  authDomain: "alvin-project-b084f-102c8.firebaseapp.com",
  projectId: "alvin-project-b084f",
  storageBucket: "alvin-project-b084f.appspot.com",
  messagingSenderId: "880277417860",
  appId: "1:880277417860:web:8f7697b95bddfd572337d1",
  measurementId: "G-352L46KK0J",
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);