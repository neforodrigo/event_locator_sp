/** Temporarily hidden; set to true to show the Pólen TCG sponsor banner again. */
const SHOW_POLEN_SPONSOR = false;

export function Footer() {
  return (
    <footer className="mt-8 text-center text-sm text-pkmn-muted">
      <div className="bg-pkmn-paper p-6 rounded-[28px] shadow-[0_18px_40px_rgba(4,18,52,0.28)]">
        <h3 className="font-semibold text-pkmn-ink text-base mb-3">Sobre o Town Map</h3>
        <p className="mb-2">
          Town Map é uma aplicação gratuita desenvolvida por{' '}
          <span className="font-medium text-pkmn-ink">Nefo</span> com apoio de ferramentas Low-Code/No-Code.
        </p>
        <p className="mb-4">
          O objetivo é auxiliar a comunidade competitiva de Pokémon TCG, VGC e Pokémon GO a se organizar para
          competições.
        </p>
        <div className="border-t border-black/5 pt-4 mt-4">
          <p className="text-xs">
            Agradecimentos especiais ao administrador do{' '}
            <a
              href="https://pokedata.ovh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pkmn-ink font-medium hover:text-pkmn-gold"
            >
              Pokedata
            </a>{' '}
            por fornecer a API responsável por alimentar a página.
          </p>
        </div>
        {SHOW_POLEN_SPONSOR && (
          <div className="border-t border-black/5 pt-5 mt-4">
            <a
              href="https://www.polentcg.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-col items-center gap-3 group"
            >
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 group-hover:text-pkmn-blue transition-colors">
                Apoio Pólen TCG
              </span>
              <img
                src="/polen-tcg.png"
                alt="Pólen TCG — Card Games"
                className="w-full max-w-md rounded-lg ring-1 ring-black/5 transition-transform group-hover:scale-[1.01]"
              />
            </a>
          </div>
        )}
      </div>
    </footer>
  );
}
