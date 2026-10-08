'use client';

import React, { useState } from 'react';
import { ExternalLink, Bookmark, Share2, Check, Scale } from 'lucide-react';
import { Tool } from '@/lib/types';
import { Button } from '@/components/ui/Button';
import { useFavorites } from '@/lib/hooks/useFavorites';
import { useComparison } from '@/lib/hooks/useComparison';

interface ToolActionsProps {
  tool: Tool;
}

export const ToolActions: React.FC<ToolActionsProps> = ({ tool }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { isInComparison, toggleTool, canAddMore } = useComparison();
  const [copied, setCopied] = useState(false);
  const favorited = isFavorite(tool.id);
  const inComparison = isInComparison(tool.slug);

  const handleShare = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {}
  };

  const handleCompareClick = () => {
    toggleTool(tool.slug);
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        flexWrap: 'wrap',
      }}
    >
      {/* Primary: Visit official website */}
      <a
        href={tool.websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={{ textDecoration: 'none' }}
      >
        <Button
          variant="primary"
          size="md"
          icon={<ExternalLink size={15} />}
          iconPosition="right"
        >
          Visit official website
        </Button>
      </a>

      {/* Compare Tool */}
      <Button
        variant={inComparison ? 'primary' : 'outline'}
        size="md"
        icon={<Scale size={15} />}
        iconPosition="left"
        onClick={handleCompareClick}
        disabled={!inComparison && !canAddMore}
        title={!inComparison && !canAddMore ? 'Maximum 4 tools in comparison' : undefined}
        style={{
          borderColor: inComparison ? 'var(--accent-primary)' : 'var(--border-default)',
        }}
      >
        {inComparison ? 'In Comparison' : 'Compare'}
      </Button>

      {/* Save Tool */}
      <Button
        variant="secondary"
        size="md"
        icon={<Bookmark size={15} fill={favorited ? 'currentColor' : 'none'} />}
        iconPosition="left"
        onClick={() => toggleFavorite(tool.id)}
        style={{
          color: favorited ? 'var(--accent-text)' : 'var(--text-primary)',
          borderColor: favorited ? 'var(--accent-border)' : 'var(--border-default)',
        }}
      >
        {favorited ? 'Saved in favorites' : 'Save tool'}
      </Button>

      {/* Share Tool */}
      <Button
        variant="outline"
        size="md"
        icon={copied ? <Check size={15} /> : <Share2 size={15} />}
        iconPosition="left"
        onClick={handleShare}
      >
        {copied ? 'Link copied!' : 'Share'}
      </Button>
    </div>
  );
};
