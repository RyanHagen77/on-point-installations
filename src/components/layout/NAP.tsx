import { SITE } from '@/lib/constants';

interface NAPProps {
  variant?: 'inline' | 'footer';
  className?: string;
}

export default function NAP({ variant = 'inline', className = '' }: NAPProps) {
  if (variant === 'footer') {
    return (
      <address className={`not-italic text-sm ${className}`}>
        <p className="font-semibold">{SITE.name}</p>
        <p>{SITE.address.street}</p>
        <p>{SITE.address.city}, {SITE.address.state} {SITE.address.zip}</p>
        <p>
          <a href={SITE.phoneHref} className="hover:underline">
            {SITE.phone}
          </a>
        </p>
        <p className="mt-2 text-xs">{SITE.hours.weekdays}</p>
        <p className="text-xs">{SITE.hours.weekend}</p>
      </address>
    );
  }

  return (
    <span className={className}>
      {SITE.name} &mdash; {SITE.address.full} &mdash;{' '}
      <a href={SITE.phoneHref} className="hover:underline">
        {SITE.phone}
      </a>
    </span>
  );
}
