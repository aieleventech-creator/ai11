import React from 'react';
import { Metadata } from 'next';
import { getTools } from '@/lib/services/tools';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { DashboardOverviewClient } from '@/components/dashboard/DashboardOverviewClient';

export const metadata: Metadata = {
  title: 'Workspace Dashboard | AI11',
  description:
    'Manage your saved AI tools, active comparison sessions, and discovery history in your AI11 workspace.',
  alternates: {
    canonical: '/dashboard',
  },
};

export default async function DashboardPage() {
  const allToolsResult = await getTools({ limit: 100 });
  const allTools = allToolsResult.data;

  return (
    <div style={{ paddingTop: '32px', paddingBottom: '96px' }}>
      <div className="container">
        {/* Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Dashboard' },
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
            Workspace Dashboard
          </h1>
          <p
            style={{
              fontSize: '1.0625rem',
              color: 'var(--text-secondary)',
              maxWidth: '640px',
            }}
          >
            Your personalized AI discovery space: bookmarked tools, active comparisons, and quick shortcuts.
          </p>
        </div>

        {/* Dashboard Client Area */}
        <DashboardOverviewClient allTools={allTools} />
      </div>
    </div>
  );
}
