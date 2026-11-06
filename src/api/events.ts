import { API_URL, normalizeProduct, type TcgEvent } from '../types';

function makeUniqueId(event: Record<string, unknown>, index: number, product: string): string {
  const rawId = `${event.name || ''}_${event.when || ''}_${event.shop || ''}`
    .replace(/\s/g, '')
    .toLowerCase();
  const base = rawId || `event_${index}`;
  return product === 'tcg' ? base : `${product}_${base}`;
}

export async function fetchEventsFromAPI(): Promise<TcgEvent[]> {
  let data: unknown;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Erro na conexão direta');
    data = await response.json();
  } catch (directError) {
    console.warn('Conexão direta falhou (provavelmente CORS), tentando proxy...', directError);
    const proxyUrl = 'https://api.allorigins.win/raw?url=' + encodeURIComponent(API_URL);
    const proxyResponse = await fetch(proxyUrl);
    if (!proxyResponse.ok) throw new Error('Erro na conexão via proxy');
    data = await proxyResponse.json();
  }

  const payload = data as TcgEvent[] | { events?: TcgEvent[] };
  const eventsArray = Array.isArray(payload) ? payload : payload.events || [];

  if (!eventsArray.length) {
    throw new Error('A API retornou uma lista vazia de eventos no Brasil.');
  }

  return eventsArray.map((event, index) => {
    const product = normalizeProduct(event.product);
    return {
      ...event,
      product,
      uniqueId: makeUniqueId(event, index, product),
    };
  });
}
