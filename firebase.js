import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCCuTnzF9UAdlDd0TvuXe_vN3f9i8NmNeI",
  authDomain: "reservation-project-mobile.firebaseapp.com",
  projectId: "reservation-project-mobile",
  storageBucket: "reservation-project-mobile.appspot.com",
  messagingSenderId: "133811529827",
  appId: "1:133811529827:web:7232cce044e65e129b7056",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);
const db = getFirestore();

export { auth, storage, db };
