import type { Root, InlineCode } from 'mdast';
import type { Plugin } from 'unified';
import { visit } from 'unist-util-visit';

// Rails path patterns
const RAILS_PATH_PATTERN = /^(app|db|config|test)\/.+$/;

export interface RailsPathLinkOptions {
  className?: string;
}

const remarkRailsPathLinks: Plugin<[RailsPathLinkOptions?], Root> = (options = {}) => {
  const className = options.className || 'rails-path-link';

  return (tree, file) => {
    visit(tree, 'inlineCode', (node: InlineCode, index, parent) => {
      if (!parent || typeof index !== 'number') return;

      // Check if the inline code content matches Rails path pattern
      const content = node.value;
      if (!RAILS_PATH_PATTERN.test(content)) return;

      // Replace the inline code node with an HTML node containing a link
      const htmlNode = {
        type: 'html',
        value: `<button class="${className}" data-rails-path="${content}"><code>${content}</code></button>`
      };

      parent.children[index] = htmlNode as any;
    });
  };
};

export default remarkRailsPathLinks;
