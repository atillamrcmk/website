import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const LOCALES = ['tr', 'en'] as const;

export const GET: APIRoute = async ({ site }) => {
  const projects = await getCollection('projects');
  const blogPosts = await getCollection('blog');

  const mainPages = [
    { path: '', changefreq: 'daily', priority: '1.0' },
    { path: '/projects', changefreq: 'weekly', priority: '0.8' },
    { path: '/cv', changefreq: 'monthly', priority: '0.7' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8' },
    { path: '/contact', changefreq: 'monthly', priority: '0.6' },
    { path: '/uses', changefreq: 'monthly', priority: '0.5' },
  ];

  const localizedUrls = LOCALES.flatMap((locale) =>
    mainPages.map(
      (p) => `  <url>
    <loc>${site}/${locale}${p.path === '' ? '/' : p.path}</loc>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
    )
  ).join('\n');

  const legalUrls = `
  <url>
    <loc>${site}/privacy-policy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${site}/terms-of-service</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${site}/gizlilik-politikasi</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>${site}/kullanim-kosullari</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>`;

  const projectUrls = LOCALES.flatMap((locale) =>
    projects.map(
      (project) => `  <url>
    <loc>${site}/${locale}/projects/${project.slug}</loc>
    <lastmod>${project.data.date.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`
    )
  ).join('\n');

  const blogUrls = LOCALES.flatMap((locale) =>
    blogPosts.map(
      (post) => `  <url>
    <loc>${site}/${locale}/blog/${post.slug}</loc>
    <lastmod>${post.data.pubDate.toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`
    )
  ).join('\n');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${localizedUrls}
${legalUrls}
${projectUrls}
${blogUrls}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
};
