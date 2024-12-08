// Import necessary Firebase Admin functions
import { getApps, getApp, App, initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// The NEXT_PUBLIC before a env var allow access to client side

// Type the serviceKey as ServiceAccount
const serviceAccountKey = JSON.parse(process.env.FIREBASE_ADMIN_KEY as string) as ServiceAccount;

let app: App;

if (getApps().length === 0) {
  app = initializeApp({
    credential: cert(serviceAccountKey)
  });
} else {
  app = getApp();
}

const adminDb = getFirestore(app);

export { app as adminApp, adminDb };