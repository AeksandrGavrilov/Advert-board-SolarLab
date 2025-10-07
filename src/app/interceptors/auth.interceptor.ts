import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const  authToken = localStorage.getItem('authToken') || '';

  console.log(' Interceptor: Токен существует?', !!authToken);
  console.log(' Interceptor: Длина токена', authToken.length);

  console.log('Токен из Local Storage:',authToken)
  console.log('URL запроса:', req.url)

  const authReq = req.clone({
    headers: req.headers.set('Authorization', `Bearer ${authToken}`)
  });

  console.log(' Interceptor: Заголовки запроса', authReq.headers.keys());
  
  return next(authReq);
};
