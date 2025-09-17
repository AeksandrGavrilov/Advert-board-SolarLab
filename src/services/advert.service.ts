import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Advert {
  id: string;
  name : string;
  location : string;
  createdAt : string;
  isActive : boolean;
  imagesIds :string[];
  cost : number;
}

export interface SearchAdvertsRequest {
  search? : string | null;
  showNonActive? : boolean | null;
  category? : string | null;
}

@Injectable({
  providedIn: 'root'
})

export class AdvertService {
  private API_URL = "http://dzitskiy.ru:5000"

  // constructor(private http: HttpClient) {}
  private http = inject(HttpClient)

  searchAdverts(request: SearchAdvertsRequest): Observable<Advert[]> {
    return this.http.post<Advert[]> (
      `${this.API_URL}/Advert/search`,
      request
    );
  };
}
