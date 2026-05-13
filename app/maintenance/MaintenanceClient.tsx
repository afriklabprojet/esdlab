"use client";

import { useEffect, useState } from "react";

interface Props {
  readonly message: string;
  readonly eta: string;
  readonly siteName: string;
  readonly email: string;
}

// Animated progress bar that slowly fills to 85%
function ProgressBar() {
  const [pct, setPct] = useState(12);

  useEffect(() => {
    const targets = [28, 41, 55, 64, 72, 79, 84, 85];
    let i = 0;
    function step() {
      if (i >= targets.length) return;
      const delay = 900 + Math.random() * 1200;
      setTimeout(() => {
        setPct(targets[i]);
        i++;
        step();
      }, delay);
    }
    step();
  }, []);

  return (
    <div className="w-full space-y-2">
      <div className="flex justify-between text-xs font-mono text-slate-400">
        <span>Déploiement en cours…</span>
        <span>{pct}%</span>
      </div>
      <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-secondary-500 to-secondary-400 transition-all duration-[1200ms] ease-out"
          style={{ width: `${pct}%` }}
        />
        {/* shimmer */}
        <div
          className="absolute inset-y-0 rounded-full opacity-60"
          style={{
            width: `${pct}%`,
            background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.5) 50%, transparent 100%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 2s linear infinite",
          }}
        />
      </div>
    </div>
  );
}

// Animated dots loader
function StatusDot() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="block w-1.5 h-1.5 rounded-full bg-secondary-400"
          style={{ animation: `pulse 1.4s ease-in-out ${i * 0.2}s infinite` }}
        />
      ))}
    </div>
  );
}

// Parse eta string to target Date
function parseEta(eta: string): Date | null {
  if (!eta) return null;
  const d = new Date(eta);
  return isNaN(d.getTime()) ? null : d;
}

function Countdown({ target }: { readonly target: Date }) {
  const [diff, setDiff] = useState(() => target.getTime() - Date.now());

  useEffect(() => {
    const id = setInterval(() => setDiff(target.getTime() - Date.now()), 1000);
    return () => clearInterval(id);
  }, [target]);

  if (diff <= 0) return <span className="text-emerald-600 font-semibold">Bientôt disponible…</span>;

  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);

  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      {h > 0 && (
        <>
          <span className="tabular-nums text-slate-700 font-semibold">{String(h).padStart(2, "0")}h</span>
        </>
      )}
      <span className="tabular-nums text-slate-700 font-semibold">{String(m).padStart(2, "0")}m</span>
      <span className="tabular-nums text-slate-700 font-semibold">{String(s).padStart(2, "0")}s</span>
    </div>
  );
}

export default function MaintenanceClient({ message, eta, siteName, email }: Props) {
  const target = parseEta(eta);

  return (
    <>
      <style>{`
        @keyframes pulse { 0%, 80%, 100% { transform: scale(0); opacity: 0.3; } 40% { transform: scale(1); opacity: 1; } }
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-8px); } }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes fade-in-up { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .animate-fade-in-up { animation: fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <div className="min-h-screen bg-slate-950 text-white flex flex-col overflow-hidden relative">

        {/* Background decoration */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-secondary-900/20 blur-3xl" />
          <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-primary-900/15 blur-3xl" />
          <div className="absolute -bottom-40 left-1/3 w-72 h-72 rounded-full bg-secondary-950/30 blur-3xl" />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
          {/* Animated ring */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin-slow opacity-5">
            <div className="w-[600px] h-[600px] rounded-full border border-white/20" />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5" style={{ animation: "spin-slow 30s linear infinite reverse" }}>
            <div className="w-[900px] h-[900px] rounded-full border border-secondary-400/30" />
          </div>
        </div>

        <main className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-20">
          <div className="w-full max-w-lg mx-auto text-center space-y-10">

            {/* Logo / brand */}
            <div className="animate-fade-in-up space-y-3">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 animate-float mb-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/ESDL.png" alt={siteName} className="w-10 h-10 object-contain" />
              </div>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-sm font-medium">
                <StatusDot />
                <span>Maintenance en cours</span>
              </div>
            </div>

            {/* Heading */}
            <div className="animate-fade-in-up delay-100 space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
                Retour très
                <br />
                <span className="bg-gradient-to-r from-secondary-400 to-secondary-300 bg-clip-text text-transparent">
                  bientôt
                </span>
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-sm mx-auto">
                {message}
              </p>
            </div>

            {/* Countdown */}
            {target && (
              <div className="animate-fade-in-up delay-200 flex flex-col items-center gap-1">
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Retour estimé dans</p>
                <Countdown target={target} />
              </div>
            )}

            {/* Progress */}
            <div className="animate-fade-in-up delay-200 bg-white/5 border border-white/10 rounded-2xl p-5">
              <ProgressBar />
            </div>

            {/* Steps */}
            <div className="animate-fade-in-up delay-300 grid grid-cols-3 gap-3 text-center">
              {[
                { label: "Sauvegarde", done: true },
                { label: "Mise à jour", done: true },
                { label: "Validation", done: false },
              ].map((step) => (
                <div key={step.label} className="flex flex-col items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step.done ? "bg-emerald-500/20 text-emerald-400" : "bg-secondary-500/20 text-secondary-400"
                  }`}>
                    {step.done ? (
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                      </svg>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{step.label}</span>
                </div>
              ))}
            </div>

            {/* Contact */}
            <div className="animate-fade-in-up delay-400 flex flex-col items-center gap-3">
              <p className="text-xs text-slate-500">Besoin d&apos;une assistance urgente ?</p>
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary-600 hover:bg-secondary-500 text-white text-sm font-semibold transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
                {email}
              </a>
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 text-center text-xs text-slate-600">
          © {new Date().getFullYear()} {siteName}. Tous droits réservés.
        </footer>

      </div>
    </>
  );
}
