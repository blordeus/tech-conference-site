'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

/**
 * URL shape: /schedule?day=1&track=tr_1&view=saved&q=react
 *
 * day   — integer as string ('1' | '2' | '3' | 'all')
 * track — trackId ('tr_0' … 'tr_4' | 'all')
 * view  — 'all' | 'saved'
 * q     — free text search
 */
export function useScheduleFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const filters = useMemo(() => ({
    day:   searchParams.get('day')   ?? 'all',
    track: searchParams.get('track') ?? 'all',
    view:  searchParams.get('view')  ?? 'all',
    query: searchParams.get('q')     ?? '',
  }), [searchParams]);

  const updateParam = useCallback((key, value) => {
    const params = new URLSearchParams(searchParams.toString());
    if (!value || value === 'all' || value === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [router, pathname, searchParams]);

  const setDay   = (v) => updateParam('day', v);
  const setTrack = (v) => updateParam('track', v);
  const setView  = (v) => updateParam('view', v);
  const setQuery = (v) => updateParam('q', v);

  const clearFilters = useCallback(() => {
    router.replace(pathname, { scroll: false });
  }, [router, pathname]);

  /**
   * Filter an array of enriched talks (with .speaker and .track joined).
   * day filter compares Number(filters.day) to talk.day (integer).
   * track filter compares filters.track to talk.trackId.
   */
  const filterTalks = useCallback((talks, savedIds = new Set()) => {
    return talks.filter((talk) => {
      if (filters.view === 'saved' && !savedIds.has(talk.id)) return false;
      if (filters.day !== 'all' && talk.day !== Number(filters.day)) return false;
      if (filters.track !== 'all' && talk.trackId !== filters.track) return false;
      if (filters.query) {
        const q = filters.query.toLowerCase();
        const haystack = [
          talk.title,
          talk.speaker?.name,
          talk.speaker?.company,
          talk.track?.name,
          talk.description,
        ].filter(Boolean).join(' ').toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [filters]);

  const hasActiveFilter =
    filters.day !== 'all' ||
    filters.track !== 'all' ||
    filters.view !== 'all' ||
    filters.query !== '';

  return {
    filters,
    setDay,
    setTrack,
    setView,
    setQuery,
    clearFilters,
    filterTalks,
    hasActiveFilter,
  };
}