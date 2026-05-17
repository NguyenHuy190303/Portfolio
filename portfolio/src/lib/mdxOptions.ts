import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeSlug from 'rehype-slug';
import { type MDXRemoteProps } from 'next-mdx-remote/rsc';

// Note: Shiki rehype plugin is applied separately because it needs the async highlighter
export const mdxOptions: MDXRemoteProps['options'] = {
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
    ],
  },
};
