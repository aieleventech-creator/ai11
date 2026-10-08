import React from 'react';
import { ARTICLES } from '@/lib/data/articles';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ArticleCard } from '@/components/cards/ArticleCard';

export const LatestArticlesSection: React.FC = () => {
  return (
    <section style={{ padding: '64px 0', backgroundColor: 'var(--bg-surface)' }}>
      <div className="container">
        <SectionHeading
          badge="EDITORIAL & ANALYSIS"
          title="Latest AI Articles"
          subtitle="Engineering benchmarks, architecture deep dives, and pragmatic tool comparison guides."
          actionText="Visit AI Blog"
          actionHref="/blog"
        />

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
          }}
        >
          {ARTICLES.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
};
