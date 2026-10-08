import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.8125rem',
        color: 'var(--text-muted)',
        marginBottom: '20px',
        flexWrap: 'wrap',
      }}
    >
      <Link
        href="/"
        style={{
          color: 'var(--text-secondary)',
          transition: 'color var(--transition-fast)',
        }}
      >
        AI11
      </Link>

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            <ChevronRight size={12} style={{ color: 'var(--text-muted)' }} />
            {item.href && !isLast ? (
              <Link
                href={item.href}
                style={{
                  color: 'var(--text-secondary)',
                  transition: 'color var(--transition-fast)',
                }}
              >
                {item.label}
              </Link>
            ) : (
              <span
                aria-current={isLast ? 'page' : undefined}
                style={{
                  color: isLast ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: isLast ? 600 : 400,
                }}
              >
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
