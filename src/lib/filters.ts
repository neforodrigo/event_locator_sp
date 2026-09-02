import type { FilterState, SortKey, TcgEvent } from '../types';

export function eventStateCode(event: TcgEvent): string {
  return (event.state || '').toString().trim().toUpperCase();
}

export function matchesState(event: TcgEvent, selectedState: string): boolean {
  if (selectedState === 'all') return true;
  const eventState = eventStateCode(event);
  const filterState = selectedState.toString().trim().toUpperCase();
  return eventState === filterState || eventState.includes(filterState);
}

export function uniqueStates(events: TcgEvent[]): string[] {
  return [...new Set(events.map(eventStateCode).filter(Boolean))].sort();
}

export function uniqueTypes(events: TcgEvent[]): string[] {
  return [...new Set(events.map((e) => e.type).filter((t): t is string => Boolean(t)))];
}

export function uniqueMonths(events: TcgEvent[]): number[] {
  return [
    ...new Set(
      events
        .map((e) => {
          const date = new Date(e.when || '');
          return Number.isNaN(date.getTime()) ? null : date.getUTCMonth();
        })
        .filter((m): m is number => m !== null),
    ),
  ].sort((a, b) => a - b);
}

export function citiesForState(events: TcgEvent[], selectedState: string): string[] {
  const pool =
    selectedState === 'all' ? events : events.filter((e) => matchesState(e, selectedState));
  return [...new Set(pool.map((e) => e.city).filter((c): c is string => Boolean(c)))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function pickDefaultState(states: string[]): string {
  if (states.includes('SP')) return 'SP';
  if (states.includes('SÃO PAULO')) return 'SÃO PAULO';
  if (states.includes('SAO PAULO')) return 'SAO PAULO';
  return 'all';
}

export function filterAndSortEvents(
  events: TcgEvent[],
  filters: FilterState,
  savedIds: Set<string>,
): TcgEvent[] {
  const searchTerm = filters.search.toLowerCase();

  const filtered = events.filter((event) => {
    if (filters.showSavedOnly && !savedIds.has(event.uniqueId)) {
      return false;
    }

    const matchesSearch =
      searchTerm === '' ||
      Object.values(event).some((val) => String(val).toLowerCase().includes(searchTerm));
    const matchesType = filters.type === 'all' || event.type === filters.type;
    const matchesCity = filters.allCities || filters.selectedCities.includes(event.city || '');
    const eventDate = new Date(event.when || '');
    const matchesMonth =
      filters.month === 'all' ||
      (Number.isNaN(eventDate.getTime()) ? false : String(eventDate.getUTCMonth()) === filters.month);

    return matchesSearch && matchesType && matchesState(event, filters.state) && matchesCity && matchesMonth;
  });

  const key: SortKey = filters.sortKey;
  const direction = filters.sortDirection;

  return filtered.sort((a, b) => {
    let valA: string | number = (a[key] as string) ?? '';
    let valB: string | number = (b[key] as string) ?? '';

    if (key === 'when') {
      valA = new Date(a.when || '').getTime();
      valB = new Date(b.when || '').getTime();
    } else if (typeof valA === 'string') {
      valA = valA.toLowerCase();
      valB = String(valB).toLowerCase();
    }

    if (valA < valB) return direction === 'asc' ? -1 : 1;
    if (valA > valB) return direction === 'asc' ? 1 : -1;
    return 0;
  });
}
