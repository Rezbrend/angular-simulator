import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Color } from '../enums/Color';
import { IProgram } from '../interfaces/IProgram.js';
import './training.ts';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})

export class AppComponent {
  
  count: number = 0;
  isClicker: boolean = false;
  isLoading: boolean = true;
  inputValue: string = '';
  displayedText: string = '';
  clickCount: number = 0;
  buttonText: string = '';
  showDate: boolean = true;
  showClicker: boolean = false;
  currentDate: string = '';
  location: string = '';
  date: string = '';
  participants: string = '';
  isButtonEnabled: boolean = false;
  readonly companyName: string = 'РУМТИБЕТ';

  programs: IProgram[] = [
    {
      id: 1,
      title: 'Опытный гид',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'green-people-icon',
    },
    {
      id: 2,
      title: 'Безопасный поход',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'blue-shield-icon',
    },
    {
      id: 3,
      title: 'Лояльные цены',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      icon: 'yellow-label-icon',
    },
  ];

  constructor() {
    this.setLastVisitDate();
    this.setVisitCount();

    setInterval(() => {
      this.currentDate = new Date().toLocaleString();
    }, 1000);

    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  checkFormValidity(): void {
    this.isButtonEnabled = this.location !== '' && this.date !== '' && this.participants !== '';
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

  onInput() {
    this.displayedText = this.inputValue;
  }
}
