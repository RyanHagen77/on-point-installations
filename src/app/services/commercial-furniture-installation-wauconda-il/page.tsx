import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import CityServicePage from '@/components/templates/CityServicePage';
import waucondaPage from '@/data/cityPages/wauconda-il';

export const metadata = generatePageMetadata({
  title: waucondaPage.title,
  description: waucondaPage.description,
  canonical: `${SITE.domain}/services/${waucondaPage.slug}/`,
});

export default function CommercialFurnitureInstallationWaucondaPage() {
  return <CityServicePage {...waucondaPage} />;
}
