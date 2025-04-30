/**
 * Utility functions for handling bi-directional links in the digital garden
 */

/**
 * Finds all backlinks to a specific note
 * @param {Array} allNotes - All notes in the garden
 * @param {string} currentSlug - The slug of the current note
 * @returns {Array} - Array of notes that link to the current note
 */
export function findBacklinks(allNotes, currentSlug) {
  return allNotes.filter(note => {
    // Check if the note content contains a link to the current note
    const wikiLinkRegex = new RegExp(`\\[\\[(${currentSlug}|${note.data.title})\\]\\]`, 'g');
    return note.slug !== currentSlug && note.body.match(wikiLinkRegex);
  }).map(note => ({
    title: note.data.title,
    slug: note.slug,
    growthStage: note.data.growthStage
  }));
}

/**
 * Extracts wiki-style links from content
 * @param {string} content - The content to parse
 * @returns {Array} - Array of extracted link names
 */
export function extractWikiLinks(content) {
  const wikiLinkRegex = /\[\[(.*?)\]\]/g;
  const matches = [...content.matchAll(wikiLinkRegex)];
  return matches.map(match => match[1]);
}