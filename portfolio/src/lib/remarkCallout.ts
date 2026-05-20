/**
 * Rehype plugin: transforms Obsidian-style callouts in blockquote elements.
 *
 * Input (hast from markdown):
 *   <blockquote><p>[!danger] Title\nBody…</p></blockquote>
 *
 * Output:
 *   <div class="callout callout-danger">
 *     <div class="callout-title"><span class="callout-icon">🚨</span>Title</div>
 *     <div class="callout-body">…Body…</div>
 *   </div>
 */
import type { Plugin } from 'unified';
import type { Root, Element, Text, Node } from 'hast';
import { visit } from 'unist-util-visit';

const CALLOUT_RE = /^\[!(\w+)\](?:\s+(.+))?/;

const CALLOUT_ICONS: Record<string, string> = {
  note: 'ℹ️',
  info: 'ℹ️',
  tip: '💡',
  warning: '⚠️',
  danger: '🚨',
  caution: '⚠️',
  important: '❗',
  success: '✅',
  question: '❓',
  quote: '❝',
  abstract: '📋',
  summary: '📋',
  todo: '☑️',
  example: '📌',
  bug: '🐛',
  experiment: '🧪',
};

function firstText(node: Node): string {
  if (node.type === 'text') return (node as Text).value;
  if ('children' in node) {
    for (const child of (node as Element).children) {
      const t = firstText(child);
      if (t) return t;
    }
  }
  return '';
}

export const rehypeCallout: Plugin<[], Root> = () => (tree) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  visit(tree, 'element', (node: Element, index: number | undefined, parent: any) => {
    if (node.tagName !== 'blockquote' || !parent || index === undefined) return;

    // First meaningful child must be a <p>
    const firstP = node.children.find(
      (c): c is Element => c.type === 'element' && (c as Element).tagName === 'p'
    );
    if (!firstP) return;

    const rawText = firstText(firstP);
    const match = rawText.match(CALLOUT_RE);
    if (!match) return;

    const type = match[1].toLowerCase();
    const title = match[2] ?? type.charAt(0).toUpperCase() + type.slice(1);
    const icon = CALLOUT_ICONS[type] ?? 'ℹ️';

    // Strip [!type] prefix from first text node inside firstP
    const stripFirstToken = (p: Element): Element => {
      const kids = p.children.map((c, i) => {
        if (i === 0 && c.type === 'text') {
          const stripped = (c as Text).value.replace(CALLOUT_RE, '').trimStart();
          return stripped ? { ...c, value: stripped } as Text : null;
        }
        return c;
      }).filter(Boolean) as typeof p.children;
      return { ...p, children: kids };
    };

    const restChildren = node.children.map((c) =>
      c === firstP ? stripFirstToken(firstP) : c
    ).filter((c) => {
      // Remove empty paragraphs
      if (c.type === 'element' && (c as Element).tagName === 'p') {
        return (c as Element).children.length > 0;
      }
      return true;
    });

    const calloutDiv: Element = {
      type: 'element',
      tagName: 'div',
      properties: { className: [`callout`, `callout-${type}`], 'data-callout': type },
      children: [
        {
          type: 'element',
          tagName: 'div',
          properties: { className: ['callout-title'] },
          children: [
            {
              type: 'element',
              tagName: 'span',
              properties: { className: ['callout-icon'] },
              children: [{ type: 'text', value: icon }],
            },
            { type: 'text', value: title },
          ],
        },
        {
          type: 'element',
          tagName: 'div',
          properties: { className: ['callout-body'] },
          children: restChildren,
        },
      ],
    };

    parent.children.splice(index, 1, calloutDiv);
  });
};
