# Lighthouse Session 8 -- post-trailing-slash-fix

Lighthouse desktop-preset audits of four target pages, run against
the Vercel preview deployment at HEAD `f54cbc1` on 2026-05-22.

These were measured after commit `f54cbc1` set
`trailingSlash: true` in `next.config.ts`, aligning the Next.js
runtime with the sitemap and canonical URL form. URLs ending in `/`
now serve directly with HTTP 200; non-slash URLs 308-redirect to
the trailing-slash form. This is the URL shape that ships at Phase
6 cutover.

Pages measured:
- homepage.json -- `/`
- chicago-commercial-installation.json -- primary money page
- blog-index.json -- `/blog/`
- how-to-survive-office-downsizing.json -- representative blog post

All four scored 100/100/100/100 across Performance, Accessibility,
Best Practices, SEO.
