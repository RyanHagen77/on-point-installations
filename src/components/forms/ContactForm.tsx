'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { SITE, SERVICE_CITIES } from '@/lib/constants';

interface ContactFormData {
  name: string;
  company: string;
  phone: string;
  email: string;
  city: string;
  projectDetails: string;
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setSubmitted(true);
    } catch {
      // handle error silently for now
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Thank you!</h3>
        <p className="text-green-700 text-sm">
          We received your message and will get back to you within 1 business day. For faster response, call us at{' '}
          <a href={SITE.phoneHref} className="font-semibold underline">{SITE.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            id="name"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
            {...register('name', { required: 'Name is required' })}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
            Company
          </label>
          <input
            id="company"
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
            {...register('company')}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
            {...register('phone', { required: 'Phone is required' })}
          />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
            {...register('email', {
              required: 'Email is required',
              pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email' },
            })}
          />
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City / Project Location
        </label>
        <select
          id="city"
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
          {...register('city')}
        >
          <option value="">Select a city</option>
          {SERVICE_CITIES.map((c) => (
            <option key={c.slug} value={c.name}>{c.name}, {c.state}</option>
          ))}
          <option value="Other">Other</option>
        </select>
      </div>

      <div>
        <label htmlFor="projectDetails" className="block text-sm font-medium text-gray-700 mb-1">
          Project Details <span className="text-red-500">*</span>
        </label>
        <textarea
          id="projectDetails"
          rows={4}
          placeholder="Describe your project: furniture type, quantity, timeline, building type..."
          className="w-full border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#800000]"
          {...register('projectDetails', { required: 'Please describe your project' })}
        />
        {errors.projectDetails && <p className="text-red-500 text-xs mt-1">{errors.projectDetails.message}</p>}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#800000] text-white font-semibold py-3 rounded hover:bg-[#5A0000] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}
