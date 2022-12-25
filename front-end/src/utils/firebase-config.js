import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBjowoV6E51oSrJESWItDXkoPffvgw3_k",
    authDomain: "netflix-clone-75b47.firebaseapp.com",
    projectId: "netflix-clone-75b47",
    storageBucket: "netflix-clone-75b47.appspot.com",
    messagingSenderId: "317372244172",
    appId: "1:317372244172:web:e6cfbd579b7798b20fe269",
    measurementId: "G-93RP6NE6CJ"
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
