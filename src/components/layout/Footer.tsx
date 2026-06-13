import Link from 'next/link';
import Image from 'next/image';
import { SITE, PRIMARY_SERVICES } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t-2 border-[#800000] mt-auto">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 4-column grid : stacks to single column on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Col 1: Logo + NAP + Hours + Social */}
          <div>
            <Link href="/" aria-label="On Point Installations home">
              <Image
                src="/images/logo.png"
                alt="On Point Installations, Inc."
                width={200}
                height={46}
                className="h-12 w-auto mb-5"
              />
            </Link>
            <address className="not-italic text-sm text-[#5A5A5A] space-y-1.5">
              <p>
                <a
                  href={SITE.phoneHref}
                  className="text-[#292929] font-semibold hover:text-[#800000] transition-colors"
                >
                  {SITE.phone}
                </a>
              </p>
              <p>{SITE.address.street}</p>
              <p>{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
              <p className="mt-3 text-xs">{SITE.hours.weekdays}</p>
              <p className="text-xs">{SITE.hours.weekend}</p>
            </address>
            <div className="flex gap-4 mt-5">
              {SITE.social.facebook && (
                <a
                  href={SITE.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#898989] hover:text-[#800000] transition-colors"
                  aria-label="Facebook"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>
              )}
              {SITE.social.instagram && (
                <a
                  href={SITE.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#898989] hover:text-[#800000] transition-colors"
                  aria-label="Instagram"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              {SITE.social.linkedin && (
                <a
                  href={SITE.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#898989] hover:text-[#800000] transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#800000] mb-4">Services</h3>
            <ul className="space-y-2">
              {PRIMARY_SERVICES.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}/`}
                    className="text-sm text-[#292929] hover:text-[#800000] transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Service Areas */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#800000] mb-4">Service Areas</h3>
            <ul className="space-y-2">
              {[
                { label: 'All Chicagoland', href: '/services/commercial-furniture-installation-chicago-il/' },
                { label: 'Chicago, IL', href: '/services/commercial-furniture-installation-chicago-il/' },
                { label: 'Schaumburg, IL', href: '/services/commercial-furniture-installation-schaumburg-il/' },
                { label: 'Naperville, IL', href: '/services/commercial-furniture-installation-naperville-il/' },
                { label: 'Wauconda, IL', href: '/services/commercial-furniture-installation-wauconda-il/' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-[#292929] hover:text-[#800000] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Company */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-[#800000] mb-4">Company</h3>
            <ul className="space-y-2">
              {[
                { label: 'About', href: '/about/' },
                { label: 'Reviews', href: '/reviews/' },
                { label: 'Project Gallery', href: '/project-gallery/' },
                { label: 'Blog', href: '/blog/' },
                { label: 'Contact', href: '/contact/' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-[#292929] hover:text-[#800000] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E9E9E9]">
        <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#717171]">
          <p>&copy; {currentYear} On Point Installations, Inc. All rights reserved.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/privacy-policy/" className="hover:text-[#800000] transition-colors">Privacy Policy</Link>
            <Link href="/disclaimer/" className="hover:text-[#800000] transition-colors">Disclaimer</Link>
          </div>
        </div>
        <p className="text-center text-xs text-[#717171] pb-4">
          Developed by{' '}
          <a
            href="https://integrepro.com"
            target="_blank"
            rel="noopener"
            className="hover:text-[#800000] transition-colors"
          >
            IntegrePro Software LLC
          </a>
        </p>
      </div>
    </footer>
  );
}
