import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../../app/interfaces/advert.interface';
import { SearchAdvertsRequest } from '../../app/interfaces/adverts-request.interface';

@Injectable({
  providedIn: 'root'
})
export class AdvertApiService {

  private API_URL = "http://dzitskiy.ru:5000";
  private http = inject(HttpClient);
 
  searchAdverts (request:SearchAdvertsRequest): Observable<Advert[]> {
    return this.http.post<Advert[]>(
      `${this.API_URL}/Advert/search`,
      request
    )
  }
}
