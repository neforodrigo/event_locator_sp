interface PokeballIconProps {
  saved?: boolean;
  className?: string;
}

export function PokeballIcon({ saved = false, className = 'w-6 h-6' }: PokeballIconProps) {
  return (
    <svg className={className} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none">
      <path d="M21 12A9 9 0 0 0 3 12Z" className={saved ? 'fill-pkmn-red stroke-none' : 'hidden'} />
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" d="M3 12h18" />
      <circle cx="12" cy="12" r="3" className="fill-white" />
      <circle cx="12" cy="12" r="1.5" className="fill-gray-800 stroke-none" />
    </svg>
  );
}
