import { Injectable, signal } from '@angular/core';
import { LatLngLiteral } from 'leaflet';
import haversine from 'haversine-distance';

@Injectable({ providedIn: 'root' })
export class GeolocationService {
  private _currentLocation = signal<LatLngLiteral | null>(null);
  currentLocation = this._currentLocation.asReadonly();

  getCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((location) => {
        this._currentLocation.set({
          lat: location.coords.latitude,
          lng: location.coords.longitude,
        });
      });
    }
  }

  calculateDistance(latlng: LatLngLiteral) {
    if (!this._currentLocation()) {
      return;
    }

    return haversine(this._currentLocation()!, latlng);
  }
}
