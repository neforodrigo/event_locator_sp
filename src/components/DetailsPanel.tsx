import { useEffect } from 'react';
import type { TcgEvent } from '../types';
import { downloadICS, eventAddress, generateICS, getGoogleCalendarUrl, googleMapsUrl, officialEventUrl } from '../lib/calendar';
import { formatEventDateTime } from '../lib/display';
import { PokeballIcon } from './PokeballIcon';

interface DetailsPanelProps {
  event: TcgEvent | null;
  saved: boolean;
  onClose: () => void;
  onToggleSave: (id: string) => void;
}

export function DetailsPanel({ event, saved, onClose, onToggleSave }: DetailsPanelProps) {
  const open = Boolean(event);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!event) {
    return (
      <>
        <div className="fixed inset-y-0 right-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-2xl transform translate-x-full transition-transform duration-300 ease-in-out z-50 overflow-y-auto border-l-4 border-pkmn-blue" />
        <div className="fixed inset-0 bg-black bg-opacity-50 hidden z-40" />
      </>
    );
  }

  const address = eventAddress(event) || 'Endereço não informado';
  const pokemonUrl = officialEventUrl(event.pokemon_url);
  const gCalUrl = getGoogleCalendarUrl(event);
  const mapUrl = googleMapsUrl(event);
  const saveBtnClass = saved
    ? 'bg-gray-100 text-gray-800 border-2 border-pkmn-red'
    : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-300 hover:border-pkmn-red';

  return (
    <>
      <div className="fixed inset-y-0 right-0 w-full sm:w-2/3 md:w-1/2 lg:w-1/3 bg-white shadow-2xl transform translate-x-0 transition-transform duration-300 ease-in-out z-50 overflow-y-auto border-l-4 border-pkmn-blue">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-pkmn-blue">{event.name || 'Detalhes do Evento'}</h2>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="space-y-4 text-sm">
            <p>
              <strong className="font-semibold text-gray-600 w-28 inline-block">Tipo:</strong> {event.type || '-'}
            </p>
            <p>
              <strong className="font-semibold text-gray-600 w-28 inline-block">Loja:</strong> {event.shop || '-'}
            </p>
            <p>
              <strong className="font-semibold text-gray-600 w-28 inline-block">Data:</strong>{' '}
              {formatEventDateTime(event.when)}
            </p>
            <p>
              <strong className="font-semibold text-gray-600 w-28 inline-block">Endereço:</strong> {address}
            </p>
            <p>
              <strong className="font-semibold text-gray-600 w-28 inline-block">Cidade:</strong> {event.city || '-'},{' '}
              {event.state || ''}
            </p>
            <div className="mt-6 space-y-2">
              <button
                type="button"
                onClick={() => onToggleSave(event.uniqueId)}
                className={`w-full text-center inline-flex items-center justify-center font-bold py-2 px-4 rounded-lg transition ${saveBtnClass}`}
              >
                <PokeballIcon saved={saved} className="w-5 h-5 mr-2" />
                {saved ? 'Remover dos Salvos' : 'Salvar Evento'}
              </button>

              <a
                href={gCalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition"
              >
                Adicionar ao Google Agenda
              </a>

              <button
                type="button"
                onClick={() => {
                  const icsData = generateICS([event]);
                  const cleanName = (event.name || 'evento').replace(/[^a-z0-9]/gi, '_').toLowerCase();
                  downloadICS(icsData, `${cleanName}.ics`);
                }}
                className="w-full text-center inline-flex items-center justify-center bg-gray-100 text-gray-700 font-bold py-2 px-4 rounded-lg border border-gray-300 hover:bg-gray-200 hover:text-pkmn-blue transition gap-2"
              >
                <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                Baixar Evento (.ics)
              </button>

              <a
                href={mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full text-center inline-block bg-pkmn-red text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition"
              >
                Ver no Google Maps
              </a>
              {pokemonUrl ? (
                <a
                  href={pokemonUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center inline-block bg-pkmn-blue text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition"
                >
                  Página do Evento
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
    </>
  );
}
