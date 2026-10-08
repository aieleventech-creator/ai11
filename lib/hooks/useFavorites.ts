'use client';

import { useSyncExternalStore, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ai11-favorites';
const EMPTY_FAVORITES: string[] = [];
let cachedFavoritesRaw: string | null = null;
let cachedFavoritesSnapshot: string[] = EMPTY_FAVORITES;

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  window.addEventListener('favorites-change', callback);
  window.addEventListener('auth-change', callback);
  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('favorites-change', callback);
    window.removeEventListener('auth-change', callback);
  };
}

function getSnapshot(): string[] {
  if (typeof window === 'undefined') return EMPTY_FAVORITES;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw === cachedFavoritesRaw) {
      return cachedFavoritesSnapshot;
    }
    cachedFavoritesRaw = raw;
    if (!raw) {
      cachedFavoritesSnapshot = EMPTY_FAVORITES;
      return cachedFavoritesSnapshot;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      cachedFavoritesSnapshot = parsed;
      return cachedFavoritesSnapshot;
    }
    cachedFavoritesSnapshot = EMPTY_FAVORITES;
    return cachedFavoritesSnapshot;
  } catch {
    cachedFavoritesSnapshot = EMPTY_FAVORITES;
    return cachedFavoritesSnapshot;
  }
}

function getServerSnapshot(): string[] {
  return EMPTY_FAVORITES;
}

function writeLocal(ids: string[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
    window.dispatchEvent(new Event('favorites-change'));
  } catch {}
}

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  // Sync with PostgreSQL database if authenticated
  const syncWithDatabase = useCallback(async () => {
    try {
      const res = await fetch('/api/favorites', { cache: 'no-store' });
      if (!res.ok) return;
      const data = await res.json();

      if (data.authenticated && Array.isArray(data.favorites)) {
        const localCurrent = getSnapshot();
        const unmigrated = localCurrent.filter((id) => !data.favorites.includes(id));

        if (unmigrated.length > 0) {
          // Merge local favorites to database
          const mergeRes = await fetch('/api/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ migrateToolIds: unmigrated }),
          });
          if (mergeRes.ok) {
            const mergedData = await mergeRes.json();
            if (mergedData.favorites) {
              writeLocal(mergedData.favorites);
              return;
            }
          }
        }

        // Align local store with DB
        writeLocal(data.favorites);
      }
    } catch {}
  }, []);

  useEffect(() => {
    syncWithDatabase();

    const handleAuthChange = () => {
      syncWithDatabase();
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => {
      window.removeEventListener('auth-change', handleAuthChange);
    };
  }, [syncWithDatabase]);

  const toggleFavorite = async (toolId: string) => {
    const current = getSnapshot();
    const isCurrentlySaved = current.includes(toolId);
    const updated = isCurrentlySaved
      ? current.filter((id) => id !== toolId)
      : [...current, toolId];

    // Optimistic local update
    writeLocal(updated);

    // Sync to PostgreSQL
    try {
      if (isCurrentlySaved) {
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toolId }),
        });
      } else {
        await fetch('/api/favorites', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toolId }),
        });
      }
    } catch {
      // Local copy remains intact
    }
  };

  const removeFavorite = async (toolId: string) => {
    const current = getSnapshot();
    const updated = current.filter((id) => id !== toolId);
    writeLocal(updated);

    try {
      await fetch('/api/favorites', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ toolId }),
      });
    } catch {}
  };

  const clearFavorites = async () => {
    const current = getSnapshot();
    writeLocal([]);

    try {
      for (const id of current) {
        await fetch('/api/favorites', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ toolId: id }),
        });
      }
    } catch {}
  };

  const isFavorite = (toolId: string) => favorites.includes(toolId);

  return {
    favorites,
    toggleFavorite,
    removeFavorite,
    clearFavorites,
    isFavorite,
    syncWithDatabase,
  };
}
