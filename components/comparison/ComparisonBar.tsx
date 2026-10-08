'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layers, X, ArrowRight, Trash2 } from 'lucide-react';
import { useComparison, MAX_COMPARE_TOOLS } from '@/lib/hooks/useComparison';
import { Button } from '@/components/ui/Button';

export const ComparisonBar: React.FC = () => {
  const pathname = usePathname();
  const { selectedSlugs, removeTool, clearComparison, compareUrl } = useComparison();

  // Hide the floating bar on the /compare page itself to avoid redundant controls
  if (selectedSlugs.length === 0 || pathname?.startsWith('/compare')) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        width: '90%',
        maxWidth: '780px',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: 'var(--shadow-lg), 0 0 20px rgba(99, 102, 241, 0.15)',
        padding: '12px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        backdropFilter: 'blur(12px)',
      }}
      role="region"
      aria-label="Comparison dock"
    >
      {/* Left: Info & Selected Tool Pills */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          <Layers size={16} style={{ color: 'var(--accent-text)' }} />
          <span>
            Compare ({selectedSlugs.length}/{MAX_COMPARE_TOOLS})
          </span>
        </div>

        {/* Selected Pills */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          {selectedSlugs.map((slug) => (
            <span
              key={slug}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                padding: '3px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--accent-subtle)',
                border: '1px solid var(--accent-border)',
                color: 'var(--accent-text)',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              <span>{slug}</span>
              <button
                type="button"
                onClick={() => removeTool(slug)}
                aria-label={`Remove ${slug} from comparison`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '2px',
                  borderRadius: '50%',
                  color: 'inherit',
                  cursor: 'pointer',
                }}
              >
                <X size={12} />
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          type="button"
          onClick={clearComparison}
          aria-label="Clear all tools from comparison"
          title="Clear all"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-muted)',
            fontSize: '0.75rem',
            cursor: 'pointer',
            transition: 'color var(--transition-fast)',
          }}
        >
          <Trash2 size={13} />
          <span>Clear</span>
        </button>

        <Link href={compareUrl} style={{ textDecoration: 'none' }}>
          <Button
            variant="primary"
            size="sm"
            icon={<ArrowRight size={14} />}
            iconPosition="right"
          >
            Compare Now
          </Button>
        </Link>
      </div>
    </div>
  );
};
