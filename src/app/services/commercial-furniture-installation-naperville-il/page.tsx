import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import CityServicePage from '@/components/templates/CityServicePage';
import napervillePage from '@/data/cityPages/naperville-il';

export const metadata = generatePageMetadata({
  title: napervillePage.title,
  description: napervillePage.description,
  canonical: `${SITE.domain}/services/${napervillePage.slug}/`,
});

export default function CommercialFurnitureInstallationNapervillePage() {
  return <CityServicePage {...napervillePage} />;
}
