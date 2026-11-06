import type { ReactNode } from 'react';
import { PokeballIcon } from './PokeballIcon';

interface ToolbarProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
  showSavedOnly: boolean;
  savedCount: number;
  onToggleSaved: () => void;
  onExport: () => void;
  advancedFilters: ReactNode;
}

const ghostButton =
  'h-10 px-3 text-sm font-medium rounded-lg transition flex items-center justify-center gap-2 w-full sm:w-auto';

export function Toolbar({
  view,
  onViewChange,
  showSavedOnly,
  savedCount,
  onToggleSaved,
  onExport,
  advancedFilters,
}: ToolbarProps) {
  return (
    <div className="mb-5 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3">
      <div className="flex self-start bg-white p-1 rounded-full shadow-sm">
        <button
          type="button"
          onClick={() => onViewChange('list')}
          className={`px-5 h-9 rounded-full text-sm font-bold transition ${
            view === 'list'
              ? 'bg-pkmn-blue text-pkmn-gold shadow-sm'
              : 'text-pkmn-muted hover:text-pkmn-ink'
          }`}
        >
          Lista
        </button>
        <button
          type="button"
          onClick={() => onViewChange('map')}
          className={`px-5 h-9 rounded-full text-sm font-bold transition ${
            view === 'map'
              ? 'bg-pkmn-blue text-pkmn-gold shadow-sm'
              : 'text-pkmn-muted hover:text-pkmn-ink'
          }`}
        >
          Mapa
        </button>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-1.5">
        {advancedFilters}
        <button
          type="button"
          onClick={onToggleSaved}
          className={`${ghostButton} ${
            showSavedOnly
              ? 'bg-pkmn-red text-white'
              : 'text-pkmn-muted hover:text-pkmn-ink hover:bg-white/70'
          }`}
        >
          <PokeballIcon
            className={`w-4 h-4 ${showSavedOnly ? '' : 'text-pkmn-muted'}`}
          />
          <span>{showSavedOnly ? 'Mostrando salvos' : 'Ver salvos'}</span>
          {savedCount > 0 && (
            <span
              className={`text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                showSavedOnly ? 'bg-white/20 text-white' : 'bg-white text-pkmn-muted'
              }`}
            >
              {savedCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onExport}
          className={`${ghostButton} text-pkmn-muted hover:text-pkmn-ink hover:bg-white/70`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Exportar agenda</span>
        </button>
      </div>
    </div>
  );
}
