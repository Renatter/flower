// Import the functions you need from the SDKs you need
import {
    initializeApp
} from "firebase/app";
import {
    getAuth
} from "firebase/auth";
import {
    getFirestore
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
    getStorage
} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDgSd8VRTtvit6rT2VF9fJ4HKEVM9td0_0",

    authDomain: "flower-ffa30.firebaseapp.com",

    databaseURL: "https://flower-ffa30-default-rtdb.firebaseio.com",

    projectId: "flower-ffa30",

    storageBucket: "flower-ffa30.appspot.com",

    messagingSenderId: "447633067527",

    appId: "1:447633067527:web:d285190ffaabe22912e4a2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//initialize firebase auth
const auth = getAuth(app);
const db = getFirestore(app)
const storage = getStorage(app);
export {
    auth,
    db,
    storage
}