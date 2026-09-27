import type { Metadata, Viewport } from 'next'

import './globals.css'
import {
  BASE_URL,
  OG_IMAGE,
  OG_IMAGE_ALT,
  OG_IMAGE_HEIGHT,
  OG_IMAGE_WIDTH,
  SITE_DESCRIPTION,
  SITE_LANG,
  SITE_NAME,
  SITE_OG_LOCALE,
  SITE_TAGLINE,
  TARGET_KEYWORDS,
} from '@/lib/seo'

/**
 * ia-premium — Layout racine
 * ─────────────────────────────────────────────────────────────────────────────
 * Définit les métadonnées par défaut du site (title template, OpenGraph, Twitter,
 * robots, canonical) et la configuration du viewport.
 *
 * Toute page enfant doit surcharger via buildMetadata() (lib/seo.ts) afin de
 * conserver un canonical, une description et une image OG cohérents.
 */
export const metadata: Metadata = {
  // Résout les URLs relatives (canonical, images OG) sans repeated `/og.png`.
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: '%s | IA Premium',
  },
  description: SITE_DESCRIPTION,
  keywords: TARGET_KEYWORDS,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: BASE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: 'technology',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: SITE_OG_LOCALE,
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: OG_IMAGE,
        width: OG_IMAGE_WIDTH,
        height: OG_IMAGE_HEIGHT,
        alt: OG_IMAGE_ALT,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/site.webmanifest',
  formatDetection: {
    telephone: false,
  },
}

/** Viewport séparé (Next.js 14+ : ne pas mettre width/initialScale dans metadata). */
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#1e1b4b',
  colorScheme: 'light',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang={SITE_LANG}>
      <body className="font-sans bg-white text-gray-900 antialiased">{children}</body>
    </html>
  )
}
