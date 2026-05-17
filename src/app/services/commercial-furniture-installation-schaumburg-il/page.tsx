import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import CityServicePage from '@/components/templates/CityServicePage';
import schaumburgPage from '@/data/cityPages/schaumburg-il';

export const metadata = generatePageMetadata({
  title: schaumburgPage.title,
  description: schaumburgPage.description,
  canonical: `${SITE.domain}/services/${schaumburgPage.slug}/`,
});

export default function CommercialFurnitureInstallationSchaumburgPage() {
  return <CityServicePage {...schaumburgPage} />;
}
