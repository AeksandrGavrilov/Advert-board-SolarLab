import { Component, inject, OnInit } from '@angular/core';
import { CommonModule,} from '@angular/common';
import { GetCurrentUserServiceToken } from '../../../data-services/api/user-api/get-current-user-service.token.service';
import { CurrentUser } from '../../../interfaces/current-user';
import { ImageService } from '../../../data-services/api/img-api/image.service';
import { catchError, of, tap } from 'rxjs';
import { GetCurrentUserService } from '../../../data-services/api/user-api/get-current-user.service';
import { TransformDatePipe } from '../../../shared/pipes/transform-date.pipe';

@Component({
    selector: 'app-current-user-profile-page',
    imports: [
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
            }),
            catchError(error => {
            console.error('Ошибка загрузки профиля:', error);
            return of(null);
            })
        )
        .subscribe();
    }
}
