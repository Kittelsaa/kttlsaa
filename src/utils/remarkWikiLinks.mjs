export function remarkPlugin() {
  return function transformer(tree) {
    visit(tree, 'text', function(node) {
      const value = node.value;
      const wikiLinkRegex = /\[\[(.*?)(?:\|(.*?))?\]\]/g;
      
      let match;
      let lastIndex = 0;
      const newNodes = [];
      
      while ((match = wikiLinkRegex.exec(value)) !== null) {
        // Add text before the match
        if (match.index > lastIndex) {
          newNodes.push({
            type: 'text',
            value: value.slice(lastIndex, match.index)
          });
        }
        
        const [fullMatch, slug, displayText] = match;
        const display = displayText || slug;
        const linkSlug = slug.toLowerCase().replace(/ /g, '-');
        
        // Add link node
        newNodes.push({
          type: 'link',
          url: `/notes/${linkSlug}`,
          data: {
            hProperties: {
              className: ['wiki-link']
            }
          },
          children: [{
            type: 'text',
            value: display
          }]
        });
        
        lastIndex = match.index + fullMatch.length;
      }
      
      // Add remaining text
      if (lastIndex < value.length) {
        newNodes.push({
          type: 'text',
          value: value.slice(lastIndex)
        });
      }
      
      if (newNodes.length > 0) {
        node.type = 'paragraph';
        node.children = newNodes;
        delete node.value;
      }
    });
  };
}

// Import the visit function at the top of the file
import { visit } from 'unist-util-visit';