/**
 * Service worker registration with active update checking.
 *
 * WHY THIS FILE EXISTS
 * vite-plugin-pwa's default snippet registers the worker once on load and never
 * checks again. Combined with a precached app shell, that means a student who
 * installed the PWA keeps running the build from the day they installed it —
 * potentially for weeks. A production bug fixed today would simply never reach
 * them.
 *
 * That is not hypothetical: a stale install kept showing "Could not load the
 * estimated exam schedule" long after the underlying 404 had been fixed and
 * deployed, because the old worker went on serving the old bundle.
 *
 * What this does instead:
 *   1. registers the worker,
 *   2. asks it to check for a new build straight after registration,
 *      again whenever the tab regains focus, and hourly while left open,
 *   3. reloads once when a new worker takes control.
 *
 * Paired with skipWaiting + clientsClaim in vite.config.ts, a fix now reaches
 * an installed app on the next launch rather than never.
 */

const UPDATE_INTERVAL_MS = 60 * 60 * 1000; // hourly while the app stays open

export function registerServiceWorker(): void {
  if (typeof window === "undefined") return;
  if (!("serviceWorker" in navigator)) return;
  // Never register from a dev server; it caches the unbuilt shell.
  if (!import.meta.env.PROD) return;

  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js", { scope: "/" })
      .then((reg) => {
        // Check immediately: catches a user who left the app installed.
        reg.update().catch(() => {});

        // And whenever they come back to the tab.
        document.addEventListener("visibilitychange", () => {
          if (document.visibilityState === "visible") reg.update().catch(() => {});
        });

        window.setInterval(() => reg.update().catch(() => {}), UPDATE_INTERVAL_MS);
      })
      .catch(() => {
        // A failed SW registration must never break the app — it only costs
        // offline support, so fail silently.
      });

    // When the new worker takes over, reload once so the user sees the fix.
    // The guard stops the reload loop that this otherwise causes.
    let reloaded = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (reloaded) return;
      reloaded = true;
      window.location.reload();
    });
  });
}
