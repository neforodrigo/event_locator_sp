import { useCallback, useEffect, useState } from 'react';
import { fetchEventsFromAPI } from '../api/events';
import type { TcgEvent } from '../types';

export function useEvents() {
  const [events, setEvents] = useState<TcgEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEventsFromAPI();
      setEvents(data);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  return { events, loading, error, reload: load };
}
