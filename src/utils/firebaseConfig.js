import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { fireBaseKeys } from "../../env";

const firebaseConfig = {
    apiKey: fireBaseKeys.API_KEY,
    authDomain: fireBaseKeys.AUTH_DOMAIN,
    projectId: fireBaseKeys.PROJECT_ID,
    storageBucket: fireBaseKeys.STORAGE_BUCKET,
    messagingSenderId: fireBaseKeys.MESSAGING_SENDER_ID,
    appId: fireBaseKeys.APP_ID
};

const app = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app)

export { auth, app, googleProvider }