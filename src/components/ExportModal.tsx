import { useEffect } from 'react';
import type { TcgEvent } from '../types';
import { downloadICS, generateICS, getGoogleCalendarUrl } from '../lib/calendar';
import { formatEventDate } from '../lib/display';

interface ExportModalProps {
  open: boolean;
  savedEvents: TcgEvent[];
  onClose: () => void;
}

export function ExportModal({ open, savedEvents, onClose }: ExportModalProps) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const eventCountText =
    savedEvents.length === 1 ? '1 evento salvo' : `${savedEvents.length} eventos salvos`;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="bg-white rounded-xl shadow-2xl z-10 max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto border-t-4 border-pkmn-blue">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-pkmn-blue flex items-center gap-2">
            <svg className="w-6 h-6 text-pkmn-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Exportar Eventos Salvos
          </h3>
          <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {savedEvents.length === 0 ? (
          <div className="text-center py-6">
            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <circle cx="12" cy="12" r="3" fill="white" />
            </svg>
            <h4 className="font-bold text-gray-700 text-lg mb-1">Nenhum evento salvo</h4>
            <p className="text-sm text-gray-500 max-w-xs mx-auto mb-4">
              Clique na Pokébola ao lado de qualquer torneio para favoritá-lo antes de exportar para a sua agenda.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="bg-pkmn-blue text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-blue-800 transition"
            >
              Entendido
            </button>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-600 mb-4">
              Você possui <strong className="text-pkmn-blue font-bold">{eventCountText}</strong>. Escolha a opção
              desejada para adicionar à sua agenda:
            </p>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 border-2 border-pkmn-blue rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="bg-pkmn-blue text-white p-2 rounded-lg mt-0.5 flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-pkmn-blue text-sm">Baixar Arquivo iCalendar (.ics)</h4>
                    <p className="text-xs text-gray-600 mt-0.5 mb-3">
                      Formato universal compatível com Google Calendar, Apple Calendar (iPhone/Mac), Outlook, etc.
                    </p>
                    <button
                      type="button"
                      onClick={() => downloadICS(generateICS(savedEvents))}
                      className="w-full bg-pkmn-blue text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-800 transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                        />
                      </svg>
                      Baixar Arquivo .ics ({savedEvents.length} eventos)
                    </button>
                  </div>
                </div>
              </div>

              <details className="bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-600 p-3">
                <summary className="font-bold text-gray-700 cursor-pointer flex items-center justify-between">
                  <span>Como importar o arquivo .ics no Google Agenda?</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <ol className="list-decimal list-inside space-y-1 mt-2 text-gray-600">
                  <li>
                    Baixe o arquivo <code>.ics</code> acima.
                  </li>
                  <li>
                    Acesse o{' '}
                    <a
                      href="https://calendar.google.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pkmn-blue font-bold underline"
                    >
                      Google Agenda
                    </a>{' '}
                    no computador.
                  </li>
                  <li>
                    Clique no ícone de engrenagem no canto superior direito e selecione <strong>Configurações</strong>.
                  </li>
                  <li>
                    No menu à esquerda, clique em <strong>Importar e exportar</strong>.
                  </li>
                  <li>Selecione o arquivo baixado e confirme a importação!</li>
                </ol>
              </details>

              <div className="border-t border-gray-200 pt-3">
                <h5 className="font-bold text-gray-700 text-xs uppercase tracking-wider mb-2">
                  Adicionar Individualmente no Google Agenda
                </h5>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {savedEvents.map((evt) => (
                    <div
                      key={evt.uniqueId}
                      className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50/50 transition"
                    >
                      <div className="min-w-0 pr-2">
                        <p className="font-bold text-gray-800 text-xs truncate">{evt.name || 'Torneio'}</p>
                        <p className="text-[11px] text-gray-500">
                          {formatEventDate(evt.when)} • {evt.shop || ''} ({evt.city || ''})
                        </p>
                      </div>
                      <a
                        href={getGoogleCalendarUrl(evt)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 bg-blue-500 text-white text-xs font-semibold px-2.5 py-1 rounded hover:bg-blue-600 transition flex items-center gap-1"
                      >
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
                        </svg>
                        Google Agenda
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
