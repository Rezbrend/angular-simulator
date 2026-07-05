import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { IAuthUser } from './IAuthUser';

export const adminGuard: CanActivateFn = () => {

  const router: Router = inject(Router)
  const authService: AuthService = inject(AuthService)

  const user: IAuthUser | null = authService.getCurrentUser();

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const isAdmin: boolean = user.role === 'admin';

  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  } return true;

}