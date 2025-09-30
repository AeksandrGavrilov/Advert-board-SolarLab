import { inject, Injectable } from '@angular/core';
import { AdvertApiService } from '../../api/advert-api/advert-api.service';
import { Observable } from 'rxjs';
import { SearchAdvertsRequest } from '../../../interfaces/adverts-request.interface';
import { Advert } from '../../../interfaces/advert.interface';


@Injectable({
  providedIn: 'root'
})
export class AdvertService {
  private advertApiService = inject(AdvertApiService);

  searchAdvert(request: SearchAdvertsRequest): Observable<Advert[]> {
    return this.advertApiService.searchAdverts(request)
  }
  
}
