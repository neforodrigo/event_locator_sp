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
      <div className="fixed inset-0 bg-pkmn-ink/40" onClick={close} />
      <div className="bg-pkmn-paper rounded-2xl shadow-xl z-10 max-w-md w-full p-6 relative text-center ring-1 ring-black/5">
        <img
          src="/town-map-logo.png"
          alt=""
          className="mx-auto h-20 w-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-pkmn-ink mb-2">Boas-vindas à temporada 2027</h3>
        <p className="text-sm text-pkmn-muted mb-6 leading-relaxed">
          Prepare seus decks e times. Acompanhe os torneios oficiais de Pokémon TCG, VGC e Pokémon GO no Brasil,
          salve seus eventos favoritos e exporte para a agenda.
        </p>
        <button
          type="button"
          onClick={close}
          className="w-full bg-pkmn-gold text-pkmn-ink font-bold py-2.5 px-6 rounded-full hover:bg-pkmn-gold/90 transition text-sm"
        >
          Vamos lá
        </button>
      </div>
    </div>
  );
}
