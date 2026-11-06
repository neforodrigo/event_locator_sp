import { useEffect, useRef, useState } from 'react';
import {
  PAGE_SIZE_OPTIONS,
  WEEKDAY_LABELS,
  WEEKDAY_SHORT,
  type FilterState,
  type PageSize,
  type TcgEvent,
} from '../types';
import { uniqueDates } from '../lib/filters';
import { DateRangeCalendar } from './DateRangeCalendar';

interface AdvancedFiltersProps {
  events: TcgEvent[];
  filters: FilterState;
  onChange: (patch: Partial<FilterState>) => void;
}

export function AdvancedFilters({ events, filters, onChange }: AdvancedFiltersProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const dates = uniqueDates(events, filters.month);
  const activeCount = filters.selectedWeekdays.length + (filters.dateStart ? 1 : 0);
  const active = activeCount > 0;

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  function toggleWeekday(day: number) {
    const selected = filters.selectedWeekdays;
    if (selected.includes(day)) {
      onChange({ selectedWeekdays: selected.filter((item) => item !== day) });
    } else {
      onChange({ selectedWeekdays: [...selected, day].sort((a, b) => a - b) });
    }
  }

  return (
    <div className="relative w-full sm:w-auto" ref={wrapperRef}>
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className={`w-full sm:w-auto px-4 py-2 border rounded-lg transition flex items-center justify-center space-x-2 font-medium ${
          active || open
            ? 'bg-pkmn-blue text-white border-pkmn-blue'
            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:text-pkmn-blue hover:border-pkmn-blue'
        }`}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 4h18M6 12h12M10 20h4"
          />
        </svg>
        <span>Filtros avançados</span>
        {active && (
          <span
            className={`text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center ${
              open || active ? 'bg-white text-pkmn-blue' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {activeCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute z-30 right-0 mt-2 w-[min(100vw-2rem,24rem)] bg-white border border-gray-200 rounded-xl shadow-xl p-4 space-y-4">
          <div>
            <span className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Dia da Semana</span>
            <div className="flex h-[42px] rounded-lg border border-gray-300 overflow-hidden bg-white">
              {WEEKDAY_SHORT.map((label, day) => {
                const pressed = filters.selectedWeekdays.includes(day);
                return (
                  <button
                    key={`${day}-${label}`}
                    type="button"
                    title={WEEKDAY_LABELS[day]}
                    aria-pressed={pressed}
                    onClick={() => toggleWeekday(day)}
                    className={`flex-1 text-xs sm:text-sm font-bold transition ${
                      pressed
                        ? 'bg-pkmn-blue text-white'
                        : 'text-gray-500 hover:text-pkmn-blue hover:bg-gray-50'
                    } ${day > 0 ? 'border-l border-gray-200' : ''}`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>
          <DateRangeCalendar
            dateStart={filters.dateStart}
            dateEnd={filters.dateEnd}
            eventDates={dates}
            onChange={(dateStart, dateEnd) => onChange({ dateStart, dateEnd })}
          />
          <div>
            <label htmlFor="page-size-filter" className="block text-sm font-medium text-gray-700 mb-1">
              Resultados por página
            </label>
            <select
              id="page-size-filter"
              value={filters.pageSize}
              onChange={(e) => onChange({ pageSize: Number(e.target.value) as PageSize })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pkmn-red focus:border-pkmn-red transition bg-white"
            >
              {PAGE_SIZE_OPTIONS.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
          {active && (
            <button
              type="button"
              onClick={() => onChange({ selectedWeekdays: [], dateStart: '', dateEnd: '' })}
              className="w-full text-sm font-medium text-pkmn-blue hover:underline"
            >
              Limpar filtros avançados
            </button>
          )}
        </div>
      )}
    </div>
  );
}
