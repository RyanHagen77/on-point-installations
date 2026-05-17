'use client';

import { useState } from 'react';
import { SITE } from '@/lib/constants';
import Breadcrumb from '@/components/ui/Breadcrumb';

// BreadcrumbSchema is rendered internally by the Breadcrumb component.
// Do not add a second BreadcrumbSchema here -- that would produce duplicate JSON-LD.

// ── Project type options ─────────────────────────────────────────────────────
const PROJECT_TYPES = [
  'Commercial Furniture Installation',
  'Office Relocation',
  'Warehousing',
  'Space Planning',
  'Electrical & Voice/Data',
  'Artwork Installation',
  'Window Treatment',
  'Cubicle Cleaning',
  'Other',
] as const;

// ── Form field types ─────────────────────────────────────────────────────────
interface FormFields {
  name: string;
  company: string;
  phone: string;
  email: string;
  projectType: string;
  city: string;
  projectDetails: string;
}

type FormErrors = Partial<Record<keyof FormFields, string>>;

const EMPTY_FORM: FormFields = {
  name: '',
  company: '',
  phone: '',
  email: '',
  projectType: '',
  city: '',
  projectDetails: '',
};

// ── Shared input styles ──────────────────────────────────────────────────────
const inputClass =
  'w-full border border-[#CCCCCC] rounded px-3 py-2 text-sm text-[#292929] ' +
  'placeholder:text-[#999999] ' +
  'focus:outline-none focus:ring-2 focus:ring-[#800000] focus:border-[#800000]';

// ── ContactForm (inner client component) ────────────────────────────────────
function ContactForm() {
  const [fields, setFields] = useState<FormFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(false);

  const set =
    (key: keyof FormFields) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
    };

  function validate(): boolean {
    const next: FormErrors = {};

    if (!fields.name.trim()) next.name = 'Name is required.';
    if (!fields.company.trim()) next.company = 'Company is required.';
    if (!fields.phone.trim()) next.phone = 'Phone number is required.';
    if (!fields.email.trim()) {
      next.email = 'Email address is required.';
    } else if (!/^\S+@\S+\.\S+$/.test(fields.email)) {
      next.email = 'Enter a valid email address.';
    }
    if (!fields.projectType) next.projectType = 'Select a project type.';
    if (!fields.city.trim()) next.city = 'City or project location is required.';

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setServerError(false);

    if (!validate()) return;

    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(fields),
      });

      if (res.ok) {
        // Fire GTM dataLayer event -- no-op until Phase 5 wires GTM container
        if (
          typeof window !== 'undefined' &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).dataLayer
        ) {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (window as any).dataLayer.push({
            event: 'contact_form_submit',
            form_type: 'contact',
          });
        }
        setSubmitted(true);
      } else {
        setServerError(true);
      }
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="py-10 text-center">
        <p className="text-[#292929] text-base font-semibold">
          Thanks&nbsp;&mdash;&nbsp;we&apos;ll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Row 1: Name + Company */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cf-name"
            className="block text-sm font-medium text-[#292929] mb-1"
          >
            Name <span className="text-[#800000]" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-name"
            type="text"
            autoComplete="name"
            className={inputClass}
            value={fields.name}
            onChange={set('name')}
            aria-required="true"
            aria-describedby={errors.name ? 'cf-name-err' : undefined}
          />
          {errors.name && (
            <p id="cf-name-err" className="text-[#800000] text-xs mt-1">
              {errors.name}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="cf-company"
            className="block text-sm font-medium text-[#292929] mb-1"
          >
            Company <span className="text-[#800000]" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            className={inputClass}
            value={fields.company}
            onChange={set('company')}
            aria-required="true"
            aria-describedby={errors.company ? 'cf-company-err' : undefined}
          />
          {errors.company && (
            <p id="cf-company-err" className="text-[#800000] text-xs mt-1">
              {errors.company}
            </p>
          )}
        </div>
      </div>

      {/* Row 2: Phone + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label
            htmlFor="cf-phone"
            className="block text-sm font-medium text-[#292929] mb-1"
          >
            Phone <span className="text-[#800000]" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            className={inputClass}
            value={fields.phone}
            onChange={set('phone')}
            aria-required="true"
            aria-describedby={errors.phone ? 'cf-phone-err' : undefined}
          />
          {errors.phone && (
            <p id="cf-phone-err" className="text-[#800000] text-xs mt-1">
              {errors.phone}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor="cf-email"
            className="block text-sm font-medium text-[#292929] mb-1"
          >
            Email <span className="text-[#800000]" aria-hidden="true">*</span>
          </label>
          <input
            id="cf-email"
            type="email"
            autoComplete="email"
            className={inputClass}
            value={fields.email}
            onChange={set('email')}
            aria-required="true"
            aria-describedby={errors.email ? 'cf-email-err' : undefined}
          />
          {errors.email && (
            <p id="cf-email-err" className="text-[#800000] text-xs mt-1">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      {/* Row 3: Project type */}
      <div>
        <label
          htmlFor="cf-project-type"
          className="block text-sm font-medium text-[#292929] mb-1"
        >
          Project Type{' '}
          <span className="text-[#800000]" aria-hidden="true">*</span>
        </label>
        <select
          id="cf-project-type"
          className={inputClass}
          value={fields.projectType}
          onChange={set('projectType')}
          aria-required="true"
          aria-describedby={
            errors.projectType ? 'cf-project-type-err' : undefined
          }
        >
          <option value="">Select a project type...</option>
          {PROJECT_TYPES.map((pt) => (
            <option key={pt} value={pt}>
              {pt}
            </option>
          ))}
        </select>
        {errors.projectType && (
          <p id="cf-project-type-err" className="text-[#800000] text-xs mt-1">
            {errors.projectType}
          </p>
        )}
      </div>

      {/* Row 4: City / Project location */}
      <div>
        <label
          htmlFor="cf-city"
          className="block text-sm font-medium text-[#292929] mb-1"
        >
          City / Project Location{' '}
          <span className="text-[#800000]" aria-hidden="true">*</span>
        </label>
        <input
          id="cf-city"
          type="text"
          placeholder="e.g. Chicago, Schaumburg, Naperville..."
          className={inputClass}
          value={fields.city}
          onChange={set('city')}
          aria-required="true"
          aria-describedby={errors.city ? 'cf-city-err' : undefined}
        />
        {errors.city && (
          <p id="cf-city-err" className="text-[#800000] text-xs mt-1">
            {errors.city}
          </p>
        )}
      </div>

      {/* Row 5: Project details (optional) */}
      <div>
        <label
          htmlFor="cf-details"
          className="block text-sm font-medium text-[#292929] mb-1"
        >
          Project Details{' '}
          <span className="text-[#666666] font-normal">(optional)</span>
        </label>
        <textarea
          id="cf-details"
          rows={5}
          placeholder="Furniture type, quantity, timeline, building access notes..."
          className={inputClass}
          value={fields.projectDetails}
          onChange={set('projectDetails')}
        />
      </div>

      {/* Server error message */}
      {serverError && (
        <p className="text-[#800000] text-sm" role="alert">
          Something went wrong. Call us at{' '}
          <a href={SITE.phoneHref} className="underline font-medium">
            {SITE.phone}
          </a>{' '}
          or try again.
        </p>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full bg-[#800000] text-white font-semibold py-3 px-6 rounded hover:bg-[#5A0000] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending...' : 'Request a Free Quote'}
      </button>

    </form>
  );
}

// ── Page layout ──────────────────────────────────────────────────────────────
export default function ContactPageClient() {
  return (
    <main>

      {/* Breadcrumb strip -- white, above main content, matching /about/ pattern */}
      <div className="bg-white border-b border-[#E9E9E9] py-3 px-4">
        <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { name: 'Home', url: '/' },
              { name: 'Contact', url: '/contact/' },
            ]}
          />
        </div>
      </div>

      {/* Main section */}
      <section className="bg-[#F3F3F3] py-14 px-4">
        <div className="max-w-[1320px] mx-auto sm:px-6 lg:px-8">

          <h1 className="text-[28px] sm:text-[36px] font-bold text-[#800000] mb-10">
            Contact On Point Installations
          </h1>

          {/* Two-column grid: form (60%) + contact info (40%) */}
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-10 lg:gap-16 items-start">

            {/* Left: contact form */}
            <div className="bg-white rounded border border-[#E9E9E9] p-6 sm:p-8">
              <ContactForm />
            </div>

            {/* Right: direct contact info */}
            <div className="space-y-8">

              <h2 className="text-xl font-bold text-[#800000]">Get in Touch</h2>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#666666] mb-2">
                  Phone
                </p>
                <a
                  href={SITE.phoneHref}
                  className="text-[#800000] font-bold text-2xl sm:text-3xl hover:text-[#5A0000] transition-colors"
                >
                  {SITE.phone}
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#666666] mb-2">
                  Email
                </p>
                {/* VERIFY BEFORE DEPLOY: confirm info@onpointinstall.com vs info@onpointinstallations.com with Brian */}
                <a
                  href="mailto:info@onpointinstall.com"
                  className="text-[#800000] underline hover:text-[#5A0000] text-sm"
                >
                  info@onpointinstall.com
                </a>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#666666] mb-2">
                  Address
                </p>
                <address className="not-italic text-[#292929] text-sm leading-relaxed">
                  {SITE.address.street}
                  <br />
                  {SITE.address.city}, {SITE.address.state} {SITE.address.zip}
                </address>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#666666] mb-2">
                  Hours
                </p>
                <p className="text-[#292929] text-sm leading-relaxed">
                  Monday&ndash;Friday, 9AM&ndash;5PM
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

    </main>
  );
}
