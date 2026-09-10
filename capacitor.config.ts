import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.goshbuzz.youngscholarspk',
  appName: 'Young Scholars Pk',
  webDir: 'dist',
  android: {
    allowMixedContent: false,
    backgroundColor: '#F8FAFC',
  },
  server: {
    androidScheme: 'https',
    // Allow the packaged app to reach your deployed API + Firebase + textbook links.
    cleartext: false,
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 1200,
      backgroundColor: '#4F46E5',
      showSpinner: false,
      androidScaleType: 'CENTER_CROP',
    },
    StatusBar: {
      style: 'LIGHT',
      backgroundColor: '#4F46E5',
    },
  },
};

export default config;
