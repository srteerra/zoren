// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhflGL_NuD4BdIrU3m6jmUshWaiMUwD3A",
  authDomain: "zoren-f5600.firebaseapp.com",
  projectId: "zoren-f5600",
  storageBucket: "zoren-f5600.appspot.com",
  messagingSenderId: "241430747099",
  appId: "1:241430747099:web:f2c2b9780a1f0b5dc9f9fe",
  measurementId: "G-Q1WV0TYK9Y",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
