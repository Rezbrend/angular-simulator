import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { INavigationItem } from '../interfaces/INavigationItem';
import { ToggleSwitchChangeEvent, ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSun, faMoon, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { SelectButtonModule } from 'primeng/selectbutton';
import { ThemeService } from '../theme.service';
import { AsyncPipe } from '@angular/common';
import { AuthService } from '../features/auth/auth.service';
import { MessageManagementService } from '../message-management.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, ToggleSwitchModule, FormsModule, FontAwesomeModule, SelectButtonModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {
  
  themeService: ThemeService = inject(ThemeService);
  authService: AuthService = inject(AuthService);
  private messageService: MessageManagementService = inject(MessageManagementService);
  private router: Router = inject(Router);
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

  logout() {
    this.authService.logout();
    this.messageService.showInfo('Вы вышли из системы');
    this.router.navigate(['/login']);
  }
  
}
