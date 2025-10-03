import { Routes } from '@angular/router';
import { CardGridComponent } from './shared/components/card-grid/card-grid.component';
import { CreateAdvertComponent } from './shared/components/create-advert/create-advert.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { AdvertDetailsComponent } from './shared/components/advert-details/advert-details.component';
import { MyAdvertsComponent } from './shared/components/my-adverts/my-adverts.component';

export const routes: Routes = [
    { path: '' , component: CardGridComponent, title: 'Главная - доска объявлений'},
    { path: 'adverts', component: CardGridComponent, title: ' Все объявления'},
    { path: 'adverts/:id', component: AdvertDetailsComponent, title: 'Объявление' },

    { path: 'adverts/create', component: CreateAdvertComponent, title: 'Создать объявление'},

    { path: 'profile', component: UserProfileComponent, title: ' Профиль пользователя'},
    { path: 'my-adverts', component: MyAdvertsComponent, title: ' Мои объявления'},

    {path: '**', redirectTo: ''}
];
