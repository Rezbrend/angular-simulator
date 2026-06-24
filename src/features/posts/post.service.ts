import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, map, Observable, tap, throwError } from 'rxjs';
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
  private loaderService: LoaderService = inject(LoaderService);
  private postsSubject: BehaviorSubject<IPost[]> = new BehaviorSubject<IPost[]>([]);
  posts$: Observable<IPost[]> = this.postsSubject.asObservable();
  
  setPosts(posts: IPost[]): void {
    this.postsSubject.next(posts);
  }

  getPosts(filter?: { authorId?: number }): Observable<IPost[]> {
    return this.postApiService.getPosts(10, 0).pipe(
      map((response: IPostResponce) => {
        const posts: IPost[] = response.posts || [];
        if (!filter?.authorId) return posts;
        return posts.filter((post: IPost) => post.userId === filter.authorId);
      })
    );
  }

  getPost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.getPost(id)
      .pipe(
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
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
          return throwError(() => error);
        }),
      )
  }
  
  filterPost(posts: IPost[], id: number): IPost[] {
    return posts.filter((post: IPost) => post.id !== id);
  }
  
  createPost(post: Partial<IPost>): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.createPost(post)
      .pipe(
        tap((newPost: IPost) => {
          const currentPosts: IPost[] = this.postsSubject.getValue();
          this.postsSubject.next([newPost, ...currentPosts]);
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

  deletePost(id: number): Observable<IPost> {
    this.loaderService.showLoader();
    return this.postApiService.deletePost(id)
      .pipe(
        tap(() => {
          const currentPosts: IPost[] = this.postsSubject.getValue();
          this.postsSubject.next(this.filterPost(currentPosts, id));
        }),
        finalize(() => {
          this.loaderService.hideLoader();
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        }),
      );
  }

}
