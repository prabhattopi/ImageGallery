// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjBMrYBgN8y2gYgLOgpm2JXukUJTypek0",
  authDomain: "image-gallery-8cf2b.firebaseapp.com",
  projectId: "image-gallery-8cf2b",
  storageBucket: "image-gallery-8cf2b.appspot.com",
  messagingSenderId: "979246217515",
  appId: "1:979246217515:web:d2282de9ce04d6b3742d6e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const storage=getStorage(app)
const db=getFirestore(app)
export {auth,storage,db};


