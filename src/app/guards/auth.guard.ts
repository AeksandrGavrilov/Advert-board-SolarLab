import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/api/auth-service/auth.service';
import { map, take } from 'rxjs';
import { DialogService } from 'primeng/dynamicdialog';
import { SignInComponent } from '../shared/components/sign-in/sign-in.component';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const dialogService = inject(DialogService);

  console.log('AuthGuard проверяет доступ к:', state.url)

  return authService.isAuthenticated$.pipe(
    take(1),
    map(isAuthentacated => {
      console.log('AuthGuard дает результат:',isAuthentacated);
      console.log('Привет от authGuard. Токен в local storage:',localStorage.getItem('authToken'));
      
      if (isAuthentacated) {
        return true
      } else {
        console.log('AuthGuard:Доступ запрещен')
        return false;
      }
    })
  );
};
