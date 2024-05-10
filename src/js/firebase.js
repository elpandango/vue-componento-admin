import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyC1TN6HDaINvqh6zrV4RdkxFoJCI4IBOQc",
  authDomain: "noteballs-570fc.firebaseapp.com",
  projectId: "noteballs-570fc",
  storageBucket: "noteballs-570fc.appspot.com",
  messagingSenderId: "925523006507",
  appId: "1:925523006507:web:e858d34027d445dab0466e"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {
  db,
  auth
}
