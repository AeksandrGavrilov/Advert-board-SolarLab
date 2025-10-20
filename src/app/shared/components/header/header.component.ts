import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { UserInterface } from '../../../core/interfaces/user.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthLogicService } from '../../../core/services/auth-logic/auth-logic.service';
import { MenuItem } from 'primeng/api';
import { SignInComponent } from '../../../core/components/auth-component/sign-in/sign-in.component';
import { Router, RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-header',
  imports: [
    ButtonModule,
    ButtonGroupModule,
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
  public authService = inject(AuthLogicService);
  

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

  ngOnInit() {
    this.authService.currentUser$.subscribe( user => {
      this.currentUserName = user?.name || 'Пользователь'
    })
  }

  showSignIn(redirectUrl?: string) {
    this.ref = this.dialogService.open(SignInComponent, {
      header: 'Вход в систему',
      width: '400px',
      data: {
        redirectUrl: redirectUrl
      }
    });
    this.ref.onClose.subscribe((result: any) => {
      if ( result?.success && result.redirectUrl) {
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
