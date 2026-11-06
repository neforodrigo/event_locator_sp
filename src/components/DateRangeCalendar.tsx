import { useMemo, useState } from 'react';
import { MONTH_NAMES, WEEKDAY_SHORT } from '../types';
import { formatDateFilterLabel } from '../lib/filters';

interface DateRangeCalendarProps {
  dateStart: string;
  dateEnd: string;
  eventDates: string[];
  onChange: (dateStart: string, dateEnd: string) => void;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function toIso(year: number, monthIndex: number, day: number): string {
  return `${year}-${pad(monthIndex + 1)}-${pad(day)}`;
}

function parseIso(iso: string): { year: number; monthIndex: number } | null {
  const [year, month] = iso.split('-').map(Number);
  if (!year || !month) return null;
  return { year, monthIndex: month - 1 };
}

function formatRangeLabel(dateStart: string, dateEnd: string): string {
  if (!dateStart) return 'Todas as Datas';
  const end = dateEnd || dateStart;
  if (dateStart === end) return formatDateFilterLabel(dateStart);
  return `${formatDateFilterLabel(dateStart)} – ${formatDateFilterLabel(end)}`;
}

export function DateRangeCalendar({ dateStart, dateEnd, eventDates, onChange }: DateRangeCalendarProps) {
  const initial = parseIso(dateStart) ?? parseIso(eventDates[0] ?? '') ?? {
    year: new Date().getUTCFullYear(),
    monthIndex: new Date().getUTCMonth(),
  };
  const [viewYear, setViewYear] = useState(initial.year);
  const [viewMonth, setViewMonth] = useState(initial.monthIndex);
  const [pickingEnd, setPickingEnd] = useState(false);

  const eventDateSet = useMemo(() => new Set(eventDates), [eventDates]);
  const rangeEnd = dateEnd || dateStart;

  const cells = useMemo(() => {
    const firstWeekday = new Date(Date.UTC(viewYear, viewMonth, 1)).getUTCDay();
    const daysInMonth = new Date(Date.UTC(viewYear, viewMonth + 1, 0)).getUTCDate();
    const blanks = Array.from({ length: firstWeekday }, () => null);
    const days = Array.from({ length: daysInMonth }, (_, index) => toIso(viewYear, viewMonth, index + 1));
    return [...blanks, ...days];
  }, [viewYear, viewMonth]);

  function shiftMonth(delta: number) {
    const next = new Date(Date.UTC(viewYear, viewMonth + delta, 1));
    setViewYear(next.getUTCFullYear());
    setViewMonth(next.getUTCMonth());
  }

  function handleDayClick(iso: string) {
    if (!dateStart || !pickingEnd) {
      onChange(iso, iso);
      setPickingEnd(true);
      return;
    }

    const start = dateStart < iso ? dateStart : iso;
    const end = dateStart < iso ? iso : dateStart;
    onChange(start, end);
    setPickingEnd(false);
  }

  function dayClass(iso: string): string {
    const inRange = Boolean(dateStart && iso >= dateStart && iso <= rangeEnd);
    const isEdge = iso === dateStart || iso === rangeEnd;
    if (isEdge) return 'bg-pkmn-blue text-white';
    if (inRange) return 'bg-blue-100 text-pkmn-blue';
    return 'text-gray-700 hover:bg-gray-100';
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="block text-sm font-medium text-gray-700">Filtrar por Data</span>
        {dateStart && (
          <button
            type="button"
            onClick={() => {
              onChange('', '');
              setPickingEnd(false);
            }}
            className="text-xs font-medium text-pkmn-blue hover:underline"
          >
            Limpar data
          </button>
        )}
      </div>
      <p className={`text-sm mb-2 ${dateStart ? 'font-bold text-pkmn-blue' : 'text-gray-500'}`}>
        {formatRangeLabel(dateStart, dateEnd)}
      </p>
      <p className="text-xs text-gray-500 mb-2">Clique em um dia, ou em dois dias para um período.</p>
      <div className="border border-gray-300 rounded-lg p-3 bg-white">
        <div className="flex items-center justify-between mb-2">
          <button
            type="button"
            onClick={() => shiftMonth(-1)}
            className="p-1 rounded hover:bg-gray-100 text-gray-600"
            aria-label="Mês anterior"
          >
            ‹
          </button>
          <span className="text-sm font-bold text-pkmn-blue">
            {MONTH_NAMES[viewMonth]} {viewYear}
          </span>
          <button
            type="button"
            onClick={() => shiftMonth(1)}
            className="p-1 rounded hover:bg-gray-100 text-gray-600"
            aria-label="Próximo mês"
          >
            ›
          </button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-gray-400 mb-1">
          {WEEKDAY_SHORT.map((label, index) => (
            <span key={`${index}-${label}`}>{label}</span>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {cells.map((iso, index) =>
            iso ? (
              <button
                key={iso}
                type="button"
                onClick={() => handleDayClick(iso)}
                className={`relative h-8 rounded text-xs font-medium transition ${dayClass(iso)}`}
              >
                {Number(iso.slice(-2))}
                {eventDateSet.has(iso) && (
                  <span
                    className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${
                      iso === dateStart || iso === rangeEnd ? 'bg-white' : 'bg-pkmn-red'
                    }`}
                  />
                )}
              </button>
            ) : (
              <span key={`empty-${index}`} />
            ),
          )}
        </div>
      </div>
    </div>
  );
}
