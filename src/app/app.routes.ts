import { Routes } from '@angular/router';
import { CreateAdvertComponent } from './features/advert/create-advert/create-advert.component';
import { AdvertDetailsComponent } from './features/advert/advert-details/advert-details.component';
import { MyAdvertsPageComponent } from './features/profile/my-adverts-page/my-adverts-page.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/advert/home/home.component';
import { AdvertSearchPageComponent } from './features/advert/advert-search-page/advert-search-page.component';
import { CurrentUserProfilePageComponent } from './features/profile/current-user-profile-page/current-user-profile-page.component';
import { LayoutComponent } from './core/layout/layout/layout.component';

export const routes: Routes = [
    {
    path: '',
    component: LayoutComponent,  
    children:
    [                  
        { 
            path: '',
            component: HomeComponent,
            data: { breadcrumb: 'Главная' }
        },

        {
            path: 'search',
            component: AdvertSearchPageComponent,
            data: { breadcrumb: 'Поиск объявлений' }
        },

        { 
            path: 'adverts/create', 
            component: CreateAdvertComponent, 
            title: 'Создать объявление',
            canActivate: [authGuard],
            data: { breadcrumb: 'Создание объявления' }
        },

        { 
            path: 'adverts/:id', 
            component: AdvertDetailsComponent, 
            title: 'Объявление' ,
            data: { breadcrumb: 'Объявление' }
        },

        { 
            path: 'profile',
            component: CurrentUserProfilePageComponent,
            title: ' Профиль пользователя',
            canActivate: [authGuard],
            data: { breadcrumb: 'Профиль' } 
        },
        { 
            path: 'my-adverts',
            component: MyAdvertsPageComponent, 
            title: ' Мои объявления',
            canActivate: [authGuard],
            data: { breadcrumb: 'Объявления пользователя'}
        },

        {path: '**', redirectTo: ''}
    ]
    }
]