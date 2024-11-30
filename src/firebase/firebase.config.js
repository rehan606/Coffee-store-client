// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQHG4kuAELh9VC-lRjv5Yxvp7oBE5l69M",
  authDomain: "espresso-emporium-687c8.firebaseapp.com",
  projectId: "espresso-emporium-687c8",
  storageBucket: "espresso-emporium-687c8.firebasestorage.app",
  messagingSenderId: "181627581515",
  appId: "1:181627581515:web:6f6e76e8ffe752c95609ce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);