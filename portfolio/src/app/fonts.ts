import { Montserrat, Playfair, Pinyon_Script, JetBrains_Mono } from 'next/font/google';

export const montserrat = Montserrat({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const playfair = Playfair({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-playfair',
  display: 'swap',
  style: ['normal', 'italic'],
  axes: ['opsz'],
});

export const pinyon = Pinyon_Script({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-pinyon',
  display: 'swap',
  weight: '400',
  preload: false,
});

export const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
  preload: false,
});
