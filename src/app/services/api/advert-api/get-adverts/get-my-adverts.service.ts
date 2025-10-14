import { inject, Injectable } from '@angular/core';
import { GetAdverts } from './get-adverts-abstract.interface';
import { map, Observable } from 'rxjs';
import { AdvertInterface } from '../../../../interfaces/advert.interface';
import { HttpClient } from '@angular/common/http';
import { CurrentUser } from '../../../../interfaces/current-user';
import { environment } from '../../../../environmets/environmets';

@Injectable({
  providedIn: 'root'
})
export class GetMyAdvertsService implements GetAdverts{
  private http = inject(HttpClient);
  
  getAdverts(): Observable<AdvertInterface[]> {
    return this.http.get<CurrentUser>(`${environment.API_URL}/Users/current`)
      .pipe(
        map(currentUser => currentUser.adverts)
      )
  }
}
