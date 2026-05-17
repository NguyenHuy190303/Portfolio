import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const sourceSerif = Source_Serif_4({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-source-serif',
  display: 'swap',
  style: ['normal', 'italic'],
  weight: ['300', '400', '600', '700'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});
