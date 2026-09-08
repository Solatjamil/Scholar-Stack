/**
 * Resolves API endpoints for both the web app and the Android (Capacitor) build.
 *
 * Web  -> relative path, served by the same Express origin.
 * Android/iOS -> absolute URL of the deployed backend, because the WebView is
 *                served from capacitor://localhost / https://localhost and a
 *                relative "/api/..." would never reach your server.
 *
 * Set VITE_API_BASE_URL (e.g. https://scholarstack.example.com) before running
 * `npm run android:sync` so the packaged app talks to your live backend.
 */

const configuredBase = (import.meta.env?.VITE_API_BASE_URL ?? "").replace(/\/$/, "");

export const isNativeApp = (): boolean => {
  if (typeof window === "undefined") return false;
  const w = window as any;
  return Boolean(w.Capacitor?.isNativePlatform?.() ?? w.Capacitor?.isNative);
};

export const apiUrl = (path: string): string => {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (isNativeApp() && configuredBase) return `${configuredBase}${clean}`;
  if (configuredBase && !isNativeApp() && import.meta.env?.PROD) return `${configuredBase}${clean}`;
  return clean;
};

export default apiUrl;
