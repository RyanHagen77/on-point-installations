import type React from 'react';
import type { FAQ } from './service';

export type CitySocialProof =
  | { kind: 'review'; quote: string; attribution: string }
  | { kind: 'stats' };

export interface CityServicePageProps {
  // Metadata
  title: string;
  description: string;
  slug: string;       // e.g. "commercial-furniture-installation-schaumburg-il"

  // Location
  city: string;      // e.g. "Schaumburg"
  cityState: string; // e.g. "Schaumburg, IL"

  // Content
  openingParagraph: string;
  whyChooseUs: string;
  serviceDetailsPara1: string;
  serviceDetailsPara2: string;
  serviceDetailsPara3?: React.ReactNode;
  socialProof: CitySocialProof;
  faqs: FAQ[];

  // Schema
  localBusinessId: string;    // e.g. "schaumburg-localbusiness"
  serviceDescription: string; // used in ServiceSchema and LocalBusiness schema
  serviceType: string;        // e.g. "Commercial Furniture Installation"

  // Outbound links
  chicagoAnchor: string;     // anchor text -> /services/commercial-furniture-installation-chicago-il/

  // Optional hero override; defaults to shared installation photo
  heroImageSrc?: string;
  heroImageAlt?: string;
  heroImageWidth?: number;
  heroImageHeight?: number;
}
