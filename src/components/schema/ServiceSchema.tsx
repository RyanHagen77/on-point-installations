import { buildServiceSchema } from '@/lib/schema';

interface ServiceSchemaProps {
  name: string;
  description: string;
  url: string;
  areaServed: string;
}

export default function ServiceSchema(props: ServiceSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildServiceSchema(props)) }}
    />
  );
}
