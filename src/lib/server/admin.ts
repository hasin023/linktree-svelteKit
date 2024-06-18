import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import {
	FB_PROJECT_ID,
	FB_CLIENT_EMAIL,
	FB_PRIVATE_KEY,
} from "$env/static/private";

import pkg from "firebase-admin";

try {
	pkg.initializeApp({
		credential: pkg.credential.cert({
			projectId: FB_PROJECT_ID,
			clientEmail: FB_CLIENT_EMAIL,
			privateKey: FB_PRIVATE_KEY,
		}),
	});
} catch (error: any) {
	if (!/already exists/u.test(error.message)) {
		console.log("Firebase Admin Error: ", error.message);
	}
}

export const adminDB = getFirestore();
export const adminAuth = getAuth();
