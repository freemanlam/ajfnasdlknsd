import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ContactsService } from '../contacts/contacts.service';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { ContactItem } from '../contact-item/contact-item.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ContactItemSkeleton } from '../contact-item/contact-item-skeleton.component';

@Component({
  selector: 'contact-list',
  standalone: true,
  imports: [
    MatIconModule,
    RouterLink,
    ContactItem,
    ContactItemSkeleton,
    ScrollingModule,
  ],
  templateUrl: './contact-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactList {
  private contactsService = inject(ContactsService);

  skeletons = Array(15);
  contacts = this.contactsService.contacts;
  loaded = this.contactsService.loaded;
}
