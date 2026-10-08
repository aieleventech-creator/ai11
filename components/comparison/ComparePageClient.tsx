'use client';

import React, { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Tool } from '@/lib/types';
import { useComparison } from '@/lib/hooks/useComparison';
import { ComparisonMatrix } from './ComparisonMatrix';

interface ComparePageClientProps {
  allTools: Tool[];
}

export const ComparePageClient: React.FC<ComparePageClientProps> = ({ allTools }) => {
  const searchParams = useSearchParams();
  const { selectedSlugs } = useComparison();

  const toolsParam = searchParams.get('tools') || '';

  // Determine active slugs: from URL if present, otherwise fallback to local comparison list
  const activeSlugs = useMemo(() => {
    if (toolsParam.trim()) {
      return Array.from(
        new Set(
          toolsParam
            .split(',')
            .map((s) => s.trim().toLowerCase())
            .filter(Boolean)
        )
      ).slice(0, 4);
    }
    return selectedSlugs.slice(0, 4);
  }, [toolsParam, selectedSlugs]);

  // Compute matched tools preserving active slug order
  const matchedTools = useMemo(() => {
    return activeSlugs
      .map((slug) => allTools.find((t) => t.slug.toLowerCase() === slug && t.isPublished))
      .filter((t): t is Tool => Boolean(t));
  }, [activeSlugs, allTools]);

  return <ComparisonMatrix initialTools={matchedTools} allTools={allTools} />;
};
