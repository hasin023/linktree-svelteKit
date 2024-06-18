import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { writable } from "svelte/store";

// Change this to your firebase project configuration
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

/**
 *
 * @returns A store with the currently singed in firebase user
 *
 */
const userStore = () => {
	let unsubscribe: () => void;

	if (!auth || !globalThis.window) {
		console.log("Auth is not initialized or not in browser");
		const { subscribe } = writable<User | null>(null);

		return { subscribe };
	}

	const { subscribe } = writable(auth?.currentUser ?? null, (set) => {
		unsubscribe = onAuthStateChanged(auth, (user) => {
			set(user);
		});

		return () => unsubscribe();
	});

	return { subscribe };
};

export const user = userStore();
