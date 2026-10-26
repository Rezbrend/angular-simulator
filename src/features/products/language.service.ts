import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { TranslateService, Translation } from '@ngx-translate/core';
import { PrimeNG } from 'primeng/config';
import { LocalStorageService } from '../../app/core/services/local-storage.service';
import { Language } from '../../app/core/enums/Language';
import { ILanguage } from './interfaces/ILanguage';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {

  private config: PrimeNG = inject(PrimeNG);

  private localStorage: LocalStorageService = inject(LocalStorageService);
  private translate: TranslateService = inject(TranslateService);

  private currentLanguageSubject: BehaviorSubject<Language> = new BehaviorSubject<Language>(Language.RU);
  currentLanguage$: Observable<Language> = this.currentLanguageSubject.asObservable();


  languages: ILanguage[] = [
    {
      name: 'EN',
      value: Language.EN
    },
    {
      name: 'RU',
      value: Language.RU
    },
  ];

  private getBrowserLanguage(): Language {
    const browserLanguage: string = navigator.language.toLowerCase();
    const language: ILanguage | undefined = this.languages.find((language: ILanguage) => browserLanguage.startsWith(language.value));
    return language?.value ?? Language.RU;
  }

  private getLanguage(): Language {
    const savedLanguage: Language | null = this.localStorage.getItem<Language>('language');
    if (savedLanguage) {
      return savedLanguage;
    }
    return this.getBrowserLanguage();
  }

  private setPrimeNgTranslation(): void {
  this.translate.get('primeng')
    .pipe(
      tap((translation: Translation) => {
        this.config.setTranslation(translation);
      })
    )
    .subscribe();
}

  initializeLanguage(): void {
    const language: Language = this.getLanguage();
    this.translate.use(language).pipe(
      tap(() => {
        this.currentLanguageSubject.next(language);
        this.setPrimeNgTranslation();
      })
    ).subscribe();
  }

  getCurrentLanguage(): Language {
    return this.currentLanguageSubject.value;
  }

  changeLanguage(language: Language): void {
    this.translate.use(language).pipe(
      tap(() => {
        this.localStorage.setItem('language', language);
        this.currentLanguageSubject.next(language);
        this.setPrimeNgTranslation();
      })
    ).subscribe();
  }

}