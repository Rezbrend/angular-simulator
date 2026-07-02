import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { MessageManagementService } from '../../message-management.service';
import { IAuthUser } from './IAuthUser';
import { IAuthResponse } from './IAuthResponse';
import { ILoginCredentials } from './ILoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private httpClient: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private messageService: MessageManagementService = inject(MessageManagementService);
  
  authStateSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authState$: Observable<IAuthUser | null> = this.authStateSubject.asObservable();
  
  private authTokensKey: string = 'auth-tokens';
  private API_URL: string = 'https://dummyjson.com/auth';

  initialize(): void {
    this.restoreSession();
  }

  login(credentials: ILoginCredentials): Observable<IAuthResponse> {
    return this.httpClient
      .post<IAuthResponse>(`${ this.API_URL }/login`, credentials)
      .pipe(
        tap((response: IAuthResponse) => {
          this.setSession(response);
        }),
        catchError(() => {
          return EMPTY;
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem(this.authTokensKey);
    this.authStateSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.getValue() !== null;
  }

  getCurrentUser(): IAuthUser | null {
    return this.authStateSubject.getValue();
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem<{ accessToken?: string }>(this.authTokensKey)?.accessToken ?? null;
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem<{ refreshToken?: string }>(this.authTokensKey)?.refreshToken ?? null;
  }

  refreshToken(): Observable<IAuthResponse> {
    const token: string | null = this.getRefreshToken();
    if (!token) return EMPTY;

    return this.httpClient.post<IAuthResponse>(`${ this.API_URL }/refresh`, { refreshToken: token })
      .pipe(
        tap((response: IAuthResponse) => {
          this.setSession(response);
        }),
        catchError(() => EMPTY)
      );
  }

  private restoreSession(): void {
    const tokens: IAuthResponse | null = this.localStorageService.getItem<IAuthResponse>(this.authTokensKey);

    if (tokens?.accessToken && tokens?.refreshToken) {
      this.tryGetUserWithAccessToken().subscribe();
    } else {
      this.authStateSubject.next(null);
    }
  }

  private tryGetUserWithAccessToken(): Observable<IAuthUser> {
    return this.httpClient.get<IAuthUser>(`${ this.API_URL }/me`)
      .pipe(
        tap((user: IAuthUser) => {
          this.authStateSubject.next(user);
        }),
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return this.handleUnauthorizedError();
          }

          this.logout();
          return EMPTY;
        })
      );
  }

  private handleUnauthorizedError(): Observable<IAuthUser> {
    return this.refreshToken().pipe(
      switchMap(() => {
        return this.tryGetUserWithAccessToken();
      }),
      catchError(() => {
        this.logout();
        return EMPTY;
      })
    );
  }

  private setSession(data: IAuthResponse): void {
    this.localStorageService.setItem(this.authTokensKey, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    this.authStateSubject.next(data);
  }
  
}