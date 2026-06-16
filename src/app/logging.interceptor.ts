import { HttpEvent, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  
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
  
}