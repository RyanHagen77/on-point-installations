'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE, ALL_SERVICES } from '@/lib/constants';

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Service Areas', href: '/service-area/chicagoland-commercial-furniture-installation/' },
    { label: 'About', href: '/about/' },
    { label: 'Reviews', href: '/reviews/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'Contact', href: '/contact/' },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-[#1a3a5c] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <span className="text-white font-bold text-lg leading-tight">
              On Point<br />
              <span className="text-[#e8a020]">Installations</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${isActive('/') ? 'text-[#e8a020]' : 'text-white hover:text-[#e8a020]'}`}
            >
              Home
            </Link>

            {/* Services dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button
                className={`text-sm font-medium transition-colors flex items-center gap-1 ${pathname.startsWith('/services') ? 'text-[#e8a020]' : 'text-white hover:text-[#e8a020]'}`}
                aria-expanded={servicesOpen}
                aria-haspopup="true"
              >
                Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-0 mt-1 w-72 bg-white rounded-md shadow-lg py-1 z-50">
                  {ALL_SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#1a3a5c]"
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors ${isActive(link.href) ? 'text-[#e8a020]' : 'text-white hover:text-[#e8a020]'}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href={SITE.phoneHref}
              className="text-white font-semibold text-sm hover:text-[#e8a020] transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              href="/contact/"
              className="bg-[#e8a020] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#d09018] transition-colors"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile: phone + hamburger */}
          <div className="flex lg:hidden items-center gap-3">
            <a
              href={SITE.phoneHref}
              className="text-white font-semibold text-sm"
              aria-label={`Call ${SITE.phone}`}
            >
              {SITE.phone}
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-2"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#122840] border-t border-[#2a5080]">
          <nav className="px-4 py-3 space-y-1">
            <Link href="/" className="block py-2 text-sm text-white" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <div>
              <button
                className="flex items-center justify-between w-full py-2 text-sm text-white"
                onClick={() => setServicesOpen(!servicesOpen)}
              >
                Services
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="pl-4 space-y-1 pb-2">
                  {ALL_SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}/`}
                      className="block py-1.5 text-sm text-gray-300 hover:text-white"
                      onClick={() => setMobileOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm text-white"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 pb-2">
              <Link
                href="/contact/"
                className="block w-full text-center bg-[#e8a020] text-white text-sm font-semibold px-4 py-2.5 rounded"
                onClick={() => setMobileOpen(false)}
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
