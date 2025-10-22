import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthLogicService } from '../services/auth-logic/auth-logic.service';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  
    const authService = inject(AuthLogicService);

    console.log('AuthGuard проверяет доступ к:', state.url)

    return authService.isAuthenticated$.pipe(
        take(1),
        map(isAuthentacated => {
        
        if (isAuthentacated) {
            return true
        } else {
            console.log('AuthGuard:Доступ запрещен')
            return false;
        }
        })
    );
};
