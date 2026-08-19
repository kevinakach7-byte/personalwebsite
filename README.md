# Kevin Akach — Personal Website

Personal portfolio site for Kevin Akach, founder of ParagonAI Labs. Built as a static site — no framework, no build step.

**Live sections:** About, Ventures (Clawcruit, Clawforge Premier League), Resume, Blog, Contact.

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
└── README.md
```

## Features

- **Responsive nav** with a mobile hamburger toggle (`#navToggle` / `#navLinks`)
- **Scroll-reveal animations** on sections and cards via `IntersectionObserver`, respecting `prefers-reduced-motion`
- **Contact form** wired to Formspree via `fetch`/AJAX — submits without leaving the page, shows inline success/error messaging, and falls back to a standard POST if JavaScript fails to load
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

Static files only — deploy to any static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages, etc.). No environment variables or backend required.

## License

© 2026 Kevin Akach. All rights reserved.
