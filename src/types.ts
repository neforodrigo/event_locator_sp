export const API_URL =
  'https://pokedata.ovh/events/api/_tcg/cups/challenges/pre/_country/BR';

export const STORAGE_KEY = 'pkmn_saved_events';
export const WELCOME_KEY = 'pkmn_welcome_2027_seen';

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
  [key: string]: unknown;
}

export interface FilterState {
  search: string;
  type: string;
  state: string;
  selectedCities: string[];
  allCities: boolean;
  month: string;
  showSavedOnly: boolean;
  sortKey: SortKey;
  sortDirection: 'asc' | 'desc';
}

export const defaultFilterState: FilterState = {
  search: '',
  type: 'all',
  state: 'all',
  selectedCities: [],
  allCities: true,
  month: 'all',
  showSavedOnly: false,
  sortKey: 'when',
  sortDirection: 'asc',
};
