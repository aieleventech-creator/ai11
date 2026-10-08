import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DirectoryPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const DirectoryPagination: React.FC<DirectoryPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav
      aria-label="Pagination"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '6px',
        marginTop: '48px',
        paddingTop: '24px',
        borderTop: '1px solid var(--border-subtle)',
      }}
    >
      <button
        type="button"
        disabled={currentPage <= 1}
        onClick={() => onPageChange(currentPage - 1)}
        aria-label="Previous page"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)',
          backgroundColor: 'var(--bg-surface-elevated)',
          color: currentPage <= 1 ? 'var(--text-muted)' : 'var(--text-primary)',
          fontSize: '0.8125rem',
          cursor: currentPage <= 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage <= 1 ? 0.5 : 1,
        }}
      >
        <ChevronLeft size={14} />
        <span>Previous</span>
      </button>

      {pages.map((p) => {
        const isCurrent = p === currentPage;
        return (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange(p)}
            aria-current={isCurrent ? 'page' : undefined}
            style={{
              width: '34px',
              height: '34px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 'var(--radius-md)',
              border: `1px solid ${isCurrent ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
              backgroundColor: isCurrent ? 'var(--accent-primary)' : 'var(--bg-surface)',
              color: isCurrent ? '#ffffff' : 'var(--text-secondary)',
              fontSize: '0.8125rem',
              fontWeight: isCurrent ? 600 : 400,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            {p}
          </button>
        );
      })}

      <button
        type="button"
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        aria-label="Next page"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '6px 12px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--border-default)',
          backgroundColor: 'var(--bg-surface-elevated)',
          color: currentPage >= totalPages ? 'var(--text-muted)' : 'var(--text-primary)',
          fontSize: '0.8125rem',
          cursor: currentPage >= totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage >= totalPages ? 0.5 : 1,
        }}
      >
        <span>Next</span>
        <ChevronRight size={14} />
      </button>
    </nav>
  );
};
