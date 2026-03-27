'use client';

import { useRef, useState } from 'react';
import { useTeamsQuery } from './queries/useTeamQuery';

export function useTeamSearch() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (value: string) => {
    setQuery(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setDebouncedQuery(value);
    }, 300);
  };

  const { data: teams, isLoading, isError } = useTeamsQuery(debouncedQuery || undefined);

  return { query, handleSearch, teams, isLoading, isError };
}
