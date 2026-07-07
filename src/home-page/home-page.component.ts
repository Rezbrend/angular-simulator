import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProgram } from '../interfaces/IProgram.js';
import { ICard } from '../interfaces/ICard.js';
import { IBlogCard } from '../interfaces/IBlogCard.js';
import { MessageManagementService } from '../message-management.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPersonHiking, faBuildingShield, faTags, faStar, faPlay, IconDefinition } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home-page',
  imports: [FormsModule, CommonModule,  FontAwesomeModule],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss',
  changeDetection: ChangeDetectionStrategy.Eager,
  standalone: true
})
export class HomePageComponent {
  
    messageManagementService: MessageManagementService = inject(MessageManagementService);

    isLoading: boolean = true;
    inputValue: string = '';
    location: string = '';
    date: string = '';
    participants: string = '';
    faPersonHiking: IconDefinition = faPersonHiking;
    faBuildingShield: IconDefinition = faBuildingShield;
    faTags: IconDefinition = faTags;
    faStar: IconDefinition = faStar;
    faPlay: IconDefinition = faPlay;
  
    programs: IProgram[] = [
      {
        id: 1,
        title: 'Опытный гид',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        icon: faPersonHiking,
      },
      {
        id: 2,
        title: 'Безопасный поход',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        icon: faBuildingShield,
      },
      {
        id: 3,
        title: 'Лояльные цены',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        icon: faTags,
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
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации.',
        image: 'italy-travel',
      },
      {
        id: 2,
        title: 'Долой сомнения! Весь мир открыт для вас!',
        description: 'Для современного мира базовый вектор развития предполагает независимые способы реализации соответствующих условий активизации ... независимые способы реализации соответствующих...',
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
  
}
