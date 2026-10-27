export function Footer() {
  return (
    <footer className="mt-8 text-center text-sm text-gray-600">
      <div className="bg-white p-6 rounded-xl shadow-lg border-t-4 border-pkmn-light-blue">
        <h3 className="font-bold text-pkmn-blue text-lg mb-3">Sobre o Town Map</h3>
        <p className="mb-2">
          Town Map é uma aplicação gratuita desenvolvida por{' '}
          <span className="font-bold text-pkmn-red">Nefo</span> com apoio de ferramentas Low-Code/No-Code.
        </p>
        <p className="mb-4">
          O objetivo é auxiliar a comunidade de Pokémon TCG competitivo a se organizar para competições.
        </p>
        <div className="border-t border-gray-200 pt-4 mt-4">
          <p className="text-xs">
            Agradecimentos especiais ao administrador do{' '}
            <a
              href="https://pokedata.ovh/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-pkmn-blue font-bold hover:underline"
            >
              Pokedata
            </a>{' '}
            por fornecer a API responsável por alimentar a página.
          </p>
        </div>
        <div className="border-t border-gray-200 pt-5 mt-4">
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
              className="w-full max-w-md rounded-lg shadow-sm transition-transform group-hover:scale-[1.01]"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
