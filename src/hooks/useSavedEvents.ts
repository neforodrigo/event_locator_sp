import { useCallback, useEffect, useState } from 'react';
import { STORAGE_KEY } from '../types';

function readSavedIds(): Set<string> {
  try {
    const raw = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as string[];
    return new Set(Array.isArray(raw) ? raw : []);
  } catch {
    return new Set();
  }
}

export function useSavedEvents() {
  const [savedIds, setSavedIds] = useState<Set<string>>(() => readSavedIds());

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...savedIds]));
  }, [savedIds]);

  const toggleSave = useCallback((id: string) => {
    setSavedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  return { savedIds, toggleSave };
}
