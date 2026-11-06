import { MONTH_NAMES, type FilterState, type TcgEvent } from '../types';
import { citiesForState, uniqueMonths, uniqueStates, uniqueTypes } from '../lib/filters';
import { CityMultiSelect } from './CityMultiSelect';

interface FiltersProps {
  events: TcgEvent[];
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
}

const fieldClass =
  'w-full h-11 px-3 text-sm border border-slate-200/90 rounded-xl bg-white text-pkmn-ink font-semibold focus:outline-none focus:ring-2 focus:ring-pkmn-gold/50 focus:border-pkmn-gold transition';
const labelClass = 'block text-xs font-semibold text-pkmn-ink mb-1.5';

export function Filters({ events, filters, onChange }: FiltersProps) {
  const states = uniqueStates(events);
  const types = uniqueTypes(events);
  const months = uniqueMonths(events);
  const cities = citiesForState(events, filters.state);

  return (
    <>
      <div className="mb-4">
        <label htmlFor="search-input" className={labelClass}>
          Pesquisar
        </label>
        <div className="relative">
          <svg
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-pkmn-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
          <input
            type="text"
            id="search-input"
            value={filters.search}
            onChange={(e) => onChange({ search: e.target.value })}
            placeholder="Buscar por nome, cidade, loja..."
            className={`${fieldClass} pl-10 font-normal`}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        <div>
          <label htmlFor="state-filter" className={labelClass}>
            Estado
          </label>
          <select
            id="state-filter"
            value={filters.state}
            onChange={(e) =>
              onChange({ state: e.target.value, allCities: true, selectedCities: [] })
            }
            className={fieldClass}
          >
            <option value="all">Todos os estados</option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="type-filter" className={labelClass}>
            Tipo
          </label>
          <select
            id="type-filter"
            value={filters.type}
            onChange={(e) => onChange({ type: e.target.value })}
            className={fieldClass}
          >
            <option value="all">Todos os tipos</option>
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
          <label htmlFor="month-filter" className={labelClass}>
            Mês
          </label>
          <select
            id="month-filter"
            value={filters.month}
            onChange={(e) => onChange({ month: e.target.value })}
            className={fieldClass}
          >
            <option value="all">Todos os meses</option>
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
