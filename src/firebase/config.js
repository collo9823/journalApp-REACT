// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAzbsRBBSHGgYshy8GzNfa7YFzY7__Y_qo",
  authDomain: "react-01-a0386.firebaseapp.com",
  projectId: "react-01-a0386",
  storageBucket: "react-01-a0386.appspot.com",
  messagingSenderId: "411251217847",
  appId: "1:411251217847:web:39ae760fdbad0a081a8432"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp)
export const FirebaseDB = getFirestore(FirebaseApp)