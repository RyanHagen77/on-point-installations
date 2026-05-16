import { Metadata } from 'next';
import { SITE } from './constants';

export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: 'Office Furniture Installer Chicago IL | On Point Installations',
    template: '%s | On Point Installations',
  },
  description: "On Point Installations is Chicago's trusted commercial furniture installation company. Cubicles, systems furniture, office relocation & more. Serving Chicagoland & Tri-State. Call (847) 550-4042.",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: SITE.name,
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Add GSC verification token after DNS cutover
  },
};

export function generatePageMetadata({
  title,
  description,
  canonical,
  ogImage,
}: {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      ...(ogImage && { images: [{ url: ogImage, width: 1200, height: 630 }] }),
    },
  };
}
