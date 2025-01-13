// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeFirestore, CACHE_SIZE_UNLIMITED } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAREG9tewS8LZr2OMs2evpmZSdTL6CHKmI",
  authDomain: "digipaybg.firebaseapp.com",
  projectId: "digipaybg",
  storageBucket: "digipaybg.appspot.com",
  messagingSenderId: "678133127128",
  appId: "1:678133127128:web:c6f5101ceb54e277f084ad",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
});
