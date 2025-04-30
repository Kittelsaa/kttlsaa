import { visit } from "unist-util-visit";
import linkMaps from "../links.json";

export function remarkWikiLink() {
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      const matches = Array.from(node.value.matchAll(/\[\[(.*?)\]\]/g));
      if (!matches.length) return;

      const children = [];
      let lastIndex = 0;

      matches.forEach((match) => {
        const [fullMatch, linkText] = match;
        const startIndex = match.index;
        const endIndex = startIndex + fullMatch.length;

        // Add text before the match
        if (startIndex > lastIndex) {
          children.push({
            type: "text",
            value: node.value.slice(lastIndex, startIndex),
          });
        }

        // Find the matching post in linkMaps
        const matchedPost = linkMaps.find((post) =>
          post.ids.some((id) => id.toLowerCase() === linkText.toLowerCase())
        );

        if (matchedPost) {
          // Create a link node with the wiki-link class
          children.push({
            type: "link",
            url: `/${matchedPost.slug}`,
            data: {
              hProperties: {
                className: ["wiki-link"], // Add the wiki-link class
              },
            },
            children: [
              {
                type: "text",
                value: linkText,
              },
            ],
          });
        } else {
          // No match found, just add as plain text
          children.push({
            type: "text",
            value: linkText,
          });
        }

        lastIndex = endIndex;
      });

      // Add any remaining text
      if (lastIndex < node.value.length) {
        children.push({
          type: "text",
          value: node.value.slice(lastIndex),
        });
      }

      // Replace the current node with the new children
      parent.children.splice(index, 1, ...children);
    });
  };
}
