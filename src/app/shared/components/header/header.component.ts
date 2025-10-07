import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../../services/api/auth-service/auth.service';
import { MenuItem } from 'primeng/api';
import { SignInComponent } from '../sign-in/sign-in.component';
import { Router, RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { MenuModule } from 'primeng/menu';
import { routes } from '../../../app.routes';


@Component({
  selector: 'app-header',
  imports: [
    ButtonModule,
    ButtonGroupModule,
    RouterLink,
    AsyncPipe,
    MenuModule,
],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true,
})
export class HeaderComponent implements OnInit {

  private router = inject(Router)
  private dialogService = inject(DialogService);
  public authService = inject(AuthService);
  

  currentUserName = '';
  ref: DynamicDialogRef | undefined;

  userMenuItems: MenuItem[] = [
    {
      label: 'Личый кабинет',
      icon: 'pi pi-user',
      routerLink: '/profile'
    },
    {
      label:'Мои объявления',
      icon: 'pi-pilist',
      routerLink: '/my-adverts'
    },
    {
      label:'Выход',
       icon: 'pi pi-sign-out', 
       command: () => this.logout()
    }
  ];
customButtonLoginToken: Object|undefined;
  ngOnInit() {
    this.authService.currentUser$.subscribe( user => {
      this.currentUserName = user?.name || 'Пользователь'
    })
  }

  showSignIn(redirectUrl?: string) {
     console.log('AuthGuard:Открываю диалог авторизации с redirectUrl:', redirectUrl);
    this.ref = this.dialogService.open(SignInComponent, {
      header: 'Вход в систему',
      width: '400px',
      data: {
        redirectUrl: redirectUrl
      }
    });
    this.ref.onClose.subscribe((result: any) => {
      console.log('Получены результаты из диалога', result)
      if ( result?.success && result.redirectUrl) {
        console.log('Выполняю навигацию на', result.redirectUrl)
        this.router.navigate([result.redirectUrl])
      }
    });
  }

  showSimpleSignIn() {
    this.showSignIn();
  }

  logout() {
    this.authService.logout();
  }

  handleCreateAdvert() {
    if(this.authService.isAuthenticated() ) {
      this.router.navigate(['/adverts/create'])
    } else {
      this.showSignIn('/adverts/create');
    }
  }
}
