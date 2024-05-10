// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB75Kwwpo1J7Ena5tfMWXRmPYL2kcdeqSk",
  authDomain: "caronas-4918d.firebaseapp.com",
  projectId: "caronas-4918d",
  storageBucket: "caronas-4918d.appspot.com",
  messagingSenderId: "683855380087",
  appId: "1:683855380087:web:bcae7fd12770491abdd072"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
