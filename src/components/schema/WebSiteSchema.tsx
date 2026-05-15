import { buildWebSiteSchema } from '@/lib/schema';

export default function WebSiteSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildWebSiteSchema()) }}
    />
  );
}
