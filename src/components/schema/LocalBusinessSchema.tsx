import { buildLocalBusinessSchema } from '@/lib/schema';

export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildLocalBusinessSchema()) }}
    />
  );
}
