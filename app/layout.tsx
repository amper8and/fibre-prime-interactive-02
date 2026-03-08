import type { Metadata, Viewport } from 'next';
import './globals.css';

const BASE = '/fibre-prime-interactive-02';

export const metadata: Metadata = {
  metadataBase: new URL('https://amper8and.github.io'),
  title: 'MTN Fibre Prime | Interactive Home Experience',
  description: 'Explore the connected Lagos home powered by MTN Fibre Prime. Interact with smart devices, build custom bundles, and discover how MTN transforms your household into a connected ecosystem.',
  keywords: 'MTN, Fibre, Nigeria, smart home, connected home, Lagos, broadband, streaming',
  authors: [{ name: 'MTN Nigeria' }],
  manifest: `${BASE}/manifest.json`,
  icons: {
    icon: `${BASE}/favicon.svg`,
    apple: `${BASE}/icons/icon-192.svg`,
  },
  openGraph: {
    title: 'MTN Fibre Prime | Interactive Home Experience',
    description: 'Not just internet. An ecosystem.',
    type: 'website',
    images: [`${BASE}/og-image.png`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MTN Fibre Prime | Interactive Home Experience',
    description: 'Not just internet. An ecosystem.',
    images: [`${BASE}/og-image.png`],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#FFCB00',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="font-mtn antialiased">{children}</body>
    </html>
  );
}
