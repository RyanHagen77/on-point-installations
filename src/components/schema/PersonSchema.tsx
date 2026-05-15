import { buildPersonSchema } from '@/lib/schema';

export default function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildPersonSchema()) }}
    />
  );
}
