import React from 'react';
import Link from 'next/link';
import { Clock, Calendar } from 'lucide-react';
import { Article } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';

interface ArticleCardProps {
  article: Article;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '22px',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-sm)',
      }}
      className="ai11-card"
    >
      <div>
        <div style={{ marginBottom: '12px' }}>
          <Badge variant="accent" size="sm">
            {article.category}
          </Badge>
        </div>

        <h3
          style={{
            fontSize: '1.0625rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            lineHeight: 1.35,
            letterSpacing: '-0.01em',
            marginBottom: '10px',
          }}
        >
          <Link
            href={`/blog/${article.slug}`}
            style={{
              color: 'inherit',
              transition: 'color var(--transition-fast)',
            }}
          >
            {article.title}
          </Link>
        </h3>

        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '18px',
          }}
        >
          {article.excerpt}
        </p>
      </div>

      <div
        style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '14px',
          marginTop: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <div>
          <div
            style={{
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
            }}
          >
            {article.author.name}
          </div>
          <div
            style={{
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
            }}
          >
            {article.author.role}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Calendar size={12} />
            {article.publishedAt}
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Clock size={12} />
            {article.readTime}
          </span>
        </div>
      </div>
    </article>
  );
};
