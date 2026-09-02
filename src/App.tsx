import { useEffect, useMemo, useState } from 'react';
import { defaultFilterState, type FilterState, type SortKey, type TcgEvent } from './types';
import { filterAndSortEvents, pickDefaultState, uniqueStates } from './lib/filters';
import { useEvents } from './hooks/useEvents';
import { useSavedEvents } from './hooks/useSavedEvents';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ApiStatus } from './components/ApiStatus';
import { Toolbar } from './components/Toolbar';
import { Filters } from './components/Filters';
import { EventsTable } from './components/EventsTable';
import { EventsMap } from './components/EventsMap';
import { DetailsPanel } from './components/DetailsPanel';
import { ExportModal } from './components/ExportModal';
import { WelcomeModal } from './components/WelcomeModal';
import { SavedDisclaimer } from './components/SavedDisclaimer';

export default function App() {
  const { events, loading, error, reload } = useEvents();
  const { savedIds, toggleSave } = useSavedEvents();
  const [filters, setFilters] = useState<FilterState>(defaultFilterState);
  const [view, setView] = useState<'list' | 'map'>('list');
  const [mapMounted, setMapMounted] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<TcgEvent | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [stateInitialized, setStateInitialized] = useState(false);

  useEffect(() => {
    if (!events.length || stateInitialized) return;
    const states = uniqueStates(events);
    setFilters((prev) => ({ ...prev, state: pickDefaultState(states) }));
    setStateInitialized(true);
  }, [events, stateInitialized]);

  useEffect(() => {
    if (view === 'map') setMapMounted(true);
  }, [view]);

  const filtered = useMemo(
    () => filterAndSortEvents(events, filters, savedIds),
    [events, filters, savedIds],
  );

  const savedEvents = useMemo(
    () => events.filter((e) => savedIds.has(e.uniqueId)),
    [events, savedIds],
  );

  function patchFilters(patch: Partial<FilterState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleSort(key: SortKey) {
    setFilters((prev) => ({
      ...prev,
      sortKey: key,
      sortDirection: prev.sortKey === key ? (prev.sortDirection === 'asc' ? 'desc' : 'asc') : 'asc',
    }));
  }

  let emptyMessage = 'Nenhum evento encontrado.';
  if (!loading && events.length === 0 && !error) {
    emptyMessage = 'Conectado à API, mas nenhum evento encontrado no momento.';
  } else if (events.length > 0 && filtered.length === 0) {
    emptyMessage = filters.showSavedOnly
      ? 'Você ainda não salvou nenhum evento.'
      : 'Nenhum resultado encontrado para os filtros aplicados.';
  }

  return (
    <div className="bg-pkmn-bg text-gray-800 pb-20 min-h-screen">
      <div className="container mx-auto p-2 sm:p-4 md:p-8">
        <Header />
        <main className="bg-white rounded-xl shadow-lg p-3 sm:p-6 relative">
          <ApiStatus error={error} onRetry={reload} />
          <Toolbar
            view={view}
            onViewChange={setView}
            showSavedOnly={filters.showSavedOnly}
            savedCount={savedIds.size}
            onToggleSaved={() => patchFilters({ showSavedOnly: !filters.showSavedOnly })}
            onExport={() => setExportOpen(true)}
          />
          <Filters events={events} filters={filters} onChange={patchFilters} />

          {view === 'list' && (
            <EventsTable
              events={filtered}
              savedIds={savedIds}
              sortKey={filters.sortKey}
              sortDirection={filters.sortDirection}
              onSort={handleSort}
              onSelect={setSelectedEvent}
              onToggleSave={toggleSave}
            />
          )}

          {mapMounted && (
            <EventsMap
              events={filtered}
              visible={view === 'map'}
              onOpenDetails={setSelectedEvent}
            />
          )}

          {filtered.length === 0 && !loading && (
            <div className="text-center py-8 text-gray-500">
              <p>{emptyMessage}</p>
            </div>
          )}
        </main>
        <Footer />
      </div>

      <DetailsPanel
        event={selectedEvent}
        saved={selectedEvent ? savedIds.has(selectedEvent.uniqueId) : false}
        onClose={() => setSelectedEvent(null)}
        onToggleSave={toggleSave}
      />
      <ExportModal open={exportOpen} savedEvents={savedEvents} onClose={() => setExportOpen(false)} />
      <WelcomeModal />
      <SavedDisclaimer visible={filters.showSavedOnly} onExport={() => setExportOpen(true)} />
    </div>
  );
}
