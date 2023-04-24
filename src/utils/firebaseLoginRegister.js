import { googleProvider } from "./firebaseConfig";
import { signInWithPopup, getAuth } from "firebase/auth";

const auth = getAuth();

const registerWithFirebase = async () => {
    const responseFirebase = await signInWithPopup(auth, googleProvider);
    return responseFirebase;
};

const loginWithFirebase = async () => {
    const responseFirebase = await signInWithPopup(auth, googleProvider);
    return responseFirebase;
};

export { loginWithFirebase, registerWithFirebase }