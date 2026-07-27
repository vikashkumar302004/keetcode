import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCrUKf_lviTf6JTQrjlQjFF3DFwzARPMTs",
  authDomain: "keetcode-f7206.firebaseapp.com",
  projectId: "keetcode-f7206",
  storageBucket: "keetcode-f7206.firebasestorage.app",
  messagingSenderId: "825032418957",
  appId: "1:825032418957:web:c132a4df40c1c09117e4c4",
  measurementId: "G-QXX0K4814Q"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
