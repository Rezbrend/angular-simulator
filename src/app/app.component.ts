import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Color } from '../enums/Color';
import { LocalStorageService } from '../local-storage.service';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { MessageComponent } from '../message/message.component';
import { LoaderComponent } from '../loader/loader.component';
import { PrimeNG } from 'primeng/config';

@Component({
  selector: 'app-root',
  imports: [
    FormsModule,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    FooterComponent,
    MessageComponent,
    LoaderComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
})
export class AppComponent implements OnInit {
  
  localStorageService: LocalStorageService = inject(LocalStorageService);

  constructor(private primeng: PrimeNG) {}

  ngOnInit() {
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
