import type { Metadata } from 'next';
import { Rajdhani, Crimson_Pro, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const crimsonPro = Crimson_Pro({
  variable: '--font-crimson-pro',
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DEAD HABITS: A Zombie Slayer\'s Guide to AI Fluency',
  description: 'A gamified self-study course teaching AI fluency through experiential learning at Hargrove Library. Identify and eliminate your AI bad habits.',
  openGraph: {
    title: 'DEAD HABITS',
    description: 'Kill your AI bad habits. Build real fluency.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Material Symbols Outlined — weight 200 */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body
        className={`${rajdhani.variable} ${crimsonPro.variable} ${jetbrainsMono.variable} antialiased bg-[#0A1A0E] text-[#F0EBE0]`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
