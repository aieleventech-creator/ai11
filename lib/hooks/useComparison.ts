'use client';

import { useSyncExternalStore } from 'react';

const STORAGE_KEY = 'ai11-comparison-tools';
export const MAX_COMPARE_TOOLS = 4;

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('comparison-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('comparison-change', callback);
  };
}

const EMPTY_SLUGS: string[] = [];
let cachedComparisonRaw: string | null = null;
let cachedComparisonSnapshot: string[] = EMPTY_SLUGS;

function getSnapshot(): string[] {
  if (typeof window === 'undefined') return EMPTY_SLUGS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedComparisonRaw) {
      return cachedComparisonSnapshot;
    }
    cachedComparisonRaw = raw;
    if (!raw) {
      cachedComparisonSnapshot = EMPTY_SLUGS;
      return cachedComparisonSnapshot;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedComparisonSnapshot = parsed.slice(0, MAX_COMPARE_TOOLS);
      return cachedComparisonSnapshot;
    }
    cachedComparisonSnapshot = EMPTY_SLUGS;
    return cachedComparisonSnapshot;
  } catch {
    cachedComparisonSnapshot = EMPTY_SLUGS;
    return cachedComparisonSnapshot;
  }
}

function getServerSnapshot(): string[] {
  return EMPTY_SLUGS;
}

export function useComparison() {
  const selectedSlugs = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const saveSlugs = (slugs: string[]) => {
    try {
      const sanitized = Array.from(new Set(slugs.map((s) => s.toLowerCase().trim()))).slice(
        0,
        MAX_COMPARE_TOOLS
      );
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sanitized));
      window.dispatchEvent(new Event('comparison-change'));
    } catch {}
  };

  const addTool = (slug: string): boolean => {
    const cleanSlug = slug.toLowerCase().trim();
    if (!cleanSlug) return false;
    if (selectedSlugs.includes(cleanSlug)) return true;
    if (selectedSlugs.length >= MAX_COMPARE_TOOLS) return false;

    saveSlugs([...selectedSlugs, cleanSlug]);
    return true;
  };

  const removeTool = (slug: string) => {
    const cleanSlug = slug.toLowerCase().trim();
    saveSlugs(selectedSlugs.filter((s) => s !== cleanSlug));
  };

  const toggleTool = (slug: string): boolean => {
    const cleanSlug = slug.toLowerCase().trim();
    if (selectedSlugs.includes(cleanSlug)) {
      removeTool(cleanSlug);
      return false;
    } else {
      return addTool(cleanSlug);
    }
  };

  const setTools = (slugs: string[]) => {
    saveSlugs(slugs);
  };

  const clearComparison = () => {
    saveSlugs([]);
  };

  const isInComparison = (slug: string) => {
    return selectedSlugs.includes(slug.toLowerCase().trim());
  };

  const compareUrl = selectedSlugs.length > 0
    ? `/compare?tools=${selectedSlugs.join(',')}`
    : '/compare';

  return {
    selectedSlugs,
    comparisonList: selectedSlugs,
    addTool,
    addToComparison: (slug: string) => addTool(slug),
    removeTool,
    removeFromComparison: (slug: string) => removeTool(slug),
    toggleTool,
    toggleComparison: (slug: string) => toggleTool(slug),
    setTools,
    clearComparison,
    isInComparison,
    compareUrl,
    canAddMore: selectedSlugs.length < MAX_COMPARE_TOOLS,
  };
}
