import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SearchModal } from '@/components/layout/SearchModal';
import { ComparisonBar } from '@/components/comparison/ComparisonBar';

export const metadata: Metadata = {
  title: 'AI11 — Your AI Operating Platform | Discover the Right AI for Any Job',
  description:
    'Explore the best AI tools for writing, coding, design, marketing, research, productivity and more. Curated directory, technical evaluations, and workflow discovery.',
  metadataBase: new URL('https://ai11.tech'),
  alternates: {
    canonical: '/',
  },
  keywords: [
    'AI Tools',
    'AI Tools Directory',
    'Best AI Tools',
    'AI Code Editors',
    'AI Image Generators',
    'AI Writing Assistants',
    'AI11',
    'AI Operating Platform',
  ],
  authors: [{ name: 'AI11 Team', url: 'https://ai11.tech' }],
  creator: 'AI11',
  publisher: 'AI11',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'AI11 — Your AI Operating Platform',
    description:
      'Discover the right AI for any job. Explore curated AI tools for writing, coding, design, and automation.',
    url: 'https://ai11.tech',
    siteName: 'AI11',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI11 — Your AI Operating Platform',
    description:
      'Discover the right AI for any job. Explore curated AI tools for writing, coding, design, and automation.',
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#090a0f' },
    { media: '(prefers-color-scheme: light)', color: '#f8fafc' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const storedTheme = localStorage.getItem('ai11-theme');
                  if (storedTheme) {
                    document.documentElement.setAttribute('data-theme', storedTheme);
                  } else {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <Header />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
        <Footer />
        <SearchModal />
        <ComparisonBar />
      </body>
    </html>
  );
}
