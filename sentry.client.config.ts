import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Pourcentage des transactions capturées (0 = désactivé, 1 = 100%)
  tracesSampleRate: 0.1,

  // Pourcentage des sessions de replay (seulement si erreur)
  replaysOnErrorSampleRate: 1.0,
  replaysSessionSampleRate: 0.01,

  integrations: [
    Sentry.replayIntegration(),
  ],

  // Désactiver en développement
  enabled: process.env.NODE_ENV === "production",

  // Ignorer les erreurs réseau bénignes
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "ResizeObserver loop completed with undelivered notifications",
    /^Network Error/,
    /^Failed to fetch/,
    /^Load failed/,
  ],
});
