import { Component, OnInit, inject } from '@angular/core';
import { Advert } from '../../../interfaces/advert.interface';
import { AdvertService } from '../../../../services/business-logic/advert/advert.service';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ImageService } from '../../../../services/business-logic/img/image.service';

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
export class CardGridComponent implements OnInit{
  private advertService = inject(AdvertService);
  private imageService = inject(ImageService)

  adverts: Advert[] = [];
  advertImageMap: Map<string, string> = new Map()

  ngOnInit(): void {
    this.loadAdverts()
  }

  loadAdverts(): void {
    this.advertService.searchAdvert({}).subscribe({
      next: (response) => {
        this.adverts = response;
        this.loadImagesForAdverts();
      }
    })
  };

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
