import React from 'react';
import { getTrendingTools } from '@/lib/services/tools';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ToolCard } from '@/components/cards/ToolCard';

export const TrendingToolsSection = async () => {
  const tools = await getTrendingTools(6);

  return (
    <section style={{ padding: '64px 0' }}>
      <div className="container">
        <SectionHeading
          badge="SURGING MOMENTUM"
          title="Trending AI Tools"
          subtitle="Breakthrough tools and next-gen engines gaining significant developer and creative traction this week."
          actionText="View trending rankings"
          actionHref="/tools?sort=trending"
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
