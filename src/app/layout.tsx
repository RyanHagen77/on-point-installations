import type { Metadata } from 'next';
import { Wix_Madefor_Text } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { defaultMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';

const wixMadeforText = Wix_Madefor_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-wix-madefor-text',
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${wixMadeforText.variable} h-full`}>
      {SITE.gtmId && (
        <Script id="gtm-datalayer" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];`}
        </Script>
      )}
      {SITE.gtmId && (
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtm.js?id=${SITE.gtmId}`}
        />
      )}
      <body className="min-h-full flex flex-col">
        {SITE.gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${SITE.gtmId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
