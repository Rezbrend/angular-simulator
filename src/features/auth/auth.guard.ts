import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {

  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService)
  const isAuthUser: boolean = authService.isAuthenticated();

  return isAuthUser ? true : router.navigate(['/login']);

}