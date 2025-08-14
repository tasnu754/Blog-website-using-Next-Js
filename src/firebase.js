// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDz8Cjt2gZR-ScMGX3VKQr1RPqNfM1RXzk",
  authDomain: "blog-website-using-nextjs.firebaseapp.com",
  projectId: "blog-website-using-nextjs",
  storageBucket: "blog-website-using-nextjs.firebasestorage.app",
  messagingSenderId: "213437269615",
  appId: "1:213437269615:web:68fa384ed3a7863aff2f9a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
