// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp} from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByDQV69AU6ET1_Jy2G_9mXlJDCeBUH3To",
  authDomain: "envigram-app.firebaseapp.com",
  projectId: "envigram-app",
  storageBucket: "envigram-app.appspot.com",
  messagingSenderId: "20397532744",
  appId: "1:20397532744:web:45faa42086376d9fc0da7d",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();
const analytics = getAnalytics(app);

export { app, db, storage };