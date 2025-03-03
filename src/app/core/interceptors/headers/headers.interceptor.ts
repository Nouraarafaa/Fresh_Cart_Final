import { HttpInterceptorFn } from '@angular/common/http';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  
  if( localStorage.getItem('UserToken') ){
    req = req.clone( {
      setHeaders:{
        token:localStorage.getItem('UserToken')!
      }
    } );
  }
  
  return next(req);
};
