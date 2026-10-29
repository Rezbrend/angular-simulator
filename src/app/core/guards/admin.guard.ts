import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/auth.service';
import { UserRole } from '../enums/UserRole';
import { IAuthUser } from '../interfaces/IAuthUser';

export const adminGuard: CanActivateFn = () => {

  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  const user: IAuthUser | null = authService.getCurrentUser();

  const isAdmin: boolean = user!.role === UserRole.ADMIN;

  if (!isAdmin) {
    router.navigate(['/']);
    return false;
  }

  return true;

};