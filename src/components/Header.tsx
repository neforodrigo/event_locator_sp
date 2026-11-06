import { PRODUCT_LABELS, PRODUCT_SUBTITLES, PRODUCTS, type Product } from '../types';

interface HeaderProps {
  product: Product;
  onProductChange: (product: Product) => void;
}

export function Header({ product, onProductChange }: HeaderProps) {
  return (
    <header className="text-center mb-6 p-3 sm:p-6 bg-pkmn-header-bg rounded-xl border-b-4 border-pkmn-light-blue">
      <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-pkmn-blue uppercase tracking-widest">
        TOWN MAP
      </h1>
      <p className="text-xs sm:text-md text-gray-600 mt-1 sm:mt-3 tracking-wider">
        {PRODUCT_SUBTITLES[product]}
      </p>
      <div
        className="mt-4 inline-flex bg-white/80 p-1 rounded-lg border border-gray-200"
        role="tablist"
        aria-label="Produto"
      >
        {PRODUCTS.map((item) => (
          <button
            key={item}
            type="button"
            role="tab"
            aria-selected={product === item}
            onClick={() => onProductChange(item)}
            className={`px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-bold transition ${
              product === item
                ? 'shadow-sm bg-pkmn-blue text-white'
                : 'text-gray-500 hover:text-pkmn-blue'
            }`}
          >
            {PRODUCT_LABELS[item]}
          </button>
        ))}
      </div>
    </header>
  );
}
