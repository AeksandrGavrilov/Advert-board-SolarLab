import { inject, Injectable } from '@angular/core';
import { CurrentUser } from '../../../interfaces/current-user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environmets/environmets';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetCurrentUserService {

  private http = inject(HttpClient);

  getCurrentUser(): Observable<CurrentUser> {
    return this.http.get<CurrentUser>(`${environment.API_URL}/Users/current`);
  }
}
