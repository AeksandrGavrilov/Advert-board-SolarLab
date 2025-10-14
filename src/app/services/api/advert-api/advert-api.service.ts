import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdvertInterface } from '../../../interfaces/advert.interface';
import { SearchAdvertsRequest } from '../../../interfaces/adverts-request.interface';
import { AdvertDetailsInterface } from '../../../interfaces/advert-details.interface';
import { environment } from '../../../environmets/environmets';

@Injectable({
  providedIn: 'root'
})
export class AdvertApiService {

  private API_URL = environment.API_URL;
  private http = inject(HttpClient);
 
  searchAdverts (request:SearchAdvertsRequest): Observable<AdvertInterface[]> {
    return this.http.post<AdvertInterface[]>(
      `${this.API_URL}/Advert/search`,
      request
    )
  }
  createAdvert(advertFormData: FormData): Observable<any> {
    return this.http.post<any>(
      `${this.API_URL}/Advert`,
      advertFormData
  );
  };

  getAdvertById(id: string): Observable<AdvertDetailsInterface> {
    return this.http.get<AdvertDetailsInterface>(`${this.API_URL}/Advert/${id}`)
  }
}
