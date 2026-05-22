# Lighthouse Session 8 -- pre-trailing-slash-fix

Lighthouse desktop-preset audits of four target pages, run against
the Vercel preview deployment at HEAD `7eee607` on 2026-05-22.

These were measured before commit `f54cbc1` aligned the Next.js
runtime with the sitemap and canonical URL form. At the time of
these runs, trailing-slash URLs returned 308 redirects to non-slash
served URLs. The post-fix re-runs live in
`lighthouse-session-8-trailing-slash-fix/`.

Pages measured:
- homepage.json -- `/`
- chicago-commercial-installation.json -- primary money page
- blog-index.json -- `/blog/`
- how-to-survive-office-downsizing.json -- representative blog post

All four scored 100/100/100/100 across Performance, Accessibility,
Best Practices, SEO.
