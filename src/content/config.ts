import { defineCollection, z } from 'astro:content';

const notes = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    startDate: z.string(),
    updated: z.string(),
    type: z.enum(['note', 'essay']).optional().default('note'),
    topics: z.array(z.string()).optional(),
    growthStage: z.enum(['seedling', 'budding', 'evergreen']),
    aliases: z.array(z.string()).optional(),
    featured: z.boolean().optional(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
      width: z.string().optional(),
    }).optional(),
    video: z.object({
      url: z.string(),
      title: z.string(),
    }).optional(),
    outboundLinks: z.array(z.object({
      title: z.string(),
      slug: z.string(),
      growthStage: z.enum(['seedling', 'budding', 'evergreen']),
      description: z.string(),
    })).optional(),
    inboundLinks: z.array(z.object({
      title: z.string(),
      slug: z.string(),
      growthStage: z.enum(['seedling', 'budding', 'evergreen']),
      description: z.string(),
    })).optional(),
  })
});

export const collections = {
  notes
};



