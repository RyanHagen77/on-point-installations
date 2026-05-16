import { generatePageMetadata } from '@/lib/metadata';
import { SITE, PRIMARY_SERVICES } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ServiceCard from '@/components/ui/ServiceCard';

export const metadata = generatePageMetadata({
  title: 'Services | On Point Installations, Inc.',
  description: 'Commercial furniture installation services in Chicago, IL. Cubicle installation, office relocation, systems furniture, space planning & more. Non-union. Call (847) 550-4042.',
  canonical: `${SITE.domain}/services/`,
});

export default function ServicesPage() {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Services', url: '/services/' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-8">
        Our Services
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {PRIMARY_SERVICES.map((service) => (
          <ServiceCard key={service.slug} name={service.name} slug={service.slug} />
        ))}
      </div>
    </main>
  );
}
