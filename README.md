# Kevin Akach — Personal Website

Personal portfolio site for Kevin Akach, founder of ParagonAI Labs. Built as a static site — no framework, no build step.

**Live sections:** About, Ventures (Clawcruit, Clawforge Premier League), Resume, Blog, Contact.

**Live at:** https://kevinakach.gt.tc

## Tech stack

- Plain HTML5, CSS3, vanilla JavaScript (ES6+)
- Fonts: [Fraunces](https://fonts.google.com/specimen/Fraunces), [Inter](https://fonts.google.com/specimen/Inter), [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono), loaded via Google Fonts
- [Formspree](https://formspree.io) for contact form handling
- No package manager, no bundler, no server — open `index.html` directly or serve the folder statically

## Project structure

```
.
├── index.html      # Home page: hero, about, ventures, resume, blog preview, contact
├── blog.html       # Blog post listing
├── styles.css      # All site styling (design tokens live in :root)
├── script.js       # Mobile nav, scroll reveal, contact form, CPL live stats
├── robots.txt      # Crawler rules + sitemap pointer
├── sitemap.xml     # XML sitemap for search engines
├── llms.txt        # Plain-language site summary for AI assistants/crawlers (llmstxt.org convention)
└── README.md
```

## SEO & AI-crawler setup

- **Meta tags**: unique `<title>` and meta description per page, canonical `<link>` tags, Open Graph + Twitter Card tags for link previews.
- **Structured data**: JSON-LD (`schema.org`) `Person`, `Organization`, `WebSite`, `SoftwareApplication`/`Game` on the home page, and `Blog`/`BlogPosting` on `blog.html`, all cross-linked via `@id`.
- **Semantic HTML**: content wrapped in `<main>`, blog posts and venture cards use `<article>`, post dates use `<time datetime="...">`.
- **robots.txt / sitemap.xml**: standard crawler discovery files at the site root.
- **llms.txt**: a concise, structured Markdown summary of who Kevin is and what ParagonAI Labs/Clawcruit/CPL are, aimed at AI assistants and answer engines that support the emerging [llms.txt](https://llmstxt.org) convention.

### To finish the setup

1. **Social preview image**: the OG/Twitter tags reference `https://kevinakach.gt.tc/assets/og-cover.jpg`, which doesn't exist yet. Add a ~1200×630px image at that path (or update the tags to point elsewhere) so shared links show a preview image.
2. **Filename check**: the stylesheet is referenced as `styles.css` (plural) from both HTML files — make sure that's the exact filename you upload to InfinityFree; a mismatch (e.g. `style.css`) will silently break all styling.
3. **Verify canonical domain**: all canonical/OG/sitemap URLs assume `https://kevinakach.gt.tc`. If you move to a custom domain later, update `index.html`, `blog.html`, `robots.txt`, `sitemap.xml`, and `llms.txt` accordingly.
4. **Submit to Google**: once live, submit `sitemap.xml` via [Google Search Console](https://search.google.com/search-console) to speed up indexing.

## Features

- **Responsive nav** with a mobile hamburger toggle (`#navToggle` / `#navLinks`)
- **Scroll-reveal animations** on sections/articles and cards via `IntersectionObserver`, respecting `prefers-reduced-motion`
- **Contact form** wired to Formspree via `fetch`/AJAX — submits without leaving the page, shows inline success/error messaging (`#formNote`), and falls back to a standard POST if JavaScript fails to load
- **Live CPL ledger** — fetches live standings from the Clawforge Premier League API (`api.clawforgepremierleague.com/standings`) and renders team count, matches played, and current leader on page load

## Running locally

No build step required. Either:

1. Open `index.html` directly in a browser, or
2. Serve the folder with any static server, e.g.:
   ```bash
   npx serve .
   # or
   python3 -m http.server 8000
   ```

## Contact form setup

The contact form (`#contactForm` in `index.html`) posts to a [Formspree](https://formspree.io) endpoint. To point it at a different form:

1. Create a form at [formspree.io](https://formspree.io) and grab its endpoint ID.
2. Update the `action` attribute on `#contactForm` in `index.html`:
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
3. No changes needed in `script.js` — it reads the endpoint from `contactForm.action` automatically.

## Deployment

Static files only — deploy to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, InfinityFree, etc.). No environment variables or backend required. Make sure `robots.txt`, `sitemap.xml`, and `llms.txt` are uploaded to the site **root** (not a subfolder) so crawlers find them at `/robots.txt`, `/sitemap.xml`, `/llms.txt`.

## License

© 2026 Kevin Akach. All rights reserved.
