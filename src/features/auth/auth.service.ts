import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../../local-storage.service';
import { BehaviorSubject, catchError, EMPTY, Observable, tap } from 'rxjs';
import { IAuthUser } from './IAuthUser';
import { IAuthResponse } from './IAuthResponse';
import { ILoginCredentials } from './ILoginCredentials';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  
  private httpClient: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  
  authStateSubject: BehaviorSubject<IAuthUser | null> = new BehaviorSubject<IAuthUser | null>(null);
  authState$: Observable<IAuthUser | null> = this.authStateSubject.asObservable();
  
  private readonly LOCAL_STORAGE_KEY: string = 'auth-tokens';
  private API_URL: string = 'https://dummyjson.com/auth';

  initialize(): void {
    this.initAuthState();
  }

  login(credentials: ILoginCredentials): Observable<IAuthResponse> {
    return this.httpClient
      .post<IAuthResponse>(`${ this.API_URL }/login`, credentials)
      .pipe(
        tap((response: IAuthResponse) => {
          this.storeAuthTokens(response);
        }),
        catchError(() => {
          return EMPTY;
        })
      );
  }

  logout(): void {
    this.localStorageService.removeItem(this.LOCAL_STORAGE_KEY);
    this.authStateSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!this.authStateSubject.getValue();
  }

  getCurrentUser(): IAuthUser | null {
    return this.authStateSubject.getValue();
  }

  getAccessToken(): string | null {
    return this.localStorageService.getItem<{ accessToken?: string }>(this.LOCAL_STORAGE_KEY)?.accessToken ?? null;
  }

  getRefreshToken(): string | null {
    return this.localStorageService.getItem<{ refreshToken?: string }>(this.LOCAL_STORAGE_KEY)?.refreshToken ?? null;
  }

  refreshToken(): Observable<IAuthResponse> {
    const token: string | null = this.getRefreshToken();
    if (!token) return EMPTY;

    return this.httpClient.post<IAuthResponse>(`${ this.API_URL }/refresh`, { refreshToken: token })
      .pipe(
        tap((response: IAuthResponse) => {
          this.storeAuthTokens(response);
        }),
        catchError(() => EMPTY)
      );
  }

  private initAuthState(): void {
    const tokens: IAuthResponse | null = this.localStorageService.getItem<IAuthResponse>(this.LOCAL_STORAGE_KEY);

    if (tokens?.accessToken && tokens?.refreshToken) {
      this.getUserWithAccessToken().subscribe();
    } else {
      this.authStateSubject.next(null);
    }
  }

  private getUserWithAccessToken(): Observable<IAuthUser> {
    return this.httpClient.get<IAuthUser>(`${ this.API_URL }/me`)
      .pipe(
        tap((user: IAuthUser) => {
          this.authStateSubject.next(user);
        })
      );
  }

  private storeAuthTokens(data: IAuthResponse): void {
    this.localStorageService.setItem(this.LOCAL_STORAGE_KEY, {
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });
    this.authStateSubject.next(data);
  }
  
}