// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQGWHxt2_paf9CnWEiotS6yhYWhbgX1h4",
  authDomain: "email-password-auth-8f936.firebaseapp.com",
  projectId: "email-password-auth-8f936",
  storageBucket: "email-password-auth-8f936.firebasestorage.app",
  messagingSenderId: "488031911811",
  appId: "1:488031911811:web:39d9200031337be00dc0b6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);