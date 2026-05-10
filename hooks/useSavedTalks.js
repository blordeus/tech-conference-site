'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'tc_saved_talks';

/**
 * Manages saved talks in localStorage.
 * Safe for SSR — reads storage only after mount.
 *
 * Returns:
 *   savedIds   — Set of saved talk IDs
 *   isSaved(id) — boolean
 *   toggleSave(id) — add or remove
 *   clearAll()  — wipe saved talks
 */
export function useSavedTalks() {
  const [savedIds, setSavedIds] = useState(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR mismatch)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSavedIds(new Set(JSON.parse(stored)));
      }
    } catch {
      // corrupt storage — start fresh
    }
    setHydrated(true);
  }, []);

  // Persist to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(savedIds)));
  }, [savedIds, hydrated]);

  const toggleSave = useCallback((id) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds]);

  const clearAll = useCallback(() => setSavedIds(new Set()), []);

  return { savedIds, isSaved, toggleSave, clearAll, hydrated };
}
