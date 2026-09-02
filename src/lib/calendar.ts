import type { TcgEvent } from '../types';

function formatICSDate(date: Date): string {
  return date.toISOString().replace(/-|:|\.\d\d\d/g, '');
}

function escapeICS(str: string): string {
  return String(str || '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

export function eventAddress(event: TcgEvent): string {
  return event.address || event.street_address || event.street_adress || '';
}

export function officialEventUrl(pokemonUrl?: string): string {
  if (!pokemonUrl || pokemonUrl.trim() === '') return '';
  if (pokemonUrl.startsWith('http')) return pokemonUrl;
  return `https://www.pokemon.com/us/play-pokemon/pokemon-events/${pokemonUrl}`;
}

export function generateICS(events: TcgEvent[]): string {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Town Map Pokemon TCG//PT-BR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
  ];

  events.forEach((evt) => {
    const startDate = new Date(evt.when || '');
    if (Number.isNaN(startDate.getTime())) return;

    const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
    const address = eventAddress(evt);
    const location = [evt.shop, address, evt.city, evt.state].filter(Boolean).join(', ');
    const officialUrl = officialEventUrl(evt.pokemon_url);

    const descriptionParts = [
      `Tipo: ${evt.type || 'Evento'}`,
      `Loja: ${evt.shop || 'Não informada'}`,
      officialUrl ? `Página oficial: ${officialUrl}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    icsLines.push(
      'BEGIN:VEVENT',
      `UID:${evt.uniqueId || Math.random().toString(36).substring(2)}@townmap`,
      `SUMMARY:${escapeICS(evt.name || 'Torneio Pokémon TCG')}`,
      `DESCRIPTION:${escapeICS(descriptionParts)}`,
      `LOCATION:${escapeICS(location)}`,
      `DTSTART:${formatICSDate(startDate)}`,
      `DTEND:${formatICSDate(endDate)}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
    );
  });

  icsLines.push('END:VCALENDAR');
  return icsLines.join('\r\n');
}

export function downloadICS(icsContent: string, filename = 'eventos_pokemon_salvos.ics'): void {
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}

export function getGoogleCalendarUrl(evt: TcgEvent): string {
  const startDate = new Date(evt.when || '');
  if (Number.isNaN(startDate.getTime())) return '#';
  const endDate = new Date(startDate.getTime() + 4 * 60 * 60 * 1000);
  const startStr = formatICSDate(startDate);
  const endStr = formatICSDate(endDate);
  const address = eventAddress(evt);
  const location = [evt.shop, address, evt.city, evt.state].filter(Boolean).join(', ');
  const details = `Tipo: ${evt.type || ''}\nLoja: ${evt.shop || ''}`;
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(evt.name || '')}&dates=${startStr}/${endStr}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`;
}

export function googleMapsUrl(event: TcgEvent): string {
  const address = eventAddress(event) || 'Endereço não informado';
  const mapQuery = encodeURIComponent(
    `${event.shop || ''} ${address} ${event.city || ''} ${event.state || ''}`,
  );
  return `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
}
