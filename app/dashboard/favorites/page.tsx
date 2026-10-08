import React from 'react';
import { Metadata } from 'next';
import { getTools, getCategories } from '@/lib/services/tools';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { FavoritesClient } from '@/components/dashboard/FavoritesClient';

export const metadata: Metadata = {
  title: 'Saved AI Tools | AI11 Dashboard',
  description:
    'Search, filter, and organize your bookmarked AI tools from your AI11 workspace.',
  alternates: {
    canonical: '/dashboard/favorites',
  },
};

export default async function FavoritesPage() {
  const allToolsResult = await getTools({ limit: 100 });
  const allTools = allToolsResult.data;
  const categories = await getCategories();

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Saved Tools' },
          ]}
        />

        {/* Page Title */}
        <div style={{ marginBottom: '32px' }}>
          <h1
            style={{
              fontSize: 'clamp(2rem, 3.5vw, 2.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
              lineHeight: 1.15,
              marginBottom: '8px',
            }}
          >
            Saved AI Tools
          </h1>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
            }}
          >
            Filter, compare, or launch the artificial intelligence applications you have saved during your discovery sessions.
          </p>
        </div>

        {/* Favorites Client Container */}
        <FavoritesClient allTools={allTools} categories={categories} />
      </div>
    </div>
  );
}
