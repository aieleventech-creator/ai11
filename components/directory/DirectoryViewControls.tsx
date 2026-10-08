'use client';

import React from 'react';
import { LayoutGrid, List, SlidersHorizontal } from 'lucide-react';

interface DirectoryViewControlsProps {
  totalResults: number;
  sortBy: string;
  onSortChange: (sort: 'popular' | 'trending' | 'newest' | 'alphabetical') => void;
  viewMode: 'grid' | 'list';
  onViewModeChange: (mode: 'grid' | 'list') => void;
  onOpenMobileFilters: () => void;
  hasActiveFilters: boolean;
}

export const DirectoryViewControls: React.FC<DirectoryViewControlsProps> = ({
  totalResults,
  sortBy,
  onSortChange,
  viewMode,
  onViewModeChange,
  onOpenMobileFilters,
  hasActiveFilters,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
        paddingBottom: '20px',
        marginBottom: '24px',
        borderBottom: '1px solid var(--border-subtle)',
      }}
    >
      {/* Count & Mobile Filter Trigger */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            fontWeight: 500,
          }}
        >
          <strong style={{ color: 'var(--text-primary)' }}>{totalResults}</strong> AI {totalResults === 1 ? 'tool' : 'tools'} found
        </p>

        {/* Mobile Filter Button */}
        <button
          type="button"
          onClick={onOpenMobileFilters}
          className="mobile-only"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8125rem',
            fontWeight: 500,
            color: hasActiveFilters ? 'var(--accent-text)' : 'var(--text-secondary)',
            backgroundColor: hasActiveFilters ? 'var(--accent-subtle)' : 'var(--bg-surface-elevated)',
            border: `1px solid ${hasActiveFilters ? 'var(--accent-border)' : 'var(--border-default)'}`,
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
          }}
        >
          <SlidersHorizontal size={14} />
          <span>Filters</span>
          {hasActiveFilters && (
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
              }}
            />
          )}
        </button>
      </div>

      {/* Sort Dropdown & Grid/List Toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label
            htmlFor="sort-select"
            style={{
              fontSize: '0.8125rem',
              color: 'var(--text-muted)',
              display: 'none',
            }}
          >
            Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) =>
              onSortChange(
                e.target.value as 'popular' | 'trending' | 'newest' | 'alphabetical'
              )
            }
            aria-label="Sort tools"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.8125rem',
              padding: '6px 10px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="popular">Curated Rank</option>
            <option value="trending">Trending First</option>
            <option value="newest">Recently Added</option>
            <option value="alphabetical">A–Z</option>
          </select>
        </div>

        {/* View mode toggle */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '2px',
          }}
        >
          <button
            type="button"
            onClick={() => onViewModeChange('grid')}
            aria-label="Grid view"
            title="Grid view"
            style={{
              padding: '4px 6px',
              borderRadius: 'var(--radius-sm)',
              color: viewMode === 'grid' ? 'var(--accent-text)' : 'var(--text-muted)',
              backgroundColor: viewMode === 'grid' ? 'var(--accent-subtle)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            type="button"
            onClick={() => onViewModeChange('list')}
            aria-label="List view"
            title="List view"
            style={{
              padding: '4px 6px',
              borderRadius: 'var(--radius-sm)',
              color: viewMode === 'list' ? 'var(--accent-text)' : 'var(--text-muted)',
              backgroundColor: viewMode === 'list' ? 'var(--accent-subtle)' : 'transparent',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <List size={15} />
          </button>
        </div>
      </div>
    </div>
  );
};
