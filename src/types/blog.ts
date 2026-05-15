export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  body?: unknown;
  publishedAt: string;
  updatedAt?: string;
  featuredImage?: {
    asset: { _ref: string };
    alt?: string;
  };
  author?: {
    name: string;
  };
  categories?: Array<{ title: string; slug: { current: string } }>;
  faqs?: Array<{ question: string; answer: string }>;
}

export interface BlogPostCard {
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  featuredImage?: string;
}
