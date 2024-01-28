import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { ContactList } from './contact-list/contact-list.component';
import { ContactDetail } from './contact-detail/contact-detail.component';
import { inject } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { ContactsService } from './contacts/contacts.service';
import { filter } from 'rxjs';

export const routes: Routes = [
  {
    path: ':id',
    component: ContactDetail,
    canMatch: [
      () => {
        const contactsService = inject(ContactsService);
        return toObservable(contactsService.loaded).pipe(
          filter((loaded) => loaded)
        );
      },
    ],
    resolve: {
      contact: async (route: ActivatedRouteSnapshot) => {
        const contactsService = inject(ContactsService);
        const contactId = route.params['id'];
        return contactsService
          .contacts()
          .find((contact) => contact._id === contactId);
      },
    },
  },
  {
    path: '**',
    component: ContactList,
  },
];
