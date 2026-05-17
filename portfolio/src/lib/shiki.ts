import type { Highlighter } from 'shiki';
import { createHighlighter } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

export function getHighlighter(): Promise<Highlighter> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['github-light', 'github-dark-dimmed'],
      langs: [
        'typescript', 'tsx', 'javascript', 'jsx',
        'python', 'bash', 'shell', 'sql',
        'json', 'yaml', 'toml', 'markdown',
        'css', 'html', 'rust', 'go',
      ],
    });
  }
  return highlighterPromise;
}
