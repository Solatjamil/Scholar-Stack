import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

/**
 * FIREBASE CONFIGURATION
 * ----------------------
 * The app previously bundled a firebase-applet-config.json from the original
 * AI Studio scaffold. That project's API key has since been revoked: calling
 * identitytoolkit with it returns API_KEY_INVALID, which surfaced in the UI as
 * the raw "Firebase: Error (auth/api-key-not-valid)" message on every sign-in.
 *
 * The old isRealFirebaseConfigured() only checked whether the key contained
 * the word "placeholder", so a dead-but-well-formed key counted as real. The
 * app therefore took the cloud path and hard-failed, even though a complete
 * local (offline) mode already existed and works without any backend. That
 * dead config file has been deleted so the stale credentials no longer ship.
 *
 * Deployments that want real cloud sync should supply their own project
 * through VITE_FIREBASE_* environment variables (set them in Vercel, or in a
 * local .env file). When they are absent the app runs in local mode, which is
 * fully functional - progress is kept in localStorage.
 */

const env = import.meta.env as Record<string, string | undefined>;

const envConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID,
  firestoreDatabaseId: env.VITE_FIREBASE_FIRESTORE_DATABASE_ID,
};

const firebaseConfig = {
  ...envConfig,
  firestoreDatabaseId: envConfig.firestoreDatabaseId || "(default)",
};

const looksUsable = (value?: string) =>
  Boolean(value && !value.toLowerCase().includes("placeholder"));

/**
 * True only when we hold credentials that can plausibly reach Firebase.
 * When false the app runs its local/simulated session mode instead of
 * throwing an unactionable auth error at the student.
 */
export const isRealFirebaseConfigured = () =>
  looksUsable(firebaseConfig.apiKey) && looksUsable(firebaseConfig.projectId);

/**
 * Firebase is only initialised when the config is usable. initializeApp with a
 * dead key succeeds silently and then fails later at call time, so skipping it
 * keeps the failure at one predictable place.
 */
const app = isRealFirebaseConfigured() ? initializeApp(firebaseConfig) : null;

export const db = app
  ? getFirestore(app, firebaseConfig.firestoreDatabaseId)
  : (null as unknown as ReturnType<typeof getFirestore>);

export const auth = app
  ? getAuth(app)
  : (null as unknown as ReturnType<typeof getAuth>);
