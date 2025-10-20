import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdvertService } from '../../../data-services/logic/advert-logic/advert.service';
import { ImageService } from '../../../data-services/api/img-api/image.service';
import { AdvertInterface } from '../../../interfaces/advert.interface';
import { catchError, of, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from '../../../shared/components/card-grid/card-grid.component';

@Component({
    selector: 'app-advert-search-page',
    imports: [
        CommonModule,
        CardGridComponent,
    ],
    templateUrl: './advert-search-page.component.html',
    styleUrl: './advert-search-page.component.scss'
})
export class AdvertSearchPageComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private advertService = inject(AdvertService);
  private imageService = inject(ImageService);
 

  adverts: AdvertInterface[] = [];
  imageUrls: Record<string, string>  ={};
  

  ngOnInit(): void {
      this.route.queryParams.subscribe(
          params => {
              const request: any = {}
              if(params['search']) request.search = params['search'];
              if(params['category']) request.category = params['category'];

              this.advertService.searchAdvert(request)
              .pipe(
                tap(adverts => {
                  this.adverts = adverts;
                  this.prepareImageUrls(adverts);
                }),
                catchError( error => {
                  console.error('Ошибка загрузки объявлений', error);
                  return of([])
                })
              )
              .subscribe()
          })
  }

  private prepareImageUrls(adverts: AdvertInterface[]): void {
    this.imageUrls = {};
      adverts.forEach(advert => {
        if ( advert.imagesIds.length > 0) {
          this.imageUrls[advert.id] = this.imageService.getImgUrlById(advert.imagesIds[0])
        } else {
          this.imageUrls[advert.id] = ''
        }
    })
  }
  
}
