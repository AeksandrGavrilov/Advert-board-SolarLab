import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ButtonGroupModule } from 'primeng/buttongroup';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AuthService } from '../../../services/api/auth-service/auth.service';
import { MenuItem } from 'primeng/api';
import { SignInComponent } from '../sign-in/sign-in.component';
import { RouterLink } from "@angular/router";
import { AsyncPipe } from '@angular/common';
import { MenuModule } from 'primeng/menu';


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


  private dialogService = inject(DialogService);
  public authService = inject(AuthService);

  currentUserName = '';
  ref: DynamicDialogRef | undefined;

  userMenuItems: MenuItem[] = [
    {label:'Выход', icon: 'pi pi-sign-out', command: () => this.logout()}
  ];
customButtonLoginToken: Object|undefined;
  ngOnInit() {
    this.authService.currentUser$.subscribe( user => {
      this.currentUserName = user?.name || 'Пользователь'
    })
  }

  showSignIn() {
    this.ref = this.dialogService.open(SignInComponent, {
      header: 'Вход в систему',
      width: '400px',
    })
  }

  logout() {
    this.authService.logout();
  }
}
