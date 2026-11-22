import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        { source: '/en', destination: '/home.html' },
        { source: '/vi', destination: '/home.vi.html' },
        ...['projects', 'strategy', 'feedback', 'reliability'].flatMap((page) => [
          { source: `/en/${page}`, destination: `/${page}.html` },
          { source: `/vi/${page}`, destination: `/${page}.vi.html` },
        ]),
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return [
      {
        source: '/home(.vi)?.html',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=0, must-revalidate' }],
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/search-index.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=300, stale-while-revalidate=86400' }],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
