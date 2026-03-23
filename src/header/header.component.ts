import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

interface NavigationItem {
  label: string;
  link: string;
}

@Component({
  selector: 'app-header',
  imports: [ RouterLink, RouterLinkActive ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  
  navigation: NavigationItem[] = [
    { label: 'Главная', link: '/' },
    { label: 'Пользователи', link: '/users' }
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
  
}
