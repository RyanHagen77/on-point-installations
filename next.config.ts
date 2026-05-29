import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      // ── WordPress legacy URLs → new routes ──────────────────────────────────
      { source: '/commercial-office-furniture-installation-chicago-il/', destination: '/services/commercial-furniture-installation-chicago-il/', permanent: true },
      { source: '/services/commercial-office-furniture-installation-chicago-il/', destination: '/services/commercial-furniture-installation-chicago-il/', permanent: true },
      { source: '/company-office-relocation-chicago-il/', destination: '/services/office-relocation-chicago-il/', permanent: true },
      { source: '/services/company-office-relocation-chicago-il/', destination: '/services/office-relocation-chicago-il/', permanent: true },
      { source: '/commercial-office-furniture-storage-chicago-il/', destination: '/services/commercial-office-furniture-storage-chicago-il/', permanent: true },
      { source: '/space-planning/', destination: '/services/commercial-space-planning-chicago-il/', permanent: true },
      { source: '/services/space-planning/', destination: '/services/commercial-space-planning-chicago-il/', permanent: true },
      { source: '/about-us-chicago-il/', destination: '/about/', permanent: true },
      { source: '/contact-us/', destination: '/contact/', permanent: true },
      { source: '/site-credits/', destination: '/about/', permanent: true },
      { source: '/modular-furniture-designs/', destination: '/blog/modular-furniture-designs/', permanent: true },
      { source: '/the-differences-between-high-and-low-voltage-electricity/', destination: '/blog/the-differences-between-high-and-low-voltage-electricity/', permanent: true },
      { source: '/how-to-find-the-right-team-for-your-office-furniture-installation-project/', destination: '/blog/how-to-find-the-right-team-for-your-office-furniture-installation-project/', permanent: true },

      // ── Phase 1 slugs → renamed Chicago-suffixed slugs ───────────────────────
      { source: '/services/electrical-voice-and-data-cabling-for-your-commercial-installation/', destination: '/services/electrical-voice-data-cabling-chicago-il/', permanent: true },
      { source: '/artwork-installation/', destination: '/services/artwork-installation-chicago-il/', permanent: true },
      { source: '/services/artwork-installation/', destination: '/services/artwork-installation-chicago-il/', permanent: true },
      { source: '/window-treatment-installations/', destination: '/services/window-treatment-installation-chicago-il/', permanent: true },
      { source: '/services/window-treatment-installations/', destination: '/services/window-treatment-installation-chicago-il/', permanent: true },
      { source: '/services/cubicle-wall-and-upholstery-cleaning/', destination: '/services/cubicle-wall-upholstery-cleaning-chicago-il/', permanent: true },

      // ── Audit-only URLs absorbed into Office Installations money page ─────────
      { source: '/services/systems-furniture-installation-chicago-il/', destination: '/services/commercial-furniture-installation-chicago-il/', permanent: true },
      { source: '/services/office-furniture-delivery-setup-chicago-il/', destination: '/services/commercial-furniture-installation-chicago-il/', permanent: true },
    ];
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 85],
    remotePatterns: [
      { protocol: 'https', hostname: 'cdn.sanity.io' },
    ],
  },
};

export default nextConfig;
