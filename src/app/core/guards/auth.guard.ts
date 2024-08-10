import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('token')){
    return true;
  }
  else{
    alert('You need to login to access this page');
    return false;
  }
};
