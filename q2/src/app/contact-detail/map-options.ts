import * as Leaflet from 'leaflet';
import { Contact } from '../contacts/contact';

export const DEFAULT_ZOOM = 12;

export const isValidLatLng = (contact: Contact) =>
  Boolean(contact.location.latitude) && Boolean(contact.location.longitude);

export const getLayers = (
  contact: Contact,
  center: Leaflet.LatLng,
  isValidLatLng: boolean
): Leaflet.Layer[] => {
  return [
    new Leaflet.TileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; OpenStreetMap contributors',
      } as Leaflet.TileLayerOptions
    ),
    getMarkers(contact, center, isValidLatLng),
  ] as Leaflet.Layer[];
};

export const getMarkers = (
  contact: Contact,
  center: Leaflet.LatLng,
  isValidLatLng: boolean
): Leaflet.Marker | Leaflet.Popup => {
  if (!isValidLatLng) {
    return new Leaflet.Popup(center, {
      content: 'Unknown location',
    });
  }

  return new Leaflet.Marker(center, {
    title: `${contact.name.first} ${contact.name.last}`,
  });
};
