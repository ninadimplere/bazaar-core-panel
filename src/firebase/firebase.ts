import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCw7NbsKVVgzkehGzF8V-I3cfmQpyjVg6A",
  authDomain: "bazaar-backend-panel.firebaseapp.com",
  projectId: "bazaar-backend-panel",
  storageBucket: "bazaar-backend-panel.firebasestorage.app",
  messagingSenderId: "137756129546",
  appId: "1:137756129546:web:019ba827c63b4bd7e162f3",
  measurementId: "G-BJS28NE492",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
