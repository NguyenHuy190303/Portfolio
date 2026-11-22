import { Inter, Playfair, JetBrains_Mono } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
});

export const playfair = Playfair({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});
