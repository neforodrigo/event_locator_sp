interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onPageChange: (page: number) => void;
}

function pageWindow(current: number, total: number): (number | 'gap')[] {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const pages = [1, total, current - 1, current, current + 1].filter(
    (value, index, all) => value >= 1 && value <= total && all.indexOf(value) === index,
  );
  pages.sort((a, b) => a - b);

  const window: (number | 'gap')[] = [];
  pages.forEach((value, index) => {
    if (index > 0 && value - pages[index - 1] > 1) window.push('gap');
    window.push(value);
  });
  return window;
}

export function Pagination({ page, pageSize, total, onPageChange }: PaginationProps) {
  if (total === 0) return null;

  const pageCount = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);
  const buttonClass =
    'min-w-9 px-3 py-1.5 rounded-lg border text-sm font-medium transition disabled:opacity-40 disabled:cursor-not-allowed';

  return (
    <nav
      aria-label="Paginação"
      className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3"
    >
      <p className="text-sm text-gray-600">
        Mostrando <span className="font-bold text-pkmn-blue">{start}–{end}</span> de{' '}
        <span className="font-bold text-pkmn-blue">{total}</span>
      </p>
      {pageCount > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-1">
          <button
            type="button"
            className={`${buttonClass} border-gray-300 bg-white text-gray-700 hover:border-pkmn-blue hover:text-pkmn-blue`}
            onClick={() => onPageChange(page - 1)}
            disabled={page <= 1}
          >
            Anterior
          </button>
          {pageWindow(page, pageCount).map((item, index) =>
            item === 'gap' ? (
              <span key={`gap-${index}`} className="px-1 text-gray-400">
                …
              </span>
            ) : (
              <button
                key={item}
                type="button"
                aria-current={item === page ? 'page' : undefined}
                className={`${buttonClass} ${
                  item === page
                    ? 'border-pkmn-blue bg-pkmn-blue text-white'
                    : 'border-gray-300 bg-white text-gray-700 hover:border-pkmn-blue hover:text-pkmn-blue'
                }`}
                onClick={() => onPageChange(item)}
              >
                {item}
              </button>
            ),
          )}
          <button
            type="button"
            className={`${buttonClass} border-gray-300 bg-white text-gray-700 hover:border-pkmn-blue hover:text-pkmn-blue`}
            onClick={() => onPageChange(page + 1)}
            disabled={page >= pageCount}
          >
            Próxima
          </button>
        </div>
      )}
    </nav>
  );
}
