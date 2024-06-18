import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
	apiKey: "AIzaSyBElSKzQPR-I1uuFfulr0BFOHLOxT-SQbg",
	authDomain: "linktree-sveltekit-4a1e6.firebaseapp.com",
	projectId: "linktree-sveltekit-4a1e6",
	storageBucket: "linktree-sveltekit-4a1e6.appspot.com",
	messagingSenderId: "432655072317",
	appId: "1:432655072317:web:6f4e8f1f8a2e2f48683e54",
};

// Initialized Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();
