import { visit } from 'unist-util-visit';
import type { Root, Code } from 'mdast';
import type { Plugin } from 'unified';

// Transforms ```mermaid blocks into <MermaidDiagram code={`...`} /> before shiki runs.
// Using a JSX expression attribute (code={...}) so that special chars like < > { } are safe.
export const remarkMermaid: Plugin<[], Root> = () => (tree) => {
  visit(tree, 'code', (node: Code, index, parent) => {
    if (node.lang !== 'mermaid' || index == null || !parent) return;

    // Escape chars that would break a JS string literal
    const jsonStr = JSON.stringify(node.value); // e.g., "\"graph LR\\n    A --> B\""

    (parent.children as unknown[])[index] = {
      type: 'mdxJsxFlowElement',
      name: 'MermaidDiagram',
      attributes: [
        {
          type: 'mdxJsxAttribute',
          name: 'code',
          value: {
            type: 'mdxJsxAttributeValueExpression',
            value: jsonStr,
            data: {
              estree: {
                type: 'Program',
                sourceType: 'module',
                body: [{
                  type: 'ExpressionStatement',
                  expression: {
                    type: 'Literal',
                    value: node.value,
                    raw: jsonStr,
                  },
                }],
              },
            },
          },
        },
      ],
      children: [],
    };
  });
};
