// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOGaB1RS0t7ixCkuqJtlxpIliJiPXIWI0",
  authDomain: "randomenu-e5e2d.firebaseapp.com",
  projectId: "randomenu-e5e2d",
  storageBucket: "randomenu-e5e2d.appspot.com",
  messagingSenderId: "770720775886",
  appId: "1:770720775886:web:e8669399eccd05132ada9f",
  measurementId: "G-3ES8F6ZH7F",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
// Initialize Firebase Products
export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
