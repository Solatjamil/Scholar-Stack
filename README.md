# ScholarStack

A study companion for Pakistani **9th, 10th (Matric)** and **11th, 12th (Intermediate/HSSC)** students, covering Punjab boards, Sindh, KPK, Balochistan, FBISE (Federal), AJK and GB.

**Features:** syllabus/chapter progress tracking, chapter-wise study desk, AI mock board papers & paper prediction, student self-evaluation, official BISE datesheet lookup, and curated textbook resources.

It ships as **one codebase that runs as a web app, an installable PWA, and a native Android app.**

---

## 1. Web app (development)

```bash
npm install
npm run dev            # Express + Vite on http://localhost:3000
```

Copy `.env.example` to `.env` and set `GEMINI_API_KEY` to enable the AI predictor
(without it the server runs in simulation mode).

### Production

```bash
npm run build          # builds the client (dist/) + the server (dist/server.cjs)
npm start              # serves the whole app on port 3000
```

---

## 2. PWA (installable on any phone, no Play Store needed)

The production build emits a service worker (`dist/sw.js`) and a web manifest, so ScholarStack:

- installs to the Android/iOS home screen ("Add to Home Screen") and launches full-screen,
- **works offline** — the app shell, syllabus UI and previously fetched API responses are cached, which matters a lot on patchy mobile data,
- auto-updates whenever you redeploy.

Requirement: serve `dist/` over **HTTPS** (service workers won't register on plain HTTP, except on `localhost`).

---

## 3. Android app (Capacitor)

The native project already exists in `android/`.

### Prerequisites
- **JDK 21**
- **Android Studio** (with Android SDK, platform 35, build-tools)

### Build

```bash
# 1. Point the app at your deployed backend — REQUIRED for Android.
#    In .env:  VITE_API_BASE_URL=https://your-deployed-scholarstack.example.com

npm run android:sync     # builds the web bundle and copies it into android/
npm run android:open     # opens Android Studio
npm run android:apk      # or CLI: debug APK -> android/app/build/outputs/apk/debug/
npm run android:bundle   # signed release .aab for Google Play
```

> **Why `VITE_API_BASE_URL` matters:** inside the Android WebView the page is served from
> `https://localhost`, so a relative `/api/predict-exam` would hit the WebView itself, not your
> server. `src/apiBase.ts` detects the native runtime and rewrites API calls to the absolute URL.
> Leave the variable empty for the web build so it keeps using same-origin requests.

### Release signing

Create `android/key.properties` (already gitignored):

```properties
storeFile=../scholarstack.jks
storePassword=YOUR_STORE_PASSWORD
keyAlias=scholarstack
keyPassword=YOUR_KEY_PASSWORD
```

`android/app/build.gradle` picks it up automatically for `assembleRelease` / `bundleRelease`.
Without the file, debug builds still work.

### App identity

| Item | Value |
| --- | --- |
| Application ID | `pk.scholarstack.app` |
| Min SDK | 23 (Android 6.0) |
| Target SDK | 35 (Android 15) |
| Version | 1.0.0 |

---

## 4. Firebase

Auth + Firestore sync are optional. Fill in `src/firebase-applet-config.json` with your project's
config; the app detects placeholder values and falls back to `localStorage` persistence.

For **Google sign-in on Android**, add your app's SHA-1/SHA-256 fingerprints in the Firebase
console and add `localhost` to the Authorized Domains list.

---

## 5. Mobile compatibility notes

- Safe-area insets are respected (notches, gesture bars) via `env(safe-area-inset-*)`.
- All interactive controls are at least **44×44 px** on viewports ≤768 px.
- Form inputs use 16px text to stop Android/iOS auto-zoom on focus.
- Urdu content renders in **Noto Nastaliq Urdu** with RTL direction.
- The Android hardware **back button** navigates history, then minimises the app.
- Status bar and splash screen are branded (`#4F46E5`).
- The bundle is code-split (React / Firebase / charts / motion) for faster boot on low-end phones.
