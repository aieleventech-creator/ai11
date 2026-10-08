'use client';

import React, { useState, useMemo, useCallback, useSyncExternalStore } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X, RotateCcw, Sparkles } from 'lucide-react';
import { Tool, Category, PricingType, PlatformType } from '@/lib/types';
import { ToolCard } from '@/components/cards/ToolCard';
import { FilterSidebar } from './FilterSidebar';
import { MobileFilterModal } from './MobileFilterModal';
import { DirectoryViewControls } from './DirectoryViewControls';
import { DirectoryPagination } from './DirectoryPagination';

interface ToolsDirectoryClientProps {
  initialTools: Tool[];
  categories: Category[];
  initialCategory?: string;
  initialQuery?: string;
  initialPricing?: string;
}

const ITEMS_PER_PAGE = 9;

export const ToolsDirectoryClient: React.FC<ToolsDirectoryClientProps> = ({
  initialTools,
  categories,
  initialCategory,
  initialQuery,
  initialPricing,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Search input state
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get('q') || initialQuery || ''
  );

  // Filters state
  const [category, setCategory] = useState(
    searchParams.get('category') || initialCategory || 'all'
  );
  const [pricing, setPricing] = useState<PricingType | 'All'>(
    (searchParams.get('pricing') as PricingType) || (initialPricing as PricingType) || 'All'
  );
  const [verifiedOnly, setVerifiedOnly] = useState(
    searchParams.get('verified') === 'true'
  );
  const [platform, setPlatform] = useState<PlatformType | 'All'>(
    (searchParams.get('platform') as PlatformType) || 'All'
  );
  const [sortBy, setSortBy] = useState<'popular' | 'trending' | 'newest' | 'alphabetical'>(
    (searchParams.get('sort') as 'popular' | 'trending' | 'newest' | 'alphabetical') || 'popular'
  );
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get('page') || '1', 10) || 1
  );

  // View mode preference via useSyncExternalStore for hydration and render safety
  const viewMode = useSyncExternalStore(
    (callback) => {
      window.addEventListener('storage', callback);
      window.addEventListener('view-mode-change', callback);
      return () => {
        window.removeEventListener('storage', callback);
        window.removeEventListener('view-mode-change', callback);
      };
    },
    (): 'grid' | 'list' => {
      try {
        const saved = localStorage.getItem('ai11-view-mode');
        if (saved === 'list' || saved === 'grid') return saved;
      } catch {}
      return 'grid';
    },
    (): 'grid' | 'list' => 'grid'
  );
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleViewModeChange = (mode: 'grid' | 'list') => {
    try {
      localStorage.setItem('ai11-view-mode', mode);
      window.dispatchEvent(new Event('view-mode-change'));
    } catch {}
  };

  // Sync state to URL parameters
  const updateUrlParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (!value || value === 'all' || value === 'All' || value === 'false') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      const queryStr = params.toString();
      const path = window.location.pathname;
      router.replace(queryStr ? `${path}?${queryStr}` : path, { scroll: false });
    },
    [router, searchParams]
  );

  // Filter actions
  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    setCurrentPage(1);
    updateUrlParams({ category: newCat, page: null });
  };

  const handlePricingChange = (newPricing: PricingType | 'All') => {
    setPricing(newPricing);
    setCurrentPage(1);
    updateUrlParams({ pricing: newPricing, page: null });
  };

  const handleVerifiedChange = (verified: boolean) => {
    setVerifiedOnly(verified);
    setCurrentPage(1);
    updateUrlParams({ verified: verified ? 'true' : null, page: null });
  };

  const handlePlatformChange = (newPlatform: PlatformType | 'All') => {
    setPlatform(newPlatform);
    setCurrentPage(1);
    updateUrlParams({ platform: newPlatform, page: null });
  };

  const handleSortChange = (newSort: 'popular' | 'trending' | 'newest' | 'alphabetical') => {
    setSortBy(newSort);
    setCurrentPage(1);
    updateUrlParams({ sort: newSort, page: null });
  };

  const handleSearchChange = (q: string) => {
    setSearchQuery(q);
    setCurrentPage(1);
    updateUrlParams({ q: q.trim() ? q.trim() : null, page: null });
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategory('all');
    setPricing('All');
    setVerifiedOnly(false);
    setPlatform('All');
    setSortBy('popular');
    setCurrentPage(1);
    router.replace(window.location.pathname, { scroll: false });
  };

  const hasActiveFilters =
    Boolean(searchQuery.trim()) ||
    category !== 'all' ||
    pricing !== 'All' ||
    verifiedOnly ||
    platform !== 'All';

  // Compute filtered & sorted list
  const filteredTools = useMemo(() => {
    let list = [...initialTools].filter((t) => t.isPublished);

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((tool) => {
        const matchName = tool.name.toLowerCase().includes(q);
        const matchTagline = tool.tagline.toLowerCase().includes(q);
        const matchDescription = tool.description.toLowerCase().includes(q);
        const matchCategory =
          tool.category.toLowerCase().includes(q) ||
          tool.categorySlug.toLowerCase().includes(q);
        const matchTags = tool.tags.some((tag) => tag.toLowerCase().includes(q));
        return matchName || matchTagline || matchDescription || matchCategory || matchTags;
      });
    }

    // Category
    if (category && category !== 'all') {
      list = list.filter(
        (tool) => tool.categorySlug.toLowerCase() === category.toLowerCase()
      );
    }

    // Pricing
    if (pricing && pricing !== 'All') {
      list = list.filter((tool) => tool.pricing === pricing);
    }

    // Verified
    if (verifiedOnly) {
      list = list.filter((tool) => tool.isVerified);
    }

    // Platform
    if (platform && platform !== 'All') {
      list = list.filter((tool) => tool.platforms.includes(platform));
    }

    // Sort
    list.sort((a, b) => {
      switch (sortBy) {
        case 'popular':
          return a.curatedRank - b.curatedRank;
        case 'trending':
          if (a.isTrending && !b.isTrending) return -1;
          if (!a.isTrending && b.isTrending) return 1;
          return a.curatedRank - b.curatedRank;
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'alphabetical':
          return a.name.localeCompare(b.name);
        default:
          return a.curatedRank - b.curatedRank;
      }
    });

    return list;
  }, [initialTools, searchQuery, category, pricing, verifiedOnly, platform, sortBy]);

  // Paginated slice
  const totalResults = filteredTools.length;
  const totalPages = Math.max(1, Math.ceil(totalResults / ITEMS_PER_PAGE));
  const validPage = Math.min(Math.max(1, currentPage), totalPages);
  const paginatedTools = useMemo(() => {
    const start = (validPage - 1) * ITEMS_PER_PAGE;
    return filteredTools.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTools, validPage]);

  const handlePageChange = (p: number) => {
    setCurrentPage(p);
    updateUrlParams({ page: p > 1 ? String(p) : null });
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  return (
    <div>
      {/* Top Search Bar */}
      <div
        style={{
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <Search size={18} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search by tool name, capability, category, or tags..."
          aria-label="Search tools"
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--text-primary)',
            fontSize: '0.9375rem',
          }}
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => handleSearchChange('')}
            aria-label="Clear search"
            style={{
              padding: '4px',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Main Grid: Sidebar + Results */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '36px',
          alignItems: 'flex-start',
        }}
        className="directory-grid-layout"
      >
        {/* Desktop Sidebar */}
        <div className="desktop-only" style={{ width: '240px', flexShrink: 0 }}>
          <FilterSidebar
            categories={categories}
            selectedCategory={category}
            onSelectCategory={handleCategoryChange}
            selectedPricing={pricing}
            onSelectPricing={handlePricingChange}
            verifiedOnly={verifiedOnly}
            onToggleVerified={handleVerifiedChange}
            selectedPlatform={platform}
            onSelectPlatform={handlePlatformChange}
            onResetFilters={handleResetFilters}
            hasActiveFilters={hasActiveFilters}
          />
        </div>

        {/* Directory Results Area */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <DirectoryViewControls
            totalResults={totalResults}
            sortBy={sortBy}
            onSortChange={handleSortChange}
            viewMode={viewMode}
            onViewModeChange={handleViewModeChange}
            onOpenMobileFilters={() => setIsMobileFilterOpen(true)}
            hasActiveFilters={hasActiveFilters}
          />

          {/* Tools Grid or List */}
          {paginatedTools.length > 0 ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns:
                  viewMode === 'list'
                    ? '1fr'
                    : 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '20px',
              }}
            >
              {paginatedTools.map((tool) => (
                <ToolCard key={tool.id} tool={tool} viewMode={viewMode} />
              ))}
            </div>
          ) : (
            /* Empty State */
            <div
              style={{
                backgroundColor: 'var(--bg-surface)',
                border: '1px solid var(--border-default)',
                borderRadius: 'var(--radius-lg)',
                padding: '64px 24px',
                textAlign: 'center',
              }}
            >
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '44px',
                  height: '44px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--accent-subtle)',
                  color: 'var(--accent-text)',
                  marginBottom: '16px',
                }}
              >
                <Sparkles size={20} />
              </div>
              <h3
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                No AI tools match your filters
              </h3>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  maxWidth: '420px',
                  margin: '0 auto 24px',
                }}
              >
                Try clearing your search terms or relaxing category and pricing constraints to see more tools.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  color: '#ffffff',
                  backgroundColor: 'var(--accent-primary)',
                  padding: '8px 18px',
                  borderRadius: 'var(--radius-md)',
                }}
              >
                <RotateCcw size={14} />
                <span>Reset all filters</span>
              </button>
            </div>
          )}

          {/* Pagination */}
          <DirectoryPagination
            currentPage={validPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Mobile Drawer Modal */}
      <MobileFilterModal
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        categories={categories}
        selectedCategory={category}
        onSelectCategory={handleCategoryChange}
        selectedPricing={pricing}
        onSelectPricing={handlePricingChange}
        verifiedOnly={verifiedOnly}
        onToggleVerified={handleVerifiedChange}
        selectedPlatform={platform}
        onSelectPlatform={handlePlatformChange}
        onResetFilters={handleResetFilters}
        hasActiveFilters={hasActiveFilters}
        resultsCount={totalResults}
      />
    </div>
  );
};
