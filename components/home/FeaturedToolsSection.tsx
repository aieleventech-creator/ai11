import React from 'react';
import { getFeaturedTools } from '@/lib/services/tools';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ToolCard } from '@/components/cards/ToolCard';

export const FeaturedToolsSection = async () => {
  const tools = await getFeaturedTools(8);

  return (
    <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeading
          badge="CURATED PICKS"
          title="Featured AI Tools"
          subtitle="Top-tier AI products evaluated for high fidelity, developer velocity, and proven capability."
          actionText="Explore all tools"
          actionHref="/tools"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  );
};
