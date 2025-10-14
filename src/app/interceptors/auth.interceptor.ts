import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  
  const backendUrl = 'http://dzitskiy.ru:5000'

  if (req.url.startsWith(backendUrl)) {
    const  authToken = localStorage.getItem('authToken') || '';
    const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  return next(authReq);
  }
  return next(req);
};
