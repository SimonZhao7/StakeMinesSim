// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDBKrAvJZp_UW1v7qZU4Hom_pAUrM8NM5Y",
  authDomain: "stakes-mines.firebaseapp.com",
  projectId: "stakes-mines",
  storageBucket: "stakes-mines.appspot.com",
  messagingSenderId: "693309086955",
  appId: "1:693309086955:web:c4b843e3ca8c69bfe2b2ae",
  measurementId: "G-ZHH8TYXZ01"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth }