import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/lib/metadata';
import { SITE } from '@/lib/constants';
import { client } from '@/lib/sanity';
import { urlFor } from '@/lib/sanity-image';
import Breadcrumb from '@/components/ui/Breadcrumb';
import ProjectCard from '@/components/ui/ProjectCard';

export const metadata = generatePageMetadata({
  title: 'Installation Project Gallery | Chicago Metro | On Point Installations',
  description: 'Browse completed commercial furniture installation projects by On Point Installations across the Chicago metro area. Cubicles, office systems, modular furniture, and more.',
  canonical: `${SITE.domain}/project-gallery/`,
});

interface ProjectCardData {
  title: string;
  slug: string;
  excerpt: string | null;
  location: string | null;
  serviceType: string | null;
  completedDate: string | null;
  _createdAt: string;
  featuredImage: {
    _type: 'image';
    asset: { _ref: string; _type: 'reference' };
    alt: string | null;
  } | null;
}

const indexQuery = `*[_type == "project" && status == "published"] | order(coalesce(completedDate, _createdAt) desc) {
  title,
  "slug": slug.current,
  excerpt,
  location,
  serviceType,
  completedDate,
  _createdAt,
  featuredImage { _type, asset, alt }
}`;

export default async function ProjectGalleryPage() {
  const projects = await client.fetch<ProjectCardData[]>(
    indexQuery,
    {},
    { next: { tags: ['project'], revalidate: 3600 } }
  );

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ name: 'Home', url: '/' }, { name: 'Project Gallery', url: '/project-gallery/' }]} />
      <h1 className="text-3xl sm:text-4xl font-bold text-[#800000] mt-6 mb-4">
        Project Gallery
      </h1>
      <p className="text-[#292929] leading-relaxed max-w-2xl">
        Browse completed commercial furniture installation projects from On Point Installations across
        the Chicago metro area. The portfolio covers the city and major suburban markets, including{' '}
        <Link href="/services/commercial-furniture-installation-schaumburg-il/" className="text-[#800000] underline hover:text-[#5A0000]">
          Schaumburg commercial furniture installation
        </Link>
        {' '}and surrounding areas. Photos are added as new projects complete.
      </p>
      {projects.length === 0 ? (
        <p className="text-gray-600 leading-relaxed mt-8 text-center">
          Project case studies are coming soon. Check back shortly, or{' '}
          <Link href="/contact/" className="text-[#800000] underline hover:text-[#5A0000]">
            contact us
          </Link>
          {' '}to discuss your installation needs.
        </p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
          {projects.map((project, index) => {
            const thumbnailUrl = project.featuredImage
              ? urlFor(project.featuredImage).width(800).height(450).url()
              : null;
            const thumbnail = thumbnailUrl
              ? { src: thumbnailUrl, alt: project.featuredImage?.alt ?? project.title }
              : undefined;
            return (
              <li key={project.slug}>
                <ProjectCard
                  title={project.title}
                  slug={project.slug}
                  location={project.location ?? undefined}
                  serviceType={project.serviceType ?? undefined}
                  excerpt={project.excerpt ?? undefined}
                  thumbnail={thumbnail}
                />
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
