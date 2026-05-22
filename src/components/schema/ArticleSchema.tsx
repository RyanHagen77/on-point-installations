import { buildArticleSchema } from '@/lib/schema';

interface ArticleSchemaProps {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified: string;
  image?: string;
  imageAlt?: string;
}

export default function ArticleSchema(props: ArticleSchemaProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleSchema(props)) }}
    />
  );
}
