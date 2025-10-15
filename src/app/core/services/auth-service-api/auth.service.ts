import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthificationDataInterface } from '../../interfaces/authification-data.interface';
import {  Observable, tap } from 'rxjs';
import { RegisterNewUserInterface } from '../../interfaces/register-new-user.interface';
import { environment } from '../../environment/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = environment.API_URL;
  private http  = inject(HttpClient);
  private router = inject(Router)

  public login(authData: AuthificationDataInterface): Observable<string> {  
    return this.http.post<string>(
      `${this.API_URL}/Auth/Login`,
      authData,
      {responseType: "text" as "json"}
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
    )
    }
}