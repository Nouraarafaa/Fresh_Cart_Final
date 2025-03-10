import { inject } from '@angular/core';
import { CanActivateFn , Router } from '@angular/router';

export const loggedGuard: CanActivateFn = (route, state) => {
  
  const _Router = inject(Router);

  if( localStorage.getItem('UserToken') !== null ){
    _Router.navigate(['/home']);
    return false;
  }
  else{
    return true;
  }};
