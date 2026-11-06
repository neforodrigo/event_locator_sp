interface ApiStatusProps {
  error: string | null;
  onRetry: () => void;
}

export function ApiStatus({ error, onRetry }: ApiStatusProps) {
  if (!error) return null;

  return (
    <div className="mb-6 p-4 ring-1 ring-pkmn-red/20 bg-rose-50 rounded-xl flex items-center justify-between">
      <div className="flex items-center">
        <div>
          <p className="font-bold text-red-700">Erro ao carregar dados</p>
          <p className="text-xs text-gray-500">Não foi possível carregar os dados. Detalhe: {error}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="px-4 py-2 bg-pkmn-red text-white text-sm font-bold rounded hover:bg-red-700 transition"
      >
        Tentar Novamente
      </button>
    </div>
  );
}
