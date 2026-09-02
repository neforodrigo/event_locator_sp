interface SavedDisclaimerProps {
  visible: boolean;
  onExport: () => void;
}

export function SavedDisclaimer({ visible, onExport }: SavedDisclaimerProps) {
  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-50 border-t border-yellow-200 p-3 text-center text-yellow-800 text-sm shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] z-30 flex flex-col sm:flex-row justify-center items-center gap-2">
      <div className="flex items-center space-x-2">
        <svg className="w-5 h-5 text-yellow-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>
          <strong>Atenção:</strong> Seus eventos favoritos são salvos localmente no cache deste navegador e não serão
          sincronizados com outros dispositivos.
        </span>
      </div>
      <button
        type="button"
        onClick={onExport}
        className="bg-pkmn-blue text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-800 transition flex items-center space-x-1 flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2 2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span>Exportar (.ics)</span>
      </button>
    </div>
  );
}
