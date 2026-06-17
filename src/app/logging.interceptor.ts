import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { tap } from 'rxjs';

export const loggingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  
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