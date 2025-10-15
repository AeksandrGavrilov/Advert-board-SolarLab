import { Component, inject, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { CardGridComponent } from '../../../shared/components/card-grid/card-grid.component';
import { GetCurrentUserServiceToken } from '../../../data-services/api/user-api/get-current-user-service.token.service';
import { CurrentUser } from '../../../interfaces/current-user';
import { ImageService } from '../../../data-services/api/img-api/image.service';
import { catchError, of, tap } from 'rxjs';
import { GetCurrentUserService } from '../../../data-services/api/user-api/get-current-user.service';
import { TransformDatePipe } from '../../../shared/pipes/transform-date.pipe';

@Component({
  selector: 'app-current-user-profile-page',
  imports: [
    CardGridComponent,
    CommonModule,
    TransformDatePipe,
  ],
  providers: [
    {provide: GetCurrentUserServiceToken, useClass: GetCurrentUserService}
  ],
  templateUrl: './current-user-profile-page.component.html',
  styleUrl: './current-user-profile-page.component.scss'
})
export class CurrentUserProfilePageComponent implements OnInit {
  private getCurrentUserService = inject(GetCurrentUserServiceToken);
  private imageService = inject(ImageService);

  currentUser: CurrentUser | null = null;
  imageUrls: Record<string, string> = {};

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  loadCurrentUser(): void {
    this.getCurrentUserService.getCurrentUser()
      .pipe(
        tap(user => {
          this.currentUser = user;
          this.prepareImageUrls(user.adverts);
        }),
        catchError(error => {
          console.error('Ошибка загрузки профиля:', error);
          return of(null);
        })
      )
      .subscribe();
  }
  private prepareImageUrls(adverts: any[]): void {
    this.imageUrls = {};
    adverts.forEach(advert => {
      if (advert.imagesIds?.length > 0) {
        this.imageUrls[advert.id] = this.imageService.getImgUrlById(advert.imagesIds[0]);
      }
    });
  }
}
