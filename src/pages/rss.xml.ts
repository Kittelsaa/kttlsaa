import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const notes = await getCollection('notes', ({ data }) => {
    return data.draft !== true;
  });

  const items = notes
    .sort((a, b) => {
      const dateA = new Date(a.data.updated || a.data.startDate).getTime();
      const dateB = new Date(b.data.updated || b.data.startDate).getTime();
      return dateB - dateA;
    })
    .map((note) => {
      const wasUpdated = note.data.updated && note.data.updated !== note.data.startDate;
      const title = wasUpdated
        ? `[Updated: ${note.data.updated}] ${note.data.title}`
        : note.data.title;
      const pubDate = wasUpdated
        ? new Date(note.data.updated!)
        : new Date(note.data.startDate);

      return {
        title,
        description: note.data.description ?? '',
        pubDate,
        link: `/notes/${note.id.replace(/^notes\//, '').replace(/\.(md|mdx)$/, '')}`,
      };
    });

  return rss({
    title: "Kittelsaa's Digital Garden",
    description: 'A living ecosystem of ideas, explorations & essays — from emerging seedlings of thought to fully grown trees.',
    site: context.site!,
    items,
    customData: `<language>en-us</language>`,
  });
}