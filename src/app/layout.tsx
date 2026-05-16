import type { Metadata } from 'next';
import { Wix_Madefor_Text } from 'next/font/google';
import './globals.css';
import { defaultMetadata } from '@/lib/metadata';
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
      <body className="min-h-full flex flex-col">
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
