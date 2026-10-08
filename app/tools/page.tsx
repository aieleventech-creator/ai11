import React, { Suspense } from 'react';
import { Metadata } from 'next';
import { getTools, getCategories } from '@/lib/services/tools';
import { ToolsDirectoryClient } from '@/components/directory/ToolsDirectoryClient';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';

export const metadata: Metadata = {
  title: 'Discover AI Tools — Directory & Comparison | AI11',
  description:
    'Find the right AI tools for writing, coding, design, marketing, research, productivity and more. Filter by pricing, platform, and verified benchmarks.',
  alternates: {
    canonical: '/tools',
  },
  openGraph: {
    title: 'Discover AI Tools — AI11 Directory',
    description:
      'Explore verified AI tools across writing, coding, image synthesis, and automation.',
    url: 'https://ai11.tech/tools',
  },
};

export default async function ToolsPage() {
  const [toolsResult, categories] = await Promise.all([
    getTools({ limit: 100 }),
    getCategories(),
  ]);

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '80px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumbs items={[{ label: 'Tools', href: '/tools' }]} />

        {/* Directory Page Heading */}
        <div style={{ maxWidth: '780px', marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.2,
              marginBottom: '10px',
            }}
          >
            Discover AI tools
          </h1>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.55,
            }}
          >
            Find the right AI tools for writing, coding, design, marketing, research, productivity and more.
          </p>
        </div>

        {/* Client Directory Interactive Experience */}
        <Suspense
          fallback={
            <div
              style={{
                height: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
              }}
            >
              Loading directory...
            </div>
          }
        >
          <ToolsDirectoryClient
            initialTools={toolsResult.data}
            categories={categories}
          />
        </Suspense>
      </div>
    </div>
  );
}
