import { useEffect, useRef, useState } from 'react';

interface CityMultiSelectProps {
  cities: string[];
  allCities: boolean;
  selectedCities: string[];
  onChange: (allCities: boolean, selectedCities: string[]) => void;
}

export function CityMultiSelect({ cities, allCities, selectedCities, onChange }: CityMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  const label = allCities
    ? 'Todas as Cidades'
    : selectedCities.length === 1
      ? selectedCities[0]
      : `${selectedCities.length} Cidades Selecionadas`;

  const labelClass = allCities
    ? 'truncate block w-full pr-2 font-normal text-gray-700'
    : 'truncate block w-full pr-2 font-bold text-pkmn-blue';

  return (
    <div className="relative" ref={wrapperRef}>
      <label className="block text-sm font-medium text-gray-700 mb-1">Filtrar por Cidade</label>
      <button
        id="city-filter-btn"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
        className="w-full text-left px-4 py-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-pkmn-red focus:border-pkmn-red transition flex justify-between items-center text-sm h-[42px]"
      >
        <span className={labelClass}>{label}</span>
        <svg className="w-4 h-4 ml-1 flex-shrink-0 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-xl max-h-60 overflow-y-auto">
          <div className="p-2 border-b bg-gray-50 sticky top-0 z-10">
            <label className="flex items-center space-x-2 cursor-pointer p-1 rounded hover:bg-gray-100">
              <input
                type="checkbox"
                checked={allCities}
                onChange={() => {
                  if (!allCities) {
                    onChange(true, []);
                  } else if (selectedCities.length === 0) {
                    onChange(true, []);
                  }
                }}
                className="rounded text-pkmn-red focus:ring-pkmn-red h-4 w-4 border-gray-300"
              />
              <span className="text-sm font-semibold text-pkmn-blue">Todas as Cidades</span>
            </label>
          </div>
          <div className="p-2 space-y-1">
            {cities.map((city) => {
              const checked = selectedCities.includes(city);
              return (
                <div key={city} className="flex items-center space-x-2 p-1 rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    value={city}
                    checked={checked}
                    onChange={() => {
                      if (checked) {
                        const next = selectedCities.filter((c) => c !== city);
                        onChange(next.length === 0, next);
                      } else {
                        onChange(false, [...selectedCities, city]);
                      }
                    }}
                    className="city-checkbox rounded text-pkmn-red focus:ring-pkmn-red h-4 w-4 border-gray-300 cursor-pointer"
                  />
                  <label
                    className="text-sm text-gray-700 cursor-pointer flex-grow"
                    onClick={() => {
                      if (checked) {
                        const next = selectedCities.filter((c) => c !== city);
                        onChange(next.length === 0, next);
                      } else {
                        onChange(false, [...selectedCities, city]);
                      }
                    }}
                  >
                    {city}
                  </label>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
