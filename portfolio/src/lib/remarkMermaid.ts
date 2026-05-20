import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';
import type { Plugin } from 'unified';

// Transforms ```mermaid blocks into <MermaidDiagram code="..." /> before shiki runs
export const remarkMermaid: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'code', (node: Code, index, parent) => {
    if (node.lang !== 'mermaid' || index == null || !parent) return;

    // Escape backticks and template literal chars in the code string
    const escaped = node.value
      .replace(/\\/g, '\\\\')
      .replace(/`/g, '\\`')
      .replace(/\$/g, '\\$');

    (parent.children as unknown[])[index] = {
      type: 'mdxJsxFlowElement',
      name: 'MermaidDiagram',
      attributes: [
        { type: 'mdxJsxAttribute', name: 'code', value: escaped },
      ],
      children: [],
    };
  });
};
