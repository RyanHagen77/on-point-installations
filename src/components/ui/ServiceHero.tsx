import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { SITE } from '@/lib/constants';
import BreadcrumbBar from '@/components/ui/BreadcrumbBar';

interface ServiceHeroProps {
  breadcrumbItems: { name: string; url: string }[];
  h1: string;
  imageSrc: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  children: ReactNode;
}

export default function ServiceHero({
  breadcrumbItems,
  h1,
  imageSrc,
  imageAlt,
  imageWidth,
  imageHeight,
  children,
}: ServiceHeroProps) {
  return (
    <>
      <BreadcrumbBar items={breadcrumbItems} />
      <section className="bg-white border-b border-[#E9E9E9] py-10 px-4">
        <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
          {/*
            Mobile order:  H1 → Image → Body+CTAs  (stacked in DOM order)
            Desktop layout: [H1 / Body+CTAs] [Image spanning both rows]
          */}
          <div className="lg:grid lg:grid-cols-2 lg:gap-x-12 lg:gap-y-4 lg:items-start">

            {/* 1. H1 : always first; desktop: left col, row 1 */}
            <div className="lg:col-start-1 lg:row-start-1">
              <h1 className="text-[28px] leading-snug sm:text-[36px] lg:text-[42px] font-bold text-[#800000]">
                {h1}
              </h1>
            </div>

            {/* 2. Image : mobile: immediately after H1; desktop: right col spanning both rows */}
            <div className="mt-6 lg:mt-0 relative rounded-sm overflow-hidden shadow-md lg:col-start-2 lg:row-start-1 lg:row-span-2">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="w-full h-auto object-cover"
                priority
                quality={85}
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
            </div>

            {/* 3. Body text + CTAs : mobile: after image; desktop: left col, row 2 */}
            <div className="mt-6 lg:mt-0 lg:col-start-1 lg:row-start-2">
              {children}
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
                  Get a Free Quote
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
