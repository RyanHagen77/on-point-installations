import Link from 'next/link';
import BreadcrumbSchema from '@/components/schema/BreadcrumbSchema';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <>
      <BreadcrumbSchema items={items} />
      <nav aria-label="Breadcrumb" className="text-sm text-gray-500">
        <ol className="flex flex-wrap items-center gap-1">
          {items.map((item, index) => (
            <li key={item.url} className="flex items-center gap-1">
              {index > 0 && <span aria-hidden="true">/</span>}
              {index < items.length - 1 ? (
                <Link href={item.url} className="hover:text-[#800000] transition-colors">
                  {item.name}
                </Link>
              ) : (
                <span className="text-gray-700 font-medium" aria-current="page">{item.name}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
