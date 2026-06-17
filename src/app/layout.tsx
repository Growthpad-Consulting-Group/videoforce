/* LEGACY CSS AUDIT
 * Migrated (Task 2.6): .color-bg → bg-brand-yellow
 */

import GlobalScrollParallax from "@/components/ui/GlobalScrollParallax";
import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://videoforce.co.ke"),
  title: {
    default: "Video Force Kenya - Leading Video Production Company in Kenya",
    template: "%s | Video Force Kenya",
  },
  description:
    "Video Force Kenya is a Nairobi-headquartered video production agency studio that specializes in professional video production, animation and livestreaming services.",
  keywords: [
    "video production agencies in kenya",
    "animation companies in kenya",
    "live stream companies in kenya",
    "Motion design companies in kenya",
    "3d animators in kenya",
    "video force kenya",
    "growthpad animation studios",
  ],
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: "https://videoforce.co.ke",
    siteName: "Video Force Kenya",
  },
  icons: { icon: "/favicon.png" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        <GlobalScrollParallax />
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-WS5WQ74"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {children}

        {/* ── Analytics (afterInteractive = non-blocking) ──────────────── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=UA-205480715-1"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'UA-205480715-1');
        `}</Script>
        <Script id="gtm-init" strategy="afterInteractive">{`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-WS5WQ74');
        `}</Script>
        <Script id="meta-pixel" strategy="afterInteractive">{`
          !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
          n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}
          (window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
          fbq('init','954142945967349');fbq('track','PageView');
        `}</Script>
      </body>
    </html>
  );
}
