export function Header() {
  return (
    <header className="text-center mb-6 p-3 sm:p-6 bg-pkmn-header-bg rounded-xl border-b-4 border-pkmn-light-blue">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-pkmn-blue uppercase tracking-widest">
        TOWN MAP
      </h1>
      <p className="text-xs sm:text-md text-gray-600 mt-1 sm:mt-3 tracking-wider">
        Torneios de Pokémon TCG no Brasil
      </p>
    </header>
  );
}
