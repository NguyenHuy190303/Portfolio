import type { Metadata } from 'next';
import './globals.css';
import { OG_IMAGE, SITE_URL } from '@/lib/utils';

const description = 'Leo Nguyen (Nguyen Quoc Huy) — AI engineer building Vietnamese medical AI. Notes on LLMs, evaluation, post-training and Python.';

export const metadata: Metadata = {
  title: {
    template: '%s | Leo Nguyen',
    default: 'Leo Nguyen — AI Engineer',
  },
  description,
  authors: [{ name: 'Leo Nguyen' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: 'Leo Nguyen',
    title: 'Leo Nguyen — AI Engineer',
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
