import { Routes } from '@angular/router';
import { CreateAdvertComponent } from './shared/components/create-advert/create-advert.component';
import { AdvertDetailsComponent } from './shared/components/advert-details/advert-details.component';
import { MyAdvertsPageComponent } from './pages/my-adverts-page/my-adverts-page.component';
import { authGuard } from './guards/auth.guard';
import { AdvertListPageComponent } from './pages/advert-list/advert-list-page/advert-list-page.component';
import { AdvertSearchPageComponent } from './pages/advert-search-page/advert-search-page/advert-search-page.component';
import { CurrentUserProfilePageComponent } from './pages/current-user-profile-page/current-user-profile-page.component';

export const routes: Routes = [
   
    { 
        path: '',
        component: AdvertListPageComponent,
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
];
