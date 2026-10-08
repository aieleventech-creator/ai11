'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink, Bookmark, Check, ArrowRight, Layers } from 'lucide-react';
import { Tool } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { useComparison } from '@/lib/hooks/useComparison';

interface ToolCardProps {
  tool: Tool;
  viewMode?: 'grid' | 'list';
}

export const ToolCard: React.FC<ToolCardProps> = ({ tool, viewMode = 'grid' }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInComparison, toggleTool } = useComparison();

  const favorited = isFavorite(tool.id);
  const comparing = isInComparison(tool.slug);

  const pricingVariant =
    tool.pricing === 'Free'
      ? 'success'
      : tool.pricing === 'Freemium'
      ? 'info'
      : tool.pricing === 'Free Trial'
      ? 'warning'
      : 'default';

  if (viewMode === 'list') {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'var(--bg-surface)',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          padding: '18px 24px',
          gap: '20px',
          transition: 'all var(--transition-normal)',
          boxShadow: 'var(--shadow-sm)',
          flexWrap: 'wrap',
        }}
        className="ai11-card"
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 300px' }}>
          <div
            style={{
              width: '46px',
              height: '46px',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <Link
                href={`/tools/${tool.slug}`}
                style={{
                  fontSize: '1.0625rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.01em',
                }}
              >
                {tool.name}
              </Link>
              {tool.isVerified && (
                <span
                  title="Verified AI Tool"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--accent-primary)',
                    color: '#ffffff',
                  }}
                >
                  <Check size={9} strokeWidth={3} />
                </span>
              )}
              <Badge variant={pricingVariant} size="sm">
                {tool.pricing}
              </Badge>
              {tool.editorialBadge && (
                <Badge variant="accent" size="sm">
                  {tool.editorialBadge}
                </Badge>
              )}
            </div>
            <p
              style={{
                fontSize: '0.84375rem',
                color: 'var(--text-secondary)',
                marginTop: '4px',
                lineHeight: 1.4,
              }}
            >
              {tool.tagline}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
          {/* Compare Toggle Button */}
          <button
            type="button"
            onClick={() => toggleTool(tool.slug)}
            aria-label={comparing ? `Remove ${tool.name} from comparison` : `Add ${tool.name} to comparison`}
            title={comparing ? 'Comparing' : 'Add to comparison'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: comparing ? 'var(--accent-text)' : 'var(--text-secondary)',
              backgroundColor: comparing ? 'var(--accent-subtle)' : 'var(--bg-surface-elevated)',
              border: `1px solid ${comparing ? 'var(--accent-border)' : 'var(--border-subtle)'}`,
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
            }}
          >
            <Layers size={13} />
            <span>{comparing ? 'Comparing' : 'Compare'}</span>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={() => toggleFavorite(tool.id)}
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
            title={favorited ? 'Saved to favorites' : 'Save to favorites'}
            style={{
              padding: '8px',
              borderRadius: 'var(--radius-sm)',
              color: favorited ? 'var(--accent-primary)' : 'var(--text-muted)',
              backgroundColor: favorited ? 'var(--accent-subtle)' : 'transparent',
              border: `1px solid ${favorited ? 'var(--accent-border)' : 'transparent'}`,
              transition: 'all var(--transition-fast)',
              cursor: 'pointer',
            }}
          >
            <Bookmark size={15} fill={favorited ? 'currentColor' : 'none'} />
          </button>

          <Link
            href={`/tools/${tool.slug}`}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: 'var(--text-primary)',
              padding: '6px 12px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-default)',
              backgroundColor: 'var(--bg-surface-elevated)',
            }}
          >
            <span>Details</span>
            <ArrowRight size={12} />
          </Link>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.8125rem',
              fontWeight: 500,
              color: '#ffffff',
              backgroundColor: 'var(--accent-primary)',
              padding: '6px 14px',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span>Visit</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: 'var(--bg-surface)',
        border: '1px solid var(--border-default)',
        borderRadius: 'var(--radius-lg)',
        padding: '20px',
        position: 'relative',
        transition: 'all var(--transition-normal)',
        boxShadow: 'var(--shadow-sm)',
      }}
      className="ai11-card"
    >
      <div>
        {/* Card Header: Logo, Name, Category, Bookmark & Compare */}
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: '12px',
            marginBottom: '14px',
          }}
        >
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Link
                  href={`/tools/${tool.slug}`}
                  style={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    color: 'var(--text-primary)',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {tool.name}
                </Link>
                {tool.isVerified && (
                  <span
                    title="Verified AI Tool"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '14px',
                      height: '14px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--accent-primary)',
                      color: '#ffffff',
                    }}
                  >
                    <Check size={9} strokeWidth={3} />
                  </span>
                )}
              </div>
              <span
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  display: 'block',
                  marginTop: '1px',
                }}
              >
                {tool.category}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Bookmark button */}
            <button
              type="button"
              onClick={() => toggleFavorite(tool.id)}
              aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
              title={favorited ? 'Saved to favorites' : 'Save to favorites'}
              style={{
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                color: favorited ? 'var(--accent-primary)' : 'var(--text-muted)',
                backgroundColor: favorited ? 'var(--accent-subtle)' : 'transparent',
                border: `1px solid ${favorited ? 'var(--accent-border)' : 'transparent'}`,
                transition: 'all var(--transition-fast)',
                cursor: 'pointer',
              }}
            >
              <Bookmark size={15} fill={favorited ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Tagline / Description */}
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.45,
            marginBottom: '16px',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tool.tagline}
        </p>

        {/* Tags */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px',
            marginBottom: '18px',
          }}
        >
          {tool.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.6875rem',
                padding: '2px 7px',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: 'var(--bg-surface-elevated)',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-subtle)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Card Footer: Pricing, Editorial Badge, Compare & Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-subtle)',
          marginTop: 'auto',
          gap: '8px',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <Badge variant={pricingVariant} size="sm">
            {tool.pricing}
          </Badge>
          {tool.editorialBadge ? (
            <Badge variant="accent" size="sm">
              {tool.editorialBadge}
            </Badge>
          ) : (
            <span
              style={{
                fontSize: '0.6875rem',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
              }}
            >
              #{tool.curatedRank}
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          {/* Quick Compare Button */}
          <button
            type="button"
            onClick={() => toggleTool(tool.slug)}
            aria-label={comparing ? `Remove ${tool.name} from comparison` : `Add ${tool.name} to comparison`}
            title={comparing ? 'In comparison' : 'Compare tool'}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '3px',
              fontSize: '0.6875rem',
              fontWeight: 500,
              padding: '3px 7px',
              borderRadius: 'var(--radius-sm)',
              color: comparing ? 'var(--accent-text)' : 'var(--text-muted)',
              backgroundColor: comparing ? 'var(--accent-subtle)' : 'var(--bg-surface-elevated)',
              border: `1px solid ${comparing ? 'var(--accent-border)' : 'var(--border-subtle)'}`,
              cursor: 'pointer',
              transition: 'all var(--transition-fast)',
            }}
          >
            <Layers size={11} />
            <span>{comparing ? 'In Compare' : 'Compare'}</span>
          </button>

          <Link
            href={`/tools/${tool.slug}`}
            style={{
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--text-secondary)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            Details
          </Link>

          <a
            href={tool.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 500,
              color: 'var(--accent-text)',
              padding: '4px 8px',
              borderRadius: 'var(--radius-sm)',
              transition: 'background-color var(--transition-fast)',
            }}
          >
            <span>Visit</span>
            <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </div>
  );
};
