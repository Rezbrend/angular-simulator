import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Theme } from './core/enums/Theme';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { errorInterceptor } from './core/interceptors/error.interceptor';
import { authInterceptor } from './core/interceptors/auth.interceptor';
import { AuthService } from '../features/auth/auth.service';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';
import { InjectionToken } from '@angular/core';
import { IAppConfig } from './core/interfaces/IAppConfig';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { firstValueFrom } from 'rxjs';
import { loggingInterceptor } from './core/interceptors/logging.interceptor';
import { provideStore } from '@ngrx/store';
import { RecipesEffect } from '../features/recipes/state/recipes.effect';
import { recipesReducer } from '../features/recipes/state/recipes.reducer';
import { provideEffects } from '@ngrx/effects';

type ThemePresetType = typeof Aura | typeof Lara | typeof Nora;

export const APP_CONFIG: InjectionToken<IAppConfig> = new InjectionToken<IAppConfig>('app.config');

const initThemePreset = (): ThemePresetType => {
  const themeFromStorage: string | null = localStorage.getItem('theme');
  const savedTheme: Theme = themeFromStorage ? JSON.parse(themeFromStorage) : Theme.AURA;

  switch (savedTheme) {
    case Theme.NORA:
      return Nora;
    case Theme.LARA:
      return Lara;
    default:
      return Aura;
  }
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([errorInterceptor, loggingInterceptor, authInterceptor])),
    providePrimeNG({
      theme: {
        preset: initThemePreset(),
        options: { darkModeSelector: '.dark-mode' },
      },
    }),
    {
      provide: DATE_PIPE_DEFAULT_OPTIONS,
      useValue: { dateFormat: 'shortDate' },
    },
    {
      provide: APP_CONFIG,
      useValue: {
        companyName: 'РУМТИБЕТ',
        enableLogs: true,
        enableNotifications: true,
        enableTheming: true,
        sessionTimeout: 3600,
      },
    },
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      return firstValueFrom(authService.initAuthState());
    }),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/', 
        suffix: '.json',
      }),
      fallbackLang: 'ru',
      lang: 'ru',
    }),
    provideStore({
      recipes: recipesReducer,
    }),
    provideEffects([RecipesEffect]),
  ],
};