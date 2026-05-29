import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import CityServicePage from '@/components/templates/CityServicePage';
import cubicleSchaumburgPage from '@/data/cityPages/cubicle-installation-schaumburg-il';

export const metadata = generatePageMetadata({
  title: cubicleSchaumburgPage.title,
  description: cubicleSchaumburgPage.description,
  canonical: `${SITE.domain}/services/${cubicleSchaumburgPage.slug}/`,
});

export default function CubicleInstallationSchaumburgPage() {
  return <CityServicePage {...cubicleSchaumburgPage} />;
}
