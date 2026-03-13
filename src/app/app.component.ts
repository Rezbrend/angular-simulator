import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { Color } from '../enums/Color';
import { IProgram } from '../interfaces/IProgram.js';
import { ICard } from '../interfaces/ICard.js';
import { IBlogCard } from '../interfaces/IBlogCard.js';
import { IPhotoCard } from '../interfaces/IPhotoCard.js';
import { MessageManagementService } from '../message-management.service';
import { LocalStorageService } from '../local-storage.service';
import './training.ts';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, NgTemplateOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  
  messageManagementService: MessageManagementService = inject(MessageManagementService);
  localStorageService: LocalStorageService = inject(LocalStorageService);

  count: number = 0;
  isClicker: boolean = false;
  isLoading: boolean = true;
  inputValue: string = '';
  widget: string = 'date';
  currentDate: string = '';
  location: string = '';
  date: string = '';
  participants: string = '';
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

  cards: ICard[] = [
    {
      id: 1,
      title: 'Озеро возле гор',
      subtitle: 'романтическое приключение',
      image: 'lake-near-the-mountains',
      rating: 4.9,
      price: 480,
    },
    {
      id: 2,
      title: 'Ночь в горах',
      subtitle: 'в компании друзей',
      image: 'night-in-the-mountains',
      rating: 4.5,
      price: 500,
    },
    {
      id: 3,
      title: 'Растяжка в горах',
      subtitle: 'для тех, кто заботится о себе',
      image: 'stretching-in-the-mountains',
      rating: 5.0,
      price: 230,
    },
  ];

  blogCards: IBlogCard[] = [
    {
      id: 1,
      title: 'Красивая Италия, какая она в реальности?',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
      image: 'italy-travel',
    },
    {
      id: 2,
      title: 'Долой сомнения! Весь мир открыт для вас!',
      description:
        'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
      image: 'travel-flight',
    },
    {
      id: 3,
      title: 'Как подготовиться к путешествию в одиночку? ',
      description: 'Для современного мира базовый вектор развития предполагает.',
      image: 'girl-travel-solo',
    },
    {
      id: 4,
      title: 'Индия ... летим?',
      description: 'Для современного мира базовый.',
      image: 'india-tajmahal',
    },
  ];

  photoCards: string[] = [
    'cappadocia_balloons',
    'camera_map_notebook',
    'burj_al_arab_dubai',
    'beach_with_boats',
    'grand_canyon_view',
    'old_map_camera'
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

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  setLastVisitDate(): void {
    const currentDate: Date = new Date();
    const dateString: string = currentDate.toISOString();
    this.localStorageService.setItem<string>('lastVisitDate', dateString);
  }

  setVisitCount(): void {
    const currentCount = this.localStorageService.getItem<number>('visitCount');
    let visitCount: number = currentCount ?? 0;
    visitCount++;
    this.localStorageService.setItem<number>('visitCount', visitCount);
  }

  toggleWidget(): void {
    this.widget = this.widget === 'date' ? 'clicker' : 'date';
  }

}
