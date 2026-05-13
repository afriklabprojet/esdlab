"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    clarity?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

// ─── Custom event tracker (exporté pour usage dans les composants) ────────────
export function trackEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
) {
  // GA4
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", eventName, params ?? {});
  }
  // Clarity
  if (typeof window !== "undefined" && window.clarity) {
    window.clarity("event", eventName);
  }
}

// ─── Page view tracker (changements de routes Next.js) ───────────────────────
function PageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const gaId = process.env.NEXT_PUBLIC_GA_ID;
    if (!gaId || typeof window === "undefined" || !window.gtag) return;

    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");

    window.gtag("config", gaId, {
      page_path: url,
    });

    // Événement custom selon la page
    if (pathname === "/") {
      trackEvent("view_home");
    } else if (pathname.startsWith("/services")) {
      trackEvent("view_sector_page", { page: pathname });
    } else if (pathname === "/contact") {
      trackEvent("submit_contact_start");
    } else if (pathname === "/merci") {
      trackEvent("lead_converted", { source: "contact_form" });
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", "conversion", { send_to: "contact_form_success" });
      }
    }
  }, [pathname, searchParams]);

  return null;
}

// ─── Composant principal ──────────────────────────────────────────────────────
export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {/* ── Google Analytics 4 ───────────────────────────────────────── */}
      {gaId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-init"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  page_path: window.location.pathname,
                  anonymize_ip: true,
                  cookie_flags: 'SameSite=None;Secure'
                });
              `,
            }}
          />
        </>
      )}

      {/* ── Microsoft Clarity ────────────────────────────────────────── */}
      {clarityId && (
        <Script
          id="clarity-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "${clarityId}");
            `,
          }}
        />
      )}

      {/* ── Page view tracker (Next.js App Router) ───────────────────── */}
      <Suspense fallback={null}>
        <PageViewTracker />
      </Suspense>
    </>
  );
}
