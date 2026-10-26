import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Color } from './shared/enums/Color';
import { LocalStorageService } from './core/services/local-storage.service';
import { RouterOutlet } from '@angular/router';
import { MessageComponent } from './core/components/message/message.component';
import { PrimeNG } from 'primeng/config';
import { APP_CONFIG } from './app.config';
import { IAppConfig } from './core/interfaces/IAppConfig';
import { LoaderComponent } from './core/components/loader/loader.component';

@Component({
  selector: 'app-root',
  imports: [FormsModule, CommonModule, RouterOutlet, MessageComponent, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  
  APP_CONFIG: IAppConfig = inject(APP_CONFIG);
  localStorageService: LocalStorageService = inject(LocalStorageService);
  private primeng: PrimeNG = inject(PrimeNG);

  ngOnInit(): void {
    this.primeng.ripple.set(true);
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
    const currentCount: number | null = this.localStorageService.getItem<number>('visitCount');
    let visitCount: number = currentCount ?? 0;
    visitCount++;
    this.localStorageService.setItem<number>('visitCount', visitCount);
  }
  
}
