import { buildFAQSchema } from '@/lib/schema';

interface FAQSchemaProps {
  items: Array<{ question: string; answer: string }>;
}

export default function FAQSchema({ items }: FAQSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFAQSchema(items)) }}
    />
  );
}
