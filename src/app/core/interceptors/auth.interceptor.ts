import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router)
  const backendUrl = 'http://dzitskiy.ru:5000'

  if (req.url.startsWith(backendUrl)) {
    const  authToken = localStorage.getItem('authToken') || '';
    const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  return next(authReq).pipe (
    catchError(( error: HttpErrorResponse) => {
      if (error.status === 404) {
        router.navigate(['/404'])
      }
      return throwError(() => error)
    })
  )
  }
  return next(req);
};
