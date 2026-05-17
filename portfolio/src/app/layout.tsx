import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Leo Nguyen',
    default: 'Leo Nguyen — AI Research & Blog',
  },
  description: 'Personal learning blog by Nguyen Quoc Huy (Leo) — ML, AI, LLMs, DevOps, and engineering reflections.',
  authors: [{ name: 'Nguyen Quoc Huy' }],
  metadataBase: new URL('https://leoblog.vercel.app'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
