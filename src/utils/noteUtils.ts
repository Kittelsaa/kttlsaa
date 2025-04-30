import { getCollection } from 'astro:content';

// Process wiki-style links in content
export function processWikiLinks(content: string) {
  // Match [[link]] or [[link|display text]]
  const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
  
  return content.replace(wikiLinkRegex, (match, slug, displayText) => {
    // Check if slug is empty or undefined
    if (!slug || slug.trim() === '') {
      return displayText || match;
    }
    
    const display = displayText || slug;
    const linkSlug = slug.toLowerCase().replace(/ /g, '-');
    return `<a href="/notes/${linkSlug}" class="wiki-link">${display}</a>`;
  });
}

// Find all notes that link to the current note
export async function getBacklinks(currentSlug: string) {
  const allNotes = await getCollection('notes');
  const backlinks = [];

  for (const note of allNotes) {
    if (note.slug === currentSlug) continue; // Skip the current note
    
    // Check if this note links to the current note
    const content = note.body;
    const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
    let match;
    let hasLink = false;

    while ((match = wikiLinkRegex.exec(content)) !== null) {
      const linkedSlug = match[1].toLowerCase().replace(/ /g, '-');
      
      // Also check aliases
      const isDirectLink = linkedSlug === currentSlug;
      const isAliasLink = note.data.aliases?.some(
        alias => alias.toLowerCase().replace(/ /g, '-') === currentSlug
      );
      
      if (isDirectLink || isAliasLink) {
        hasLink = true;
        break; // Only add each note once
      }
    }
    
    if (hasLink) {
      backlinks.push({
        title: note.data.title,
        slug: note.slug,
        growthStage: note.data.growthStage
      });
    }
  }

  return backlinks;
}

// Get outbound links from the current note
export async function getOutboundLinks(currentNote: any) {
  const allNotes = await getCollection('notes');
  const outboundLinks = [];
  
  // Extract wiki links from the note content
  const content = currentNote.body;
  const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
  const linkedSlugs = new Set();
  let match;
  
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const linkedTitle = match[1];
    const linkedSlug = linkedTitle.toLowerCase().replace(/ /g, '-');
    
    // Avoid duplicates
    if (linkedSlugs.has(linkedSlug)) continue;
    linkedSlugs.add(linkedSlug);
    
    // Find the matching note
    const linkedNote = allNotes.find(note => {
      // Check direct slug match
      if (note.slug === linkedSlug) return true;
      
      // Check title match (normalized)
      const normalizedTitle = note.data.title.toLowerCase().replace(/ /g, '-');
      if (normalizedTitle === linkedSlug) return true;
      
      // Check aliases
      return note.data.aliases?.some(
        alias => alias.toLowerCase().replace(/ /g, '-') === linkedSlug
      );
    });
    
    if (linkedNote) {
      outboundLinks.push({
        title: linkedNote.data.title,
        slug: linkedNote.slug,
        growthStage: linkedNote.data.growthStage
      });
    }
  }
  
  return outboundLinks;
}

// Get all unique topics from notes
export async function getAllTopics() {
  const notes = await getCollection('notes');
  return [...new Set(notes.flatMap(note => note.data.topics || []))];
}





