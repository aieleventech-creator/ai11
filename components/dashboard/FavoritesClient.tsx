'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { 
  Bookmark, 
  Search, 
  Trash2, 
  LayoutGrid, 
  List, 
  RotateCcw,
} from 'lucide-react';
import { Tool, Category } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { ToolCard } from '@/components/cards/ToolCard';
import { useFavorites } from '@/lib/hooks/useFavorites';

interface FavoritesClientProps {
  allTools: Tool[];
  categories: Category[];
}

export const FavoritesClient: React.FC<FavoritesClientProps> = ({
  allTools,
  categories,
}) => {
  const { favorites, clearFavorites } = useFavorites();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filter tools that are in favorites
  const favoriteTools = useMemo(() => {
    return allTools.filter((tool) => favorites.includes(tool.id));
  }, [allTools, favorites]);

  // Apply search query and category filter
  const displayedTools = useMemo(() => {
    return favoriteTools.filter((tool) => {
      // Category filter
      if (selectedCategory !== 'all' && tool.categorySlug !== selectedCategory) {
        return false;
      }

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchName = tool.name.toLowerCase().includes(q);
        const matchTagline = tool.tagline.toLowerCase().includes(q);
        const matchCategory = tool.category.toLowerCase().includes(q);
        const matchTags = tool.tags.some((tag) => tag.toLowerCase().includes(q));
        return matchName || matchTagline || matchCategory || matchTags;
      }

      return true;
    });
  }, [favoriteTools, selectedCategory, searchQuery]);

  // Categories present in saved tools
  const presentCategories = useMemo(() => {
    const slugs = new Set(favoriteTools.map((t) => t.categorySlug));
    return categories.filter((c) => slugs.has(c.slug));
  }, [favoriteTools, categories]);

  if (favoriteTools.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '600px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-subtle)',
            color: 'var(--accent-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <Bookmark size={28} />
        </div>
        <h2
          style={{
            fontSize: '1.375rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '10px',
          }}
        >
          No Saved Tools Found
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          You haven&apos;t saved any AI tools yet. Explore our directory of 27 curated artificial intelligence tools and click the bookmark button on any tool card to build your personal list.
        </p>

        <Link href="/tools" style={{ textDecoration: 'none' }}>
          <Button variant="primary" size="md">
            Browse AI Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Controls Bar: Search, Category Filter, View Mode, Clear */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          padding: '16px 20px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          marginBottom: '28px',
        }}
      >
        {/* Search input */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            flex: '1 1 260px',
            maxWidth: '380px',
            backgroundColor: 'var(--bg-surface-elevated)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
          }}
        >
          <Search size={16} style={{ color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search within saved tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              fontSize: '0.875rem',
              color: 'var(--text-primary)',
            }}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              style={{
                border: 'none',
                background: 'none',
                color: 'var(--text-muted)',
                cursor: 'pointer',
                fontSize: '0.8125rem',
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter & View Mode */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Filter by category"
            style={{
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-default)',
              borderRadius: 'var(--radius-md)',
              color: 'var(--text-primary)',
              fontSize: '0.8125rem',
              padding: '8px 12px',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            <option value="all">All Categories ({favoriteTools.length})</option>
            {presentCategories.map((cat) => {
              const count = favoriteTools.filter((t) => t.categorySlug === cat.slug).length;
              return (
                <option key={cat.id} value={cat.slug}>
                  {cat.name} ({count})
                </option>
              );
            })}
          </select>

          {/* Grid / List View Toggle */}
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
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              style={{
                padding: '6px 8px',
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
              onClick={() => setViewMode('list')}
              aria-label="List view"
              style={{
                padding: '6px 8px',
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

          {/* Clear All */}
          <button
            type="button"
            onClick={() => {
              if (confirm('Are you sure you want to remove all saved tools?')) {
                clearFavorites();
              }
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              backgroundColor: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              fontSize: '0.8125rem',
              cursor: 'pointer',
              padding: '6px 10px',
            }}
          >
            <Trash2 size={14} />
            <span>Clear all</span>
          </button>
        </div>
      </div>

      {/* Results Header Count */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
        }}
      >
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
          Showing <strong>{displayedTools.length}</strong> of {favoriteTools.length} saved tools
        </p>

        {(searchQuery || selectedCategory !== 'all') && (
          <button
            type="button"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              color: 'var(--accent-text)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <RotateCcw size={13} />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Zero match state */}
      {displayedTools.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '50px 24px',
            backgroundColor: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '14px' }}>
            No saved tools match your current search &quot;{searchQuery}&quot;.
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('all');
            }}
          >
            Reset Filters
          </Button>
        </div>
      ) : viewMode === 'grid' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '24px',
          }}
        >
          {displayedTools.map((tool) => (
            <div key={tool.id} style={{ position: 'relative' }}>
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {displayedTools.map((tool) => (
            <div key={tool.id}>
              <ToolCard tool={tool} viewMode="list" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
