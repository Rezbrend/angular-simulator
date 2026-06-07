import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITheme } from './interfaces/ITheme';
import { LocalStorageService } from './local-storage.service';
import { Theme } from './enums/Theme';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';

type ThemeVariable = '--primary-color' | '--surface-color';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  localStorage: LocalStorageService = inject(LocalStorageService);

  themes: ITheme[] = [
    { name: Theme.AURA, preset: Aura },
    { name: Theme.LARA, preset: Lara },
    { name: Theme.NORA, preset: Nora },
  ];

  private isDarkSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  isDarkMode$: Observable<boolean> = this.isDarkSubject.asObservable().pipe(
    tap((isDarkMode: boolean) => {
      this.updateHtmlClass(isDarkMode);
    }),
  );

  private themeSubject: BehaviorSubject<ITheme> = new BehaviorSubject<ITheme>(this.themes[0]);
  theme$: Observable<ITheme> = this.themeSubject.asObservable();

  constructor() {
    this.loadInitialState();
  }

  private themeTokens: Record<Theme, Record<ThemeVariable, string>> = {
    [Theme.AURA]: {
      '--primary-color': '#FF6347',
      '--surface-color': '#FFFFFF',
    },
    [Theme.LARA]: {
      '--primary-color': '#4CAF50',
      '--surface-color': '#F0F0F0',
    },
    [Theme.NORA]: {
      '--primary-color': '#3333FF',
      '--surface-color': '#E0E0E0',
    },
  };

  changeTheme(theme: ITheme): void {
    this.themeSubject.next(theme);
    this.localStorage.setItem('theme', theme.name);
    this.applyThemeTokens(theme.name);
  }

  toggleDarkMode(isDarkMode: boolean): void {
    this.isDarkSubject.next(isDarkMode);
    this.localStorage.setItem('dark-mode', isDarkMode.toString());
    this.updateHtmlClass(isDarkMode);
  }

  loadInitialState(): void {
    const savedThemeName = this.localStorage.getItem('theme');
    const foundTheme = this.themes.find((theme) => theme.name === savedThemeName);
    if (foundTheme) {
      this.changeTheme(foundTheme);
    }

    const savedDarkMode = this.localStorage.getItem('dark-mode');
    this.toggleDarkMode(savedDarkMode === 'true');
  }

  private applyThemeTokens(themeName: Theme) {
    const tokens = this.themeTokens[themeName];
    const root = document.documentElement;

    Object.keys(tokens).forEach((key) => {
      root.style.setProperty(key, tokens[key as ThemeVariable]);
    });
  }

  private updateHtmlClass(isDarkMode: boolean): void {
    const element: HTMLHtmlElement = document.querySelector('html')!;
    if (isDarkMode) {
      element.classList.add('dark-theme');
    } else {
      element.classList.remove('dark-theme');
    }
  }
  
}
