import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';
import { ContactsRsp } from './contacts-rsp';

@Injectable({ providedIn: 'root' })
export class ContactsService {
  private static readonly CONTACTS_KEY = 'contacts';
  private _contacts = signal<ContactsRsp>([]);
  contacts = this._contacts.asReadonly();
  private _loaded = signal<boolean>(false);
  loaded = this._loaded.asReadonly();

  constructor(private http: HttpClient) {}

  getContacts(): Observable<ContactsRsp> {
    return this.http
      .get<ContactsRsp>(
        'https://api.json-generator.com/templates/-xdNcNKYtTFG/data'
      )
      .pipe(
        // Get cache when API not working
        catchError((err, caught) => {
          const cache = this.getCache();
          if (!cache) {
            throw err;
          }

          return of(cache);
        }),
        tap((res) => {
          this._contacts.set(res);
          // fallback, sometimes this api will return 429
          this.setCache(res);
          this._loaded.set(true);
        })
      );
  }

  private getCache(): ContactsRsp | null {
    const storageItem = localStorage.getItem(ContactsService.CONTACTS_KEY);
    if (!storageItem) {
      return null;
    }
    try {
      return JSON.parse(storageItem);
    } catch (e) {
      return null;
    }
  }

  private setCache(res: ContactsRsp) {
    localStorage.setItem(ContactsService.CONTACTS_KEY, JSON.stringify(res));
  }
}
