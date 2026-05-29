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
      {process.env.VERCEL_ENV === 'production' && SITE.ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${SITE.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${SITE.ga4Id}');
            `}
          </Script>
        </>
      )}
      <body className="min-h-full flex flex-col">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
