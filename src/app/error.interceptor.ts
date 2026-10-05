import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageManagementService } from '../message-management.service';
import { inject } from '@angular/core';
import { APP_CONFIG } from './app.config';
import { IAppConfig } from '../interfaces/IAppConfig';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  const config: IAppConfig = inject(APP_CONFIG);
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {

      if (!config.enableNotifications) {
        return throwError(() => error);
      }

      if (error.status >= 500) {
        const messageService: MessageManagementService = inject(MessageManagementService);
        const errorMessage: string = `Ошибка, код: ${ error.status }`;
        messageService.showError(errorMessage);
      }
      return throwError(() => error);
    }),
  );
  
};
