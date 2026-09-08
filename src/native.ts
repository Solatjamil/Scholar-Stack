/**
 * Native (Capacitor / Android) enhancements.
 * Every call is guarded so the exact same bundle runs unchanged in a browser.
 */
import { isNativeApp } from './apiBase';

export async function initNative(): Promise<void> {
  if (!isNativeApp()) return;

  // Lets CSS and components (e.g. the install banner) detect the native shell.
  document.documentElement.classList.add('native-app');

  try {
    const { StatusBar, Style } = await import('@capacitor/status-bar');
    await StatusBar.setStyle({ style: Style.Light });
    await StatusBar.setBackgroundColor({ color: '#4F46E5' });
  } catch {
    /* status bar plugin unavailable — non-fatal */
  }

  try {
    const { SplashScreen } = await import('@capacitor/splash-screen');
    await SplashScreen.hide();
  } catch {
    /* splash plugin unavailable — non-fatal */
  }

  try {
    const { App } = await import('@capacitor/app');
    // Android hardware back button: go back in history, else minimise (never a white screen).
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack && window.history.length > 1) {
        window.history.back();
      } else {
        App.minimizeApp();
      }
    });
  } catch {
    /* app plugin unavailable — non-fatal */
  }
}
