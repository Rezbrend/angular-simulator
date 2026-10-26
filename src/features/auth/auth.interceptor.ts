import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { catchError, EMPTY, Observable, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {

  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  const cloneWithToken = (): HttpRequest<unknown> =>
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${ authService.getAccessToken() }`,
      },
    });

  const logoutAndRedirect = (): Observable<never> => {
    authService.logout();
    router.navigate(['/login']);
    return EMPTY;
  };

  const handleUnauthorized = (): Observable<HttpEvent<unknown>> => {
    if (!authService.getRefreshToken()) {
      return logoutAndRedirect();
    }

    return authService.refreshToken().pipe(
      switchMap(() => next(cloneWithToken())),
      catchError(() => logoutAndRedirect())
    );
  };

  const finalRequest: HttpRequest<unknown> = authService.getAccessToken() ? cloneWithToken() : req;

  return next(finalRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return handleUnauthorized();
      }
      return throwError(() => error);
    })
  );
  
};