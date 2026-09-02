import { useEffect } from 'react';
import * as L from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import type { TcgEvent } from '../types';
import { markerColorClass } from '../lib/display';

interface EventsMapProps {
  events: TcgEvent[];
  visible: boolean;
  onOpenDetails: (event: TcgEvent) => void;
}

function MapEffects({ events, visible }: { events: TcgEvent[]; visible: boolean }) {
  const map = useMap();

  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });
    legend.onAdd = () => {
      const div = L.DomUtil.create('div', 'info legend');
      div.innerHTML += '<i style="background: #e63946"></i> League Cup<br>';
      div.innerHTML += '<i style="background: #1c3b69"></i> Challenge<br>';
      div.innerHTML += '<i style="background: #16a34a"></i> Pré-Release<br>';
      return div;
    };
    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [map]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => {
      map.invalidateSize();
      const validBounds: L.LatLngTuple[] = [];
      events.forEach((event) => {
        if (event.latitude && event.longitude) {
          const lat = parseFloat(String(event.latitude));
          const lng = parseFloat(String(event.longitude));
          if (!Number.isNaN(lat) && !Number.isNaN(lng)) {
            validBounds.push([lat, lng]);
          }
        }
      });
      if (validBounds.length > 0) {
        map.fitBounds(validBounds, { padding: [50, 50] });
      }
    }, 100);
    return () => window.clearTimeout(timer);
  }, [events, visible, map]);

  return null;
}

function markerIcon(event: TcgEvent) {
  const typeClass = markerColorClass(event);
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div class="w-4 h-4 rounded-full border-2 border-white shadow-md ${typeClass}"></div>`,
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    popupAnchor: [0, -8],
  });
}

export function EventsMap({ events, visible, onOpenDetails }: EventsMapProps) {
  return (
    <div
      className={`${visible ? '' : 'hidden '}w-full h-[500px] rounded-lg border border-gray-200 shadow-inner z-0`}
    >
      <MapContainer
        center={[-14.235004, -51.92528]}
        zoom={4}
        className="h-full w-full rounded-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapEffects events={events} visible={visible} />
        {events.map((event) => {
          if (!event.latitude || !event.longitude) return null;
          const lat = parseFloat(String(event.latitude));
          const lng = parseFloat(String(event.longitude));
          if (Number.isNaN(lat) || Number.isNaN(lng)) return null;
          const whenDate = new Date(event.when || '');
          const formattedDate = Number.isNaN(whenDate.getTime())
            ? ''
            : whenDate.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
          return (
            <Marker key={event.uniqueId} position={[lat, lng]} icon={markerIcon(event)}>
              <Popup>
                <div className="text-center">
                  <strong className="text-pkmn-blue text-sm block">{event.name}</strong>
                  <span className="text-xs text-gray-600 block">{event.shop}</span>
                  <span className="text-xs text-gray-500 block mb-2">
                    {formattedDate} - {event.type}
                  </span>
                  <button
                    type="button"
                    className="bg-pkmn-red text-white text-xs px-2 py-1 rounded hover:bg-red-700 transition"
                    onClick={() => onOpenDetails(event)}
                  >
                    Ver Detalhes
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
