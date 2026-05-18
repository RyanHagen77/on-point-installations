import type React from 'react';
import type { FAQ } from './service';

export interface CityServicePageProps {
  // Metadata
  title: string;
  description: string;
  slug: string;       // e.g. "commercial-furniture-installation-schaumburg-il"

  // Location
  city: string;      // e.g. "Schaumburg"
  cityState: string; // e.g. "Schaumburg, IL"
  citySlug: string;  // e.g. "schaumburg-il"; used for /service-area/ link

  // Content
  openingParagraph: string;
  whyChooseUs: string;
  serviceDetailsPara1: string;
  serviceDetailsPara2: string;
  serviceDetailsPara3?: React.ReactNode;
  socialProof: {
    quote: string;
    attribution: string; // use [em-dash] for em dash (e.g. "[em-dash] First Name, City, IL")
  };
  faqs: FAQ[];

  // Schema
  localBusinessId: string;    // e.g. "schaumburg-localbusiness"
  serviceDescription: string; // used in ServiceSchema and LocalBusiness schema
  serviceType: string;        // e.g. "Commercial Furniture Installation"

  // Outbound links
  chicagoAnchor: string;     // anchor text -> /services/commercial-furniture-installation-chicago-il/
  serviceAreaAnchor: string; // anchor text -> /service-area/{citySlug}/

  // Optional hero override; defaults to shared installation photo
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
}
