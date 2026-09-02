import { PokeballIcon } from './PokeballIcon';

interface ToolbarProps {
  view: 'list' | 'map';
  onViewChange: (view: 'list' | 'map') => void;
  showSavedOnly: boolean;
  savedCount: number;
  onToggleSaved: () => void;
  onExport: () => void;
}

export function Toolbar({
  view,
  onViewChange,
  showSavedOnly,
  savedCount,
  onToggleSaved,
  onExport,
}: ToolbarProps) {
  return (
    <div className="mb-4 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-gray-200 pb-4">
      <div className="flex bg-gray-100 p-1 rounded-lg">
        <button
          type="button"
          onClick={() => onViewChange('list')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition ${
            view === 'list' ? 'shadow-sm bg-white text-pkmn-blue' : 'text-gray-500 hover:text-pkmn-blue'
          }`}
        >
          Lista
        </button>
        <button
          type="button"
          onClick={() => onViewChange('map')}
          className={`px-4 py-2 rounded-md text-sm font-bold transition ${
            view === 'map' ? 'shadow-sm bg-white text-pkmn-blue' : 'text-gray-500 hover:text-pkmn-blue'
          }`}
        >
          Mapa
        </button>
      </div>

      <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
        <button
          type="button"
          onClick={onToggleSaved}
          className={`w-full sm:w-auto px-4 py-2 border rounded-lg transition flex items-center justify-center space-x-2 font-medium group ${
            showSavedOnly
              ? 'bg-pkmn-red text-white border-pkmn-red'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-pkmn-red hover:border-pkmn-red'
          }`}
        >
          <PokeballIcon
            className={`w-5 h-5 transition-colors ${showSavedOnly ? '' : 'group-hover:text-pkmn-red'}`}
          />
          <span>{showSavedOnly ? 'Mostrando Salvos' : 'Ver Salvos'}</span>
          {savedCount > 0 && (
            <span
              className={`ml-1 text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center ${
                showSavedOnly ? 'bg-white text-pkmn-red' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {savedCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={onExport}
          className="w-full sm:w-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 hover:text-pkmn-blue hover:border-pkmn-blue transition flex items-center justify-center space-x-2 font-medium"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>Exportar Agenda</span>
        </button>
      </div>
    </div>
  );
}
