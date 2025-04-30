import { getCollection } from 'astro:content';

// Function to get a note by slug
export async function getNote(slug) {
  const notes = await getCollection('notes');
  return notes.find(note => note.slug === slug);
}

// Export the findBacklinks function
export async function findBacklinks(currentSlug, maxDepth = 1) {
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
      backlinks.push(note);
    }
  }
  
  return backlinks;
}

// Export the getOutboundLinks function
export async function getOutboundLinks(note, maxDepth = 1) {
  if (maxDepth <= 0) return []; // Prevent infinite recursion
  
  // Check if outbound links are defined in frontmatter
  if (note.data.outboundLinks) {
    return note.data.outboundLinks;
  }
  
  // Otherwise, extract links from content
  const outboundLinks = [];
  const content = note.body;
  const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
  let match;
  
  const processedSlugs = new Set(); // To avoid duplicates
  
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const linkedSlug = match[1].toLowerCase().replace(/ /g, '-');
    
    // Skip if already processed
    if (processedSlugs.has(linkedSlug)) continue;
    processedSlugs.add(linkedSlug);
    
    // Find the linked note
    const linkedNote = await getNote(linkedSlug);
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

// Detect circular references with async support
export async function detectCircularReferences(startSlug, visited = new Set()) {
  if (visited.has(startSlug)) {
    return true; // Circular reference detected
  }
  
  visited.add(startSlug);
  
  // Get outbound links for this note
  const note = await getNote(startSlug);
  if (!note) return false;
  
  // Get outbound links from the note content
  const outboundSlugs = await getOutboundSlugsFromNote(note);
  
  // Check each outbound link for circular references
  for (const slug of outboundSlugs) {
    if (await detectCircularReferences(slug, new Set([...visited]))) {
      return true;
    }
  }
  
  return false;
}

// Helper function to extract outbound slugs from a note
async function getOutboundSlugsFromNote(note) {
  const content = note.body;
  const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
  const slugs = new Set();
  let match;
  
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    const linkedSlug = match[1].toLowerCase().replace(/ /g, '-');
    slugs.add(linkedSlug);
  }
  
  return [...slugs];
}

