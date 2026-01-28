import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    tagline: z.string(),
    description: z.string(),
    category: z.string(),
    date: z.coerce.date(),
    role: z.string(),
    platform: z.string(),
    technologies: z.array(z.string()),
    github: z.string().url().optional(),
    demo: z.string().url().optional(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(), // English title (fallback)
    titleTr: z.string().optional(), // Turkish title
    description: z.string(), // English description (fallback)
    descriptionTr: z.string().optional(), // Turkish description
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    tagsTr: z.array(z.string()).optional(), // Turkish tags
    readTime: z.number().default(5),
  }),
});

export const collections = {
  projects,
  blog,
};


