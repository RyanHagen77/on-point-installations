import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ContactForm from '@/components/forms/ContactForm';

export const metadata = generatePageMetadata({
  title: 'Contact On Point Installations | Chicago Commercial Furniture Installer',
  description: 'Get a quote for commercial furniture installation in the Chicago metro area. Call (847) 550-4042 or fill out our contact form. On Point Installations — Wauconda, IL.',
  canonical: `${SITE.domain}/contact/`,
});

export default function ContactPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Contact', url: '/contact/' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
        Contact On Point Installations
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-8">
        <div>
          <ContactForm />
        </div>
        <div className="text-sm text-gray-600 space-y-4">
          <div>
            <h2 className="font-semibold text-[#800000] mb-1">Phone</h2>
            <a href={SITE.phoneHref} className="text-[#800000] font-bold text-lg hover:underline">{SITE.phone}</a>
          </div>
          <div>
            <h2 className="font-semibold text-[#800000] mb-1">Address</h2>
            <p>{SITE.address.street}<br />{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
          </div>
          <div>
            <h2 className="font-semibold text-[#800000] mb-1">Hours</h2>
            <p>{SITE.hours.weekdays}<br />{SITE.hours.weekend}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
