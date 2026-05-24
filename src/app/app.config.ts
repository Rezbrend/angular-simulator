import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { providePrimeNG } from 'primeng/config';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { ThemesName } from '../enums/ThemesName';
import Aura from '@primeuix/themes/aura';
import Nora from '@primeuix/themes/nora';
import Lara from '@primeuix/themes/lara';

type ThemePresetType = typeof Aura | typeof Lara | typeof Nora;

const initThemePreset = (): ThemePresetType => {
  const themeFromStorage: string | null = localStorage.getItem('theme');
  const savedTheme: ThemesName = themeFromStorage ? JSON.parse(themeFromStorage) : ThemesName.AURA;

  switch (savedTheme) {
    case ThemesName.NORA:
      return Nora;
    case ThemesName.LARA:
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
    provideHttpClient(),
    providePrimeNG({
      theme: {
        preset: initThemePreset(),
        options: { darkModeSelector: '.dark-mode' },
      },
    }),
  ],
};
