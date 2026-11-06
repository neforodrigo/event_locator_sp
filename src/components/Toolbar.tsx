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

const actionTile =
  'w-full sm:w-auto min-h-[4.5rem] sm:min-h-0 sm:h-10 px-1.5 sm:px-3 py-2 sm:py-0 rounded-2xl sm:rounded-lg transition flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 text-[11px] sm:text-sm font-semibold sm:font-medium leading-tight';

const actionIdle =
  'bg-white text-pkmn-ink shadow-sm ring-1 ring-slate-200/90 sm:bg-transparent sm:shadow-none sm:ring-0 sm:text-pkmn-muted hover:text-pkmn-ink hover:bg-white sm:hover:bg-white/70';

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

      <div className="relative grid grid-cols-3 sm:flex sm:flex-row w-full sm:w-auto gap-2 sm:gap-1.5">
        {advancedFilters}
        <button
          type="button"
          title={showSavedOnly ? 'Mostrando salvos' : 'Ver salvos'}
          onClick={onToggleSaved}
          className={`${actionTile} ${
            showSavedOnly ? 'bg-pkmn-red text-white shadow-sm ring-1 ring-pkmn-red' : actionIdle
          }`}
        >
          <span className="relative">
            <PokeballIcon className="w-5 h-5 sm:w-4 sm:h-4" />
            {savedCount > 0 && (
              <span
                className={`sm:hidden absolute -top-1.5 -right-2.5 text-[10px] font-bold px-1 min-w-[16px] h-4 rounded-full flex items-center justify-center ${
                  showSavedOnly ? 'bg-white text-pkmn-red' : 'bg-pkmn-blue text-white'
                }`}
              >
                {savedCount}
              </span>
            )}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="sm:hidden">Salvos</span>
            <span className="hidden sm:inline">{showSavedOnly ? 'Mostrando salvos' : 'Ver salvos'}</span>
            {savedCount > 0 && (
              <span
                className={`hidden sm:inline text-[11px] font-semibold px-1.5 py-0.5 rounded-full min-w-[18px] text-center ${
                  showSavedOnly ? 'bg-white/20 text-white' : 'bg-white text-pkmn-muted'
                }`}
              >
                {savedCount}
              </span>
            )}
          </span>
        </button>

        <button
          type="button"
          title="Exportar agenda"
          onClick={onExport}
          className={`${actionTile} ${actionIdle}`}
        >
          <svg className="w-5 h-5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.75"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>
            <span className="sm:hidden">Exportar</span>
            <span className="hidden sm:inline">Exportar agenda</span>
          </span>
        </button>
      </div>
    </div>
  );
}
