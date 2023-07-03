import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFireStore } from "firebase/firestore";

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

const db = getFireStore();

export { auth, db };
