"use client";

import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "sans-serif", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", textAlign: "center", padding: "2rem" }}>
        <div>
          <p style={{ fontSize: "0.7rem", fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "#E8721D", marginBottom: "1rem" }}>Erreur critique</p>
          <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "#0f172a", marginBottom: "0.75rem" }}>Quelque chose s&apos;est mal passé</h1>
          <p style={{ color: "#64748b", marginBottom: "2rem" }}>L&apos;application a rencontré une erreur inattendue.</p>
          <button
            onClick={reset}
            style={{ background: "#E8721D", color: "#fff", border: "none", borderRadius: "0.75rem", padding: "0.75rem 1.5rem", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}
