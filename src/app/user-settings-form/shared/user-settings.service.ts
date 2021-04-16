import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UserSettings } from './user-settings.model';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsService {

  private apiUrl = 'https://putsreq.com/CIU3TLBn8MInzb1Sr81r';

  constructor(private http: HttpClient) { }

  postData(userSettings: UserSettings): Observable<UserSettings> {
    // return of(userSettings);
    return this.http.post<UserSettings>(this.apiUrl, userSettings);
  }

  getSubscriptionTypes() {
    return of(['Monthly', 'Annual', 'Lifetime']);
  }
}
