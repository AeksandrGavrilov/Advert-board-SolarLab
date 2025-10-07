import { inject, Injectable } from '@angular/core';
import { AdvertApiService } from '../../api/advert-api/advert-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchAdvertsRequest } from '../../../interfaces/adverts-request.interface';
import { Advert } from '../../../interfaces/advert.interface';


@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private advertApiService = inject(AdvertApiService);
  private currentCategory = new BehaviorSubject<string | null>(null);

  searchAdvert(request: SearchAdvertsRequest): Observable<Advert[]> {
    return this.advertApiService.searchAdverts(request)
  };
  
  searchAdvertsByCategory(categoryId: string): Observable<Advert[]> {
    const request: SearchAdvertsRequest = {categoryId};
    return this.searchAdvert(request)
  };

  setCurrentCategory(categoryId: string | null) {
    this.currentCategory.next(categoryId);
  };

  getCurrentCategory(): Observable<string | null> {
    return this.currentCategory.asObservable();
  };

  getAllAdverts() :Observable<Advert[]> {
   return this.searchAdvert({})
  };

  createAdvert(advertData: any): Observable<any> {
   return this.advertApiService.createAdvert(advertData);
  }
}
