import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { Theme } from '../enums/Theme';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';
import { errorInterceptor } from './error.interceptor';
import { loggingInterceptor } from './logging.interceptor';
import { authInterceptor } from '../features/auth/auth.interceptor';
import { AuthService } from '../features/auth/auth.service';

type ThemePresetType = typeof Aura | typeof Lara | typeof Nora;

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
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideZoneChangeDetection(),
    provideHttpClient(withInterceptors([errorInterceptor, loggingInterceptor, authInterceptor])),
    providePrimeNG({
      theme: {
        preset: initThemePreset(),
        options: { darkModeSelector: '.dark-mode' },
      },
    }),
    provideAppInitializer(() => {
      const authService: AuthService = inject(AuthService);
      authService.initialize();
      return Promise.resolve();
    }),
  ],
  
}