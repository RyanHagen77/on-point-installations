'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SITE, PRIMARY_SERVICES } from '@/lib/constants';

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' },
  { label: 'Project Gallery', href: '/project-gallery/' },
  { label: 'Reviews', href: '/reviews/' },
  { label: 'Blog', href: '/blog/' },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  const openServices = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };

  const closeServices = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 180);
  };

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const linkClass = (href: string) =>
    `text-xs font-semibold uppercase tracking-wide transition-colors ${
      isActive(href)
        ? 'text-[#800000]'
        : 'text-[#292929] hover:text-[#800000]'
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b-2 border-[#800000] shadow-sm">
      <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="On Point Installations home">
            <Image
              src="/images/logo.png"
              alt="On Point Installations, Inc."
              width={240}
              height={55}
              priority
              className="h-14 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-7" aria-label="Main navigation">

            <Link href="/" className={linkClass('/')}>Home</Link>

            {/* Services dropdown */}
            <div
              ref={dropdownRef}
              className="relative"
              onMouseEnter={openServices}
              onMouseLeave={closeServices}
            >
              <button
                className={`text-xs font-semibold uppercase tracking-wide transition-colors flex items-center gap-1 ${
                  pathname.startsWith('/services')
                    ? 'text-[#800000]'
                    : 'text-[#292929] hover:text-[#800000]'
                }`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <svg
                  className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {servicesOpen && (
                <div className="absolute top-full left-0 mt-0 w-80 bg-white border border-gray-200 shadow-lg z-50">
                  {PRIMARY_SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/`}
                      className="block px-5 py-2.5 text-sm text-[#292929] hover:bg-[#F8F8F8] hover:text-[#800000] border-b border-gray-100 last:border-0"
                      onClick={() => setServicesOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <Link key={link.href} href={link.href} className={linkClass(link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right: phone + CTA */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={SITE.phoneHref}
              className="text-sm font-semibold text-[#292929] hover:text-[#800000] transition-colors whitespace-nowrap"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact/"
              className="bg-[#800000] text-white text-xs font-semibold uppercase tracking-wide px-5 py-2.5 rounded-[3px] hover:bg-[#5A0000] transition-colors whitespace-nowrap"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile: phone icon + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="text-[#800000] hover:text-[#5A0000] transition-colors p-1"
              aria-label={`Call ${SITE.phone}`}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 text-[#292929]"
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <nav className="max-w-[1320px] mx-auto px-4 py-4 space-y-1" aria-label="Mobile navigation">

            <Link
              href="/"
              className="block py-2.5 text-sm font-semibold uppercase tracking-wide text-[#292929] hover:text-[#800000]"
            >
              Home
            </Link>

            {/* Mobile services accordion */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2.5 text-sm font-semibold uppercase tracking-wide text-[#292929]"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                aria-expanded={mobileServicesOpen}
              >
                Services
                <svg
                  className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileServicesOpen && (
                <div className="pl-4 pb-2 space-y-0.5 border-l-2 border-[#800000] ml-1">
                  {PRIMARY_SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/`}
                      className="block py-2 text-sm text-[#535353] hover:text-[#800000]"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {NAV_LINKS.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2.5 text-sm font-semibold uppercase tracking-wide text-[#292929] hover:text-[#800000]"
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-3 pb-1">
              <Link
                href="/contact/"
                className="block w-full text-center bg-[#800000] text-white text-sm font-semibold uppercase tracking-wide px-4 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
