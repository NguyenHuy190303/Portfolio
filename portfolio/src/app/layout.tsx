import type { Metadata } from 'next';
import './globals.css';
import { OG_IMAGE, SITE_URL } from '@/lib/utils';

const description = 'Nguyen Quoc Huy (Leo) — AI engineer building Vietnamese medical AI. Notes on LLMs, evaluation, post-training and Python.';

export const metadata: Metadata = {
  title: {
    template: '%s | Leo Nguyen',
    default: 'Nguyen Quoc Huy (Leo) — AI Engineer',
  },
  description,
  authors: [{ name: 'Nguyen Quoc Huy' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: 'Nguyen Quoc Huy (Leo)',
    title: 'Nguyen Quoc Huy (Leo) — AI Engineer',
    description,
    images: [OG_IMAGE],
  },
  twitter: { card: 'summary' },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
