import { Component } from '@angular/core';
import { Color } from '../enums/Color';
import { IService } from '../interfaces/IService.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import './training.ts';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  isLoading = true;
  inputValue: string = '';
  displayedText: string = '';
  clickCount: number = 0;
  buttonText: string = '';
  showDate = true;
  showClicker = false;
  currentDate: string = '';
  location: string = '';
  date: string = '';
  participants: string = '';
  isButtonEnabled: boolean = false;
  readonly companyName: string = 'РУМТИБЕТ';
  services: IService[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'people-icon',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'shield-icon',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'label-icon',
    },
  ];

  constructor() {
    this.setLastVisitDate();
    this.setVisitCount();
  }

  onInit(): void {
    this.checkFormValidity();
  }

  checkFormValidity(): void {
    this.isButtonEnabled = this.location !== '' && this.date !== '' && this.participants !== '';
  }

  onLocationChange(): void {
    this.checkFormValidity();
  }

  onDateChange(): void {
    this.checkFormValidity();
  }

  onParticipantsChange(): void {
    this.checkFormValidity();
  }

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  setLastVisitDate(): void {
    const currentDate: Date = new Date();
    const dateString: string = currentDate.toISOString();
    localStorage.setItem('lastVisitDate', dateString);
    console.log('Дата последнего захода на страницу:', dateString);
  }

  setVisitCount(): void {
    const currentCount: string | null = localStorage.getItem('visitCount');
    let visitCount: number = currentCount ? parseInt(currentCount, 10) : 0;
    visitCount++;
    localStorage.setItem('visitCount', visitCount.toString());
    console.log('Количество заходов:', visitCount);
  }

  ngOnInit(): void {
    setInterval(() => {
      this.currentDate = new Date().toLocaleString();
    }, 1000);
  }

  increment() {
    this.clickCount++;
  }

  decrement() {
    if (this.clickCount > 0) {
      this.clickCount--;
    }
  }

  toggleDisplay() {
    this.showDate = !this.showDate;
    this.showClicker = !this.showClicker;

    if (this.showDate) {
      this.buttonText = 'Показать кликер';
    } else {
      this.buttonText = 'Показать дату';
    }
  }

  onInput() {
    this.displayedText = this.inputValue;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }
}
