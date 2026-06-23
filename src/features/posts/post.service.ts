import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, Observable, throwError } from 'rxjs';
import { IPost } from './IPost';
import { PostApiService } from './post-api.service';
import { IPostResponce } from './IPostResponce';
import { LoaderService } from '../../loader.service';
import { MessageManagementService } from '../../message-management.service';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  
  private postApiService: PostApiService = inject(PostApiService);
  private messageService: MessageManagementService = inject(MessageManagementService);
  private loaderService: LoaderService = inject(LoaderService);

  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();

  getPosts(limit: number, skip: number): Observable<IPostResponce> {
    return this.postApiService.getPosts(limit, skip)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Не удалось получить посты');
          return throwError(() => error);
        }),
      )
  }

  getPost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.getPost(id)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Не удалось получить пост');
          return throwError(() => error);
        }),
      );
  }
  
  editPost(id: number, post: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.editPost(id, post)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Редактирование не удалось');
          return throwError(() => error);
        }),
      )
  }
  
  createPost(post: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.createPost(post)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Не удалось создать пост');
          return throwError(() => error);
        }),
      )
  }

  deletePost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.deletePost(id)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
          this.messageService.showError('Не удалось удалить пост');
          return throwError(() => error);
        }),
      )
  }

}
