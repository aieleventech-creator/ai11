'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Check, 
  ExternalLink, 
  Bookmark, 
  Trash2, 
  Plus, 
  Share2, 
  CheckCheck,
  Scale,
  CheckCircle2,
} from 'lucide-react';
import { Tool } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useComparison } from '@/lib/hooks/useComparison';
import { useFavorites } from '@/lib/hooks/useFavorites';

interface ComparisonMatrixProps {
  initialTools: Tool[];
  allTools: Tool[];
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  initialTools,
  allTools,
}) => {
  const router = useRouter();
  const { removeTool, addTool, clearComparison } = useComparison();
  const { isFavorite, toggleFavorite } = useFavorites();

  const [highlightDifferences, setHighlightDifferences] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [filterAddSearch, setFilterAddSearch] = useState('');

  // Tools currently displayed in the matrix
  const currentTools = initialTools;

  // Unselected tools available to be added
  const availableToAdd = allTools.filter(
    (t) => !currentTools.some((ct) => ct.id === t.id)
  );

  const filteredAddTools = availableToAdd.filter(
    (t) =>
      t.name.toLowerCase().includes(filterAddSearch.toLowerCase()) ||
      t.category.toLowerCase().includes(filterAddSearch.toLowerCase())
  );

  // Update URL helper
  const updateUrlWithSlugs = (slugs: string[]) => {
    if (slugs.length === 0) {
      router.push('/compare');
    } else {
      router.push(`/compare?tools=${slugs.join(',')}`);
    }
  };

  const handleRemove = (slug: string) => {
    removeTool(slug);
    const updatedSlugs = currentTools.filter((t) => t.slug !== slug).map((t) => t.slug);
    updateUrlWithSlugs(updatedSlugs);
  };

  const handleAddTool = (tool: Tool) => {
    if (currentTools.length >= 4) return;
    addTool(tool.slug);
    const updatedSlugs = [...currentTools.map((t) => t.slug), tool.slug];
    updateUrlWithSlugs(updatedSlugs);
    setSelectorOpen(false);
    setFilterAddSearch('');
  };

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      }
    } catch {}
  };

  // Helper to determine difference across current tools
  const isDifferentPricing =
    currentTools.length > 1 &&
    new Set(currentTools.map((t) => t.pricing)).size > 1;

  const isDifferentStartingPrice =
    currentTools.length > 1 &&
    new Set(currentTools.map((t) => t.startingPrice || 'Free')).size > 1;

  if (currentTools.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '80px 24px',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          maxWidth: '640px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-subtle)',
            color: 'var(--accent-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
          }}
        >
          <Scale size={28} />
        </div>
        <h2
          style={{
            fontSize: '1.5rem',
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '12px',
          }}
        >
          No tools selected for comparison
        </h2>
        <p
          style={{
            fontSize: '0.9375rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            marginBottom: '28px',
          }}
        >
          Select 2 to 4 tools across the directory or pick from our curated recommendations to see an in-depth side-by-side feature and pricing analysis.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
          <Link href="/tools" style={{ textDecoration: 'none' }}>
            <Button variant="primary" size="md">
              Browse All AI Tools
            </Button>
          </Link>
          <Link
            href="/compare?tools=chatgpt,claude,perplexity"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="outline" size="md">
              Compare Top AI Assistants
            </Button>
          </Link>
          <Link
            href="/compare?tools=cursor,github-copilot,v0"
            style={{ textDecoration: 'none' }}
          >
            <Button variant="outline" size="md">
              Compare AI Coding Tools
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%' }}>
      {/* Top Toolbar: Actions, Difference Highlight, Share */}
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
          marginBottom: '24px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
          <span
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            Comparing <strong>{currentTools.length}</strong> of 4 tools
          </span>

          {/* Highlight differences toggle */}
          {currentTools.length > 1 && (
            <label
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.8125rem',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                userSelect: 'none',
              }}
            >
              <input
                type="checkbox"
                checked={highlightDifferences}
                onChange={(e) => setHighlightDifferences(e.target.checked)}
                style={{
                  accentColor: 'var(--accent-primary)',
                  cursor: 'pointer',
                  width: '15px',
                  height: '15px',
                }}
              />
              <span>Highlight differences</span>
            </label>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Add tool trigger */}
          {currentTools.length < 4 && (
            <div style={{ position: 'relative' }}>
              <Button
                variant="outline"
                size="sm"
                icon={<Plus size={14} />}
                iconPosition="left"
                onClick={() => setSelectorOpen(!selectorOpen)}
              >
                Add Tool ({4 - currentTools.length} left)
              </Button>

              {/* Add Tool Popover */}
              {selectorOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: 'calc(100% + 8px)',
                    right: 0,
                    width: '300px',
                    backgroundColor: 'var(--bg-surface-elevated)',
                    border: '1px solid var(--border-default)',
                    borderRadius: 'var(--radius-lg)',
                    boxShadow: 'var(--shadow-lg)',
                    zIndex: 40,
                    padding: '14px',
                  }}
                >
                  <div style={{ marginBottom: '10px' }}>
                    <input
                      type="text"
                      placeholder="Search tool to add..."
                      value={filterAddSearch}
                      onChange={(e) => setFilterAddSearch(e.target.value)}
                      autoFocus
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        backgroundColor: 'var(--bg-surface)',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.8125rem',
                        color: 'var(--text-primary)',
                        outline: 'none',
                      }}
                    />
                  </div>

                  <div
                    style={{
                      maxHeight: '220px',
                      overflowY: 'auto',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                    }}
                  >
                    {filteredAddTools.length === 0 ? (
                      <div
                        style={{
                          padding: '12px',
                          textAlign: 'center',
                          fontSize: '0.8125rem',
                          color: 'var(--text-muted)',
                        }}
                      >
                        No matching tools found
                      </div>
                    ) : (
                      filteredAddTools.map((tool) => (
                        <button
                          key={tool.id}
                          type="button"
                          onClick={() => handleAddTool(tool)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '8px 10px',
                            borderRadius: 'var(--radius-sm)',
                            border: 'none',
                            backgroundColor: 'transparent',
                            color: 'var(--text-primary)',
                            fontSize: '0.8125rem',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'background-color var(--transition-fast)',
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor = 'var(--bg-muted)')
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor = 'transparent')
                          }
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span
                              style={{
                                width: '22px',
                                height: '22px',
                                borderRadius: '4px',
                                backgroundColor: 'var(--accent-subtle)',
                                color: 'var(--accent-text)',
                                display: 'inline-flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.6875rem',
                                fontWeight: 700,
                              }}
                            >
                              {tool.name.slice(0, 2).toUpperCase()}
                            </span>
                            <span style={{ fontWeight: 600 }}>{tool.name}</span>
                          </div>
                          <span
                            style={{
                              fontSize: '0.6875rem',
                              color: 'var(--text-muted)',
                            }}
                          >
                            {tool.category}
                          </span>
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Share Comparison */}
          <Button
            variant="outline"
            size="sm"
            icon={copiedShare ? <CheckCheck size={14} /> : <Share2 size={14} />}
            iconPosition="left"
            onClick={handleShare}
          >
            {copiedShare ? 'URL Copied!' : 'Share Comparison'}
          </Button>

          {/* Reset All */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              clearComparison();
              updateUrlWithSlugs([]);
            }}
            style={{ color: 'var(--text-muted)' }}
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Comparison Table Container with Horizontal Scroll on Small Viewports */}
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-sm)',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        <table
          style={{
            width: '100%',
            minWidth: currentTools.length > 2 ? '780px' : '600px',
            borderCollapse: 'collapse',
            textAlign: 'left',
          }}
        >
          {/* Header Row: Tool Identities */}
          <thead>
            <tr
              style={{
                borderBottom: '2px solid var(--border-default)',
                backgroundColor: 'var(--bg-surface-elevated)',
              }}
            >
              {/* Leftmost Attributes Column */}
              <th
                style={{
                  width: '200px',
                  minWidth: '180px',
                  padding: '24px 20px',
                  verticalAlign: 'bottom',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Attributes
                </div>
                <div style={{ fontSize: '1.125rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '4px' }}>
                  Features & Specs
                </div>
              </th>

              {/* Tool Columns */}
              {currentTools.map((tool) => (
                <th
                  key={tool.id}
                  style={{
                    padding: '24px 20px',
                    verticalAlign: 'top',
                    borderRight: '1px solid var(--border-subtle)',
                    width: `${80 / currentTools.length}%`,
                    minWidth: '220px',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '8px' }}>
                      {/* Logo & Name */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          style={{
                            width: '44px',
                            height: '44px',
                            borderRadius: 'var(--radius-md)',
                            backgroundColor: tool.accentColor ? `${tool.accentColor}18` : 'var(--accent-subtle)',
                            border: `1px solid ${tool.accentColor ? `${tool.accentColor}40` : 'var(--accent-border)'}`,
                            color: tool.accentColor || 'var(--accent-text)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 800,
                            fontSize: '1.125rem',
                            flexShrink: 0,
                          }}
                        >
                          {tool.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/tools/${tool.slug}`}
                            style={{
                              fontSize: '1.125rem',
                              fontWeight: 800,
                              color: 'var(--text-primary)',
                              textDecoration: 'none',
                              lineHeight: 1.2,
                            }}
                          >
                            {tool.name}
                          </Link>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                            <Badge variant="accent" size="sm">
                              {tool.category}
                            </Badge>
                            {tool.isVerified && (
                              <span
                                title="Verified Tool"
                                style={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '2px',
                                  fontSize: '0.6875rem',
                                  color: 'var(--accent-text)',
                                  fontWeight: 600,
                                }}
                              >
                                <Check size={11} strokeWidth={3} />
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Remove from comparison */}
                      <button
                        type="button"
                        onClick={() => handleRemove(tool.slug)}
                        aria-label={`Remove ${tool.name} from comparison`}
                        title="Remove from comparison"
                        style={{
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: 'var(--text-muted)',
                          padding: '4px',
                          borderRadius: 'var(--radius-sm)',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    {/* Quick CTAs */}
                    <div style={{ display: 'flex', gap: '8px', marginTop: '6px' }}>
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', flex: 1 }}
                      >
                        <Button
                          variant="primary"
                          size="sm"
                          icon={<ExternalLink size={13} />}
                          iconPosition="right"
                          style={{ width: '100%', justifyContent: 'center', fontSize: '0.75rem' }}
                        >
                          Visit Site
                        </Button>
                      </a>
                      <button
                        type="button"
                        onClick={() => toggleFavorite(tool.id)}
                        aria-label="Save to favorites"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '32px',
                          height: '32px',
                          borderRadius: 'var(--radius-md)',
                          border: `1px solid ${isFavorite(tool.id) ? 'var(--accent-border)' : 'var(--border-default)'}`,
                          backgroundColor: isFavorite(tool.id) ? 'var(--accent-subtle)' : 'var(--bg-surface)',
                          color: isFavorite(tool.id) ? 'var(--accent-text)' : 'var(--text-secondary)',
                          cursor: 'pointer',
                        }}
                      >
                        <Bookmark size={14} fill={isFavorite(tool.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* Table Body: Systematic Rows */}
          <tbody>
            {/* 1. Tagline / Brief */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Tagline
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.875rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.45,
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  {tool.tagline}
                </td>
              ))}
            </tr>

            {/* 2. Pricing Model */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor:
                  highlightDifferences && isDifferentPricing
                    ? 'rgba(99, 102, 241, 0.07)'
                    : 'transparent',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Pricing Model
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.875rem',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  <Badge
                    variant={
                      tool.pricing === 'Free'
                        ? 'success'
                        : tool.pricing === 'Freemium'
                        ? 'info'
                        : tool.pricing === 'Free Trial'
                        ? 'warning'
                        : 'default'
                    }
                    size="sm"
                  >
                    {tool.pricing}
                  </Badge>
                </td>
              ))}
            </tr>

            {/* 3. Starting Price (Verified) */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
                backgroundColor:
                  highlightDifferences && isDifferentStartingPrice
                    ? 'rgba(99, 102, 241, 0.07)'
                    : 'transparent',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Starting Price
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.875rem',
                    color: 'var(--text-primary)',
                    fontWeight: 700,
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  {tool.startingPrice || (tool.pricing === 'Free' ? 'Free ($0)' : 'Not available')}
                  {tool.priceNote && (
                    <div
                      style={{
                        fontSize: '0.6875rem',
                        fontWeight: 400,
                        color: 'var(--text-muted)',
                        marginTop: '4px',
                      }}
                    >
                      {tool.priceNote}
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* 4. Supported Platforms */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Platforms
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {tool.platforms.map((p) => (
                      <span
                        key={p}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 7px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--bg-surface-elevated)',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        {p}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* 5. Best For Personas */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Best For
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.8125rem',
                    color: 'var(--text-secondary)',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {tool.bestFor.map((persona) => (
                      <span
                        key={persona}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 8px',
                          borderRadius: 'var(--radius-sm)',
                          backgroundColor: 'var(--accent-subtle)',
                          color: 'var(--accent-text)',
                          border: '1px solid var(--accent-border)',
                        }}
                      >
                        {persona}
                      </span>
                    ))}
                  </div>
                </td>
              ))}
            </tr>

            {/* 6. Editorial Badge & Rank */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                AI11 Editorial Rank
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.8125rem',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                      #{tool.curatedRank} in Directory
                    </span>
                  </div>
                  {tool.editorialBadge && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-text)', marginTop: '2px' }}>
                      {tool.editorialBadge}
                    </div>
                  )}
                </td>
              ))}
            </tr>

            {/* 7. Key Features */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Key Features
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.8125rem',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                    }}
                  >
                    {tool.features.map((feat, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        <CheckCircle2
                          size={14}
                          style={{
                            color: 'var(--color-success)',
                            flexShrink: 0,
                            marginTop: '2px',
                          }}
                        />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 8. Pros (Strengths) */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--color-success)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Key Pros
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.8125rem',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {tool.pros.map((pro, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        <span style={{ color: 'var(--color-success)', fontWeight: 700 }}>+</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 9. Cons (Considerations) */}
            <tr
              style={{
                borderBottom: '1px solid var(--border-subtle)',
              }}
            >
              <td
                style={{
                  padding: '16px 20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-muted)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Key Cons
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '16px 20px',
                    fontSize: '0.8125rem',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'top',
                  }}
                >
                  <ul
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px',
                    }}
                  >
                    {tool.cons.map((con, idx) => (
                      <li
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '6px',
                          color: 'var(--text-secondary)',
                          lineHeight: 1.4,
                        }}
                      >
                        <span style={{ color: 'var(--color-warning)', fontWeight: 700 }}>–</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>

            {/* 10. Official Website Links */}
            <tr>
              <td
                style={{
                  padding: '20px',
                  fontWeight: 600,
                  fontSize: '0.8125rem',
                  color: 'var(--text-secondary)',
                  borderRight: '1px solid var(--border-subtle)',
                }}
              >
                Full Profile & Site
              </td>
              {currentTools.map((tool) => (
                <td
                  key={tool.id}
                  style={{
                    padding: '20px',
                    borderRight: '1px solid var(--border-subtle)',
                    verticalAlign: 'middle',
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <Link
                      href={`/tools/${tool.slug}`}
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        color: 'var(--accent-text)',
                        textDecoration: 'none',
                      }}
                    >
                      View Full {tool.name} Review →
                    </Link>
                    <a
                      href={tool.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                    >
                      <span>{new URL(tool.websiteUrl).hostname}</span>
                      <ExternalLink size={11} />
                    </a>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
