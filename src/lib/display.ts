import type { TcgEvent } from '../types';

export function formatEventDate(when?: string): string {
  const whenDate = new Date(when || '');
  if (Number.isNaN(whenDate.getTime())) return 'Data inválida';
  return whenDate.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  });
}

export function formatEventDateTime(when?: string): string {
  const whenDate = new Date(when || '');
  if (Number.isNaN(whenDate.getTime())) return 'Data inválida';
  return whenDate.toLocaleString('pt-BR', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'America/Sao_Paulo',
  });
}

export function eventTypeDisplay(type?: string): {
  abbreviatedType: string;
  fullTypeName: string;
  typeClass: string;
} {
  let abbreviatedType = type || 'Evento';
  let fullTypeName = type || 'Evento';
  let typeClass = 'bg-gray-100 text-gray-800';

  if (fullTypeName === 'League Challenge') {
    abbreviatedType = 'Challenge';
    typeClass = 'bg-blue-100 text-blue-800';
  } else if (fullTypeName === 'League Cup') {
    abbreviatedType = 'Cup';
    typeClass = 'bg-red-100 text-red-800';
  } else if (fullTypeName.toLowerCase().includes('prerelease')) {
    abbreviatedType = 'Pré Release';
    fullTypeName = 'Pré Release';
    typeClass = 'bg-green-100 text-green-800';
  }

  return { abbreviatedType, fullTypeName, typeClass };
}

export function markerColorClass(event: TcgEvent): string {
  const typeLower = (event.type || '').toLowerCase();
  if (typeLower.includes('cup')) return 'bg-pkmn-red';
  if (typeLower.includes('challenge')) return 'bg-pkmn-blue';
  if (typeLower.includes('prerelease')) return 'bg-green-600';
  return 'bg-gray-500';
}
