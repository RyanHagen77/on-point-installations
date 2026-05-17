import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import ContactPageClient from './ContactPageClient';

export const metadata = generatePageMetadata({
  title: 'Contact On Point Installations | Chicago Commercial Furniture Installer',
  description:
    'Get a quote for commercial furniture installation in the Chicago metro area. Call (847) 550-4042 or fill out our contact form. On Point Installations -- Wauconda, IL.',
  canonical: `${SITE.domain}/contact/`,
});

export default function ContactPage() {
  return <ContactPageClient />;
}
