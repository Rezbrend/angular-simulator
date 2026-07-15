import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPost } from './IPost';
import { IPostResponce } from './IPostResponce';

@Injectable({
  providedIn: 'root',
})
export class PostApiService {
  
  private http: HttpClient = inject(HttpClient);
  
  private readonly API_URL: string = 'https://dummyjson.com/posts';
  
  getPosts(limit: number, skip: number): Observable<IPostResponce> {
    return this.http.get<IPostResponce>(`${ this.API_URL }?limit=${ limit }&skip=${ skip }`);
  }
  
  getPost(id: number): Observable<IPost> {
    return this.http.get<IPost>(`${ this.API_URL }/${ id }`);
  }

  createPost(post: Partial<IPost>): Observable<IPost> {
    return this.http.post<IPost>(this.API_URL, post);
  }

  editPost(id: number, post: Partial<IPost>): Observable<IPost> {
    return this.http.patch<IPost>(`${ this.API_URL }/${ id }`, post);
  }

  deletePost(id: number): Observable<IPost> {
    return this.http.delete<IPost>(`${ this.API_URL }/${ id }`);
  }
  
}
