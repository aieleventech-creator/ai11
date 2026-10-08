'use client';

import React from 'react';
import { X } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';
import { Category, PricingType, PlatformType } from '@/lib/types';
import { Button } from '@/components/ui/Button';

interface MobileFilterModalProps {
  isOpen: boolean;
  onClose: () => void;
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
  resultsCount: number;
}

export const MobileFilterModal: React.FC<MobileFilterModalProps> = ({
  isOpen,
  onClose,
  resultsCount,
  ...sidebarProps
}) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 150,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.65)',
          backdropFilter: 'blur(4px)',
        }}
      />

      {/* Drawer */}
      <div
        style={{
          position: 'relative',
          width: '88%',
          maxWidth: '380px',
          height: '100%',
          backgroundColor: 'var(--bg-surface)',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 151,
          boxShadow: 'var(--shadow-lg)',
          overflowY: 'auto',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px',
              paddingBottom: '12px',
              borderBottom: '1px solid var(--border-subtle)',
            }}
          >
            <h3
              style={{
                fontSize: '1.125rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
              }}
            >
              Filter Tools
            </h3>
            <button
              onClick={onClose}
              aria-label="Close filters"
              style={{
                padding: '6px',
                borderRadius: 'var(--radius-sm)',
                color: 'var(--text-muted)',
              }}
            >
              <X size={20} />
            </button>
          </div>

          <FilterSidebar {...sidebarProps} />
        </div>

        {/* Apply CTA */}
        <div
          style={{
            marginTop: '32px',
            paddingTop: '16px',
            borderTop: '1px solid var(--border-subtle)',
          }}
        >
          <Button
            variant="primary"
            size="md"
            onClick={onClose}
            style={{ width: '100%', justifyContent: 'center' }}
          >
            Show {resultsCount} Tools
          </Button>
        </div>
      </div>
    </div>
  );
};
