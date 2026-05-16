import Link from 'next/link';
import { SITE } from '@/lib/constants';

interface CTABlockProps {
  variant?: 'primary' | 'secondary' | 'banner';
  heading?: string;
  subtext?: string;
  className?: string;
}

export default function CTABlock({
  variant = 'primary',
  heading,
  subtext,
  className = '',
}: CTABlockProps) {
  if (variant === 'banner') {
    return (
      <section className={`bg-[#800000] py-12 px-4 ${className}`}>
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            {heading ?? 'Ready to Get Started?'}
          </h2>
          {subtext && <p className="text-white/80 mb-6">{subtext}</p>}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={SITE.phoneHref}
              className="bg-white text-[#800000] font-semibold uppercase tracking-wide px-8 py-3 rounded-[3px] hover:bg-[#F8F8F8] transition-colors text-lg"
            >
              Call {SITE.phone}
            </a>
            <Link
              href="/contact/"
              className="border-2 border-white text-white font-semibold uppercase tracking-wide px-8 py-3 rounded-[3px] hover:bg-white hover:text-[#800000] transition-colors text-lg"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'secondary') {
    return (
      <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-3 ${className}`}>
        <p className="text-gray-700">
          {heading ?? 'Have a project in mind?'}
        </p>
        <Link
          href="/contact/"
          className="text-[#800000] font-semibold underline hover:text-[#C53333] transition-colors whitespace-nowrap"
        >
          Request a Quote →
        </Link>
      </div>
    );
  }

  // primary (default)
  return (
    <div className={`bg-[#F3F3F3] rounded-[3px] p-6 sm:p-8 ${className}`}>
      <h2 className="text-xl sm:text-2xl font-bold text-[#800000] mb-2">
        {heading ?? 'Get a Free Quote'}
      </h2>
      {subtext && <p className="text-[#535353] mb-5">{subtext}</p>}
      <div className="flex flex-col sm:flex-row gap-3">
        <a
          href={SITE.phoneHref}
          className="bg-[#800000] text-white font-semibold uppercase tracking-wide px-6 py-3 rounded-[3px] hover:bg-[#5A0000] transition-colors text-center"
        >
          Call {SITE.phone}
        </a>
        <Link
          href="/contact/"
          className="border-2 border-[#800000] text-[#800000] font-semibold uppercase tracking-wide px-6 py-3 rounded-[3px] hover:bg-[#800000] hover:text-white transition-colors text-center"
        >
          Request a Quote
        </Link>
      </div>
    </div>
  );
}
