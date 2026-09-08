import React, { useEffect, useState } from "react";
import { Download, X, Share } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_KEY = "scholarstack_install_dismissed";

/**
 * Add-to-home-screen prompt.
 *
 * Chrome/Edge on Android fire `beforeinstallprompt`, which we capture and
 * replay when the student taps Install. iOS Safari has no such event, so we
 * detect it and show the manual Share -> Add to Home Screen instructions
 * instead. Hidden entirely when already running standalone, and the dismissal
 * is remembered so we never nag.
 */
export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);
  const [isIos, setIsIos] = useState(false);

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
    const ios = /iphone|ipad|ipod/.test(ua);
    const safari = ios && /safari/.test(ua) && !/crios|fxios/.test(ua);

    if (safari) {
      setIsIos(true);
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

  return (
    <div
      className="lg:hidden fixed left-3 right-3 z-[70] bg-white rounded-2xl border border-slate-200 shadow-lg p-4"
      style={{ bottom: "calc(72px + env(safe-area-inset-bottom, 0px))" }}
      role="dialog"
      aria-label="Install ScholarStack"
    >
      <button
        onClick={dismiss}
        className="absolute top-2.5 right-2.5 p-2 text-slate-400 hover:text-slate-600 rounded-lg"
        aria-label="Dismiss"
      >
        <X size={15} />
      </button>

      <div className="flex items-start gap-3 pr-6">
        <div className="w-11 h-11 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-display font-bold shrink-0">
          S
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-bold text-slate-900">Install ScholarStack</p>
          <p className="text-[11px] text-slate-500 leading-relaxed mt-0.5">
            Add it to your home screen for full-screen access and offline past papers — no internet
            needed once installed.
          </p>

          {isIos ? (
            <p className="mt-2.5 text-[11px] text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 leading-relaxed">
              Tap <Share size={11} className="inline mx-0.5 -mt-0.5" /> <strong>Share</strong> below,
              then choose <strong>Add to Home Screen</strong>.
            </p>
          ) : (
            <button
              onClick={install}
              className="mt-2.5 w-full flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-[12px] font-bold py-2.5 rounded-xl transition-colors min-h-[44px]"
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
