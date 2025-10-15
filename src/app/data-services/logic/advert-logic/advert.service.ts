import { inject, Injectable } from '@angular/core';
import { AdvertApiService } from '../../api/advert-api/advert-api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SearchAdvertsRequest } from '../../../interfaces/adverts-request.interface';
import { AdvertInterface } from '../../../interfaces/advert.interface';
import { AdvertDetailsInterface } from '../../../interfaces/advert-details.interface';


@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private advertApiService = inject(AdvertApiService);
  private _currentCategory = new BehaviorSubject<string | null>(null);
  currentCategory = this._currentCategory.asObservable()

  searchAdvert(request: SearchAdvertsRequest): Observable<AdvertInterface[]> {
    return this.advertApiService.searchAdverts(request)
  };
  
  createAdvert(advertData: any): Observable<any> {
   return this.advertApiService.createAdvert(advertData);
  };

  getAdvertById( id: string): Observable<AdvertDetailsInterface> {
    return this.advertApiService.getAdvertById(id)
  }
 }
