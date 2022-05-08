import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBJ-xfRlSmsASU0nE8aFH7Si5TxXFBSN2k",
  authDomain: "otus-chat.firebaseapp.com",
  databaseURL:
    "https://otus-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "otus-chat",
  storageBucket: "otus-chat.appspot.com",
  messagingSenderId: "316002080897",
  appId: "1:316002080897:web:3f423ff41779d93e291580",
  measurementId: "G-YPQZVK5TSZ",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const database = getDatabase(app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log("logged in");
  }
  console.log("no user");
});
