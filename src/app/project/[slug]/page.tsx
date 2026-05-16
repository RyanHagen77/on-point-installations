import { Metadata } from 'next';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';
import CTABlock from '@/components/ui/CTABlock';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: slug.replace(/-/g, ' '),
    description: 'Commercial furniture installation project by On Point Installations.',
    alternates: { canonical: `${SITE.domain}/project/${slug}/` },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <main>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[
          { name: 'Home', url: '/' },
          { name: 'Project Gallery', url: '/project-gallery/' },
          { name: slug.replace(/-/g, ' '), url: `/project/${slug}/` },
        ]} />
        <h1 className="text-3xl font-bold text-[#800000] mt-6 mb-4">
          {slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-gray-600">Full project page content coming in Phase 2.</p>
      </div>
      <CTABlock variant="banner" heading="Have a Similar Project?" />
    </main>
  );
}
