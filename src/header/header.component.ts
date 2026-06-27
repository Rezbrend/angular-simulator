import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { INavigationItem } from '../interfaces/INavigationItem';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../theme.service'
import { AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { IAuth } from '../features/auth/iauth';
import { AuthService } from '../features/auth/auth.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, FontAwesomeModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent implements OnInit {
  
  themeService: ThemeService = inject(ThemeService);
  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)
  authState$!: Observable<IAuth | null>;
  faSun: IconDefinition = faSun;
  faMoon: IconDefinition = faMoon;
  
  navigation: INavigationItem[] = [
    { label: 'Главная', link: '/' },
    { label: 'Пользователи', link: '/users' },
    { label: 'Посты', link: '/posts' }
  ];

  readonly companyName: string = 'РУМТИБЕТ';
  widget: string = 'date';
  currentDate: string = '';
  count: number = 0;
  
  constructor() {
    setInterval(() => {
      this.currentDate = new Date().toLocaleString();
    }, 1000);
  }
  
  toggleWidget(): void {
    this.widget = this.widget === 'date' ? 'clicker' : 'date';
  }
  
  toggleDarkMode(event: ToggleSwitchChangeEvent): void {
    this.themeService.toggleDarkMode(event.checked);
  }
  
  ngOnInit() {
    this.authState$ = this.authService.authState$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
