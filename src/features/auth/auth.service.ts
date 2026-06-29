import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, switchMap, tap } from 'rxjs';
import { MessageManagementService } from '../../message-management.service';
import { IAuthUser } from './IAuthUser';
import { IAuthResponse } from './IAuthResponse';
import { ILoginCredentials } from './ILoginCredentials';

const AUTH_TOKENS_KEY = 'auth_tokens';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private httpClient: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private messageService: MessageManagementService = inject(MessageManagementService);
  
  authStateSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authState$: Observable<IAuthUser | null> = this.authStateSubject.asObservable();
  
  private API_URL: string = 'https://dummyjson.com';

  initialize(): void {
    this.restoreSession();
  }

  login(credentials: ILoginCredentials): Observable<IAuthResponse> {
    return this.httpClient
      .post<IAuthResponse>(`${ this.API_URL }/auth/login`, credentials)
      .pipe(
        tap((response: IAuthResponse) => {
          this.setSession(response);
          this.messageService.showSuccess('Вы вошли в систему');
        }),
        catchError(() => {
          return EMPTY;
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem(AUTH_TOKENS_KEY);
    this.authStateSubject.next(null);
    this.messageService.showInfo('Вы вышли из системы');
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.getValue() !== null;
  }

  getCurrentUser(): IAuthUser | null {
    return this.authStateSubject.getValue();
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem<{ accessToken?: string }>(AUTH_TOKENS_KEY)?.accessToken ?? null;
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem<{ refreshToken?: string }>(AUTH_TOKENS_KEY)?.refreshToken ?? null;
  }

  refreshToken(): Observable<IAuthResponse> {
    const token: string | null = this.getRefreshToken();
    if (!token) return EMPTY;

    return this.httpClient.post<IAuthResponse>(`${ this.API_URL }/auth/refresh`, { refreshToken: token })
      .pipe(
        tap((response: IAuthResponse) => {
          this.setSession(response);
        }),
        catchError(() => EMPTY)
      );
  }

  private restoreSession(): void {
    const tokens: IAuthResponse | null = this.localStorageService.getItem<IAuthResponse>(AUTH_TOKENS_KEY);

    if (tokens?.accessToken && tokens?.refreshToken) {
      this.tryGetUserWithAccessToken().subscribe();
    } else {
      this.authStateSubject.next(null);
    }
  }

  private tryGetUserWithAccessToken(): Observable<IAuthUser> {
    return this.httpClient.get<IAuthUser>(`${ this.API_URL }/auth/me`)
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
    this.localStorageService.setItem(AUTH_TOKENS_KEY, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    this.authStateSubject.next(data.user ?? null);
  }
  
}