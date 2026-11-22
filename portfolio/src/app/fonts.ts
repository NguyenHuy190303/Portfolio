import { Inter, Newsreader, JetBrains_Mono } from 'next/font/google';

// One sans, one serif accent, one mono for the whole site. The static home pages
// (public/polish-fonts.css) load the same three families from Google Fonts.
// All three ship a `vietnamese` subset, including Newsreader italic.
export const inter = Inter({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-inter',
  display: 'swap',
  axes: ['opsz'],
});

// Newsreader is an old-style text serif (close to Iowan Old Style / Baskerville in
// feel). The variable name stays `--font-playfair` so globals.css keeps working.
export const playfair = Newsreader({
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
