import { useEffect, useState } from 'react';
import { WELCOME_KEY } from '../types';

export function WelcomeModal() {
  const [open, setOpen] = useState(() => !localStorage.getItem(WELCOME_KEY));

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  function close() {
    localStorage.setItem(WELCOME_KEY, 'true');
    setOpen(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={close} />
      <div className="bg-white rounded-xl shadow-2xl z-10 max-w-md w-full p-6 relative text-center border-t-4 border-pkmn-red transform transition-all">
        <div className="mx-auto flex items-center justify-center w-14 h-14 rounded-full bg-red-100 mb-4 text-pkmn-red">
          <svg className="w-8 h-8" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
            <path d="M21 12A9 9 0 0 0 3 12Z" className="fill-pkmn-red stroke-none" />
            <circle cx="12" cy="12" r="9" />
            <path strokeLinecap="round" d="M3 12h18" />
            <circle cx="12" cy="12" r="3" className="fill-white" />
            <circle cx="12" cy="12" r="1.5" className="fill-gray-800 stroke-none" />
          </svg>
        </div>
        <h3 className="text-2xl font-black text-pkmn-blue mb-2 uppercase tracking-wide">
          Boas-vindas à temporada 2027!
        </h3>
        <p className="text-sm text-gray-600 mb-6 leading-relaxed">
          Prepare seus decks! Acompanhe todos os torneios oficiais de Pokémon TCG no Brasil, salve seus eventos
          favoritos e exporte diretamente para sua agenda externa.
        </p>
        <button
          type="button"
          onClick={close}
          className="w-full bg-pkmn-red text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg uppercase tracking-wider text-sm"
        >
          Vamos Lá!
        </button>
      </div>
    </div>
  );
}
