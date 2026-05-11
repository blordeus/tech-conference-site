'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';

export function useSavedTalks() {
  const { data: session } = useSession();
  const [savedIds, setSavedIds] = useState(new Set());
  const [hydrated, setHydrated] = useState(false);

  // Load saved talks — from API if logged in, localStorage if not
  useEffect(() => {
    if (session) {
      fetch('/api/saves')
        .then((r) => r.json())
        .then(({ savedIds: ids }) => {
          setSavedIds(new Set(ids));
          setHydrated(true);
        });
    } else {
      try {
        const stored = localStorage.getItem('tc_saved_talks');
        if (stored) setSavedIds(new Set(JSON.parse(stored)));
      } catch {}
      setHydrated(true);
    }
  }, [session]);

  // Persist to localStorage when not logged in
  useEffect(() => {
    if (!hydrated || session) return;
    localStorage.setItem('tc_saved_talks', JSON.stringify(Array.from(savedIds)));
  }, [savedIds, hydrated, session]);

  const toggleSave = useCallback(async (id) => {
    const isSaved = savedIds.has(id);
    // Optimistic update
    setSavedIds((prev) => {
      const next = new Set(prev);
      isSaved ? next.delete(id) : next.add(id);
      return next;
    });

    if (session) {
      await fetch('/api/saves', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ talkId: id, action: isSaved ? 'unsave' : 'save' }),
      });
    }
  }, [savedIds, session]);

  const isSaved = useCallback((id) => savedIds.has(id), [savedIds]);

  const clearAll = useCallback(async () => {
    setSavedIds(new Set());
    if (!session) {
      localStorage.removeItem('tc_saved_talks');
    }
  }, [session]);

  return { savedIds, isSaved, toggleSave, clearAll, hydrated };
}