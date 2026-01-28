# Atilla - Personal Portfolio

Modern, minimal, and edgy personal portfolio website built with Astro, TypeScript, and TailwindCSS.

## Features

- 🚀 **Fast & Static**: Built with Astro for optimal performance
- 📱 **Fully Responsive**: Works perfectly on all devices (320px+)
- 🎨 **Modern Design**: Dark theme with gradient accents
- 🧲 **Interactive Skills**: Magnetic/swarm-style skills visualization with physics
- 📝 **MDX Support**: Blog posts and project case studies in MDX
- 🔍 **SEO Optimized**: Sitemap, robots.txt, and meta tags
- ♿ **Accessible**: Semantic HTML and ARIA labels
- 🎯 **Type Safe**: Full TypeScript support

## Tech Stack

- [Astro](https://astro.build) - Static site generator
- [React](https://react.dev) - Interactive components
- [TypeScript](https://www.typescriptlang.org) - Type safety
- [TailwindCSS](https://tailwindcss.com) - Styling
- [MDX](https://mdxjs.com) - Content authoring

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, pnpm, or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open [http://localhost:4321](http://localhost:4321) in your browser

### Build

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── Badge.astro
│   │   ├── Footer.astro
│   │   ├── Marquee.astro
│   │   ├── Navbar.astro
│   │   ├── ProjectCard.astro
│   │   ├── Section.astro
│   │   └── TimelineItem.astro
│   ├── content/
│   │   ├── blog/
│   │   ├── projects/
│   │   └── config.ts
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── pages/
│   │   ├── blog/
│   │   ├── projects/
│   │   ├── contact.astro
│   │   ├── cv.astro
│   │   ├── index.astro
│   │   ├── sitemap.xml.ts
│   │   └── uses.astro
│   ├── styles/
│   │   └── global.css
│   └── env.d.ts
├── astro.config.mjs
├── package.json
├── tailwind.config.mjs
└── tsconfig.json
```

## Customization

### Update Site Information

Edit `astro.config.mjs` to change the site URL:

```js
site: 'https://yourdomain.com',
```

### Add Projects

Create new MDX files in `src/content/projects/`:

```mdx
---
title: 'Project Name'
tagline: 'Short description'
description: 'Longer description'
category: 'Flutter'
date: 2024-01-01
role: 'Developer'
platform: 'iOS, Android'
technologies: ['Flutter', 'Firebase']
github: 'https://github.com/...'
demo: 'https://demo.com'
---

Your project content here...
```

### Add Blog Posts

Create new MDX files in `src/content/blog/`:

```mdx
---
title: 'Post Title'
description: 'Post description'
pubDate: 2024-01-01
tags: ['Flutter', 'Development']
readTime: 5
---

Your blog post content...
```

### Update Personal Information

- **Home page**: Edit `src/pages/index.astro`
- **CV page**: Edit `src/pages/cv.astro`
- **Contact**: Edit `src/pages/contact.astro`
- **Social links**: Edit `src/components/Footer.astro` and `src/pages/contact.astro`

## Design System

### Colors

- Background: `#0B0F17`
- Surface: `#131720`
- Text: `#E6EAF2`
- Muted: `#A0AEC0`
- Accent Gradient: `#7C3AED` → `#22D3EE`

### Typography

- Font: Inter (system fallback)
- Headings: Bold (700-900)
- Body: Regular (400)

## Performance

The site is optimized for:

- ✅ Lighthouse Performance: 90+
- ✅ SEO: 100
- ✅ Accessibility: 100
- ✅ Best Practices: 100

## License

MIT

## Author

Atilla - Mobile Developer

