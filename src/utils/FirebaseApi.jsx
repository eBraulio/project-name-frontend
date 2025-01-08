import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC3UdBdWqiwNUb8KWyQXecunC0hEpPJnwA",
  authDomain: "spotify-project-ebr.firebaseapp.com",
  projectId: "spotify-project-ebr",
  storageBucket: "spotify-project-ebr.appspot.com",
  messagingSenderId: "64015018840",
  appId: "1:64015018840:web:1f4316adf5c2ba4688d32d",
  measurementId: "G-FW7P3Q1T8H",
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const auth = getAuth(firebaseApp);

export const loginWithGoogle = async () => {
  try {
    setPersistence(auth, browserLocalPersistence);
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error logging in with Google:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export { firebaseApp, analytics, auth };
