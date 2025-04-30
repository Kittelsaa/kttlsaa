import { getCollection } from 'astro:content';

// Process wiki links in content
export function processWikiLinks(content) {
  if (!content) return '';
  
  const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
  
  // Use a single pass replacement to avoid recursion issues
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

// Get backlinks for a note
export async function getBacklinks(currentSlug, maxDepth = 1) {
  if (maxDepth <= 0) return []; // Prevent infinite recursion
  
  const backlinks = [];
  const allNotes = await getCollection('notes');
  
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
        growthStage: note.data.growthStage,
        description: note.data.description || ''
      });
    }
  }
  
  return backlinks;
}

// Get all unique topics from notes
export async function getAllTopics() {
  const notes = await getCollection('notes');
  return [...new Set(notes.flatMap(note => note.data.topics || []))];
}

/**
 * Safely processes wiki links with recursion protection
 * @param content Content to process
 * @param processedSlugs Set of already processed slugs to prevent infinite recursion
 * @returns Processed content
 */
export function safeProcessWikiLinks(content: string, processedSlugs: Set<string> = new Set()) {
  if (!content) return '';
  
  // Process wiki links with recursion protection
  return content.replace(
    /\[\[(.*?)(?:\|(.*?))?\]\]/g, 
    (match, slug, displayText) => {
      if (!slug || slug.trim() === '') {
        return displayText || match;
      }
      
      // Create a normalized version of the slug for checking
      const normalizedSlug = slug.toLowerCase().trim();
      
      // Skip if we've already processed this slug to prevent infinite recursion
      if (processedSlugs.has(normalizedSlug)) {
        return displayText || slug;
      }
      
      // Mark this slug as processed
      processedSlugs.add(normalizedSlug);
      
      const display = displayText || slug;
      const linkSlug = slug.toLowerCase().replace(/ /g, '-');
      return `<a href="/notes/${linkSlug}" class="wiki-link">${display}</a>`;
    }
  );
}

// Improve the findBacklinks function with better recursion protection
export async function findBacklinks(currentSlug: string, maxDepth = 1) {
  // Create a Set to track processed slugs across recursive calls
  const processedSlugs = new Set<string>();
  return findBacklinksInternal(currentSlug, maxDepth, processedSlugs);
}

// Internal implementation with recursion tracking
async function findBacklinksInternal(currentSlug: string, maxDepth = 1, processedSlugs: Set<string> = new Set()) {
  if (maxDepth <= 0) return []; // Prevent infinite recursion
  if (processedSlugs.has(currentSlug)) return []; // Skip already processed slugs
  
  processedSlugs.add(currentSlug); // Mark as processed
  
  const backlinks = [];
  const allNotes = await getCollection('notes');
  
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
        growthStage: note.data.growthStage,
        description: note.data.description || ''
      });
    }
  }
  
  return backlinks;
}

// Improved getOutboundLinks function with better recursion protection
export async function getOutboundLinks(note, maxDepth = 1) {
  // Create a Set to track processed slugs across recursive calls
  const processedSlugs = new Set<string>();
  return getOutboundLinksInternal(note, maxDepth, processedSlugs);
}

// Internal implementation with recursion tracking
async function getOutboundLinksInternal(note, maxDepth = 1, processedSlugs: Set<string> = new Set()) {
  if (maxDepth <= 0) return []; // Prevent infinite recursion
  if (!note || !note.body) return [];
  if (processedSlugs.has(note.slug)) return []; // Skip already processed notes
  
  processedSlugs.add(note.slug); // Mark as processed
  
  const outboundLinks = [];
  const allNotes = await getCollection('notes');
  const content = note.body;
  
  // Find all wiki links in the content
  const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
  let match;
  const linkProcessedSlugs = new Set(); // Track processed slugs to avoid duplicates
  
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const linkedSlug = match[1].toLowerCase().replace(/ /g, '-');
    
    // Skip if we've already processed this slug
    if (linkProcessedSlugs.has(linkedSlug)) continue;
    linkProcessedSlugs.add(linkedSlug);
    
    // Find the linked note
    const linkedNote = allNotes.find(n => 
      n.slug === linkedSlug || 
      n.data.aliases?.some(alias => alias.toLowerCase().replace(/ /g, '-') === linkedSlug)
    );
    
    if (linkedNote) {
      outboundLinks.push({
        title: linkedNote.data.title,
        slug: linkedNote.slug,
        growthStage: linkedNote.data.growthStage,
        description: linkedNote.data.description || ''
      });
    }
  }
  
  return outboundLinks;
}














