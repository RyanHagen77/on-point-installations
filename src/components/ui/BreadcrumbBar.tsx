import Breadcrumb from '@/components/ui/Breadcrumb';

interface BreadcrumbItem {
  name: string;
  url: string;
}

export default function BreadcrumbBar({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
      <Breadcrumb items={items} />
    </div>
  );
}
