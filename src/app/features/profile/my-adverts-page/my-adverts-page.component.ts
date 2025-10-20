import { Component, inject, OnInit } from '@angular/core';
import { GetAdvertsServiceToken } from '../../../data-services/api/advert-api/get-adverts/get-adverts-service.token';
import { GetMyAdvertsService } from '../../../data-services/api/advert-api/get-adverts/get-my-adverts.service';
import { AdvertInterface } from '../../../interfaces/advert.interface';
import { ImageService } from '../../../data-services/api/img-api/image.service';
import { catchError, of, tap } from 'rxjs';
import { CardGridComponent } from '../../../shared/components/card-grid/card-grid.component';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-my-adverts-page',
    imports: [
        CardGridComponent,
        CommonModule
    ],
    providers: [
        {provide: GetAdvertsServiceToken, useClass: GetMyAdvertsService}
    ],
    templateUrl: './my-adverts-page.component.html',
    styleUrl: './my-adverts-page.component.scss'
})
export class MyAdvertsPageComponent implements OnInit{
  private imageService = inject(ImageService);
  private getAdvertsService = inject(GetAdvertsServiceToken); 
  
  adverts: AdvertInterface[] = [];
  imageUrls: Record<string, string> = {};

  ngOnInit(): void {
    this.loadMyAdverts();
  }

  loadMyAdverts(): void {
        this.getAdvertsService.getAdverts()
        .pipe(
            tap(adverts => {
            this.adverts = adverts;
            this.prepareImageUrls(adverts);
            }),
            catchError(error => {
            console.error('Ошибка загрузки моих объявлений:', error);
            return of([]);
            })
        ).subscribe();
    }

    private prepareImageUrls(adverts: AdvertInterface[]): void {
        this.imageUrls = {};
        adverts.forEach(advert => {
        if (advert.imagesIds?.length > 0) {
            this.imageUrls[advert.id] = this.imageService.getImgUrlById(advert.imagesIds[0]);
        } else {
            this.imageUrls[advert.id] = '';
        }
        });
    }
}
