import { PRODUCT_LABELS, PRODUCTS, type Product } from '../types';

const PRODUCT_ACCENT: Record<Product, string> = {
  tcg: 'TCG',
  vg: 'VGC',
  go: 'GO',
};

interface HeaderProps {
  product: Product;
  onProductChange: (product: Product) => void;
}

export function Header({ product, onProductChange }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col items-center text-center gap-4">
      <img
        src="/town-map-logo.png"
        alt="Town Map"
        className="w-full max-w-md sm:max-w-lg md:max-w-xl"
      />
      <div>
        <h1 className="sr-only">Town Map</h1>
        <p className="flex items-center justify-center gap-3 text-base sm:text-lg font-bold text-white">
          <span className="hidden sm:block h-[3px] w-10 rounded-full bg-pkmn-gold" aria-hidden />
          <span>
            Torneios de Pokémon{' '}
            <span className="text-pkmn-gold">{PRODUCT_ACCENT[product]}</span>
            {' '}no Brasil
          </span>
          <span className="hidden sm:block h-[3px] w-10 rounded-full bg-pkmn-gold" aria-hidden />
        </p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-2.5" role="tablist" aria-label="Produto">
        {PRODUCTS.map((item) => {
          const selected = product === item;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onProductChange(item)}
              className={`px-5 sm:px-6 py-2 rounded-full text-sm font-bold transition ${
                selected
                  ? 'bg-pkmn-gold text-pkmn-ink shadow-[0_4px_12px_rgba(245,197,24,0.35)]'
                  : 'border-2 border-[#163a7a] bg-[#0a2a66]/70 text-white hover:border-white/70 hover:bg-[#0a2a66]'
              }`}
            >
              {PRODUCT_LABELS[item]}
            </button>
          );
        })}
      </div>
    </header>
  );
}
