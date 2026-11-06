export const API_URL =
  'https://pokedata.ovh/events/api/_tcg/cups/challenges/pre/_vg/cups/challenges/_go/cups/challenges/_country/BR';

export type Product = 'tcg' | 'vg' | 'go';

export const PRODUCTS: Product[] = ['tcg', 'vg', 'go'];

export const PRODUCT_LABELS: Record<Product, string> = {
  tcg: 'TCG',
  vg: 'VGC',
  go: 'Pokémon GO',
};

export const PRODUCT_SUBTITLES: Record<Product, string> = {
  tcg: 'Torneios de Pokémon TCG no Brasil',
  vg: 'Torneios de Pokémon VGC no Brasil',
  go: 'Torneios de Pokémon GO no Brasil',
};

export function normalizeProduct(value: unknown): Product {
  if (value === 'vg' || value === 'go' || value === 'tcg') return value;
  return 'tcg';
}

export const STORAGE_KEY = 'pkmn_saved_events';
export const WELCOME_KEY = 'pkmn_welcome_2027_seen';

export const WEEKDAY_LABELS = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado',
] as const;

export const WEEKDAY_SHORT = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'] as const;

export const WEEKDAY_ABBR = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'] as const;

export const MONTH_NAMES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
] as const;

export type SortKey = 'name' | 'type' | 'when' | 'shop' | 'city';

export const PAGE_SIZE_OPTIONS = [20, 50, 100] as const;
export type PageSize = (typeof PAGE_SIZE_OPTIONS)[number];

export interface TcgEvent {
  uniqueId: string;
  name?: string;
  type?: string;
  when?: string;
  shop?: string;
  city?: string;
  state?: string;
  latitude?: string | number;
  longitude?: string | number;
  address?: string;
  street_address?: string;
  street_adress?: string;
  pokemon_url?: string;
  product?: Product;
  [key: string]: unknown;
}

export interface FilterState {
  search: string;
  type: string;
  state: string;
  selectedCities: string[];
  allCities: boolean;
  month: string;
  selectedWeekdays: number[];
  dateStart: string;
  dateEnd: string;
  showSavedOnly: boolean;
  sortKey: SortKey;
  sortDirection: 'asc' | 'desc';
  pageSize: PageSize;
}

export const defaultFilterState: FilterState = {
  search: '',
  type: 'all',
  state: 'all',
  selectedCities: [],
  allCities: true,
  month: 'all',
  selectedWeekdays: [],
  dateStart: '',
  dateEnd: '',
  showSavedOnly: false,
  sortKey: 'when',
  sortDirection: 'asc',
  pageSize: 20,
};
