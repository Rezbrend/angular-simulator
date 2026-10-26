import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';

export const authGuard: CanActivateFn = () => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const isAuth: boolean = authService.isAuthenticated();

  return isAuth ? true : router.navigate(['/login']);

};