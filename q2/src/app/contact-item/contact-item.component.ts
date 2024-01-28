import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
} from '@angular/core';
import { Contact } from '../contacts/contact';
import { CurrentTransitionService } from '../transitions/current-transition.service';
import { isValidLatLng } from '../contact-detail/map-options';
import { GeolocationService } from '../geolocation/geolocation.service';

@Component({
  selector: 'contact-item',
  standalone: true,
  templateUrl: './contact-item.component.html',
  styleUrl: './contact-item.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactItem {
  contact = input<Contact>();
  private transitionService = inject(CurrentTransitionService);
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

  viewTransitionName(contact: Contact) {
    const transition = this.transitionService.currentTransition();
    const isAvatar =
      transition?.to.firstChild?.params['id'] === contact._id ||
      transition?.from.firstChild?.params['id'] === contact._id;
    return isAvatar ? 'avatar-img' : '';
  }
}
