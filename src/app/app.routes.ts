import { Routes } from '@angular/router';
import { CardGridComponent } from './shared/components/card-grid/card-grid.component';
import { CreateAdvertComponent } from './shared/components/create-advert/create-advert.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { AdvertDetailsComponent } from './shared/components/advert-details/advert-details.component';
import { MyAdvertsComponent } from './shared/components/my-adverts/my-adverts.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '' , component: CardGridComponent, title: 'Главная - доска объявлений'},
    { path: 'adverts', component: CardGridComponent, title: ' Все объявления'},
    
    { 
        path: 'adverts/create', 
        component: CreateAdvertComponent, 
        title: 'Создать объявление',
        canActivate: [authGuard]
    },

    { path: 'adverts/:id', component: AdvertDetailsComponent, title: 'Объявление' },

    { 
        path: 'profile',
        component: UserProfileComponent,
        title: ' Профиль пользователя',
        canActivate: [authGuard], 
    },
    { 
        path: 'my-adverts',
        component: MyAdvertsComponent, 
        title: ' Мои объявления',
        canActivate: [authGuard]
    },

    {path: '**', redirectTo: ''}
];
