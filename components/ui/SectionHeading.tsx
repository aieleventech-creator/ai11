import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Badge } from './Badge';

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  actionText?: string;
  actionHref?: string;
  align?: 'left' | 'center';
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  badge,
  title,
  subtitle,
  actionText,
  actionHref,
  align = 'left',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: align === 'center' ? 'center' : 'flex-end',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '32px',
        textAlign: align,
      }}
    >
      <div style={{ maxWidth: '640px' }}>
        {badge && (
          <div style={{ marginBottom: '8px' }}>
            <Badge variant="accent" size="sm">
              {badge}
            </Badge>
          </div>
        )}
        <h2
          style={{
            fontSize: 'clamp(1.5rem, 3vw, 2rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            lineHeight: 1.25,
            marginBottom: subtitle ? '8px' : 0,
          }}
        >
          {title}
        </h2>
        {subtitle && (
          <p
            style={{
              fontSize: '0.9375rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.5,
            }}
          >
            {subtitle}
          </p>
        )}
      </div>

      {actionText && actionHref && (
        <Link
          href={actionHref}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.875rem',
            fontWeight: 500,
            color: 'var(--accent-text)',
            transition: 'color var(--transition-fast)',
            paddingBottom: '4px',
          }}
        >
          <span>{actionText}</span>
          <ArrowRight size={14} />
        </Link>
      )}
    </div>
  );
};
