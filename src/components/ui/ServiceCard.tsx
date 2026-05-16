import Link from 'next/link';

interface ServiceCardProps {
  name: string;
  slug: string;
  description?: string;
  variant?: 'grid' | 'list';
}

export default function ServiceCard({ name, slug, description, variant = 'grid' }: ServiceCardProps) {
  const href = `/services/${slug}/`;

  if (variant === 'list') {
    return (
      <li>
        <Link href={href} className="flex items-center gap-2 text-[#800000] hover:underline font-medium">
          <span>&rarr;</span>
          <span>{name}</span>
        </Link>
        {description && <p className="text-sm text-gray-600 mt-1 ml-6">{description}</p>}
      </li>
    );
  }

  return (
    <Link
      href={href}
      className="block bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md hover:border-[#800000] transition-all group"
    >
      <h3 className="font-semibold text-[#800000] group-hover:underline mb-2">{name}</h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <span className="text-sm text-[#800000] font-medium mt-3 block">Learn more →</span>
    </Link>
  );
}
