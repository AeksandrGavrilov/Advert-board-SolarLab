import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../../interfaces/user.interface';
import { AuthificationDataInterface } from '../../interfaces/authification-data.interface';
import { RegisterNewUserInterface } from '../../interfaces/register-new-user.interface';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../auth-service-api/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthLogicService {

  private router = inject(Router)
  private authApiService = inject(AuthService)

  private isAuthenticatedSubject  = new BehaviorSubject<boolean> (this.checkToken());
  private currentUserSubject = new BehaviorSubject<UserInterface | null>(this.getUserFromStorage())

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  public login(authData: AuthificationDataInterface): Observable<string> {  
    return this.authApiService.login(authData)
    .pipe(
      tap((token: string) => {
        const cleanToken = token.startsWith('"') && token.endsWith('"') 
            ? token.slice(1, -1) 
            : token;
    
        localStorage.setItem('authToken', cleanToken)
        localStorage.setItem('userLogin', authData.login);

        const savedToken = localStorage.getItem('authToken');
        console.log('токен сохранен в local storage, save token =',savedToken);

        this.isAuthenticatedSubject.next(true);
        this.currentUserSubject.next({
          id: authData.login,
          name: authData.login,
          login: authData.login
        })
      })
    )
  }

  public register(registerData: RegisterNewUserInterface): Observable<string> {
   
    return this.authApiService.register(registerData)
      .pipe(
        switchMap(userId => {
          console.log('Пользователь зарегистрирован с идентификатором Id:', userId);
          return this.login({login: registerData.login, password: registerData.password}).pipe(
            tap(() => {
              this.currentUserSubject.next({
                id: userId,              
                name: registerData.name, 
                login: registerData.login
              }),
              console.log('Автоматическая авторизация после регистрации завершена успешно!');
            }),
            catchError(error => {
              console.error('Автоматическая авторизация - ошибка!', error);
              return of(userId);
            }),
            map(() => userId) 
          );
        })
      );
  }
  
  public logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userLogin');

    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null);

    this.router.navigate(['/']);
  }

  public isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value
  }

  private checkToken(): boolean {
    return !!localStorage.getItem('authToken');
  }

  private getUserFromStorage(): UserInterface | null {
    const login = localStorage.getItem('userLogin');
    return login ? {
      id:login,
      name:login,
      login:login
    } : null;
  }

}
