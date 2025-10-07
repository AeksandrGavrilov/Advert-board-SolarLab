import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Advert } from '../../../interfaces/advert.interface';
import { AdvertService } from '../../../services/business-logic/advert/advert.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ImageService } from '../../../services/business-logic/img/image.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-grid',
  imports: [
    CommonModule,
    CardComponent,
    ],
  templateUrl: './card-grid.component.html',
  styleUrl: './card-grid.component.scss',
  standalone: true,
})
export class CardGridComponent implements OnInit, OnDestroy{
  private advertService = inject(AdvertService);
  private imageService = inject(ImageService)
  private categorySubscription: Subscription = new Subscription()

  adverts: Advert[] = [];
  advertImageMap: Map<string, string> = new Map()
  loading = false;

  ngOnInit(): void {
    this.loadAdverts();
    this.categorySubscription = this.advertService.getCurrentCategory().subscribe(
      (categoryId: string | null)  => {
        this.loadAdvertsByCategory(categoryId)
      }
    );
  }
  ngOnDestroy(): void {
    this.categorySubscription.unsubscribe();
  }

  loadAdverts(): void {
    this.loading = true;
    this.advertService.getAllAdverts().subscribe({
      next:(response) =>{
        this.adverts = response;
        this.loadImagesForAdverts();
        this.loading = false;
      },
      error: (error) => {
        console.error('Ошибка загрузки объявлений', error);
        this.loading = false;
      }
    });
    };

    loadAdvertsByCategory(categoryId: string | null): void {
      this.loading = true;

      if (categoryId) {
        this.advertService.searchAdvertsByCategory(categoryId).subscribe({
          next: (response) => {
            this.adverts = response;
            this.loadImagesForAdverts();
            this.loading = false;
          },
          error:( error) =>{
            console.error('Ошибка загрузки объявлений по категориям', error);
            this.loading = false;
          }
        });
      } else {
        this.loadAdverts();
      }
    }
  loadImagesForAdverts(): void {
    this.adverts.forEach(advert =>{
      if (advert.imagesIds && advert.imagesIds.length > 0) {
        const imageUrl = this.imageService.getImgUrlById(advert.imagesIds[0]);
        this.advertImageMap.set(advert.id, imageUrl)
      } else {
        this.advertImageMap.set(
          advert.id,
           'https://imgholder.ru/306x240/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson'
        )
      }
    })

  };
  getImageUrl(advertId:string): string {
    return this.advertImageMap.get(advertId) || 
        'https://imgholder.ru/306x240/8493a8/adb9ca&text=IMAGE+HOLDER&font=kelson';
  }
  
}
