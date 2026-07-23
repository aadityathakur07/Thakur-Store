import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDQLoNjuW5L1v_r4JZQSMyGI7hGi2yYuS8",
  authDomain: "thakur-store.firebaseapp.com",
  projectId: "thakur-store",
  storageBucket: "thakur-store.firebasestorage.app",
  messagingSenderId: "527681118144",
  appId: "1:527681118144:web:0227cc0a6b9460713b3225"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };