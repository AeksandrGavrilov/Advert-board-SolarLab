import { inject, Injectable } from '@angular/core';
import { AdvertApiService } from '../../api/advert-api/advert-api.service';
import { SearchAdvertsRequest } from '../../../app/interfaces/adverts-request.interface';
import { Observable } from 'rxjs';
import { Advert } from '../../../app/interfaces/advert.interface';

@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private advertApiService = inject(AdvertApiService);

  searchAdvert(request: SearchAdvertsRequest): Observable<Advert[]> {
    return this.advertApiService.searchAdverts(request)
  }
  
}
