import { Component } from '@angular/core';
import './training.ts';
import { Color } from '../enums/Color';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  companyName: string = 'РУМТИБЕТ';

  isPrimaryColor(color: Color): boolean {
    const primaryColors: Color[] = [Color.RED, Color.GREEN, Color.BLUE];
    return primaryColors.includes(color);
  }

  constructor() {
    this.setLastVisitDate();
    this.setVisitCount();
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
}
