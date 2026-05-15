export interface Project {
  _id?: string;
  title: string;
  slug: string;
  description?: string;
  body?: unknown;
  city?: string;
  state?: string;
  serviceType?: string;
  images?: ProjectImage[];
  completedAt?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}
