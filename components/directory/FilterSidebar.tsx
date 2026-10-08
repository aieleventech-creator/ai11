'use client';

import React from 'react';
import { Check, RotateCcw } from 'lucide-react';
import { Category, PricingType, PlatformType } from '@/lib/types';

interface FilterSidebarProps {
  categories: Category[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedPricing: PricingType | 'All';
  onSelectPricing: (pricing: PricingType | 'All') => void;
  verifiedOnly: boolean;
  onToggleVerified: (verified: boolean) => void;
  selectedPlatform: PlatformType | 'All';
  onSelectPlatform: (platform: PlatformType | 'All') => void;
  onResetFilters: () => void;
  hasActiveFilters: boolean;
}

const PRICING_OPTIONS: (PricingType | 'All')[] = ['All', 'Free', 'Freemium', 'Paid', 'Free Trial'];
const PLATFORM_OPTIONS: (PlatformType | 'All')[] = ['All', 'Web', 'macOS', 'Windows', 'Linux', 'iOS', 'Android', 'API'];

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedPricing,
  onSelectPricing,
  verifiedOnly,
  onToggleVerified,
  selectedPlatform,
  onSelectPlatform,
  onResetFilters,
  hasActiveFilters,
}) => {
  return (
    <aside
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      {/* Filters Header & Clear action */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '12px',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <h3
          style={{
            fontSize: '0.875rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-primary)',
          }}
        >
          Filters
        </h3>
        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              color: 'var(--accent-text)',
              fontWeight: 500,
            }}
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Verified Only Toggle */}
      <div>
        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            padding: '8px 12px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: verifiedOnly ? 'var(--accent-subtle)' : 'var(--bg-surface-elevated)',
            border: `1px solid ${verifiedOnly ? 'var(--accent-border)' : 'var(--border-subtle)'}`,
            transition: 'all var(--transition-fast)',
          }}
        >
          <input
            type="checkbox"
            checked={verifiedOnly}
            onChange={(e) => onToggleVerified(e.target.checked)}
            style={{
              accentColor: 'var(--accent-primary)',
              width: '16px',
              height: '16px',
              cursor: 'pointer',
            }}
          />
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                fontSize: '0.8125rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
              }}
            >
              Verified only
            </span>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '13px',
                height: '13px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-primary)',
                color: '#ffffff',
              }}
            >
              <Check size={8} strokeWidth={3} />
            </span>
          </div>
        </label>
      </div>

      {/* Category Filter */}
      <div>
        <h4
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '10px',
          }}
        >
          Categories
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <button
            type="button"
            onClick={() => onSelectCategory('all')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 10px',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.8125rem',
              color: selectedCategory === 'all' || !selectedCategory ? 'var(--accent-text)' : 'var(--text-secondary)',
              backgroundColor: selectedCategory === 'all' || !selectedCategory ? 'var(--accent-subtle)' : 'transparent',
              fontWeight: selectedCategory === 'all' || !selectedCategory ? 600 : 400,
              textAlign: 'left',
              transition: 'all var(--transition-fast)',
            }}
          >
            <span>All Categories</span>
          </button>

          {categories.map((cat) => {
            const isSelected = selectedCategory.toLowerCase() === cat.slug.toLowerCase();
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => onSelectCategory(cat.slug)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  color: isSelected ? 'var(--accent-text)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--accent-subtle)' : 'transparent',
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{cat.name}</span>
                <span
                  style={{
                    fontSize: '0.6875rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  {cat.toolCount}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Pricing Filter */}
      <div>
        <h4
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '10px',
          }}
        >
          Pricing
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PRICING_OPTIONS.map((price) => {
            const isSelected = selectedPricing === price;
            return (
              <button
                key={price}
                type="button"
                onClick={() => onSelectPricing(price)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  color: isSelected ? 'var(--accent-text)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--accent-subtle)' : 'transparent',
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{price}</span>
                {isSelected && <Check size={12} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Platform Filter */}
      <div>
        <h4
          style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
            marginBottom: '10px',
          }}
        >
          Platform
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PLATFORM_OPTIONS.map((plat) => {
            const isSelected = selectedPlatform === plat;
            return (
              <button
                key={plat}
                type="button"
                onClick={() => onSelectPlatform(plat)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '6px 10px',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8125rem',
                  color: isSelected ? 'var(--accent-text)' : 'var(--text-secondary)',
                  backgroundColor: isSelected ? 'var(--accent-subtle)' : 'transparent',
                  fontWeight: isSelected ? 600 : 400,
                  textAlign: 'left',
                  transition: 'all var(--transition-fast)',
                }}
              >
                <span>{plat}</span>
                {isSelected && <Check size={12} />}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};
