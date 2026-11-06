import type { FilterState, SortKey, TcgEvent } from '../types';
import { eventTypeDisplay, formatEventDate } from '../lib/display';
import { PokeballIcon } from './PokeballIcon';

interface EventsTableProps {
  events: TcgEvent[];
  savedIds: Set<string>;
  sortKey: SortKey;
  sortDirection: FilterState['sortDirection'];
  onSort: (key: SortKey) => void;
  onSelect: (event: TcgEvent) => void;
  onToggleSave: (id: string) => void;
}

const columns: { key: SortKey; label: string; hiddenOnMobile?: boolean }[] = [
  { key: 'name', label: 'Evento', hiddenOnMobile: true },
  { key: 'type', label: 'Tipo' },
  { key: 'when', label: 'Data' },
  { key: 'shop', label: 'Loja' },
  { key: 'city', label: 'Cidade' },
];

export function EventsTable({
  events,
  savedIds,
  sortKey,
  sortDirection,
  onSort,
  onSelect,
  onToggleSave,
}: EventsTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl bg-white/80">
      <table className="min-w-full">
        <thead>
          <tr>
            <th scope="col" className="px-2 py-3 w-10 text-center">
              <span className="sr-only">Favorito</span>
            </th>
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                data-sort={col.key}
                data-sort-direction={sortKey === col.key ? sortDirection : undefined}
                onClick={() => onSort(col.key)}
                className={`${col.hiddenOnMobile ? 'hidden sm:table-cell ' : ''}px-2 py-3 sm:px-5 text-left text-xs font-semibold text-pkmn-ink cursor-pointer`}
              >
                {col.label}
                <span className="sort-indicator" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {events.map((event) => {
            const isSaved = savedIds.has(event.uniqueId);
            const { abbreviatedType, fullTypeName, typeClass } = eventTypeDisplay(event.type);
            return (
              <tr
                key={event.uniqueId}
                className="cursor-pointer table-row-hover transition-colors duration-200"
                onClick={() => onSelect(event)}
              >
                <td className="px-2 py-3 w-10 text-center" onClick={(e) => e.stopPropagation()}>
                  <button
                    type="button"
                    className={`poke-btn focus:outline-none ${isSaved ? 'text-gray-800' : 'text-gray-400 hover:text-gray-600'}`}
                    title={isSaved ? 'Remover dos salvos' : 'Salvar evento'}
                    onClick={() => onToggleSave(event.uniqueId)}
                  >
                    <PokeballIcon saved={isSaved} />
                  </button>
                </td>
                <td className="hidden sm:table-cell px-2 py-3 sm:px-6 sm:py-3.5 whitespace-nowrap text-xs sm:text-sm">
                  <div className="font-semibold text-pkmn-ink">{event.name || 'Sem Nome'}</div>
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-3.5 whitespace-nowrap text-xs sm:text-sm">
                  <span className={`sm:hidden px-2.5 py-0.5 inline-flex text-[11px] leading-4 font-medium rounded-full ${typeClass}`}>
                    {abbreviatedType}
                  </span>
                  <span className={`hidden sm:inline-flex px-2.5 py-0.5 text-[11px] leading-4 font-medium rounded-full ${typeClass}`}>
                    {fullTypeName}
                  </span>
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-3.5 whitespace-nowrap text-xs sm:text-sm text-slate-500">
                  {formatEventDate(event.when)}
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-3.5 whitespace-nowrap text-xs sm:text-sm text-slate-500">
                  {event.shop || '-'}
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-3.5 whitespace-nowrap text-xs sm:text-sm text-slate-500">
                  {event.city || '-'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
