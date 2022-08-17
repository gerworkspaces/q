
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAdjaAYrEOpdvLbxuapV9KEbZzw55Oa1O4",
  authDomain: "myebook-eca72.firebaseapp.com",
  projectId: "myebook-eca72",
  storageBucket: "myebook-eca72.appspot.com",
  messagingSenderId: "1047452063420",
  appId: "1:1047452063420:web:1bfb2af1f2d830cd4062b9",
  measurementId: "G-327L4K1WG0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app)
export default fireDB 