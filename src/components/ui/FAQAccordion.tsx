'use client';

import { useState } from 'react';
import FAQSchema from '@/components/schema/FAQSchema';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  heading?: string;
}

export default function FAQAccordion({ items, heading = 'Frequently Asked Questions' }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section>
      <FAQSchema items={items} />
      <h2 className="text-2xl font-bold text-[#1a3a5c] mb-6">{heading}</h2>
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden">
        {items.map((item, index) => (
          <div key={index}>
            <button
              className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-50 transition-colors"
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-[#1a3a5c] text-sm sm:text-base pr-4">{item.question}</span>
              <svg
                className={`w-5 h-5 flex-shrink-0 text-[#1a3a5c] transition-transform ${openIndex === index ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {openIndex === index && (
              <div className="px-5 py-4 bg-gray-50 text-gray-700 text-sm leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
