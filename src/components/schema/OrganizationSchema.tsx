import { buildOrganizationSchema } from '@/lib/schema';

export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildOrganizationSchema()) }}
    />
  );
}
