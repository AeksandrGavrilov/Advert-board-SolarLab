import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { AdvertService } from '../../../services/business-logic/advert-logic/advert.service';
import { ImageService } from '../../../services/api/img-api/image.service'; 
import { AuthLogicService } from '../../../services/business-logic/auth-logic/auth-logic.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { GalleriaModule } from 'primeng/galleria';
import { ButtonModule } from 'primeng/button';
import { catchError, tap, of } from 'rxjs';
import { ImagePipe } from '../../pipes/image.pipe';
import { TransformDatePipe } from '../../pipes/transform-date.pipe';

@Component({
  selector: 'app-advert-details',
  imports: [
    GalleriaModule,
    ButtonModule,
    ImagePipe,
    CommonModule,
    TransformDatePipe,
],
  templateUrl: './advert-details.component.html',
  styleUrl: './advert-details.component.scss',
  standalone: true,
})
export class AdvertDetailsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private advertService = inject(AdvertService);
  private authService = inject(AuthLogicService);
  private imageService = inject(ImageService);
  private messageService = inject(MessageService);

  advert: any = null;
  images: string[] = [];
  showPhone = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.loadAdvert(id)
    }
  }
  
  loadAdvert( id:string) {
    this.advertService.getAdvertById(id).pipe(
      tap( advert => {
        this.advert = advert;
       
        if (advert.imagesIds && advert.imagesIds.length > 0) {
          this.images = advert.imagesIds.map(( id: string) =>
          this.imageService.getImgUrlById(id)
        )
        } else {
          this.images = ['']
        }
      }),
      catchError(error => {
        console.error('Ошибка загрузки объявления', error);
        this.messageService.add({
          severity: 'error',
          summary: 'ошибка!',
          detail: 'Произошла ошибка при загрузке объявления'
        });
        return of(null)
      })
    ).subscribe()
  };

  togglePhone() {
    this.showPhone = !this.showPhone;
  };

  get isAuthenticated () {
    return this.authService.isAuthenticated();
  }
}

