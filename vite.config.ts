import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {VitePWA} from 'vite-plugin-pwa';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        // We inject our own registration (see src/swUpdate.ts) so the app can
        // poll for a new build while it is open. The default script registers
        // once at load and never checks again.
        injectRegister: null,
        includeAssets: ['favicon.svg', 'icons/apple-touch-icon.png'],
        manifest: {
          id: '/',
          name: 'Young Scholars Pk — BISE Study Companion',
          short_name: 'Young Scholars Pk',
          description:
            'Syllabus tracking, mock board papers, past-paper prediction and study resources for Pakistani 9th, 10th, 11th and 12th class students (Punjab, Sindh, KPK, Balochistan, FBISE, AJK, GB).',
          lang: 'en-PK',
          dir: 'ltr',
          start_url: '/',
          scope: '/',
          display: 'standalone',
          orientation: 'portrait-primary',
          background_color: '#F8FAFC',
          theme_color: '#4F46E5',
          categories: ['education', 'productivity'],
          icons: [
            {src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any'},
            {src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any'},
            {src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable'},
          ],
          shortcuts: [
            {name: 'Mock Board Exam', short_name: 'Mockup', url: '/?view=mockup'},
            {name: 'Syllabus Archive', short_name: 'Syllabus', url: '/?view=syllabus'},
          ],
        },
        workbox: {
          // App shell is cached so students can revise offline / on weak mobile data.
          globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api\//],
          // Without these two, an installed PWA keeps serving the previously
          // cached shell until every tab is closed. A student who installed the
          // app before a fix would keep seeing the old broken build for days.
          skipWaiting: true,
          clientsClaim: true,
          cleanupOutdatedCaches: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts',
                expiration: {maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365},
                cacheableResponse: {statuses: [0, 200]},
              },
            },
            {
              // Board notices only. cacheableResponse is limited to 200 so a
              // transient 404/502 is never persisted and replayed at a student.
              urlPattern: /\/api\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'ysp-api-v2',
                networkTimeoutSeconds: 12,
                expiration: {maxEntries: 40, maxAgeSeconds: 60 * 60 * 6},
                cacheableResponse: {statuses: [200]},
              },
            },
          ],
        },
        devOptions: {enabled: false},
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Keeps the Android asset bundle smaller and faster to boot on low-end phones.
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
            charts: ['recharts'],
            motion: ['motion'],
          },
        },
      },
      chunkSizeWarningLimit: 900,
    },
    server: {
      host: true,
      // Allow sandbox/tunnel preview hosts (e2b, ngrok, Codespaces) to load the dev server.
      allowedHosts: true as const,
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
