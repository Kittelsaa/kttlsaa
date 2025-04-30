import { visit } from 'unist-util-visit';

// Set to track processed files to prevent infinite recursion
const processedFiles = new Set();

export function remarkPlugin() {
  return (tree, file) => {
    // Reset the processed files set for each new file
    if (file.history && file.history.length > 0) {
      const currentFile = file.history[0];
      if (processedFiles.has(currentFile)) {
        // Skip if we've already processed this file
        return;
      }
      processedFiles.add(currentFile);
    }

    // Process wiki links
    visit(tree, 'text', (node) => {
      const regex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
      const value = node.value;
      const matches = [];
      let match;
      
      // Find all matches first
      while ((match = regex.exec(value)) !== null) {
        matches.push({
          start: match.index,
          end: match.index + match[0].length,
          target: match[1],
          label: match[2] || match[1]
        });
      }
      
      // If no matches, return early
      if (matches.length === 0) return;
      
      // Replace matches with links, working backwards to preserve indices
      const children = [];
      let lastIndex = 0;
      
      for (const match of matches) {
        // Add text before the match
        if (match.start > lastIndex) {
          children.push({
            type: 'text',
            value: value.slice(lastIndex, match.start)
          });
        }
        
        // Create the link node
        const slug = match.target.toLowerCase().replace(/ /g, '-');
        children.push({
          type: 'link',
          url: `/notes/${slug}`,
          children: [{ type: 'text', value: match.label }],
          data: { hProperties: { className: 'wiki-link' } }
        });
        
        lastIndex = match.end;
      }
      
      // Add any remaining text
      if (lastIndex < value.length) {
        children.push({
          type: 'text',
          value: value.slice(lastIndex)
        });
      }
      
      // Replace the current node with the new children
      node.type = 'paragraph';
      node.children = children;
      delete node.value;
    });
  };
}


