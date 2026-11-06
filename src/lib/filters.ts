import {
  WEEKDAY_ABBR,
  normalizeProduct,
  type FilterState,
  type Product,
  type SortKey,
  type TcgEvent,
} from '../types';

export function eventUtcDate(when?: string): Date | null {
  const date = new Date(when || '');
  return Number.isNaN(date.getTime()) ? null : date;
}

export function eventUtcDateKey(when?: string): string | null {
  const date = eventUtcDate(when);
  if (!date) return null;
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formatDateFilterLabel(isoDate: string): string {
  const [year, month, day] = isoDate.split('-').map(Number);
  if (!year || !month || !day) return isoDate;
  const date = new Date(Date.UTC(year, month - 1, day));
  const weekday = WEEKDAY_ABBR[date.getUTCDay()];
  return `${String(day).padStart(2, '0')}/${String(month).padStart(2, '0')} (${weekday})`;
}

export function eventsForProduct(events: TcgEvent[], product: Product): TcgEvent[] {
  return events.filter((event) => normalizeProduct(event.product) === product);
}

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
          const date = eventUtcDate(e.when);
          return date ? date.getUTCMonth() : null;
        })
        .filter((m): m is number => m !== null),
    ),
  ].sort((a, b) => a - b);
}

export function uniqueDates(events: TcgEvent[], month: string): string[] {
  const pool =
    month === 'all'
      ? events
      : events.filter((event) => {
          const date = eventUtcDate(event.when);
          return date ? String(date.getUTCMonth()) === month : false;
        });

  return [
    ...new Set(pool.map((event) => eventUtcDateKey(event.when)).filter((key): key is string => Boolean(key))),
  ].sort();
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
    const eventDate = eventUtcDate(event.when);
    const matchesMonth =
      filters.month === 'all' || (eventDate ? String(eventDate.getUTCMonth()) === filters.month : false);
    const matchesWeekday =
      filters.selectedWeekdays.length === 0 ||
      (eventDate ? filters.selectedWeekdays.includes(eventDate.getUTCDay()) : false);
    const dateKey = eventUtcDateKey(event.when);
    const rangeStart = filters.dateStart;
    const rangeEnd = filters.dateEnd || filters.dateStart;
    const matchesDate =
      !rangeStart || (dateKey ? dateKey >= rangeStart && dateKey <= rangeEnd : false);

    return (
      matchesSearch &&
      matchesType &&
      matchesState(event, filters.state) &&
      matchesCity &&
      matchesMonth &&
      matchesWeekday &&
      matchesDate
    );
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
