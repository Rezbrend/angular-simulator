import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { catchError, EMPTY, finalize, Observable } from 'rxjs';
import { IPost } from './IPost';
import { PostService } from './post.service';
import { LoaderService } from '../../loader.service';
import { HttpErrorResponse } from '@angular/common/http';

export const postResolver: ResolveFn<Observable<IPost>> = (route: ActivatedRouteSnapshot) => {
  
  const loaderService: LoaderService = inject(LoaderService);
  const postService: PostService = inject(PostService);
  const id: number = +(route.paramMap.get('id')!);
  
  loaderService.showLoader();
  return postService.getPost(id)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        alert(error.error.message);
        return EMPTY;
      }),
      finalize(() => loaderService.hideLoader())
    )
  
}
