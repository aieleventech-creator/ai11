'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, CornerDownLeft, Sparkles, BookOpen, Layers } from 'lucide-react';
import { TOOLS } from '@/lib/data/tools';
import { CATEGORIES } from '@/lib/data/categories';
import { ARTICLES } from '@/lib/data/articles';
import { Badge } from '@/components/ui/Badge';

interface SearchResultItem {
  id: string;
  type: 'tool' | 'category' | 'article';
  title: string;
  subtitle: string;
  url: string;
  badge?: string;
}

export const SearchModal: React.FC = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const openModal = useCallback(() => {
    setIsOpen(true);
    setQuery('');
    setSelectedIndex(0);
    setTimeout(() => inputRef.current?.focus(), 50);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setQuery('');
  }, []);

  // Listen for Cmd+K / Ctrl+K and custom event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        closeModal();
      }
    };

    const handleOpenSearch = () => openModal();

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-search-modal', handleOpenSearch);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-search-modal', handleOpenSearch);
    };
  }, [isOpen, openModal, closeModal]);

  // Compute matching results across tools, categories, articles
  const results: SearchResultItem[] = React.useMemo(() => {
    if (!query.trim()) {
      // Default recommended / popular items
      const topTools = TOOLS.slice(0, 4).map((t) => ({
        id: t.id,
        type: 'tool' as const,
        title: t.name,
        subtitle: t.tagline,
        url: `/tools/${t.slug}`,
        badge: t.pricing,
      }));
      const topCats = CATEGORIES.slice(0, 3).map((c) => ({
        id: c.id,
        type: 'category' as const,
        title: c.name,
        subtitle: `${c.toolCount} tools`,
        url: `/tools?category=${c.slug}`,
      }));
      return [...topTools, ...topCats];
    }

    const q = query.toLowerCase().trim();
    const items: SearchResultItem[] = [];

    // Search Tools
    TOOLS.filter(
      (t) =>
        t.isPublished &&
        (t.name.toLowerCase().includes(q) ||
          t.category.toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          t.tags.some((tag) => tag.toLowerCase().includes(q)))
    )
      .slice(0, 6)
      .forEach((t) => {
        items.push({
          id: t.id,
          type: 'tool',
          title: t.name,
          subtitle: `${t.category} — ${t.tagline}`,
          url: `/tools/${t.slug}`,
          badge: t.pricing,
        });
      });

    // Search Categories
    CATEGORIES.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    )
      .slice(0, 3)
      .forEach((c) => {
        items.push({
          id: c.id,
          type: 'category',
          title: c.name,
          subtitle: `Category (${c.toolCount} tools)`,
          url: `/tools?category=${c.slug}`,
        });
      });

    // Search Articles
    ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.tags.some((t) => t.toLowerCase().includes(q))
    )
      .slice(0, 3)
      .forEach((a) => {
        items.push({
          id: a.id,
          type: 'article',
          title: a.title,
          subtitle: `Editorial — ${a.category}`,
          url: `/blog`,
        });
      });

    return items;
  }, [query]);

  // Handle arrow keys and enter
  const handleKeyNavigation = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        router.push(results[selectedIndex].url);
        closeModal();
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingTop: 'clamp(40px, 10vh, 120px)',
        paddingLeft: '16px',
        paddingRight: '16px',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={closeModal}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal Dialog */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Search AI11 platform"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '640px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)',
          overflow: 'hidden',
          zIndex: 201,
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '80vh',
        }}
      >
        {/* Search Input Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '16px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            gap: '12px',
          }}
        >
          <Search size={20} style={{ color: 'var(--text-muted)', flexShrink: 0 }} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyNavigation}
            placeholder="Search tools, categories, articles..."
            aria-label="Search tools, categories, articles"
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontSize: '1.0625rem',
            }}
          />

          <kbd
            style={{
              padding: '2px 6px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface-elevated)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.6875rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            ESC
          </kbd>

          <button
            onClick={closeModal}
            aria-label="Close search modal"
            style={{
              padding: '4px',
              color: 'var(--text-muted)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Results List */}
        <div
          style={{
            overflowY: 'auto',
            padding: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}
        >
          {results.length > 0 ? (
            results.map((item, index) => {
              const isSelected = index === selectedIndex;
              const icon =
                item.type === 'tool' ? (
                  <Sparkles size={16} />
                ) : item.type === 'category' ? (
                  <Layers size={16} />
                ) : (
                  <BookOpen size={16} />
                );

              return (
                <div
                  key={`${item.type}-${item.id}`}
                  onClick={() => {
                    router.push(item.url);
                    closeModal();
                  }}
                  onMouseEnter={() => setSelectedIndex(index)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    backgroundColor: isSelected ? 'var(--bg-surface-hover)' : 'transparent',
                    border: `1px solid ${isSelected ? 'var(--accent-border)' : 'transparent'}`,
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                    gap: '12px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', overflow: 'hidden' }}>
                    <div
                      style={{
                        color: isSelected ? 'var(--accent-text)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      {icon}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                      <div
                        style={{
                          fontSize: '0.9375rem',
                          fontWeight: 500,
                          color: isSelected ? 'var(--text-primary)' : 'var(--text-primary)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.title}
                      </div>
                      <div
                        style={{
                          fontSize: '0.75rem',
                          color: 'var(--text-muted)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                    {item.badge && (
                      <Badge variant="default" size="sm">
                        {item.badge}
                      </Badge>
                    )}
                    {isSelected && (
                      <CornerDownLeft size={14} style={{ color: 'var(--accent-text)' }} />
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            /* Empty State */
            <div style={{ padding: '36px 20px', textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: '8px',
                }}
              >
                No results found for &ldquo;{query}&rdquo;
              </p>
              <p
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '20px',
                }}
              >
                Try searching by domain like &ldquo;coding&rdquo;, &ldquo;video&rdquo;, or &ldquo;writing&rdquo;.
              </p>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  flexWrap: 'wrap',
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    router.push('/tools');
                    closeModal();
                  }}
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--accent-text)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--accent-border)',
                    backgroundColor: 'var(--accent-subtle)',
                  }}
                >
                  Browse all tools
                </button>
                <button
                  type="button"
                  onClick={() => {
                    router.push('/tools?category=coding');
                    closeModal();
                  }}
                  style={{
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-default)',
                    backgroundColor: 'var(--bg-surface-elevated)',
                  }}
                >
                  Browse Coding tools
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Key Hints */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            backgroundColor: 'var(--bg-surface-elevated)',
            borderTop: '1px solid var(--border-subtle)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span>
              <kbd style={{ fontFamily: 'var(--font-mono)' }}>↑↓</kbd> navigate
            </span>
            <span>
              <kbd style={{ fontFamily: 'var(--font-mono)' }}>↵</kbd> select
            </span>
            <span>
              <kbd style={{ fontFamily: 'var(--font-mono)' }}>esc</kbd> close
            </span>
          </div>
          <span>Instant discovery engine</span>
        </div>
      </div>
    </div>
  );
};
