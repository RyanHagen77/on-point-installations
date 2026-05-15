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
      className="block bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-[#1a3a5c] transition-all group"
    >
      <h3 className="font-semibold text-[#1a3a5c] group-hover:underline mb-1">
        {city}, {state}
      </h3>
      {description && <p className="text-sm text-gray-600">{description}</p>}
      <span className="text-sm text-[#e8a020] font-medium mt-2 block">View service area →</span>
    </Link>
  );
}
