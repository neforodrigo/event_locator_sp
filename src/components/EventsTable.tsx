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
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-pkmn-header-bg">
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
                className={`${col.hiddenOnMobile ? 'hidden sm:table-cell ' : ''}px-2 py-3 sm:px-6 text-left text-xs font-bold text-pkmn-blue uppercase tracking-wider cursor-pointer`}
              >
                {col.label}
                <span className="sort-indicator" />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
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
                <td className="hidden sm:table-cell px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                  <div className="font-medium text-gray-900">{event.name || 'Sem Nome'}</div>
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm">
                  <span className={`sm:hidden px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${typeClass}`}>
                    {abbreviatedType}
                  </span>
                  <span className={`hidden sm:inline-flex px-2 text-xs leading-5 font-semibold rounded-full ${typeClass}`}>
                    {fullTypeName}
                  </span>
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {formatEventDate(event.when)}
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
                  {event.shop || '-'}
                </td>
                <td className="px-2 py-3 sm:px-6 sm:py-4 whitespace-nowrap text-xs sm:text-sm text-gray-500">
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
