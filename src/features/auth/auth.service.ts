import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, tap, throwError } from 'rxjs';
import { MessageManagementService } from '../../message-management.service';
import { IAuth } from './iauth';
import { ILoginResponse } from './ILoginResponse';
import { IRefreshResponse } from './IRefreshResponse';

const ACCESS_KEY = 'access_token';
const REFRESH_KEY = 'refresh_token';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private httpClient: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private messageService: MessageManagementService = inject(MessageManagementService);
  authStateSubject: BehaviorSubject<IAuth | null> = new BehaviorSubject<IAuth | null>(null);
  authState$: Observable<IAuth | null> = this.authStateSubject.asObservable();
  private API_URL: string = 'https://dummyjson.com';

  constructor() {
    this.restoreSession();
  }

  login(credentials: { username: string; password: string }): Observable<ILoginResponse> {
    return this.httpClient
      .post<ILoginResponse>(`${ this.API_URL }/auth/login`, credentials)
      .pipe(
        tap((response: ILoginResponse) => {
          this.setSession(response);
          this.messageService.showSuccess('Вы вошли в систему');
        }),
        catchError((error: HttpErrorResponse) => {
          return throwError(() => error);
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem(ACCESS_KEY);
    this.localStorageService.removeItem(REFRESH_KEY);
    this.authStateSubject.next(null);
    this.messageService.showInfo('Вы вышли из системы');
  }

  isAuthenticated(): boolean {
    return !!this.localStorageService.getItem(ACCESS_KEY);
  }

  getCurrentUser(): IAuth | null {
    return this.authStateSubject.getValue();
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem(ACCESS_KEY);
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem(REFRESH_KEY);
  }

  refreshToken(): Observable<IRefreshResponse> {
    const token: string | null = this.getRefreshToken();
    if (!token) return EMPTY;

    return this.httpClient
      .post<IRefreshResponse>(`${ this.API_URL }/auth/refresh`, { refreshToken: token })
      .pipe(
        tap((response: IRefreshResponse) => {
          if (response.accessToken) {
            this.localStorageService.setItem(ACCESS_KEY, response.accessToken);
          }
          if (response.refreshToken) {
            this.localStorageService.setItem(REFRESH_KEY, response.refreshToken);
          }
          if (response.user) {
            this.authStateSubject.next(response.user);
          }
        }),
        catchError(() => EMPTY)
      );
  }

  private restoreSession(): void {
    const access: unknown = this.localStorageService.getItem(ACCESS_KEY);
    const refresh: unknown = this.localStorageService.getItem(REFRESH_KEY);

    if (access && refresh) {
      this.httpClient.get<IAuth>(`${ this.API_URL }/auth/me`)
        .pipe(
          tap((user: IAuth) => {
            this.authStateSubject.next(user);
          }),
          catchError(() => {
            this.logout();
            return EMPTY;
          })
        ).subscribe();
    } else {
      this.authStateSubject.next(null);
    }
  }

  private setSession(data: ILoginResponse): void {
    this.localStorageService.setItem(ACCESS_KEY, data.accessToken);
    this.localStorageService.setItem(REFRESH_KEY, data.refreshToken);
    this.authStateSubject.next(data.user);
  }
}