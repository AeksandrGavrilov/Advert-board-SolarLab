import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserInterface } from '../../../interfaces/user.interface';
import { AuthificationDataInterface } from '../../../interfaces/authification-data.interface';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { RegisterNewUserInterface } from '../../../interfaces/register-new-user.interface';
import { environment } from '../../../environmets/environmets';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.API_URL;
  private http  = inject(HttpClient);
  private router = inject(Router)

  private isAuthenticatedSubject  = new BehaviorSubject<boolean> (this.checkToken());
  private currentUserSubject = new BehaviorSubject<UserInterface | null>(this.getUserFromStorage())

  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public currentUser$ = this.currentUserSubject.asObservable();

  public login(authData: AuthificationDataInterface): Observable<string> {  
    return this.http.post<string>(
      `${this.API_URL}/Auth/Login`,
      authData,
      {responseType: "text" as "json"}
    ).pipe(
      tap((token: string) => {
        const cleanToken = token.startsWith('"') && token.endsWith('"') 
            ? token.slice(1, -1) 
            : token;
    
        localStorage.setItem('authToken', cleanToken)

        console.log('Получен токен от сервера:', token)
        // localStorage.setItem('authToken', token);
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
    return this.http.post<string>(
      `${this.API_URL}/Auth/Register`,
      registerData,
      {
        responseType: "text" as "json",
        headers: {'Content-Type': 'application/json'}
      }
    ).pipe(
      tap(userId => {
        console.log('User registred by Id:', userId);
        this.login({login: registerData.login, password:registerData.password}).subscribe({
          next: (token) => {
            console.log('autoauth after reg - success');
          },
          error: (error) => {
            console.error('autoauth failed', error)
          }
        })
      })
    )
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

  public getCurrentUser(): UserInterface | null {
    return this.currentUserSubject.value
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