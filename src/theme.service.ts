import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ITheme } from './interfaces/ITheme';
import { LocalStorageService } from './local-storage.service';
import { Theme } from './enums/Theme';
import { usePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';
import Lara from '@primeuix/themes/lara';
import Nora from '@primeuix/themes/nora';
import { APP_CONFIG } from './app/app.config';
import { IAppConfig } from './interfaces/IAppConfig';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  
  localStorage: LocalStorageService = inject(LocalStorageService);
  config: IAppConfig = inject(APP_CONFIG);

  themes: ITheme[] = [
    { name: Theme.AURA, preset: Aura },
    { name: Theme.LARA, preset: Lara },
    { name: Theme.NORA, preset: Nora },
  ];
  
  private defaultTheme: ITheme = this.themes[0];
  
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

  changeTheme(theme: ITheme): void {
    if (!this.config.enableTheming) {
      return;
    }
    this.themeSubject.next(theme);
    usePreset(theme.preset);
    this.localStorage.setItem('theme', theme.name);
    this.applyThemeClass(theme.name);
  }

  toggleDarkMode(isDarkMode: boolean): void {
    if (!this.config.enableTheming) {
      return;
    }
    this.isDarkSubject.next(isDarkMode);
    this.localStorage.setItem('dark-mode', isDarkMode.toString());
    this.updateHtmlClass(isDarkMode);
  }

  loadInitialState(): void {
    if (!this.config.enableTheming) {
      this.themeSubject.next(this.defaultTheme);
      usePreset(this.defaultTheme.preset);
      this.applyThemeClass(this.defaultTheme.name);
      this.isDarkSubject.next(false);
      this.updateHtmlClass(false);
      return;
    }
    const savedThemeName: string | null = this.localStorage.getItem('theme');
    const foundTheme: ITheme | undefined = this.themes.find((theme) => theme.name === (savedThemeName || ''));
    if (foundTheme) {
      this.changeTheme(foundTheme);
    }

    const savedDarkMode: string | null = this.localStorage.getItem('dark-mode');
    this.toggleDarkMode(savedDarkMode === 'true');
  }
  
  private applyThemeClass(themeName: Theme): void {
    const element: HTMLHtmlElement = document.querySelector('html')!;
    element.classList.add(`theme-${ themeName.toLowerCase() }`);
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
