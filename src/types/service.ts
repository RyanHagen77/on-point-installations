export interface Service {
  name: string;
  slug: string;
  description?: string;
  longDescription?: string;
  faqs?: FAQ[];
  cities?: string[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface CityService {
  service: string;
  city: string;
  state: string;
  slug: string;
}
