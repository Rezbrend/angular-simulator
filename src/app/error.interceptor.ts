import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { MessageManagementService } from '../message-management.service';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status >= 500) {
        const messageService: MessageManagementService = inject(MessageManagementService);
        const errorMessage = `Ошибка, код: ${ error.status }`;
        messageService.showError(errorMessage);
      }
      return throwError(() => error);
    }),
  );
  
};
