import type { Metadata } from 'next';
import './globals.css';
import './polish-fonts.css';
import './polish-corners.css';
import './polish-nav.css';
import { OG_IMAGE, SITE_URL } from '@/lib/utils';

const description = 'Leo Nguyen (Nguyen Quoc Huy), AI Lead at Trivita AI in Vietnam. AI agents, evaluation and reliability, medical AI and GPU serving. Technical notes on LLMs, evaluation and Python.';

export const metadata: Metadata = {
  title: {
    template: '%s | Leo Nguyen',
    default: 'Leo Nguyen — AI Lead',
  },
  description,
  authors: [{ name: 'Leo Nguyen' }],
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: 'Leo Nguyen',
    title: 'Leo Nguyen — AI Lead',
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
