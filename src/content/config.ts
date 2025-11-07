import { defineCollection, z } from 'astro:content';

const essays = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.date(),
    author: z.string().default('Witness in the Machine'),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { essays };
