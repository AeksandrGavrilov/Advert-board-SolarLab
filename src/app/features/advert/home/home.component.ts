import { Component, inject, OnInit } from '@angular/core';
import { AdvertService } from '../../../data-services/logic/advert-logic/advert.service';
import { AdvertInterface } from '../../../interfaces/advert.interface';
import { catchError, of, tap } from 'rxjs';
import {  ButtonModule } from "primeng/button";
import { CardGridComponent } from '../../../shared/components/card-grid/card-grid.component';
import { ImageService } from '../../../data-services/api/img-api/image.service';

@Component({
    selector: 'app-home',
    imports: [
        ButtonModule,
        CardGridComponent,
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
    })
export class HomeComponent implements OnInit {

    private advertService = inject(AdvertService);
    private imageService = inject(ImageService);

    adverts: AdvertInterface[] = [];
    imageUrls: Record<string, string> = {}

    ngOnInit(): void {
        this.loadAdverts()
    };

    loadAdverts(): void {
        this.advertService.searchAdvert({})
        .pipe(
            tap( adverts => {
            this.adverts = adverts;
            this.loadImageUrls(adverts)
            }),
            catchError( error => {
            console.error('Ошибка загрузки объявлений!', error)
            return of(null)
            })
        ).subscribe()
    };

    private loadImageUrls(adverts: AdvertInterface[]): void {
        this.imageUrls = {};
        adverts.forEach( advert => {
        if(advert.imagesIds && advert.imagesIds.length > 0) {
            this.imageUrls[advert.id] = this.imageService.getImgUrlById(advert.imagesIds[0])
        } else {
            this.imageUrls[advert.id] = ''
        }
        })
    }
}
