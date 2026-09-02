import { MONTH_NAMES, type FilterState, type TcgEvent } from '../types';
import { citiesForState, uniqueMonths, uniqueStates, uniqueTypes } from '../lib/filters';
import { CityMultiSelect } from './CityMultiSelect';

interface FiltersProps {
  events: TcgEvent[];
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
}

export function Filters({ events, filters, onChange }: FiltersProps) {
  const states = uniqueStates(events);
  const types = uniqueTypes(events);
  const months = uniqueMonths(events);
  const cities = citiesForState(events, filters.state);

  return (
    <>
      <div className="mb-4">
        <label htmlFor="search-input" className="block text-sm font-medium text-gray-700 mb-1">
          Pesquisar
        </label>
        <input
          type="text"
          id="search-input"
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          placeholder="Buscar por nome, cidade, loja..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pkmn-red focus:border-pkmn-red transition"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div>
          <label htmlFor="state-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Estado
          </label>
          <select
            id="state-filter"
            value={filters.state}
            onChange={(e) =>
              onChange({ state: e.target.value, allCities: true, selectedCities: [] })
            }
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pkmn-red focus:border-pkmn-red transition bg-white"
          >
            <option value="all">Todos os Estados</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Tipo
          </label>
          <select
            id="type-filter"
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pkmn-red focus:border-pkmn-red transition bg-white"
          >
            <option value="all">Todos os Tipos</option>
            {types.map((type) => (
              <option key={type} value={type}>
                {type.toLowerCase().includes('prerelease') ? 'Pré Release' : type}
              </option>
            ))}
          </select>
        </div>
        <CityMultiSelect
          cities={cities}
          allCities={filters.allCities}
          selectedCities={filters.selectedCities}
          onChange={(allCities, selectedCities) => onChange({ allCities, selectedCities })}
        />
        <div>
          <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-1">
            Filtrar por Mês
          </label>
          <select
            id="month-filter"
            value={filters.month}
            onChange={(e) => onChange({ month: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pkmn-red focus:border-pkmn-red transition bg-white"
          >
            <option value="all">Todos os Meses</option>
            {months.map((monthIndex) => (
              <option key={monthIndex} value={String(monthIndex)}>
                {MONTH_NAMES[monthIndex]}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
