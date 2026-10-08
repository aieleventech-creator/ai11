import React, { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { Scale } from 'lucide-react';
import { getTools } from '@/lib/services/tools';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { ComparePageClient } from '@/components/comparison/ComparePageClient';

export const metadata: Metadata = {
  title: 'Compare AI Tools Side-by-Side | AI11',
  description:
    'Compare features, pricing models, platform support, and pros and cons of leading artificial intelligence tools side by side on AI11.',
  alternates: {
    canonical: '/compare',
  },
  openGraph: {
    title: 'Compare AI Tools Side-by-Side | AI11',
    description:
      'Compare features, pricing models, platform support, and pros and cons of leading artificial intelligence tools side by side on AI11.',
    url: 'https://ai11.tech/compare',
    siteName: 'AI11',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Compare AI Tools Side-by-Side | AI11',
    description:
      'Compare features, pricing models, platform support, and pros and cons of leading artificial intelligence tools side by side on AI11.',
  },
};

export default async function ComparePage() {
  const allToolsResult = await getTools({ limit: 100 });
  const allTools = allToolsResult.data;

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Tools', href: '/tools' },
            { label: 'Tool Comparison' },
          ]}
        />

        {/* Page Header */}
        <div style={{ marginBottom: '32px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--accent-subtle)',
              border: '1px solid var(--accent-border)',
              color: 'var(--accent-text)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              marginBottom: '12px',
            }}
          >
            <Scale size={14} />
            <span>Side-by-Side Analysis</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 2.75rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '12px',
            }}
          >
            Compare AI Tools
          </h1>

          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              maxWidth: '720px',
              lineHeight: 1.5,
            }}
          >
            Evaluate capabilities, verified pricing models, supported platforms, and trade-offs side by side to choose the best solution for your workflow.
          </p>

          {/* Quick Preset Comparisons */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              flexWrap: 'wrap',
              marginTop: '18px',
            }}
          >
            <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Popular comparisons:
            </span>

            {[
              { label: 'ChatGPT vs Claude vs Perplexity', query: 'chatgpt,claude,perplexity' },
              { label: 'Cursor vs GitHub Copilot vs v0', query: 'cursor,github-copilot,v0' },
              { label: 'Midjourney vs Stable Diffusion', query: 'midjourney,stable-diffusion' },
            ].map((preset) => (
              <Link
                key={preset.query}
                href={`/compare?tools=${preset.query}`}
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  backgroundColor: 'var(--bg-surface-elevated)',
                  border: '1px solid var(--border-default)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                }}
              >
                {preset.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Matrix Client Container inside Suspense */}
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
              Loading comparison matrix...
            </div>
          }
        >
          <ComparePageClient allTools={allTools} />
        </Suspense>
      </div>
    </div>
  );
}
