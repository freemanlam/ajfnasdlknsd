import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { Contact } from '../contacts/contact';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import * as Leaflet from 'leaflet';
import { getLayers, isValidLatLng } from './map-options';
import { environment } from '../../environments/environment';
import { GeolocationService } from '../geolocation/geolocation.service';

@Component({
  selector: 'contact-detail',
  standalone: true,
  imports: [LeafletModule],
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactDetail implements OnInit {
  private static readonly DEFAULT_ZOOM = 12;
  private geolocationService = inject(GeolocationService);
  private distance = computed<number | null>(() => {
    if (!isValidLatLng(this.contact()!)) {
      return null;
    }

    if (!this.geolocationService.currentLocation()) {
      return null;
    }

    return this.geolocationService.calculateDistance({
      lat: this.contact()!.location.latitude!,
      lng: this.contact()!.location.longitude!,
    }) as number;
  });
  /**
   * Display in km
   */
  displayDistance = computed(() => {
    const val = this.distance()
      ? Math.round(this.distance()! / 100) / 10
      : null;
    return val;
  });

  contact = input<Contact>();

  showMap = signal(false);

  options: Leaflet.MapOptions = {};

  ngOnInit() {
    this.loadMap();
  }

  loadMap() {
    const _isValidLatLng = isValidLatLng(this.contact()!);
    const center = _isValidLatLng
      ? new Leaflet.LatLng(
          this.contact()!.location.latitude!,
          this.contact()!.location.longitude!
        )
      : new Leaflet.LatLng(
          environment.map.fallbackLocation[0],
          environment.map.fallbackLocation[1]
        );
    this.options = {
      layers: getLayers(this.contact()!, center, _isValidLatLng),
      zoom: ContactDetail.DEFAULT_ZOOM,
      center,
    };
    this.showMap.set(true);
  }
}
