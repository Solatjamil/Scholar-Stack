import { useEffect, useState } from "react";
import { Download, X, Share, PlusSquare, Info } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "scholarstack_install_dismissed";

/**
 * Add-to-home-screen prompt.
 *
 * ── Android / desktop Chromium ────────────────────────────────────────────
 * Fires `beforeinstallprompt`, which we capture and replay when the student
 * taps Install — a genuine one-tap OS install dialog.
 *
 * ── iPhone / iPad ─────────────────────────────────────────────────────────
 * iOS has no `beforeinstallprompt`, and Apple does NOT permit installing a
 * signed .ipa from a website in Pakistan. Alternative app distribution exists
 * only in the EU, Japan and Brazil, requires the Apple Account region AND
 * physical presence there, and needs Apple notarisation plus a paid developer
 * account. Third-party routes such as AltStore Classic need a computer and
 * re-signing every 7 days on a free Apple ID.
 *
 * So we deliberately do NOT advertise an "iOS app download". Instead we show
 * the honest, genuinely working route: Safari's Share -> Add to Home Screen,
 * which installs this PWA as a real full-screen offline app on iOS. Promising
 * an .ipa a Pakistani student cannot install would be a straightforward lie.
 *
 * DETECTION NOTES (both were bugs in the previous version):
 *   1. iPadOS 13+ reports a *desktop macOS* user agent, so /ipad/ never
 *      matches. We detect it via `maxTouchPoints > 1` on a "Macintosh" UA.
 *   2. Only Safari can add to the home screen. Chrome (CriOS), Firefox
 *      (FxiOS) and Edge (EdgiOS) on iOS cannot, so they get told to reopen
 *      the page in Safari rather than shown instructions that will not work.
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  /** "safari" = can install now · "other-ios" = must switch to Safari first */
  const [iosMode, setIosMode] = useState<"none" | "safari" | "other-ios">("none");

  useEffect(() => {
    // Already installed? Never show.
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      (window.navigator as unknown as { standalone?: boolean }).standalone === true;
    if (standalone) return;

    if (localStorage.getItem(DISMISS_KEY) === "1") return;

    // Capacitor native build never needs an install banner.
    if (document.documentElement.classList.contains("native-app")) return;

    const ua = window.navigator.userAgent.toLowerCase();

    // iPadOS 13+ masquerades as desktop Safari, so the UA alone is not enough:
    // a real Mac reports maxTouchPoints 0, an iPad reports 5.
    const iPadOS = /macintosh/.test(ua) && navigator.maxTouchPoints > 1;
    const isIos = /iphone|ipad|ipod/.test(ua) || iPadOS;

    if (isIos) {
      // Only Safari exposes Add to Home Screen.
      const nonSafari = /crios|fxios|edgios|opios|duckduckgo/.test(ua);
      setIosMode(nonSafari ? "other-ios" : "safari");
      const t = setTimeout(() => setShow(true), 8000);
      return () => clearTimeout(t);
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferred(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const dismiss = () => {
    setShow(false);
    localStorage.setItem(DISMISS_KEY, "1");
  };

  const install = async () => {
    if (!deferred) return;
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    if (outcome === "accepted" || outcome === "dismissed") {
      setShow(false);
      setDeferred(null);
      if (outcome === "accepted") localStorage.setItem(DISMISS_KEY, "1");
    }
  };

  if (!show) return null;

  const isIos = iosMode !== "none";

  return (
    <div
      className="lg:hidden fixed left-3 right-3 z-[70] bg-white rounded-2xl border border-slate-200 shadow-lg p-4"
      style={{ bottom: "calc(72px + env(safe-area-inset-bottom, 0px))" }}
      role="dialog"
      aria-label="Install Young Scholars Pk"
    >
      <button
        onClick={dismiss}
        className="absolute top-2.5 right-2.5 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
        aria-label="Dismiss"
      >
        <X size={15} />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-display font-bold shrink-0 shadow-sm">
          S
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-900">
            {isIos ? "Install on your iPhone or iPad" : "Install Young Scholars Pk"}
          </p>
          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
            Add it to your home screen for full-screen access and offline past papers — no internet
            needed once installed.
          </p>

          {iosMode === "safari" && (
            <>
              <ol className="mt-2.5 space-y-1.5 text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 leading-relaxed">
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-indigo-600 shrink-0">1.</span>
                  <span>
                    Tap <Share size={11} className="inline mx-0.5 -mt-0.5" />{" "}
                    <strong>Share</strong> in the Safari toolbar
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-indigo-600 shrink-0">2.</span>
                  <span>
                    Scroll down and tap{" "}
                    <PlusSquare size={11} className="inline mx-0.5 -mt-0.5" />{" "}
                    <strong>Add to Home Screen</strong>
                  </span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-bold text-indigo-600 shrink-0">3.</span>
                  <span>
                    Tap <strong>Add</strong> — the app icon appears on your home screen
                  </span>
                </li>
              </ol>
              <p className="mt-2 flex items-start gap-1 text-[10px] leading-relaxed text-slate-400">
                <Info size={11} className="mt-0.5 shrink-0" />
                Apple does not allow app files to be installed from a website in Pakistan, so this
                is the official way to get the app on iPhone. It works exactly like an App Store
                app: full screen, own icon, and works offline.
              </p>
            </>
          )}

          {iosMode === "other-ios" && (
            <p className="mt-2.5 text-[11px] text-slate-700 bg-amber-50 border border-amber-200 rounded-lg px-2.5 py-2 leading-relaxed">
              To install on iPhone or iPad you must open this page in <strong>Safari</strong>. Other
              browsers on iOS cannot add apps to the home screen. Copy the link, open Safari, then
              tap <Share size={11} className="inline mx-0.5 -mt-0.5" /> <strong>Share</strong> and{" "}
              <strong>Add to Home Screen</strong>.
            </p>
          )}

          {!isIos && (
            <button
              onClick={install}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white text-[12px] font-bold py-2.5 rounded-xl transition-all min-h-[44px]"
            >
              <Download size={14} />
              Install App
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
