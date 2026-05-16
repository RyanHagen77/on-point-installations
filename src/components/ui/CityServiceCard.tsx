import Link from 'next/link';

interface CityServiceCardProps {
  city: string;
  state: string;
  slug: string;
  description?: string;
}

export default function CityServiceCard({ city, state, slug, description }: CityServiceCardProps) {
  return (
    <Link
      href={`/service-area/${slug}/`}
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-[#800000] transition-all group"
    >
      <h3 className="font-semibold text-[#800000] group-hover:underline mb-1">
        {city}, {state}
      </h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <span className="text-sm text-[#800000] font-medium mt-2 block">View service area →</span>
    </Link>
  );
}
