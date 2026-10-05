import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';
import { APP_CONFIG } from './app.config';
import { IAppConfig } from '../interfaces/IAppConfig';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
  const config: IAppConfig = inject(APP_CONFIG);

  if (!config.enableLogs) {
    return next(req);
  }
  
  const startTime: number = Date.now();

  return next(req).pipe(
    tap((event: HttpEvent<unknown>) => {
      const endTime: number = Date.now();
      const duration: number = endTime - startTime;

      if (event instanceof HttpResponse) {
        console.log(
          `Метод: ${ req.method }` +
          `URL: ${ req.url }` +
          `Статус: ${ event.status }` +
          `Время выполнения: ${ duration }`,
        );
      }
    }),
  );
  
};