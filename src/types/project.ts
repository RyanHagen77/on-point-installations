import type { PortableTextBlock } from '@portabletext/types';

export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  caption?: string;
}

export interface ProjectRelatedBlogPost {
  title: string;
  slug: string;
  excerpt?: string;
}

export interface Project {
  _id?: string;
  title: string;
  slug: string;
  h1?: string;
  metaDescription?: string;
  excerpt?: string;
  body?: PortableTextBlock[];
  featuredImage?: ProjectImage;
  imageGallery?: ProjectImage[];
  completedDate?: string;
  serviceType?: string;
  location?: string;
  status?: 'draft' | 'published';
  relatedBlogPosts?: ProjectRelatedBlogPost[];
}
