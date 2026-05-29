import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import CityServicePage from '@/components/templates/CityServicePage';
import cubicleChicagoPage from '@/data/cityPages/cubicle-installation-chicago-il';

export const metadata = generatePageMetadata({
  title: cubicleChicagoPage.title,
  description: cubicleChicagoPage.description,
  canonical: `${SITE.domain}/services/${cubicleChicagoPage.slug}/`,
});

export default function CubicleInstallationChicagoPage() {
  return <CityServicePage {...cubicleChicagoPage} />;
}
