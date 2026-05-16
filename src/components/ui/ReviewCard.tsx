import { SITE } from '@/lib/constants';

interface ReviewCardProps {
  author: string;
  text: string;
  rating?: number;
  date?: string;
  company?: string;
}

export default function ReviewCard({ author, text, rating = 5, date, company }: ReviewCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: rating }).map((_, i) => (
          <svg key={i} className="w-5 h-5 text-[#800000]" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="text-xs text-gray-500 ml-1">{SITE.reviews.platform}</span>
      </div>
      <blockquote className="text-gray-700 text-sm leading-relaxed mb-4">
        &ldquo;{text}&rdquo;
      </blockquote>
      <footer>
        <p className="font-semibold text-sm text-[#800000]">{author}</p>
        {company && <p className="text-xs text-gray-500">{company}</p>}
        {date && <p className="text-xs text-gray-400 mt-0.5">{date}</p>}
      </footer>
    </div>
  );
}
