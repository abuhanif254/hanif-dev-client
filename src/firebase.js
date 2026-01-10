// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBLtRHG-xBXcE-5rCHObyIN2FD9esgXxRw",
    authDomain: "hanifdev-ad82c.firebaseapp.com",
    projectId: "hanifdev-ad82c",
    storageBucket: "hanifdev-ad82c.firebasestorage.app",
    messagingSenderId: "543322188442",
    appId: "1:543322188442:web:e1c757c8081119d1f9cd23"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();

export { auth, storage, googleProvider };
