import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Advert } from '../../../interfaces/advert.interface';
import { SearchAdvertsRequest } from '../../../interfaces/adverts-request.interface';
import { environment } from '../../../environmets/environmets';

@Injectable({
  providedIn: 'root'
})
export class AdvertApiService {

  private API_URL = environment.API_URL;
  private http = inject(HttpClient);
 
  searchAdverts (request:SearchAdvertsRequest): Observable<Advert[]> {
    return this.http.post<Advert[]>(
      `${this.API_URL}/Advert/search`,
      request
    )
  }
}
